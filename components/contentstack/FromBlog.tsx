import { CsFromBlog } from "@/types/contentstack";
import { BlogCard } from "./BlogCard";

export function FromBlog({
  data,
  lang,
}: {
  data: CsFromBlog;
  lang: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex items-center justify-between">
        {data.title_h2 && (
          <h2 className="text-3xl font-bold tracking-tight">
            {data.title_h2}
          </h2>
        )}
        {data.view_articles?.title && (
          <a
            href={data.view_articles.href}
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            {data.view_articles.title} →
          </a>
        )}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.featured_blogs?.map((blog) => (
          <BlogCard key={blog.uid} blog={blog} lang={lang} />
        ))}
      </div>
    </section>
  );
}
