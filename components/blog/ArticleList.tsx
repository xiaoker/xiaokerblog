import { ArticleCard } from "./ArticleCard";
import { Article } from "@/lib/articles";

interface ArticleListProps {
  articles: Article[];
}

export function ArticleList({ articles }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">暂无文章</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  );
}