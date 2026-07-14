import Image from "next/image";
import { CsBucketItem } from "@/types/contentstack";

interface BucketsProps {
  title_h2?: string;
  description?: string;
  buckets?: CsBucketItem[];
}

export function SectionWithBuckets({ data }: { data: BucketsProps }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      {data.title_h2 && (
        <h2 className="mb-3 text-3xl font-bold tracking-tight">
          {data.title_h2}
        </h2>
      )}
      {data.description && (
        <p className="mb-10 max-w-2xl text-zinc-600">
          {data.description}
        </p>
      )}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data.buckets?.map((bucket, idx) => (
          <div key={idx} className="space-y-3">
            {bucket.icon?.url && (
              <Image
                src={bucket.icon.url}
                alt={bucket.title_h3 ?? ""}
                width={48}
                height={48}
              />
            )}
            {bucket.image?.url && (
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={bucket.image.url}
                  alt={bucket.title_h3 ?? ""}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {bucket.title_h3 && (
              <h3 className="text-lg font-semibold">{bucket.title_h3}</h3>
            )}
            {bucket.description && (
              <p className="text-sm text-zinc-600">
                {bucket.description}
              </p>
            )}
            {bucket.call_to_action?.title && (
              <a
                href={bucket.call_to_action.href}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                {bucket.call_to_action.title} →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
