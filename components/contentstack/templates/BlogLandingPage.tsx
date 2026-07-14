import { CsBlogLandingPage } from "@/types/contentstack";
import Image from "next/image";
import { RichText } from "../RichText";
import { BlogCard } from "../BlogCard";
import { Author } from "../content-types/Author";
import { SocialShare } from "../global-fields/SocialShare";

export function BlogLandingPage({
  blog,
  lang,
}: {
  blog: CsBlogLandingPage;
  lang: string;
}) {
  const author = blog.author?.[0];
  const date = blog.date
    ? new Date(blog.date).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <article className="mx-auto max-w-4xl px-6 py-16 bg-white" {...(blog.$?.title as any)}>
      <header className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="mb-8 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl text-zinc-900">
          {blog.title}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-6 text-zinc-500">
          {blog.is_archived && (
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-800" {...(blog.$?.is_archived as any)}>
              Archived
            </span>
          )}
          {author && <Author author={author} />}
          {date && (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block">•</span>
              <time className="font-medium" {...(blog.$?.date as any)}>{date}</time>
            </div>
          )}
        </div>
      </header>

      {blog.featured_image?.url && (
        <div className="relative mb-16 aspect-[21/9] w-full overflow-hidden rounded-3xl bg-zinc-100 shadow-xl border border-zinc-200/50">
          <Image
            src={blog.featured_image.url}
            alt={blog.title}
            fill
            className="object-cover"
            priority
            {...((blog.featured_image as any).$?.url as any)}
          />
        </div>
      )}

      <div className="mx-auto max-w-3xl prose prose-lg prose-zinc">
        {blog.body && <RichText data={blog.body} />}
      </div>

      <div className="mx-auto max-w-3xl mt-12">
        <SocialShare socialShare={blog.social_share} />
      </div>

      {blog.comments && (blog.comments.comment || blog.comments.call_to_action) && (
        <div className="mx-auto max-w-3xl mt-16 rounded-2xl bg-zinc-50 p-8 text-center" {...((blog.comments as any).$ as any)}>
          <form className="mx-auto flex max-w-lg flex-col gap-4">
            <textarea
              className="w-full resize-none rounded-md border border-zinc-300 p-4 text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
              rows={4}
              placeholder={blog.comments.comment || "Leave a comment..."}
              {...((blog.comments as any).$?.comment as any)}
            />
            {blog.comments.call_to_action && (
              <button
                type="button"
                className="self-end rounded-full bg-zinc-900 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
                {...((blog.comments.call_to_action as any).$ as any)}
              >
                {blog.comments.call_to_action.title}
              </button>
            )}
          </form>
        </div>
      )}

      {blog.related_post && blog.related_post.length > 0 && (
        <div className="mx-auto max-w-4xl mt-24 border-t border-zinc-200 pt-16">
          <h3 className="mb-10 text-3xl font-bold tracking-tight text-zinc-900">
            Related Posts
          </h3>
          <div className="grid gap-8 sm:grid-cols-2">
            {blog.related_post.map((related) => (
              <BlogCard key={related.uid} blog={related} lang={lang} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
