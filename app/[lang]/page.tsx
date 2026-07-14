import { getHomePage } from "@/lib/contentstack/getHomePage";
import { HomePage } from "@/components/contentstack/templates/HomePage";
import { stack } from "@/lib/contentstack/client";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const page = await getHomePage(lang);
  return {
    title: page?.seo?.meta_title ?? page?.title ?? "Home",
    description: page?.seo?.meta_description ?? "",
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { lang } = await params;

  stack.livePreviewQuery((await searchParams) as any);

  const page = await getHomePage(lang);

  if (!page) {
    notFound();
  }

  return <HomePage page={page} lang={lang} />;
}
