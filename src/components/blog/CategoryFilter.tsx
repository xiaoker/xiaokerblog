import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onCategoryChange(null)}
        className={cn(
          "px-3 py-1.5 text-sm rounded-full transition-colors",
          activeCategory === null
            ? "bg-foreground text-background"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        )}
      >
        全部
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "px-3 py-1.5 text-sm rounded-full transition-colors",
            activeCategory === category
              ? "bg-foreground text-background"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}