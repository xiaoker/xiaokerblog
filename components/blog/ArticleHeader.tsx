

interface ArticleHeaderProps {
  title: string;
  date: string;
  readingTime: string;
  category: string;
}

export function ArticleHeader({
  title,
  date,
  readingTime,
  category,
}: ArticleHeaderProps) {
  return (
    <header className="mb-10 pb-8 border-b border-border">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
        {title}
      </h1>
      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
        <time dateTime={date}>{date}</time>
        <span>{readingTime}</span>
        <span>{category}</span>
      </div>
    </header>
  );
}