import Image from "next/image";
import Link from "next/link";
import { CsBlogLandingPage } from "@/types/contentstack";

export function BlogCard({
  blog,
  lang,
}: {
  blog: CsBlogLandingPage;
  lang: string;
}) {
  const slug = blog.url?.replace(/^\/blog\//, "") ?? blog.uid;
  const author = blog.author?.[0];
  const date = blog.date
    ? new Date(blog.date).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <Link
      href={`/${lang}/blog/${slug}`}
      className="group overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      {blog.featured_image?.url && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={blog.featured_image.url}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="space-y-2 p-5">
        <h3 className="text-lg font-semibold leading-snug group-hover:text-blue-600">
          {blog.title}
        </h3>
        <div className="flex items-center gap-3 text-sm text-zinc-500">
          {author && (
            <div className="flex items-center gap-2">
              {author.picture?.url && (
                <Image
                  src={author.picture.url}
                  alt={author.title}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <span>{author.title}</span>
            </div>
          )}
          {date && <time>{date}</time>}
        </div>
      </div>
    </Link>
  );
}
