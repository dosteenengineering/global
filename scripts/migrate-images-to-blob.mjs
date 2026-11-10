// Moves one solution page's images from Dropbox to Vercel Blob, named from their alt text.
//
//   node scripts/migrate-images-to-blob.mjs --slug flood-barriers          dry run (default)
//   node scripts/migrate-images-to-blob.mjs --slug flood-barriers --upload-only   upload to Blob, database unchanged
//   node scripts/migrate-images-to-blob.mjs --slug flood-barriers --live   upload + update MongoDB
//
// Dry run: downloads and converts every image into .image-migration/<slug>/ and prints the plan.
//          Nothing is uploaded and the database is not touched.
// Live:    backs up the page document, uploads each image to Blob as images/<alt-text>.<ext>,
//          then points the page at /images/<alt-text>.<ext> and fills any empty alt text.
// Dropbox files are never modified or deleted.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import sharp from "sharp";
import { head, put } from "@vercel/blob";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
process.loadEnvFile(path.join(ROOT, ".env.local"));

const args = process.argv.slice(2);
const slug = args[args.indexOf("--slug") + 1];
const live = args.includes("--live");
const uploadOnly = !live && args.includes("--upload-only");
if (!args.includes("--slug") || !slug || slug.startsWith("--")) {
  console.error("Usage: node scripts/migrate-images-to-blob.mjs --slug <page-slug> [--upload-only | --live]");
  process.exit(1);
}
if ((live || uploadOnly) && !process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("BLOB_READ_WRITE_TOKEN is missing from .env.local");
  process.exit(1);
}

const OUT_DIR = path.join(ROOT, ".image-migration", slug);
const MAX_WIDTH = 2560; // above the largest size next/image serves (1920)
const PHOTO_QUALITY = 85;
const MAX_NAME_LENGTH = 80;

const CONTENT_TYPES = { webp: "image/webp", jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", gif: "image/gif", svg: "image/svg+xml", avif: "image/avif" };

const clean = (text) => (typeof text === "string" ? text.replace(/\s+/g, " ").trim() : "");

// "FLOOD BARRIERS" -> "Flood Barriers"; mixed-case text is kept as written.
const readable = (text) =>
  text && text === text.toUpperCase() ? text.toLowerCase().replace(/\b\p{L}/gu, (c) => c.toUpperCase()) : text;

function slugify(text) {
  const base = text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (base.length <= MAX_NAME_LENGTH) return base;
  return base.slice(0, MAX_NAME_LENGTH).replace(/-[^-]*$/, "");
}

// Every image field rendered on a System (solution detail) page, with the text used when alt is empty.
function collectImages(doc) {
  const pageTitle = readable(clean(doc.firstSection?.title)) || slug;
  const images = [];
  const add = (field, url, alt, fallback, hasAltField = true) => {
    if (typeof url !== "string" || !url.startsWith("https://dl.dropboxusercontent.com/")) return;
    images.push({ field, altField: hasAltField ? `${field}Alt` : null, url, alt: clean(alt), fallback: readable(clean(fallback)) });
  };

  const first = doc.firstSection ?? {};
  add("firstSection.image", first.image, first.imageAlt, pageTitle);
  add("firstSection.thumbnailImage", first.thumbnailImage, first.thumbnailImageAlt, `${pageTitle} thumbnail`);
  add("thumbnail", doc.thumbnail, doc.thumbnailAlt, `${pageTitle} thumbnail`);
  (doc.secondSection?.items ?? []).forEach((item, i) =>
    add(`secondSection.items.${i}.image`, item.image, item.imageAlt, item.title));
  (doc.fourthSection?.items ?? []).forEach((item, i) => {
    add(`fourthSection.items.${i}.logo`, item.logo, item.logoAlt, `${clean(item.title)} icon`);
    add(`fourthSection.items.${i}.image`, item.image, item.imageAlt, item.title);
  });
  (doc.fifthSection?.items ?? []).forEach((item, i) =>
    add(`fifthSection.items.${i}.image`, item.image, item.imageAlt, item.title));
  (doc.images ?? []).forEach((url, i) => add(`images.${i}`, url, "", `${pageTitle} ${i + 1}`, false));

  return images;
}

async function download(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed (${res.status}): ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

// Photos -> WebP q85, PNGs with transparency -> lossless WebP, SVG/GIF unchanged.
// Keeps the original whenever WebP would not be smaller.
async function convert(buffer, url) {
  const ext = (new URL(url).pathname.match(/\.([a-z0-9]+)$/i)?.[1] ?? "").toLowerCase();
  if (ext === "svg" || ext === "gif") return { buffer, ext, note: "kept as is" };

  const image = sharp(buffer).rotate();
  const meta = await image.metadata();
  const lossless = meta.format === "png" && meta.hasAlpha;
  const webp = await image
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp(lossless ? { lossless: true, effort: 6 } : { quality: PHOTO_QUALITY, effort: 6 })
    .toBuffer();

  if (webp.length >= buffer.length) return { buffer, ext: ext === "jpeg" ? "jpg" : ext, note: "original smaller, kept" };
  return { buffer: webp, ext: "webp", note: lossless ? "lossless webp" : `webp q${PHOTO_QUALITY}` };
}

async function existingBlobSize(pathname) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    return (await head(pathname)).size;
  } catch {
    return null;
  }
}

