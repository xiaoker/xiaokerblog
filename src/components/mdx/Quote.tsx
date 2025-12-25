import { ReactNode } from "react";

interface QuoteProps {
  children: ReactNode;
  author?: string;
  source?: string;
}

export function Quote({ children, author, source }: QuoteProps) {
  return (
    <figure className="my-8 border-l-4 border-prose-quote-border pl-6">
      <blockquote className="text-lg italic">{children}</blockquote>
      {(author || source) && (
        <figcaption className="mt-3 text-sm text-muted-foreground">
          {author && <span className="font-medium">— {author}</span>}
          {source && <cite className="ml-2">《{source}》</cite>}
        </figcaption>
      )}
    </figure>
  );
}