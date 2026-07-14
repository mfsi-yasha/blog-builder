import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CsFooter } from "@/types/contentstack";
import { jsonToHTML } from "@contentstack/utils";
import { SocialShare } from "../global-fields/SocialShare";

interface FooterProps {
  footer: CsFooter;
  lang: string;
}

export default function Footer({ footer, lang }: FooterProps) {
  const { logo, navigation, social_media, copyright } = footer;

  let copyrightHtml = "";
  if (copyright) {
    const entry = { uid: footer.uid || "dummy", copyright };
    jsonToHTML({ entry, paths: ["copyright"] });
    copyrightHtml = (entry.copyright as unknown as string) || "";
  }

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50" {...(footer.$?.title as any)}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          
          <div className="flex flex-col gap-4 lg:col-span-2">
            <Link href={`/${lang}`}>
              {logo?.url ? (
                <Image
                  src={logo.url}
                  alt={logo.title || "Logo"}
                  width={logo.dimension?.width || 140}
                  height={logo.dimension?.height || 40}
                  className="h-10 w-auto object-contain"
                  {...((logo as any).$?.url as any)}
                />
              ) : (
                <span className="text-2xl font-bold tracking-tight text-zinc-900">Blog Builder</span>
              )}
            </Link>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900">Navigation</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {navigation?.link?.map((navLink, index) => (
                <li key={index}>
                  <Link
                    href={navLink.href || "#"}
                    target={navigation.open_in_new_tab ? "_blank" : undefined}
                    rel={navigation.open_in_new_tab ? "noopener noreferrer" : undefined}
                    className="text-sm text-zinc-600 hover:text-zinc-900"
                  >
                    {navLink.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900">Social</h3>
            <SocialShare socialShare={social_media} />
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-200 pt-8">
          {copyrightHtml && (
            <div
              className="text-center text-sm text-zinc-500 prose-sm prose-zinc mx-auto [&_p]:m-0"
              dangerouslySetInnerHTML={{
                __html: copyrightHtml,
              }}
            />
          )}
        </div>
      </div>
    </footer>
  );
}
