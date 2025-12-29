import Link from "next/link";
import { cn } from "@/lib/utils";

export interface Article {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  readTime: string;
}

interface ArticleCardProps {
  article: Article;
  className?: string;
}

export function ArticleCard({ article, className }: ArticleCardProps) {
  return (
    <article className={cn("group py-6", className)}>
      <Link href={`/articles/${article.slug}`} className="block space-y-3">
        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <time dateTime={article.date}>{article.date}</time>
          <span>·</span>
          <span>{article.readTime}</span>
          <span>·</span>
          <span className="text-foreground/70">{article.category}</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold tracking-tight group-hover:text-muted-foreground transition-colors">
          {article.title}
        </h2>

        {/* Excerpt */}
        <p className="text-muted-foreground leading-relaxed line-clamp-3">
          {article.description}
        </p>
      </Link>
    </article>
  );
}