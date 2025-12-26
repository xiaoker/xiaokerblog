import { Clock, Calendar, Folder } from "lucide-react";

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
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <time dateTime={date}>{date}</time>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          <span>{readingTime}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Folder className="h-4 w-4" />
          <span>{category}</span>
        </div>
      </div>
    </header>
  );
}