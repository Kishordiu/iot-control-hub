import { cn } from "@/lib/utils";

export type DeviceStatus = "online" | "offline" | "warning" | "critical";

interface StatusIndicatorProps {
  status: DeviceStatus;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

const statusConfig: Record<
  DeviceStatus,
  { label: string; color: string }
> = {
  online: { label: "Online", color: "bg-green-500" },
  offline: { label: "Offline", color: "bg-gray-500" },
  warning: { label: "Warning", color: "bg-yellow-500" },
  critical: { label: "Critical", color: "bg-red-500" },
};

const sizeClasses = {
  sm: "w-2 h-2",
  md: "w-3 h-3",
  lg: "w-4 h-4",
};

export function StatusIndicator({
  status,
  showLabel = false,
  size = "md",
}: StatusIndicatorProps) {
  const config = statusConfig[status] ?? statusConfig.offline;

  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "rounded-full",
          config.color,
          sizeClasses[size]
        )}
      />
      {showLabel && (
        <span className="text-sm text-muted-foreground">
          {config.label}
        </span>
      )}
    </div>
  );
}