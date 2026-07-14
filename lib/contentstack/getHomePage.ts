import { stack, resolveLocale } from "./client";
import { CsHomepage } from "@/types/contentstack";

export async function getHomePage(
  lang: string
): Promise<CsHomepage | null> {
  try {
    const locale = resolveLocale(lang);
    const result = await stack
      .contentType("homepage")
      .entry()
      .locale(locale)
      .includeFallback()
      .includeReference([
        "page_components.hero_banner.hero_banner",
        "page_components.from_blog.featured_blogs",
        "page_components.from_blog.featured_blogs.author",
      ])
      .find<CsHomepage>();

    const entries = result.entries as CsHomepage[];
    return entries?.[0] ?? null;
  } catch (error) {
    console.error("Failed to fetch homepage:", error);
    return null;
  }
}
