import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ArticleLink {
  slug: string;
  title: string;
}

interface ArticleNavigationProps {
  prev?: ArticleLink;
  next?: ArticleLink;
}

export function ArticleNavigation({ prev, next }: ArticleNavigationProps) {
  return (
    <nav className="flex flex-col sm:flex-row gap-4 mt-12 pt-8">
      {prev ? (
        <Link
          href={`/articles/${prev.slug}`}
          className="flex-1 group p-4 rounded-lg bg-secondary/30 hover:bg-secondary/80 transition-colors"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <ChevronLeft className="h-4 w-4" />
            <span>上一篇</span>
          </div>
          <p className="font-medium group-hover:text-muted-foreground transition-colors line-clamp-1">
            {prev.title}
          </p>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={`/articles/${next.slug}`}
          className="flex-1 group p-4 rounded-lg bg-secondary/30 hover:bg-secondary/80 transition-colors text-right"
        >
          <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mb-1">
            <span>下一篇</span>
            <ChevronRight className="h-4 w-4" />
          </div>
          <p className="font-medium group-hover:text-muted-foreground transition-colors line-clamp-1">
            {next.title}
          </p>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}