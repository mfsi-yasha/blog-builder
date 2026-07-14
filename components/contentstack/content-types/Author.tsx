import { CsAuthor } from "@/types/contentstack";
import Image from "next/image";

export function Author({ author }: { author: CsAuthor }) {
  return (
    <div className="flex items-center gap-4" {...(author.$?.title as any)}>
      {author.picture?.url && (
        <Image
          src={author.picture.url}
          alt={author.title}
          width={48}
          height={48}
          className="rounded-full object-cover ring-2 ring-zinc-100"
          {...((author.picture as any).$?.url as any)}
        />
      )}
      <div>
        <div className="font-semibold text-zinc-900">
          {author.title}
        </div>
        {author.bio && (
          <div className="text-sm text-zinc-500" {...(author.$?.bio as any)}>
            {author.bio}
          </div>
        )}
      </div>
    </div>
  );
}
