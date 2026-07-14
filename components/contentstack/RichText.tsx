import { CsJsonRte } from "@/types/contentstack";
import { jsonToHTML } from "@contentstack/utils";

export function RichText({ data }: { data: CsJsonRte }) {
  if (!data) return null;

  try {
    let html = "";
    if (typeof data === "object") {
      const entry = { uid: "dummy", rte: data };
      jsonToHTML({
        entry,
        paths: ["rte"],
      });
      html = entry.rte as unknown as string;
    }
    
    if (typeof html !== "string") {
      html = "";
    }

    return (
      <div
        className="prose prose-zinc max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch (error) {
    console.error("Rich text serialization failed:", error);
    return <div>Failed to render content</div>;
  }
}
