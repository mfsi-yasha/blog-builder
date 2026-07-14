import { stack, resolveLocale } from "./client";
import { CsBlogLandingPage, CsBlogListingPage } from "@/types/contentstack";

/** Fetch all blog posts for the listing page */
export async function getBlogs(
  lang: string,
  skip: number = 0,
  limit: number = 6
): Promise<CsBlogLandingPage[]> {
  try {
    const locale = resolveLocale(lang);
    const request = stack
      .contentType("blog_landing_page")
      .entry()
      .locale(locale)
      .includeFallback()
      .includeReference(["author"])
      .skip(skip)
      .limit(limit);

    const result = await request.find();

    return (result.entries as CsBlogLandingPage[]) ?? [];
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
}

/** Fetch the blog listing page entry (for hero/metadata) */
export async function getBlogListingPage(
  lang: string
): Promise<CsBlogListingPage | null> {
  try {
    const locale = resolveLocale(lang);
    const result = await stack
      .contentType("blog_listing_page")
      .entry()
      .locale(locale)
      .includeFallback()
      .includeReference([
        "page_components.hero_banner.hero_banner",
        "page_components.from_blog.featured_blogs",
      ])
      .find<CsBlogListingPage>();

    const entries = result.entries as CsBlogListingPage[];
    return entries?.[0] ?? null;
  } catch (error) {
    console.error("Failed to fetch blog listing page:", error);
    return null;
  }
}
