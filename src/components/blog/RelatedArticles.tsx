import { Link } from "react-router-dom";
import { Article } from "./index";

interface RelatedArticlesProps {
  articles: Article[];
  currentSlug: string;
}

export function RelatedArticles({ articles, currentSlug }: RelatedArticlesProps) {
  const relatedArticles = articles
    .filter((a) => a.slug !== currentSlug)
    .slice(0, 3);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h2 className="text-lg font-semibold mb-4">关联阅读</h2>
      <ul className="space-y-2">
        {relatedArticles.map((article) => (
          <li key={article.slug}>
            <Link
              to={`/article/${article.slug}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
