import { CsHomepagePageComponent } from "@/types/contentstack";

export function SectionWithHtmlCode({
  data,
}: {
  data: Extract<CsHomepagePageComponent, { section_with_html_code: any }>["section_with_html_code"];
}) {
  const { title, description, html_code, is_html_code_left_aligned_ } = data;

  return (
    <section className="py-24 bg-white" {...((data as any).$?.title as any)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col w-full ${
          is_html_code_left_aligned_ ? "items-start text-left" : "items-center text-center"
        }`}>
          <div className="space-y-8">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl mb-6">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg text-zinc-600 mb-12 max-w-3xl leading-relaxed whitespace-pre-wrap">
                {description}
              </p>
            )}
          </div>
          <div className="w-full overflow-hidden flex justify-center">
            <div className={`w-full ${is_html_code_left_aligned_ ? "text-left" : "text-center"}`}>
              {html_code ? (
                <div 
                  className="w-full"
                  dangerouslySetInnerHTML={{ __html: html_code }} 
                  {...((data as any).$?.html_code as any)}
                />
              ) : (
                <div className="flex h-64 items-center justify-center text-sm text-zinc-400 bg-zinc-50 rounded-2xl border border-zinc-100 w-full max-w-3xl mx-auto">
                  No HTML Code Provided
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
