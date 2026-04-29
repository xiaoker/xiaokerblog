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
  return (
    <header className="mb-8">
      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-4">
        <time dateTime={date}>{formatDate(date)}</time>
        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">{category}</span>
      </div>
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
        {title}
      </h1>
      
      {cover && (
        <div className="relative aspect-[2.35/1] w-full overflow-hidden rounded-2xl mb-10 shadow-2xl">
          <Image
            src={cover}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            priority
          />
        </div>
      )}
    </header>
  );
}