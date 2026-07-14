import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

async function exitPreview() {
  "use server";
  const draft = await draftMode();
  draft.disable();
  redirect("/");
}

export async function PreviewBanner() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;

  return (
    <aside
      role="status"
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-amber-500 px-6 py-2 text-sm font-semibold text-black shadow-lg"
    >
      Preview Mode{" "}
      <form action={exitPreview} className="inline">
        <button
          type="submit"
          className="ml-2 underline hover:no-underline"
        >
          Exit
        </button>
      </form>
    </aside>
  );
}
