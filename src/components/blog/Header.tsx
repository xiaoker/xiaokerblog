import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { label: "首页", href: "/", emoji: "🏠" },
  { label: "文章", href: "/articles", emoji: "📝" },
  { label: "关于", href: "/about", emoji: "👤" },
];

interface HeaderProps {
  onSearchClick?: () => void;
}

export function Header({ onSearchClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="content-container-wide">
        <div className="flex h-12 items-center justify-between">
          {/* Navigation */}
          <nav className="flex items-center">
            {navItems.map((item, index) => (
              <span key={item.href} className="flex items-center">
                <Link
                  to={item.href}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span>{item.emoji}</span>
                  <span>{item.label}</span>
                </Link>
                {index < navItems.length - 1 && (
                  <span className="mx-3 text-muted-foreground/50">·</span>
                )}
              </span>
            ))}
          </nav>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}