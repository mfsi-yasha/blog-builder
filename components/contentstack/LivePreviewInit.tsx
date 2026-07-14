"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { initLivePreview, ContentstackLivePreview } from "@/lib/contentstack/client";

export default function LivePreviewInit() {
  const router = useRouter();

  useEffect(() => {
    initLivePreview();

    ContentstackLivePreview.onEntryChange(() => {
      router.refresh();
    });
  }, [router]);

  return null;
}
