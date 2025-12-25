import { ReactNode } from "react";

interface ArticleContentProps {
  children: ReactNode;
}

export function ArticleContent({ children }: ArticleContentProps) {
  return <div className="prose">{children}</div>;
}