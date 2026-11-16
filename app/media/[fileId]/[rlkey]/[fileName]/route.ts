import { DROPBOX_ID_PATTERN, DROPBOX_ORIGIN, MEDIA_IMAGE_EXTENSIONS } from "@/lib/mediaUrl";

// Serves Dropbox-hosted images from our own domain without Dropbox's
// "X-Robots-Tag: noindex, nofollow, noimageindex" header, so Google can index them.
// Uploaded file names are unique (timestamped), so responses are safe to cache for a year.

const CACHE_FOREVER = "public, max-age=31536000, s-maxage=31536000, immutable";

function notFound() {
  return new Response("Not found", { status: 404, headers: { "Cache-Control": "no-store" } });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ fileId: string; rlkey: string; fileName: string }> }
) {
  const { fileId, rlkey, fileName } = await params;

  if (!DROPBOX_ID_PATTERN.test(fileId) || !DROPBOX_ID_PATTERN.test(rlkey) || !MEDIA_IMAGE_EXTENSIONS.test(fileName)) {
    return notFound();
  }

  const upstreamUrl = `${DROPBOX_ORIGIN}/scl/fi/${fileId}/${encodeURIComponent(fileName)}?rlkey=${rlkey}`;

  try {
    const upstream = await fetch(upstreamUrl, { cache: "no-store" });
    const contentType = upstream.headers.get("content-type") || "";

    if (!upstream.ok || !upstream.body || !contentType.startsWith("image/")) {
      return notFound();
    }

    const headers = new Headers({
      "Content-Type": contentType,
      "Cache-Control": CACHE_FOREVER,
      "X-Content-Type-Options": "nosniff",
      // Uploaded SVGs are now served from our origin; stop them from running scripts if opened directly.
      "Content-Security-Policy": "default-src 'none'; img-src 'self' data:; style-src 'unsafe-inline'; sandbox",
    });

    const contentLength = upstream.headers.get("content-length");
    if (contentLength) headers.set("Content-Length", contentLength);

    return new Response(upstream.body, { status: 200, headers });
  } catch (error) {
    console.error("Error proxying media:", error);
    return new Response("Bad gateway", { status: 502, headers: { "Cache-Control": "no-store" } });
  }
}
