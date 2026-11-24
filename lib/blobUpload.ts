import "server-only";
import { BlobNotFoundError, head, put } from "@vercel/blob";

// File uploads go to Vercel Blob. Site files are served under our own domain (see next.config.ts):
//   images    -> /images/<name>     (proxied)
//   videos    -> /videos/<name>     (redirected to Blob: browsers fetch video in byte ranges)
//   documents -> https://www.dosteen.com/documents/<name>   (proxied; stored as an absolute URL because
//                the Resources download gate redirects to the stored URL, which must be absolute)
// Names come from the original file name ("Garage Door (1).JPG" -> garage-door-1.jpg), with -2, -3...
// added when taken. Existing files are never overwritten: they are cached for a year as immutable.

// Fixed rather than BASE_URL: local development uses the production database.
const SITE_URL = "https://www.dosteen.com";
const ONE_YEAR = 31536000;

type Folder = "images" | "videos" | "documents";

// Only these types are accepted for the site folders, because anything stored there is served from
// www.dosteen.com (an uploaded HTML file could run scripts on our domain). SVGs go to /images, which
// is served with a sandboxing Content-Security-Policy.
const SITE_FILE_TYPES: Record<string, { folder: Folder; contentType: string }> = {
  jpg: { folder: "images", contentType: "image/jpeg" },
  jpeg: { folder: "images", contentType: "image/jpeg" },
  jfif: { folder: "images", contentType: "image/jpeg" },
  png: { folder: "images", contentType: "image/png" },
  gif: { folder: "images", contentType: "image/gif" },
  webp: { folder: "images", contentType: "image/webp" },
  avif: { folder: "images", contentType: "image/avif" },
  svg: { folder: "images", contentType: "image/svg+xml" },
  mp4: { folder: "videos", contentType: "video/mp4" },
  mov: { folder: "videos", contentType: "video/quicktime" },
  webm: { folder: "videos", contentType: "video/webm" },
  avi: { folder: "videos", contentType: "video/x-msvideo" },
  mkv: { folder: "videos", contentType: "video/x-matroska" },
  pdf: { folder: "documents", contentType: "application/pdf" },
  doc: { folder: "documents", contentType: "application/msword" },
  docx: { folder: "documents", contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
  xls: { folder: "documents", contentType: "application/vnd.ms-excel" },
  xlsx: { folder: "documents", contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
  dwg: { folder: "documents", contentType: "application/octet-stream" },
  dxf: { folder: "documents", contentType: "application/octet-stream" },
  rvt: { folder: "documents", contentType: "application/octet-stream" },
  ifc: { folder: "documents", contentType: "application/octet-stream" },
};

// Content types for private uploads; any other type is stored as a download.
const PRIVATE_CONTENT_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

/** The file type is not allowed; the message is safe to show to the admin. */
export class UploadRejectedError extends Error {}

function splitFileName(originalName: string) {
  const dot = originalName.lastIndexOf(".");
  const baseName = dot > 0 ? originalName.slice(0, dot) : originalName;
  const extension = dot > 0 ? originalName.slice(dot + 1).toLowerCase().replace(/[^a-z0-9]/g, "") : "";
  const slug =
    baseName
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80)
      .replace(/-+$/, "") || "file";
  return { slug, extension };
}

async function blobExists(pathname: string) {
  try {
    await head(pathname);
    return true;
  } catch (error) {
    if (error instanceof BlobNotFoundError) return false;
    throw error;
  }
}

/**
 * Picks the first free Blob pathname for a site file ("Site Clip.MOV" -> videos/site-clip.mov, or
 * site-clip-2.mov if taken). `from` skips numbers already found taken. Returns the URL to store too.
 */
export async function freeSitePath(fileName: string, from = 1) {
  const { slug, extension } = splitFileName(fileName);
  const type = SITE_FILE_TYPES[extension];
  if (!type) {
    throw new UploadRejectedError(
      `${extension ? `.${extension}` : "This"} file type can't be uploaded. Allowed: ${Object.keys(SITE_FILE_TYPES).join(", ")}.`,
    );
  }
  for (let n = from; n <= 100; n++) {
    const name = `${n === 1 ? slug : `${slug}-${n}`}.${extension}`;
    const pathname = `${type.folder}/${name}`;
    if (await blobExists(pathname)) continue;
    const url = type.folder === "documents" ? `${SITE_URL}/documents/${name}` : `/${type.folder}/${name}`;
    return { pathname, url, n, folder: type.folder, contentType: type.contentType };
  }
  throw new Error(`No free file name left for ${slug}.${extension}`);
}

/** Uploads an admin file (image, video or document) and returns the URL to store in the database. */
export async function uploadSiteFile(file: File): Promise<string> {
  let from = 1;
  for (;;) {
    const target = await freeSitePath(file.name, from);
    try {
      await put(target.pathname, file, {
        access: "public",
        contentType: target.contentType,
        addRandomSuffix: false,
        allowOverwrite: false,
        cacheControlMaxAge: ONE_YEAR,
      });
      return target.url;
    } catch (error) {
      if (!(await blobExists(target.pathname))) throw error;
      from = target.n + 1; // taken by an upload running at the same time: try the next name
    }
  }
}

// --- Videos: uploaded from the browser straight to Blob ---
// A request to a Vercel function is capped at 4.5 MB, too small for video. The admin's browser asks
// /api/admin/upload-video for a free name, then for a one-time upload token that only allows that
// name, a video type and the size limit below; the file then goes directly to Blob.

const MAX_VIDEO_BYTES = 500 * 1024 * 1024;
const VIDEO_CONTENT_TYPES = [...new Set(Object.values(SITE_FILE_TYPES).filter((t) => t.folder === "videos").map((t) => t.contentType))];

/** Token rules for a browser video upload. Rejects any pathname that freeSitePath would not give. */
export async function videoUploadTokenOptions(pathname: string) {
  const match = /^videos\/([a-z0-9]+(?:-[a-z0-9]+)*)\.([a-z0-9]+)$/.exec(pathname);
  if (!match || SITE_FILE_TYPES[match[2]]?.folder !== "videos") {
    throw new UploadRejectedError("Only video files can be uploaded here.");
  }
  if (await blobExists(pathname)) {
    throw new UploadRejectedError("A video with this name was just uploaded. Please try again.");
  }
  return {
    allowedContentTypes: VIDEO_CONTENT_TYPES,
    maximumSizeInBytes: MAX_VIDEO_BYTES,
    addRandomSuffix: false,
    allowOverwrite: false,
    cacheControlMaxAge: ONE_YEAR,
  };
}

/**
 * Uploads a private file (e.g. a partner applicant's trade licence or bank details). It is kept off
 * our domain and out of the site folders: stored at the Blob store's own address with a random,
 * unguessable suffix, and only linked from the admin panel.
 */
export async function uploadPrivateFile(file: File, folder: string): Promise<string> {
  const { slug, extension } = splitFileName(file.name);
  const blob = await put(`private/${folder}/${slug}${extension ? `.${extension}` : ""}`, file, {
    access: "public",
    addRandomSuffix: true,
    contentType: PRIVATE_CONTENT_TYPES[extension] ?? "application/octet-stream",
  });
  return blob.url;
}
