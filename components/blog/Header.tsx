import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Search } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface HeaderProps {
  categories: string[];
  onSearchClick?: () => void;
}

export function Header({ categories, onSearchClick }: HeaderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams?.get("category");

  const isActive = (path: string, category?: string) => {
    if (category) {
      return currentCategory === category;
    }
    if (path === "/") {
      return pathname === "/" && !currentCategory;
    }
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="content-container-wide">
        <div className="flex h-16 items-center justify-between relative">
          {/* Left: Spacer */}
          <div className="w-20"></div>

          {/* Center: Navigation */}
          <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={cn(
                "text-base transition-colors",
                isActive("/")
                  ? "font-bold text-foreground"
                  : "font-medium text-muted-foreground hover:text-foreground"
              )}
            >
              首页
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/?category=${cat}`}
                className={cn(
                  "text-base transition-colors",
                  isActive("/", cat)
                    ? "font-bold text-foreground"
                    : "font-medium text-muted-foreground hover:text-foreground"
                )}
              >
                {cat}
              </Link>
            ))}
            <Link
              href="/about"
              className={cn(
                "text-base transition-colors",
                isActive("/about")
                  ? "font-bold text-foreground"
                  : "font-medium text-muted-foreground hover:text-foreground"
              )}
            >
              关于
            </Link>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 shrink-0">
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

        {/* Mobile Navigation */}
        <div className="md:hidden py-2 overflow-x-auto no-scrollbar mask-gradient-right flex items-center gap-6">
          <Link
            href="/"
            className={cn(
              "text-sm transition-colors whitespace-nowrap",
              isActive("/")
                ? "font-bold text-foreground"
                : "font-medium text-muted-foreground hover:text-foreground"
            )}
          >
            首页
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/?category=${cat}`}
              className={cn(
                "text-sm transition-colors whitespace-nowrap",
                isActive("/", cat)
                  ? "font-bold text-foreground"
                  : "font-medium text-muted-foreground hover:text-foreground"
              )}
            >
              {cat}
            </Link>
          ))}
          <Link
            href="/about"
            className={cn(
              "text-sm transition-colors whitespace-nowrap",
              isActive("/about")
                ? "font-bold text-foreground"
                : "font-medium text-muted-foreground hover:text-foreground"
            )}
          >
            关于
          </Link>
        </div>
      </div>
    </header>
  );
}