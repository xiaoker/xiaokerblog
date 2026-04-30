import { formatDate } from "@/lib/utils";
import Image from "next/image";

interface ArticleHeaderProps {
  title: string;
  date: string;
  category: string;
  cover?: string;
}

export function ArticleHeader({
  title,
  date,
  category,
  cover,
}: ArticleHeaderProps) {
  // Use .jpg for the display cover if it's the specific generated one
  const displayCover = cover?.replace(".png", ".jpg");

  return (
    <header className="mb-6">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
        {title}
      </h1>
      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
        <time dateTime={date}>Published on {formatDate(date)}</time>
        <span>{category}</span>
      </div>
      
      {displayCover && (
        <div className="relative w-full overflow-hidden rounded-xl mb-8 bg-zinc-900 shadow-lg">
          <img
            src={`https://xiaoker.com${displayCover}`}
            alt={title}
            className="w-full h-auto block transition-opacity duration-700 ease-in-out"
            loading="eager"
            itemProp="image"
          />
        </div>
      )}
    </header>
  );
}