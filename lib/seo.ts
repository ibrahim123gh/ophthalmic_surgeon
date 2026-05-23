import type { Metadata } from "next";

export type SeoRecord = {
  _id: string;
  slug: string;
  page: string;
  title: string;
  keyWord?: string;
  metaDescription?: string;
  socialImage?: string | null;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.drbachirabiad.com/api/v1";

function getOrigin() {
  try {
    return new URL(API_BASE_URL).origin;
  } catch {
    return "https://api.drbachirabiad.com";
  }
}

function resolveImageUrl(image?: string | null) {
  if (!image) {
    return undefined;
  }

  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  return `${getOrigin()}${image.startsWith("/") ? image : `/${image}`}`;
}

export async function getSeoRecords() {
  const response = await fetch(`${API_BASE_URL}/seo`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  return (await response.json()) as SeoRecord[];
}

export async function getSeoBySlug(slug: string | string[]) {
  const records = await getSeoRecords();
  const slugs = Array.isArray(slug) ? slug : [slug];

  return records.find((record) => slugs.includes(record.slug)) ?? null;
}

export function seoToMetadata(
  seo: SeoRecord | null,
  fallback: {
    title: string;
    description: string;
    keywords?: string[];
  },
): Metadata {
  const title = seo?.title || fallback.title;
  const description = seo?.metaDescription || fallback.description;
  const keywords =
    seo?.keyWord
      ?.split(",")
      .map((value) => value.trim())
      .filter(Boolean) || fallback.keywords;
  const image = resolveImageUrl(seo?.socialImage ?? null);

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
