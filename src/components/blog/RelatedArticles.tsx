import { Link } from "react-router-dom";
import { Article } from "./index";

interface RelatedArticlesProps {
  articles: Article[];
  currentSlug: string;
}

export function RelatedArticles({ articles, currentSlug }: RelatedArticlesProps) {
  // Filter out current article and get up to 3 related articles
  const relatedArticles = articles
    .filter((a) => a.slug !== currentSlug)
    .slice(0, 3);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h2 className="text-lg font-semibold mb-6">关联阅读</h2>
      <div className="grid gap-4">
        {relatedArticles.map((article) => (
          <Link
            key={article.slug}
            to={`/article/${article.slug}`}
            className="group block p-4 -mx-4 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {article.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {article.excerpt}
                </p>
              </div>
              <div className="shrink-0 text-xs text-muted-foreground">
                {article.readingTime}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
