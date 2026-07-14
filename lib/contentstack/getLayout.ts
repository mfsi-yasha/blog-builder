import { resolveLocale, stack } from "./client";
import { CsHeader, CsFooter } from "../../types/contentstack";

export async function getHeader(lang: string): Promise<CsHeader | null> {
  const locale = resolveLocale(lang);
  try {
    const result = await stack
      .contentType("header")
      .entry()
      .locale(locale)
      .includeFallback()
      .find<CsHeader>();

    return result.entries?.[0] || null;
  } catch (error) {
    console.error("Failed to fetch header:", error);
    return null;
  }
}

export async function getFooter(lang: string): Promise<CsFooter | null> {
  const locale = resolveLocale(lang);
  try {
    const result = await stack
      .contentType("footer")
      .entry()
      .locale(locale)
      .includeFallback()
      .find<CsFooter>();

    return result.entries?.[0] || null;
  } catch (error) {
    console.error("Failed to fetch footer:", error);
    return null;
  }
}
