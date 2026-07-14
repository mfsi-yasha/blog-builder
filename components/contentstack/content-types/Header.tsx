import { CsHeader } from "@/types/contentstack";
import { jsonToHTML } from "@contentstack/utils";
import Image from "next/image";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface HeaderProps {
  header: CsHeader;
  lang: string;
}

export default function Header({ header, lang }: HeaderProps) {
  const { logo, navigation_menu, notification_bar } = header;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md" {...(header.$?.title as any)}>
      {notification_bar?.show_announcement && notification_bar.announcement_text && (
        <div className="bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white shadow-sm">
          <div
            dangerouslySetInnerHTML={{
              __html: (jsonToHTML({
                entry: { uid: header.uid || "dummy", announcement_text: notification_bar.announcement_text },
                paths: ["announcement_text"]
              }) as any).announcement_text as string,
            }}
            className="[&>p]:inline"
          />
        </div>
      )}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={`/${lang}`} className="flex items-center gap-2">
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
            <span className="text-xl font-bold text-zinc-900">Blog Builder</span>
          )}
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8">
            {navigation_menu?.map((navItem, index) => {
              const label = navItem.label || navItem.call_to_action?.title;
              const url = navItem.call_to_action?.href || "#";
              
              return (
                <Link
                  key={index}
                  href={url}
                  target={navItem.open_in_new_tab ? "_blank" : undefined}
                  rel={navItem.open_in_new_tab ? "noopener noreferrer" : undefined}
                  className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
                  {...((navItem as any).$?.label as any)}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="h-4 w-px bg-zinc-300"></div>
          <LanguageSwitcher currentLang={lang} />
        </div>
      </div>
    </header>
  );
}
