import ResearchPage from "@/components/page/re-search/ReSearch";
import React from "react";
import { getSeoBySlug, seoToMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const seo = await getSeoBySlug("research");

  return seoToMetadata(seo, {
    title: "Re-Search Page",
    description: "Research articles and ophthalmology studies.",
    keywords: ["re-search"],
  });
}

const ReSearch = () => {
  return (
    <>
      <ResearchPage />
    </>
  );
};

export default ReSearch;
