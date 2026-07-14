import { ReactNode } from "react";
import { getHeader, getFooter } from "@/lib/contentstack/getLayout";
import Header from "@/components/contentstack/content-types/Header";
import Footer from "@/components/contentstack/content-types/Footer";
import LivePreviewInit from "@/components/contentstack/LivePreviewInit";

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const [header, footer] = await Promise.all([
    getHeader(lang),
    getFooter(lang),
  ]);

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <LivePreviewInit />
      {header && <Header header={header} lang={lang} />}
      <main className="flex-1">{children}</main>
      {footer && <Footer footer={footer} lang={lang} />}
    </div>
  );
}
