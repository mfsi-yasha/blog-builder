import { CsHomepage } from "@/types/contentstack";
import { Renderer } from "../Renderer";

export function HomePage({
  page,
  lang,
}: {
  page: CsHomepage;
  lang: string;
}) {
  return (
    <div className="w-full bg-white" {...(page.$?.title as any)}>
      <Renderer components={page.page_components} lang={lang} />
    </div>
  );
}
