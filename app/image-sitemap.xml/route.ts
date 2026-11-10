import connectDB from "@/lib/mongodb";
import Project from "@/app/models/Project";
import Blog from "@/app/models/Blog";
import Service from "@/app/models/Service";
import System from "@/app/models/System";
import { MEDIA_IMAGE_EXTENSIONS, toMediaUrl } from "@/lib/mediaUrl";

// Image sitemap for case studies, blogs and solutions, referenced from public/robots.txt.
// Lists every image through its /media URL so Google indexes it under our domain.

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.dosteen.com";

type MaybeImage = string | undefined | null;

interface SitemapEntry {
  loc: string;
  images: string[];
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toAbsoluteImageUrl(url: MaybeImage) {
  if (!url) return null;
  const mediaUrl = toMediaUrl(url);
  if (!MEDIA_IMAGE_EXTENSIONS.test(mediaUrl.split("?")[0])) return null;
  if (mediaUrl.startsWith("/")) return `${SITE_URL}${mediaUrl}`;
  return mediaUrl.startsWith(SITE_URL) ? mediaUrl : null;
}

function collectImages(urls: MaybeImage[]) {
  const images = urls.map(toAbsoluteImageUrl).filter((url): url is string => Boolean(url));
  return Array.from(new Set(images));
}

function extractImagesFromHtml(html: MaybeImage) {
  if (!html) return [];
  return Array.from(html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi), (match) => match[1].replace(/&amp;/g, "&"));
}

interface ImageItem {
  image?: string;
}

interface ProjectDoc {
  projects?: {
    slug?: string;
    isHidden?: boolean;
    thumbnail?: string;
    images?: string[];
    firstSection?: { coverImage?: string };
    thirdSection?: { items?: ImageItem[] };
  }[];
}

interface BlogDoc {
  blogs?: {
    slug?: string;
    isHidden?: boolean;
    thumbnail?: string;
    coverImage?: string;
    content?: string;
  }[];
}

interface ServiceDoc {
  thirdSection?: {
    items?: {
      slug?: string;
      image?: string;
      firstSection?: { image?: string };
      secondSection?: { items?: ImageItem[] };
      fourthSection?: { items?: ImageItem[] };
    }[];
  };
}

interface SystemDoc {
  slug?: string;
  thumbnail?: string;
  images?: string[];
  firstSection?: { image?: string; thumbnailImage?: string };
  secondSection?: { items?: ImageItem[] };
  fourthSection?: { items?: (ImageItem & { logo?: string })[] };
  fifthSection?: { items?: ImageItem[] };
}

async function getProjectEntries(): Promise<SitemapEntry[]> {
  const doc = await Project.findOne({}).lean<ProjectDoc>();
  return (doc?.projects ?? [])
    .filter((project) => project.slug && !project.isHidden)
    .map((project) => ({
      loc: `${SITE_URL}/case-studies/${project.slug}`,
      images: collectImages([
        project.thumbnail,
        project.firstSection?.coverImage,
        ...(project.images ?? []),
        ...(project.thirdSection?.items ?? []).map((item) => item.image),
      ]),
    }));
}

async function getBlogEntries(): Promise<SitemapEntry[]> {
  const doc = await Blog.findOne({}).lean<BlogDoc>();
  return (doc?.blogs ?? [])
    .filter((blog) => blog.slug && !blog.isHidden)
    .map((blog) => ({
      loc: `${SITE_URL}/blog/${blog.slug}`,
      images: collectImages([blog.thumbnail, blog.coverImage, ...extractImagesFromHtml(blog.content)]),
    }));
}

async function getSolutionEntries(): Promise<SitemapEntry[]> {
  const doc = await Service.findOne({}).lean<ServiceDoc>();
  return (doc?.thirdSection?.items ?? [])
    .filter((item) => item.slug)
    .map((item) => ({
      loc: `${SITE_URL}/solutions/${item.slug}`,
      images: collectImages([
        item.image,
        item.firstSection?.image,
        ...(item.secondSection?.items ?? []).map((entry) => entry.image),
        ...(item.fourthSection?.items ?? []).map((entry) => entry.image),
      ]),
    }));
}

// Individual systems (e.g. /solutions/flood-barriers) live in their own collection.
async function getSystemEntries(): Promise<SitemapEntry[]> {
  const docs = await System.find({}).lean<SystemDoc[]>();
  return docs
    .filter((doc) => doc.slug)
    .map((doc) => ({
      loc: `${SITE_URL}/solutions/${doc.slug}`,
      images: collectImages([
        doc.firstSection?.image,
        doc.firstSection?.thumbnailImage,
        doc.thumbnail,
        ...(doc.images ?? []),
        ...(doc.secondSection?.items ?? []).map((item) => item.image),
        ...(doc.fourthSection?.items ?? []).flatMap((item) => [item.image, item.logo]),
        ...(doc.fifthSection?.items ?? []).map((item) => item.image),
      ]),
    }));
}

export async function GET() {
  try {
    await connectDB();

    const entries = (await Promise.all([getProjectEntries(), getBlogEntries(), getSolutionEntries(), getSystemEntries()]))
      .flat()
      .filter((entry) => entry.images.length > 0);

    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries
  .map(
    (entry) => `<url>
<loc>${escapeXml(entry.loc)}</loc>
${entry.images.map((image) => `<image:image><image:loc>${escapeXml(image)}</image:loc></image:image>`).join("\n")}
</url>`
  )
  .join("\n")}
</urlset>`;

    return new Response(body, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating image sitemap:", error);
    return new Response("Failed to generate image sitemap", { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}
