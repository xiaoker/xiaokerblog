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
    <header className="mb-6">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
        {title}
      </h1>
      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
        <time dateTime={date}>Published on {formatDate(date)}</time>
        <span>{category}</span>
      </div>
      
      {cover && (
        <div className="relative aspect-[2.35/1] w-full overflow-hidden rounded-xl mb-8">
          <Image
            src={cover}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
    </header>
  );
}