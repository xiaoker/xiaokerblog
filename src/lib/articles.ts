import { ComponentType } from "react";

export interface ArticleMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readingTime: string;
}

export interface ArticleData extends ArticleMeta {
  Component: ComponentType;
}

// Article data - add new articles here
const articlesData: ArticleMeta[] = [
  {
    slug: "building-a-personal-blog",
    title: "构建一个属于自己的个人博客",
    date: "2024-12-20",
    excerpt: "在这个信息爆炸的时代，拥有一个属于自己的博客变得越来越重要。本文将分享我构建个人博客的完整思路，从技术选型到内容策略。",
    category: "技术",
    readingTime: "8 分钟",
  },
  {
    slug: "mdx-for-content-creation",
    title: "为什么我选择 MDX 作为内容创作格式",
    date: "2024-12-15",
    excerpt: "MDX 结合了 Markdown 的简洁性和 React 组件的灵活性。在本文中，我将深入探讨 MDX 的优势以及如何在博客中有效使用它。",
    category: "技术",
    readingTime: "6 分钟",
  },
  {
    slug: "minimalist-design-philosophy",
    title: "极简设计的哲学思考",
    date: "2024-12-10",
    excerpt: "Less is more。极简设计不仅仅是一种视觉风格，更是一种对复杂世界的回应方式。本文探讨极简设计背后的哲学思考。",
    category: "设计",
    readingTime: "5 分钟",
  },
  {
    slug: "effective-note-taking",
    title: "高效笔记系统的构建方法",
    date: "2024-12-05",
    excerpt: "好的笔记系统能够帮助我们更好地思考和创作。我将分享自己多年使用各种笔记工具的经验和最终形成的工作流。",
    category: "效率",
    readingTime: "10 分钟",
  },
  {
    slug: "reading-in-digital-age",
    title: "数字时代的阅读与思考",
    date: "2024-11-28",
    excerpt: "当信息获取变得前所未有地容易，我们反而更难进行深度阅读。如何在数字时代保持深度思考的能力？",
    category: "随笔",
    readingTime: "7 分钟",
  },
];

// Lazy load MDX components
const articleComponents: Record<string, () => Promise<{ default: ComponentType }>> = {
  "building-a-personal-blog": () => import("@/content/articles/building-a-personal-blog.mdx"),
  "mdx-for-content-creation": () => import("@/content/articles/mdx-for-content-creation.mdx"),
  "minimalist-design-philosophy": () => import("@/content/articles/minimalist-design-philosophy.mdx"),
  "effective-note-taking": () => import("@/content/articles/effective-note-taking.mdx"),
  "reading-in-digital-age": () => import("@/content/articles/reading-in-digital-age.mdx"),
};

// Get all articles metadata (for listing pages)
export function getAllArticles(): ArticleMeta[] {
  return [...articlesData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get article metadata by slug
export function getArticleMeta(slug: string): ArticleMeta | null {
  return articlesData.find((a) => a.slug === slug) || null;
}

// Get article component loader by slug
export function getArticleLoader(slug: string): (() => Promise<{ default: ComponentType }>) | null {
  return articleComponents[slug] || null;
}

// Get all unique categories
export function getAllCategories(): string[] {
  const categories = new Set(articlesData.map((a) => a.category));
  return Array.from(categories);
}
