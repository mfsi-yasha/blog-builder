"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const pathname = usePathname();
  const targetLang = currentLang === "en" ? "hi" : "en";
  const targetLabel = currentLang === "en" ? "हिन्दी" : "English";

  const targetUrl = pathname.replace(
    new RegExp(`^/${currentLang}(/|$)`),
    `/${targetLang}$1`
  );

  return (
    <Link
      href={targetUrl}
      className="rounded-full border border-zinc-300 bg-white px-4 py-1.5 text-sm font-semibold text-zinc-900 shadow-sm transition-colors hover:bg-zinc-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
    >
      {targetLabel}
    </Link>
  );
}
