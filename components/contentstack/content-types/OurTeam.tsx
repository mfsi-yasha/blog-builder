import { CsHomepagePageComponent } from "@/types/contentstack";
import Image from "next/image";

export function OurTeam({
  data,
}: {
  data: Extract<CsHomepagePageComponent, { our_team: any }>["our_team"];
}) {
  const teamRef = (data?.our_team as any[])?.[0];
  if (!teamRef) return null;

  return (
    <section className="bg-white py-24" {...(teamRef.$?.title as any)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {teamRef.title && (
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl mb-4">
            {teamRef.title}
          </h2>
        )}
        {teamRef.description && (
          <p className="max-w-2xl mx-auto text-lg text-zinc-600 mb-16 whitespace-pre-wrap">
            {teamRef.description}
          </p>
        )}

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {teamRef.employees?.map((emp: any, index: number) => (
            <div key={index} className="flex flex-col items-center group">
              {emp.image?.url ? (
                <div className="relative h-48 w-48 overflow-hidden rounded-full mb-6 ring-4 ring-zinc-100 transition-transform group-hover:scale-105 duration-300">
                  <Image
                    src={emp.image.url}
                    alt={emp.name || "Employee"}
                    fill
                    className="object-cover"
                    {...((emp.image as any).$?.url as any)}
                  />
                </div>
              ) : (
                <div className="h-48 w-48 rounded-full mb-6 bg-zinc-200 flex items-center justify-center text-4xl text-zinc-400">
                  {emp.name?.[0] || "?"}
                </div>
              )}
              <h3 className="text-xl font-semibold text-zinc-900" {...(emp.$?.name as any)}>
                {emp.name}
              </h3>
              <p className="text-indigo-600 font-medium mb-3" {...(emp.$?.designation as any)}>
                {emp.designation}
              </p>
              {emp.short_description && (
                <p className="text-sm text-zinc-500 max-w-xs text-center leading-relaxed" {...(emp.$?.short_description as any)}>
                  {emp.short_description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
