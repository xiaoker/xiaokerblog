import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import GithubSlugger from 'github-slugger'

export function extractHeadings(content: string) {
  const regex = /^(#{2,3})\s+(.+)$/gm;
  const headings = [];
  const slugger = new GithubSlugger();
  let match;

  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = slugger.slug(text);

    headings.push({ id, text, level });
  }

  return headings;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return dateString;
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

/**
 * 计算文章阅读时间
 * @param content 文章内容（Markdown 格式）
 * @returns 阅读时间（分钟）
 */
export function calculateReadingTime(content: string): number {
  // 移除 Markdown 语法
  const plainText = content
    .replace(/^---[\s\S]*?---/m, '') // 移除 frontmatter
    .replace(/```[\s\S]*?```/g, '') // 移除代码块
    .replace(/`[^`]*`/g, '') // 移除行内代码
    .replace(/!\[.*?\]\(.*?\)/g, '') // 移除图片
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // 移除链接，保留文字
    .replace(/#{1,6}\s/g, '') // 移除标题标记
    .replace(/[*_~]/g, '') // 移除强调标记
    .replace(/>\s/g, '') // 移除引用标记
    .replace(/[-*+]\s/g, '') // 移除列表标记
    .replace(/\d+\.\s/g, ''); // 移除有序列表标记

  // 统计中文字符数
  const chineseChars = plainText.match(/[\u4e00-\u9fa5]/g) || [];
  const chineseCount = chineseChars.length;

  // 统计英文单词数
  const englishWords = plainText
    .replace(/[\u4e00-\u9fa5]/g, '') // 移除中文
    .match(/\b[a-zA-Z]+\b/g) || [];
  const englishCount = englishWords.length;

  // 计算阅读时间
  // 中文：350字/分钟，英文：200词/分钟
  const chineseMinutes = chineseCount / 350;
  const englishMinutes = englishCount / 200;
  const totalMinutes = Math.ceil(chineseMinutes + englishMinutes);

  // 至少1分钟
  return Math.max(1, totalMinutes);
}