// A name already in Blob is reused only if it holds this exact file (a re-run); otherwise "-2", "-3"...
async function uniqueName(base, ext, taken, buffer) {
  for (let n = 1; ; n++) {
    const name = `${n === 1 ? base : `${base}-${n}`}.${ext}`;
    if (taken.has(name)) continue;
    const size = await existingBlobSize(`images/${name}`);
    if (size === null || size === buffer.length) {
      taken.add(name);
      return { name, alreadyUploaded: size !== null };
    }
  }
}

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  const systems = mongoose.connection.db.collection("systems");
  const doc = await systems.findOne({ slug });
  if (!doc) throw new Error(`No solution page with slug "${slug}"`);

  const images = collectImages(doc);
  if (!images.length) {
    console.log("No Dropbox images left on this page.");
    return;
  }

  await fs.mkdir(OUT_DIR, { recursive: true });
  const taken = new Set();
  const plan = [];

  for (const img of images) {
    const alt = img.alt || img.fallback;
    const original = await download(img.url);
    const converted = await convert(original, img.url);
    const { name, alreadyUploaded } = await uniqueName(slugify(alt), converted.ext, taken, converted.buffer);
    await fs.writeFile(path.join(OUT_DIR, name), converted.buffer);
    plan.push({ ...img, finalAlt: alt, altFilled: !img.alt && Boolean(img.altField), name, alreadyUploaded, newUrl: `/images/${name}`, before: original.length, after: converted.buffer.length, note: converted.note });
  }

  console.log(`\n${live ? "LIVE" : uploadOnly ? "UPLOAD ONLY" : "DRY RUN"}: ${slug} (${plan.length} images)\n`);
  for (const p of plan) {
    console.log(`${p.field}`);
    console.log(`  alt:  ${p.finalAlt}${p.altFilled ? "   [alt was empty, will be filled]" : ""}`);
    console.log(`  url:  https://www.dosteen.com${p.newUrl}`);
    console.log(`  size: ${kb(p.before)} -> ${kb(p.after)} (${p.note})\n`);
  }
  const before = plan.reduce((s, p) => s + p.before, 0);
  const after = plan.reduce((s, p) => s + p.after, 0);
  console.log(`Total: ${kb(before)} -> ${kb(after)}. Converted files: ${OUT_DIR}`);
  await fs.writeFile(path.join(OUT_DIR, "plan.json"), JSON.stringify(plan, null, 2));

  if (!live && !uploadOnly) {
    console.log("\nDry run only. Nothing uploaded, database unchanged. Re-run with --upload-only or --live.");
    return;
  }

  console.log("");
  for (const p of plan) {
    if (p.alreadyUploaded) {
      console.log(`Already in Blob: ${p.name}`);
      continue;
    }
    const blob = await put(`images/${p.name}`, await fs.readFile(path.join(OUT_DIR, p.name)), {
      access: "public",
      contentType: CONTENT_TYPES[p.name.split(".").pop()],
      addRandomSuffix: false,
      cacheControlMaxAge: 31536000,
    });
    console.log(`Uploaded ${p.name} -> ${blob.url}`);
  }

  if (uploadOnly) {
    console.log("\nUpload only. Database unchanged; the page still uses Dropbox.");
    return;
  }

  const backupFile = path.join(ROOT, ".image-migration", "backups", `system-${slug}-${Date.now()}.json`);
  await fs.mkdir(path.dirname(backupFile), { recursive: true });
  await fs.writeFile(backupFile, JSON.stringify(doc, null, 2));
  console.log(`\nBackup written: ${backupFile}`);

  const set = {};
  for (const p of plan) {
    set[p.field] = p.newUrl;
    if (p.altFilled) set[p.altField] = p.finalAlt;
  }
  await systems.updateOne({ _id: doc._id }, { $set: set });
  console.log(`\nDatabase updated (${Object.keys(set).length} fields). Dropbox files untouched.`);
}

main()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
