import { getBlogBySlug } from "@/lib/contentstack/getBlogBySlug";
import { BlogLandingPage as BlogLandingTemplate } from "@/components/contentstack/templates/BlogLandingPage";
import { stack } from "@/lib/contentstack/client";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const blog = await getBlogBySlug(slug, lang);
  return {
    title: blog?.seo?.meta_title ?? blog?.title ?? "Blog Post",
    description: blog?.seo?.meta_description ?? "",
  };
}

export default async function BlogPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string; slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { lang, slug } = await params;
  stack.livePreviewQuery((await searchParams) as any);

  const blog = await getBlogBySlug(slug, lang);

  if (!blog) {
    notFound();
  }

  return <BlogLandingTemplate blog={blog} lang={lang} />;
}
