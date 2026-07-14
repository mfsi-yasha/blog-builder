import { getBlogListingPage, getBlogs } from "@/lib/contentstack/getBlogs";
import { BlogListingPage as BlogListingTemplate } from "@/components/contentstack/templates/BlogListingPage";
import { stack } from "@/lib/contentstack/client";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const page = await getBlogListingPage(lang);
  return {
    title: page?.seo?.meta_title ?? page?.title ?? "Blog",
    description: page?.seo?.meta_description ?? "",
  };
}

export default async function BlogListingPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { lang } = await params;
  stack.livePreviewQuery((await searchParams) as any);

  const [page, blogs] = await Promise.all([
    getBlogListingPage(lang),
    getBlogs(lang),
  ]);

  if (!page) {
    notFound();
  }

  return <BlogListingTemplate page={page} blogs={blogs} lang={lang} />;
}
