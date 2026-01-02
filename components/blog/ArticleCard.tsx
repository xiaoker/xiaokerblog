import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import { Article } from "@/lib/articles";

interface ArticleCardProps {
  article: Article;
  className?: string;
}

export function ArticleCard({ article, className }: ArticleCardProps) {
  return (
    <article className={cn("group py-6", className)}>
      <Link href={`/articles/${article.slug}`} className="block space-y-3">
        {/* Title */}
        <h2 className="text-xl font-semibold tracking-tight group-hover:text-muted-foreground transition-colors">
          {article.title}
        </h2>

        {/* Excerpt */}
        <p className="text-muted-foreground leading-relaxed line-clamp-2">
          {article.description}
        </p>

        {/* Meta - Moved to bottom */}
        <div className="flex items-center gap-3 text-sm text-border group-hover:text-muted-foreground transition-colors pt-2">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span>·</span>
          <span>约 {article.readingTime} 分钟阅读</span>
        </div>
      </Link>
    </article>
  );
}