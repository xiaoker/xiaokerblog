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
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
      {/* 
               "Focus Layout" Solution:
               Instead of splitting controls between narrow and wide containers (which causes visual fragmentation),
               we unify EVERYTHING into the single 768px content container.
               
               This creates a strong vertical alignment line on both left and right sides of the reading column.
            */}
      <div className="content-container h-16 flex items-center justify-between">

        {/* Left Side: Navigation */}
        <nav className="hidden md:flex items-center gap-6">
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

        {/* Right Side: Action Group (Search + Theme) 
                    Grouped together because they are both "tools". 
                    Keeping them close reduces eye travel distance.
                */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onSearchClick}
            className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-muted-foreground"
            aria-label="搜索"
          >
            <Search className="h-4 w-4" />
          </button>
          {/* Vertical separator for subtle grouping */}
          <div className="h-4 w-[1px] bg-border/60" />
          <ThemeToggle />
        </div>

        {/* Mobile Layout */}
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

      {/* Mobile Navigation Scrollbar - Outside the main flex Row but inside header */}
      <div className="md:hidden border-t border-border/40">
        <div className="content-container py-2 overflow-x-auto no-scrollbar mask-gradient-right flex items-center gap-6">
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