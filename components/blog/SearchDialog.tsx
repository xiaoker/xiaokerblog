import { useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
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
      <DialogContent className="sm:max-w-[550px] p-0 gap-0 overflow-hidden border-border/60 shadow-lg [&>button]:hidden">
        <form onSubmit={handleSearch} className="flex items-center relative px-4 py-4">
          <Search className="h-5 w-5 text-muted-foreground mr-3 shrink-0" />
          <Input
            placeholder="搜索文章..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border-0 focus-visible:ring-0 rounded-none p-0 text-lg bg-transparent placeholder:text-muted-foreground/50 h-auto"
            autoFocus
          />
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="p-1 rounded-full hover:bg-muted text-muted-foreground transition-colors ml-2 shrink-0"
          >
            <X className="h-5 w-5" />
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}