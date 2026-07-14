import contentstack from "@contentstack/delivery-sdk";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

export const isPreview =
  process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === "true";

export const stack = contentstack.stack({
  apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,
  deliveryToken: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN as string,
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string,
  region: (process.env.NEXT_PUBLIC_CONTENTSTACK_REGION as any) || "us",
  live_preview: {
    enable: isPreview,
    preview_token: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN,
    host: "rest-preview.contentstack.com",
  },
});

/**
 * Initialize live preview on the client side.
 * Call this once in a client component (e.g., layout).
 */
export function initLivePreview() {
  if (typeof window === "undefined") return;

  ContentstackLivePreview.init({
    ssr: true,
    enable: isPreview,
    stackDetails: {
      apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,
      environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string,
    },
  });
}

/** Re-export for use in pages that need to listen for entry changes */
export { ContentstackLivePreview };

/** Map route lang param to Contentstack locale code */
export function resolveLocale(lang: string): string {
  const map: Record<string, string> = {
    en: "en-in",
    hi: "hi-in",
  };
  return map[lang] || "en-in";
}
