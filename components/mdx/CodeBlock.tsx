import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children: ReactNode;
  filename?: string;
  className?: string;
}

export function CodeBlock({ children, filename, className }: CodeBlockProps) {
  return (
    <div className={cn("my-6 rounded-lg overflow-hidden border border-border", className)}>
      {filename && (
        <div className="px-4 py-2 bg-secondary/50 border-b border-border text-sm text-muted-foreground font-mono">
          {filename}
        </div>
      )}
      <pre className="p-4 overflow-x-auto bg-prose-code-bg">
        <code className="text-sm font-mono">{children}</code>
      </pre>
    </div>
  );
}