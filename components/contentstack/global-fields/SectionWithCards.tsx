import Image from "next/image";
import { CsCardItem } from "@/types/contentstack";

interface CardsProps {
  section_title?: string;
  section_description?: string;
  cards?: CsCardItem[];
}

export function SectionWithCards({ data }: { data: CardsProps }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      {data.section_title && (
        <h2 className="mb-3 text-3xl font-bold tracking-tight">
          {data.section_title}
        </h2>
      )}
      {data.section_description && (
        <p className="mb-10 max-w-2xl text-zinc-600">
          {data.section_description}
        </p>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.cards?.map((card, idx) => (
          <div
            key={idx}
            className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            {card.image?.url && (
              <div className="relative aspect-video">
                <Image
                  src={card.image.url}
                  alt={card.card_title_h3 ?? ""}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="space-y-2 p-5">
              {card.card_title_h3 && (
                <h3 className="text-lg font-semibold">{card.card_title_h3}</h3>
              )}
              {card.description && (
                <p className="text-sm text-zinc-600">
                  {card.description}
                </p>
              )}
              {card.call_to_action?.title && (
                <a
                  href={card.call_to_action.href}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  {card.call_to_action.title} →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
