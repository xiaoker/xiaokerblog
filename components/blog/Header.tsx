"use client";

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
      {/* Outer Wide Container (for Theme Toggle alignment) */}
      <div className="content-container-wide relative h-16 flex items-center justify-center">

        {/* Desktop Layout - Inner Content Container (for Nav & Search alignment) 
                    Uses standard centering (mx-auto from content-container) to match the article column exactly.
                */}
        <div className="hidden md:flex content-container w-full items-center justify-between">
          <nav className="flex items-center gap-6">
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

          {/* Search: Right aligned in content container. -mr-2 pulls icon visually to edge. */}
          <button
            onClick={onSearchClick}
            className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-muted-foreground -mr-2"
            aria-label="搜索"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>

        {/* Theme Toggle (Absolute Right of Wide Container, respecting padding manually) */}
        <div className="hidden md:flex absolute right-4 md:right-6 top-1/2 -translate-y-1/2">
          <ThemeToggle />
        </div>

        {/* Mobile Layout (unchanged logic) */}
        <div className="md:hidden w-full flex items-center justify-between">
          <span className="font-bold">xiaoker</span>
          <div className="flex items-center gap-2">
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

      {/* Mobile Navigation Scrollbar */}
      <div className="md:hidden py-2 overflow-x-auto no-scrollbar mask-gradient-right flex items-center gap-6 content-container">
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
    </header>
  );
}