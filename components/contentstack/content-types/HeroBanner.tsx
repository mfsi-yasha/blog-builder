import Image from "next/image";
import { CsHeroBanner } from "@/types/contentstack";

export function HeroBanner({ banner }: { banner: CsHeroBanner }) {
  const align = banner.content_title_alignment?.toLowerCase() ?? "center";
  const textAlign =
    align === "left"
      ? "text-left items-start"
      : align === "right"
        ? "text-right items-end"
        : "text-center items-center";

  return (
    <section className="relative w-full overflow-hidden bg-zinc-50 text-zinc-900">
      {banner.banner_image?.url && (
        <Image
          src={banner.banner_image.url}
          alt={banner.title}
          fill
          className="object-cover opacity-15"
          priority
        />
      )}
      <div
        className={`relative z-10 mx-auto flex max-w-5xl flex-col gap-4 px-6 py-24 ${textAlign}`}
      >
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {banner.title}
        </h1>
        {banner.banner_description && (
          <p className="max-w-2xl text-lg text-zinc-700">
            {banner.banner_description}
          </p>
        )}
        {banner.call_to_action?.title && (
          <a
            href={banner.call_to_action.href}
            className="mt-4 inline-block rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
          >
            {banner.call_to_action.title}
          </a>
        )}
      </div>
    </section>
  );
}
