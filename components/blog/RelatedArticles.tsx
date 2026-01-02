import Link from "next/link";
import { Article } from "@/lib/articles";

interface RelatedArticlesProps {
  articles: Article[];
  currentSlug: string;
}

export function RelatedArticles({ articles, currentSlug }: RelatedArticlesProps) {
  const currentArticle = articles.find((a) => a.slug === currentSlug);
  if (!currentArticle) return null;

  // 计算文章相关性得分
  const scoredArticles = articles
    .filter((a) => a.slug !== currentSlug)
    .map((article) => {
      let score = 0;

      // 1. 分类匹配（权重：3分）
      if (article.category === currentArticle.category) {
        score += 3;
      }

      // 2. 标签匹配（权重：每个匹配的标签 2分）
      if (currentArticle.tags && article.tags) {
        const matchingTags = article.tags.filter((tag) =>
          currentArticle.tags?.includes(tag)
        );
        score += matchingTags.length * 2;
      }

      // 3. 时间相近性（权重：最多 1分）
      const currentDate = new Date(currentArticle.date).getTime();
      const articleDate = new Date(article.date).getTime();
      const daysDiff = Math.abs(currentDate - articleDate) / (1000 * 60 * 60 * 24);

      // 30天内的文章得分更高
      if (daysDiff < 30) {
        score += 1;
      } else if (daysDiff < 90) {
        score += 0.5;
      }

      return { article, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (scoredArticles.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-8 border-t">
      <h2 className="text-lg font-semibold mb-4">相关文章</h2>
      <ul className="space-y-4">
        {scoredArticles.map(({ article }) => (
          <li key={article.slug}>
            <Link
              href={`/articles/${article.slug}`}
              className="group block space-y-1 hover:bg-accent/50 -mx-2 px-2 py-2 rounded-md transition-colors"
            >
              <h3 className="font-medium group-hover:text-foreground transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {article.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
