import type { Metadata } from "next";
import VideoGalleryPage from "@/components/page/videos/VideoGalleryPage";
import { getSeoBySlug, seoToMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoBySlug(["video", "videos"]);

  return seoToMetadata(seo, {
    title: "Video Page",
    description: "A polished look at the clinic, the care, and the patient journey.",
    keywords: ["video", "cideo"],
  });
}

export default function VideosPage() {
  return <VideoGalleryPage />;
}
