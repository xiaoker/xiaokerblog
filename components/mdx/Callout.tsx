import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, Info, AlertTriangle, CheckCircle } from "lucide-react";

type CalloutType = "info" | "warning" | "error" | "success";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const icons = {
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  success: CheckCircle,
};

const styles = {
  info: "border-blue-500/50 bg-blue-500/10",
  warning: "border-yellow-500/50 bg-yellow-500/10",
  error: "border-red-500/50 bg-red-500/10",
  success: "border-green-500/50 bg-green-500/10",
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const Icon = icons[type];

  return (
    <div
      className={cn(
        "my-6 rounded-lg border-l-4 p-4",
        styles[type]
      )}
    >
      {/* 使用 Grid 布局彻底解决对齐和缩进问题 */}
      <div className="grid grid-cols-[min-content_1fr] gap-x-3">
        {/* 图标列：根据是否有标题决定对齐方式 */}
        <div
          className={cn(
            "flex items-center justify-center h-6 w-6 shrink-0 rounded-sm select-none", // h-6 匹配 title 的 height
            "self-start" // 永远顶对齐：因为右侧 Title 也是在顶部，这样它们就在同一水平线上了
          )}
        >
          <Icon className="h-5 w-5" />
        </div>

        {/* 内容列 */}
        <div className="flex flex-col gap-0 min-w-0">
          {title && (
            <p className="font-bold leading-6 m-0 flex items-center h-6">
              {title}
            </p>
          )}
          <div className={cn(
            "text-sm text-foreground/90 [&>p]:!my-0 leading-relaxed",
            // 如果没有标题，不需要额外的顶部间距。如果有标题，gap-1 已经处理了间距。
          )}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}