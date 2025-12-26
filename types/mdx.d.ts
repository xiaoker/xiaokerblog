declare module "*.mdx" {
  import type { ComponentType } from "react";

  export const frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    category: string;
    readingTime: string;
    slug?: string;
  };

  const MDXComponent: ComponentType;
  export default MDXComponent;
}
