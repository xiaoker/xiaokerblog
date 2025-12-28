import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractHeadings(content: string) {
  const regex = /^(#{2,3})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2];
    // Simple ID generation: lowercase, remove special chars, replace spaces with hyphens
    const id = text
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5\s-]/g, "") // Keep Chinese chars, alphanum, spaces, hyphens
      .trim()
      .replace(/\s+/g, "-");

    headings.push({ id, text, level });
  }

  return headings;
}
