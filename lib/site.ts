const DEFAULT_SITE_URL = "https://api.drbachirabiad.com/api/v1";

export function getSiteUrl() {
  const rawSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : DEFAULT_SITE_URL);

  try {
    return new URL(rawSiteUrl).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}
