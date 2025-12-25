import { Link } from "react-router-dom";
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
    <nav className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-border">
      {prev ? (
        <Link
          to={`/article/${prev.slug}`}
          className="flex-1 group p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
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
          to={`/article/${next.slug}`}
          className="flex-1 group p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors text-right"
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