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
    <article className={cn("group py-2", className)}>
      <Link href={`/articles/${article.slug}`} className="block">
        {/* Title */}
        <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-3 text-foreground group-hover:text-muted-foreground transition-colors">
          {article.title}
        </h2>

        {/* Excerpt */}
        <p className="text-muted-foreground leading-relaxed mb-3 line-clamp-3">
          {article.description}
        </p>

        {/* Date */}
        <div className="text-sm text-muted-foreground/60 font-medium">
          <time dateTime={article.date}>{article.date}</time>
        </div>
      </Link>
    </article>
  );
}