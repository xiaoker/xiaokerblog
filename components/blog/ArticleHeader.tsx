
import { formatDate } from "@/lib/utils";

interface ArticleHeaderProps {
  title: string;
  date: string;
  category: string;
  readingTime: number;
}

export function ArticleHeader({
  title,
  date,
  category,
  readingTime,
}: ArticleHeaderProps) {
  return (
    <header className="mb-10 pb-8">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
        {title}
      </h1>
      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
        <time dateTime={date}>Published on {formatDate(date)}</time>
        <span>·</span>
        <span>约 {readingTime} 分钟阅读</span>
        <span>·</span>
        <span>{category}</span>
      </div>
    </header>
  );
}