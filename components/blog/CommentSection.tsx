"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export function CommentSection() {
  const { resolvedTheme } = useTheme();

  return (
    <section className="mt-12">
      <div className="rounded-lg border border-border bg-card p-6 giscus-clean">
        <h3 className="text-xl font-semibold mb-4">评论</h3>
        <Giscus
          id="comments"
          repo={process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}`}
          repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID || ""}
          category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY || ""}
          categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || ""}
          mapping="pathname"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={resolvedTheme === "dark" ? "transparent_dark" : "light"}
          lang="zh-CN"
          loading="lazy"
        />
      </div>
    </section>
  );
}