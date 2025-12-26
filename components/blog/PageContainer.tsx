import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: ReactNode;
  wide?: boolean;
  className?: string;
}

export function PageContainer({ children, wide = false, className }: PageContainerProps) {
  return (
    <main
      className={cn(
        "min-h-[calc(100vh-8rem)] py-8 md:py-12",
        wide ? "content-container-wide" : "content-container",
        className
      )}
    >
      {children}
    </main>
  );
}