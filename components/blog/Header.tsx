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
      <div className="content-container-wide relative h-16 flex items-center">

        {/* Desktop Layout */}
        <div className="hidden md:flex w-full h-full items-center justify-center relative">
          {/* Inner Content Container (for Nav & Search alignment) 
                         We use w-full max-w-[var(--content-width)] to match the article lists.
                         Since we are inside a px-6 container, we need to be careful.
                         Actually, content-container has px-6.
                         If we use a div with max-w-[768px] mx-auto, it centers.
                         We remove horizontal padding from this inner block because the outer block technically constraints it on small screens,
                         but on large screens we want it to hit the 768px bounds exactly.
                         
                         Actually, to be pixel perfect with `content-container`:
                         The article list uses `.content-container` which is:
                         max-w: 768px; px-4 md:px-6.
                         So the Actual Content Width is 768 - 48 = 720px (on md).
                         
                         If I use `max-w-[768px]` here, and `justify-between`, the items will touch the 768px edge.
                         But the article list content (text) starts at padding edge (768 - padding).
                         
                         WAIT. "Align with article list".
                         Article List usually means the text/cards. 
                         If the Article List container has padding, the content is inside the padding.
                         So if I want Search to align with the *visible content*, I should also have padding or match the inner width.
                         
                         However, usually "Align with X" implies the container edges.
                         If I use `.content-container` class here (which has padding), then:
                         The `Nav` will start at the left padding edge.
                         The `Search` will end at the right padding edge.
                         This perfectly matches the Article List text/content edges.
                         
                         So I should use `.content-container` centered.
                     */}
          <div className="content-container w-full flex items-center justify-between absolute left-1/2 -translate-x-1/2">
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

            <button
              onClick={onSearchClick}
              className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-muted-foreground -mr-2"
              aria-label="搜索"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>

          {/* Theme Toggle (Absolute Right of Wide Container) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <ThemeToggle />
          </div>
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