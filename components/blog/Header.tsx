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
        <div className="flex h-16 items-center justify-between relative">
          {/* Left: Brand */}
          <Link href="/" className="font-bold text-xl tracking-tight text-foreground/90 hover:text-foreground transition-colors shrink-0">
            xiaoker
          </Link>

          {/* Center: Navigation - Positioned absolutely to be perfectly centered */}
          <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-8">
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

          {/* Mobile Nav Fallback (Optional, simplistic for now if screen is small) */}
          {/* For now, on mobile, we might just hide the centered nav or let it collapse. 
              Given the simplicity, I'll keep the centered nav hidden on mobile and maybe show a horizontal scroll or just stack.
              Actually, let's keep it simple: visible on md+, maybe just flow normally on small screens.
              Let's try a responsive approach: 
              On desktop: Absolute center.
              On mobile: Just hide or use the old scroll behavior? 
              The user didn't ask for mobile specifics, but for a "centered look". 
              I'll use the absolute center for desktop to ensure perfect symmetry.
          */}

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

        {/* Mobile Navigation (Visible only on small screens) */}
        <div className="md:hidden py-2 overflow-x-auto no-scrollbar mask-gradient-right flex items-center gap-6">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/?category=${cat}`}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              {cat}
            </Link>
          ))}
          <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
            关于
          </Link>
        </div>
      </div>
    </header>
  );
}