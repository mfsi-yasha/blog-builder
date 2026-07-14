"use server";

import { stack, resolveLocale } from "./client";
import { CsBlogLandingPage } from "@/types/contentstack";

export async function fetchBlogsAction(
  lang: string,
  skip: number,
  limit: number,
  query?: string
): Promise<{ blogs: CsBlogLandingPage[]; totalCount: number }> {
  try {
    const locale = resolveLocale(lang);
    let request: any = stack
      .contentType("blog_landing_page")
      .entry()
      .locale(locale)
      .includeFallback()
      .includeReference(["author"])
      .skip(skip)
      .limit(limit);

    if (query && query.trim() !== "") {
      request = request.query({ title: { $regex: query, $options: "i" } });
    }

    request = request.includeCount();

    const result = await request.find();

    return {
      blogs: (result.entries as CsBlogLandingPage[]) ?? [],
      totalCount: result.count || 0,
    };
  } catch (error) {
    console.error("Failed to fetch blogs in server action:", error);
    return { blogs: [], totalCount: 0 };
  }
}
