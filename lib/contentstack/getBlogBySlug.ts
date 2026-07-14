import { stack, resolveLocale } from "./client";
import { CsBlogLandingPage } from "@/types/contentstack";
import { QueryOperation } from "@contentstack/delivery-sdk";

/** Fetch a single blog post by its URL slug */
export async function getBlogBySlug(
  slug: string,
  lang: string
): Promise<CsBlogLandingPage | null> {
  try {
    const locale = resolveLocale(lang);
    const url = `/blog/${slug}`;
    const result = await stack
      .contentType("blog_landing_page")
      .entry()
      .locale(locale)
      .includeFallback()
      .includeReference(["author", "related_post", "related_post.author"])
      .query()
      .equalTo("url", url)
      .find<CsBlogLandingPage>();

    const entries = result.entries as CsBlogLandingPage[];
    return entries?.[0] ?? null;
  } catch (error) {
    console.error(`Failed to fetch blog post "${slug}":`, error);
    return null;
  }
}
