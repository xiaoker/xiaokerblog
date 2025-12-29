import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Search } from "lucide-react";

interface HeaderProps {
  categories: string[];
  onSearchClick?: () => void;
}

export function Header({ categories, onSearchClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="content-container-wide">
        <div className="flex h-16 items-center justify-between">
          {/* Brand / Home Link */}
          <Link href="/" className="font-bold text-xl tracking-tight text-foreground/90 hover:text-foreground transition-colors">
            xiaoker
          </Link>

          <div className="flex items-center gap-8">
            {/* Navigation */}
            <nav className="flex items-center gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/?category=${cat}`}
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {cat}
                </Link>
              ))}
              <Link href="/about" className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors">
                关于
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 pl-2 border-l border-border/50">
              <button
                onClick={onSearchClick}
                className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="搜索"
              >
                <Search className="h-4 w-4" />
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}