"use client";

import { fetchBlogsAction } from "@/lib/contentstack/actions";
import { CsBlogLandingPage, CsBlogListingPage } from "@/types/contentstack";
import Link from "next/link";
import { useState, useTransition } from "react";
import { BlogCard } from "../BlogCard";
import { Renderer } from "../Renderer";

export function BlogListingPage({
  page,
  blogs: initialBlogs,
  lang,
}: {
  page: CsBlogListingPage;
  blogs: CsBlogLandingPage[];
  lang: string;
}) {
  const [blogs, setBlogs] = useState<CsBlogLandingPage[]>(initialBlogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasMore, setHasMore] = useState(initialBlogs.length === 6);
  const [isPending, startTransition] = useTransition();

  const fromBlogComponent = page.page_components?.find(
    (comp) => "from_blog" in comp
  );
  const fromBlogData = fromBlogComponent && "from_blog" in fromBlogComponent 
    ? fromBlogComponent.from_blog 
    : null;

  const filteredComponents = page.page_components?.filter(
    (comp) => !("from_blog" in comp)
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const { blogs: newBlogs, totalCount } = await fetchBlogsAction(lang, 0, 6, searchQuery);
      setBlogs(newBlogs);
      setHasMore(newBlogs.length < totalCount);
    });
  };

  const handleLoadMore = () => {
    startTransition(async () => {
      const { blogs: moreBlogs, totalCount } = await fetchBlogsAction(
        lang,
        blogs.length,
        6,
        searchQuery
      );
      const updatedBlogs = [...blogs, ...moreBlogs];
      setBlogs(updatedBlogs);
      setHasMore(updatedBlogs.length < totalCount);
    });
  };

  return (
    <div className="w-full bg-white" {...(page.$?.title as any)}>
      <Renderer components={filteredComponents as any} lang={lang} />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-4xl font-bold tracking-tight text-zinc-900 text-left">
          {fromBlogData?.title_h2 || "All Posts"}
        </h2>

        {page.search && (
          <form onSubmit={handleSearch} className="mb-12 flex max-w-lg gap-4" {...((page.search as any).$ as any)}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={page.search.placeholder_text || "Search blogs..."}
              className="flex-1 rounded-md border border-zinc-300 px-4 py-2 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
              {...((page.search as any).$?.placeholder_text as any)}
            />
            <button
              type="submit"
              disabled={isPending}
              className="rounded-md bg-zinc-900 px-6 py-2 text-white font-medium hover:bg-zinc-800 disabled:opacity-50"
              {...((page.search.search_button as any)?.$ as any)}
            >
              {isPending ? "Searching..." : page.search.search_button?.title || "Search"}
            </button>
          </form>
        )}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {blogs.map((blog) => (
            <BlogCard key={blog.uid} blog={blog} lang={lang} />
          ))}
          {blogs.length === 0 && !isPending && (
            <div className="col-span-full py-12 text-center text-zinc-500 text-lg">
              No posts found.
            </div>
          )}
        </div>
        
        {hasMore && (
          <div className="flex justify-center mb-16">
            <button
              onClick={handleLoadMore}
              disabled={isPending}
              className="rounded-full bg-zinc-900 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 disabled:opacity-50"
            >
              {isPending ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>

      <div className="bg-zinc-50">
        {fromBlogData?.featured_blogs && fromBlogData.featured_blogs.length > 0 && (
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-zinc-100 flex flex-col items-start text-left">
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 mb-6">
              Featured Posts
            </h3>
            <ul className="flex flex-col gap-4 w-full">
              {fromBlogData.featured_blogs.map((featuredBlog) => (
                <li key={featuredBlog.uid} className="w-full">
                  <Link
                    href={`/${lang}/blog${featuredBlog.url}`}
                    className="text-lg font-medium text-blue-600 hover:underline inline-block"
                    {...(featuredBlog.$?.title as any)}
                  >
                    {featuredBlog.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
