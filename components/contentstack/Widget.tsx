import { CsHomepagePageComponent } from "@/types/contentstack";

export function Widget({
  data,
}: {
  data: Extract<CsHomepagePageComponent, { widget: any }>["widget"];
}) {
  if (!data) return null;

  return (
    <section className="py-16 bg-white" {...((data as any).$?.title_h2 as any)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {data.title_h2 && (
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mb-8">
            {data.title_h2}
          </h2>
        )}
        <div className="p-8 rounded-2xl bg-zinc-50 border border-zinc-100 flex flex-col items-center justify-center">
          <p className="text-zinc-500 font-medium">
            Widget Type: <span className="text-zinc-900">{data.type || "Unknown"}</span>
          </p>
          <p className="text-sm text-zinc-400 mt-2">
            (Widget logic for Blog Archive / Related Posts goes here)
          </p>
        </div>
      </div>
    </section>
  );
}
