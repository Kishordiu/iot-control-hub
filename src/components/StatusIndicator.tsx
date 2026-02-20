import type { DeviceStatus } from "@/types/device";
import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: DeviceStatus;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

const statusConfig: Record<DeviceStatus, { label: string; className: string }> = {
  online: { label: "Online", className: "status-dot-online" },
  offline: { label: "Offline", className: "status-dot-offline" },
  warning: { label: "Warning", className: "status-dot-warning" },
  critical: { label: "Critical", className: "status-dot-critical" },
};

const sizeClasses = {
  sm: "w-2 h-2",
  md: "w-2.5 h-2.5",
  lg: "w-3.5 h-3.5",
};

export function StatusIndicator({ status, showLabel = false, size = "md" }: StatusIndicatorProps) {
  const config = statusConfig[status];
  return (
    <div className="flex items-center gap-2">
      <span className={cn(config.className, sizeClasses[size])} />
      {showLabel && (
        <span className="text-sm text-muted-foreground capitalize">{config.label}</span>
      )}
    </div>
  );
}
