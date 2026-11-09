// Dropbox serves every file with "X-Robots-Tag: noimageindex", so Google will not index images
// loaded from it directly. Rewriting them to /media/* serves them from our own domain via
// app/media/[fileId]/[rlkey]/[fileName]/route.ts instead. Stored URLs stay untouched; this runs at render time.
//
// https://dl.dropboxusercontent.com/scl/fi/<fileId>/<fileName>?rlkey=<rlkey>&dl=0
//   -> /media/<fileId>/<rlkey>/<fileName>

export const DROPBOX_ORIGIN = "https://dl.dropboxusercontent.com";

export const MEDIA_IMAGE_EXTENSIONS = /\.(jpe?g|png|webp|avif|gif|svg)$/i;

export const DROPBOX_ID_PATTERN = /^[a-z0-9]+$/i;

const DROPBOX_SHARED_FILE = /^https:\/\/dl\.dropboxusercontent\.com\/scl\/fi\/([a-z0-9]+)\/([^/?#]+)\?([^#]*)$/i;

// Only images are proxied; videos, documents and unrecognised links keep their Dropbox URL.
export function toMediaUrl(url: string): string;
export function toMediaUrl(url: string | undefined | null): string | undefined;
export function toMediaUrl(url: string | undefined | null) {
  if (!url) return url ?? undefined;

  const match = url.match(DROPBOX_SHARED_FILE);
  if (!match) return url;

  const [, fileId, fileName, query] = match;
  // Query may come HTML-encoded ("&amp;") when taken from rich-text content.
  const rlkey = query.match(/(?:^|&(?:amp;)?)rlkey=([a-z0-9]+)/i)?.[1];
  if (!rlkey || !MEDIA_IMAGE_EXTENSIONS.test(fileName)) return url;

  return `/media/${fileId}/${rlkey}/${fileName}`;
}

// For admin-authored HTML (e.g. blog content from TinyMCE) that embeds Dropbox image URLs.
export function rewriteMediaUrlsInHtml(html: string | undefined | null) {
  if (!html) return html ?? "";
  return html.replace(/https:\/\/dl\.dropboxusercontent\.com\/[^"'\s()<>]+/g, (match) => toMediaUrl(match));
}
