import Image from "next/image";
import { CsAsset, CsLink } from "@/types/contentstack";

interface SectionProps {
  title_h2?: string;
  description?: string;
  call_to_action?: CsLink;
  image?: CsAsset;
  is_image_right_aligned?: boolean;
}

export function Section({ data }: { data: SectionProps }) {
  const imageRight = data.is_image_right_aligned !== false;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div
        className={`flex flex-col items-center gap-10 md:flex-row ${imageRight ? "" : "md:flex-row-reverse"}`}
      >
        <div className="flex-1 space-y-4">
          {data.title_h2 && (
            <h2 className="text-3xl font-bold tracking-tight">
              {data.title_h2}
            </h2>
          )}
          {data.description && (
            <p className="text-zinc-600">
              {data.description}
            </p>
          )}
          {data.call_to_action?.title && (
            <a
              href={data.call_to_action.href}
              className="inline-block text-sm font-semibold text-blue-600 hover:underline"
            >
              {data.call_to_action.title} →
            </a>
          )}
        </div>
        {data.image?.url && (
          <div className="relative aspect-video w-full flex-1 overflow-hidden rounded-xl">
            <Image
              src={data.image.url}
              alt={data.title_h2 ?? "Section image"}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
