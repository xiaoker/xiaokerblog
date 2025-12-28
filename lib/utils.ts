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
