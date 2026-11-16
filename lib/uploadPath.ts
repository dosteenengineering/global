// Builds an SEO-friendly Dropbox path, e.g. "Home Banner (1).JPG" -> "/uploads/image/home-banner-1-1783340358832.jpg".
// The descriptive name comes first because Google uses image file names as a relevance signal;
// the timestamp keeps every path unique.
export function buildUploadPath(fileType: string, originalName: string, suffix?: string | number) {
  const folder = fileType.toLowerCase().replace(/[^a-z0-9-]/g, "") || "misc";

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
      .slice(0, 80) || "file";

  const unique = suffix === undefined ? `${Date.now()}` : `${Date.now()}-${suffix}`;

  return `/uploads/${folder}/${slug}-${unique}${extension ? `.${extension}` : ""}`;
}
