import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    onOpenChange(false);
    router.push(`/?q=${encodeURIComponent(query)}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0 gap-0 overflow-hidden border-border/60 shadow-lg">
        <DialogHeader className="px-4 pt-4 pb-2 border-b border-border/40 bg-muted/20">
          <DialogTitle className="sr-only">搜索文章</DialogTitle>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Search className="h-4 w-4" />
            <span className="font-medium">快速搜索</span>
          </div>
        </DialogHeader>
        <form onSubmit={handleSearch} className="flex items-center border-b border-border/40 relative">
          <Input
            placeholder="输入关键词..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border-0 focus-visible:ring-0 rounded-none px-6 py-8 text-lg bg-transparent placeholder:text-muted-foreground/60"
            autoFocus
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">↵</span>
            </kbd>
          </div>
        </form>
        <div className="bg-muted/10 px-4 py-3 text-[11px] text-muted-foreground/80 flex items-center justify-between group">
          <span>支持中文、英文关键词搜索</span>
          <span className="group-hover:text-foreground transition-colors cursor-default">ESC 关闭</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}