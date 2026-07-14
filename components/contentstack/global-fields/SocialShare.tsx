import { CsSocialShare } from "@/types/contentstack";
import Image from "next/image";
import Link from "next/link";

export function SocialShare({
  socialShare,
}: {
  socialShare?: CsSocialShare;
}) {
  if (!socialShare?.social_media_share || socialShare.social_media_share.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 mt-6">
      {socialShare.social_media_share.map((item, index) => {
        if (!item.url?.href || !item.icon?.url) return null;

        return (
          <Link
            key={index}
            href={item.url.href}
            target="_blank"
            rel="noopener noreferrer"
            title={item.title || item.url.title}
            className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 transition-colors hover:bg-zinc-200"
            {...((item as any).$?.url as any)}
          >
            <Image
              src={item.icon.url}
              alt={item.title || "Social icon"}
              width={20}
              height={20}
              className="object-contain opacity-70 transition-opacity group-hover:opacity-100"
            />
          </Link>
        );
      })}
    </div>
  );
}
