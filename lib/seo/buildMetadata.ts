// lib/seo/buildMetadata.ts
import type { Metadata } from "next";

interface SeoInput {
  metaTitle: string;
  metaDescription: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage: string;
}

export function buildMetadata(seo: SeoInput, url: string): Metadata {
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    openGraph: {
      title: seo.ogTitle || seo.metaTitle,
      description: seo.ogDescription || seo.metaDescription,
      images: seo.ogImage ? [seo.ogImage] : [],
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.twitterTitle || seo.metaTitle,
      description: seo.twitterDescription || seo.metaDescription,
      images: seo.twitterImage ? [seo.twitterImage] : [],
    },
  };
}