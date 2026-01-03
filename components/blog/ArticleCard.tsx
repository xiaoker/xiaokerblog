import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface Article {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
}

interface ArticleCardProps {
  article: Article;
  className?: string;
}

export function ArticleCard({ article, className }: ArticleCardProps) {
  return (
    <Link href={`/articles/${article.slug}`}>
      <article className={cn("group relative py-6 transition-all duration-200 hover:translate-x-1", className)}>
        {/* Left accent line */}
        <div className="absolute left-0 top-0 h-full w-0.5 bg-primary scale-y-0 transition-transform duration-200 group-hover:scale-y-100" />

        <div className="pl-4">
          {/* Date - visually de-emphasized */}
          <time className="text-xs text-muted-foreground mb-1 block" dateTime={article.date}>
            {formatDate(article.date)}
          </time>

          {/* Title */}
          <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {article.title}
          </h2>

          {/* Excerpt - slightly muted */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {article.description}
          </p>

          {/* Category badge */}
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {article.category}
            </Badge>
          </div>
        </div>
      </article>
    </Link>
  );
}