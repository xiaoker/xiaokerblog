"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export function CommentSection() {
  const { theme } = useTheme();

  return (
    <section className="mt-16 pt-8 border-t border-border">
      <h3 className="text-xl font-semibold mb-6">评论</h3>
      <Giscus
        id="comments"
        repo="xiaoker/xiaokerblog"
        repoId="R_kgDOQvKniw"
        category="Announcements"
        categoryId="DIC_kwDOQvKni84C0Qq9"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === "dark" ? "transparent_dark" : "light"}
        lang="zh-CN"
        loading="lazy"
      />
    </section>
  );
}