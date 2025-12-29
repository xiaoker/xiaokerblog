import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Search } from "lucide-react";

interface HeaderProps {
  categories: string[];
  onSearchClick?: () => void;
}

export function Header({ categories, onSearchClick }: HeaderProps) {
  const navItems = [
    { label: "首页", href: "/" },
    ...categories.map(cat => ({ label: cat, href: `/?category=${cat}` })),
    { label: "关于", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="content-container-wide">
        <div className="flex h-12 items-center justify-between">
          {/* Navigation */}
          <nav className="flex items-center gap-6 overflow-x-auto no-scrollbar mask-gradient-right">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0 ml-4">
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
    </header>
  );
}