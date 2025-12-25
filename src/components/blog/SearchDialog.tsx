import { useState } from "react";
import { Search } from "lucide-react";
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

  // This is a placeholder for actual search functionality
  // In Next.js, you would implement actual search with your MDX content
  const searchResults = query.length > 0 ? [] : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="sr-only">搜索文章</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索文章..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            autoFocus
          />
        </div>
        {query.length > 0 && (
          <div className="mt-4">
            {searchResults.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                未找到相关文章
              </p>
            ) : (
              <ul className="space-y-2">
                {/* Search results would go here */}
              </ul>
            )}
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-2">
          提示：在 Next.js 中实现时，可使用 flexsearch 进行全文搜索
        </p>
      </DialogContent>
    </Dialog>
  );
}