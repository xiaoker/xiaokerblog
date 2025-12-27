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
      {title ? (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 shrink-0" />
            <p className="font-bold">{title}</p>
          </div>
          <div className="text-sm pl-7">{children}</div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          <Icon className="h-5 w-5 mt-0.5 shrink-0" />
          <div className="text-sm">{children}</div>
        </div>
      )}
    </div>
  );
}