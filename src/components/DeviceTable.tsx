import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusIndicator } from "@/components/StatusIndicator";
import { CommandButtons } from "@/components/CommandButtons";
import { SkeletonTable } from "@/components/SkeletonCard";
import { useDevices } from "@/hooks/useDevices";
import { cn } from "@/lib/utils";

const riskColors: Record<string, string> = {
  low: "text-success bg-success/10",
  medium: "text-warning bg-warning/10",
  critical: "text-destructive bg-destructive/10",
};

export function DeviceTable() {
  const { data: devicesData, isLoading, isError } = useDevices();

  if (isLoading) return <SkeletonTable />;

  if (isError) {
    return (
      <div className="glass-panel p-8 text-center">
        <p className="text-destructive text-sm">Failed to load devices. Check your backend connection.</p>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold text-foreground">Device Fleet</h2>
        <span className="text-xs text-muted-foreground font-mono">
          {devicesData?.total ?? 0} devices
        </span>
      </div>
      {!devicesData?.data?.length ? (
        <div className="p-12 text-center space-y-2">
          <p className="text-muted-foreground text-sm">No devices registered</p>
          <p className="text-muted-foreground text-xs">Devices will appear here once connected to your backend.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="p-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">Status</th>
                <th className="p-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">Device ID</th>
                <th className="p-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">Name</th>
                <th className="p-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">Last Active</th>
                <th className="p-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">Risk Level</th>
                <th className="p-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {devicesData.data.map((device, i) => (
                <motion.tr
                  key={device.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                >
                  <td className="p-3"><StatusIndicator status={device.status} showLabel /></td>
                  <td className="p-3 text-muted-foreground font-mono text-xs">{device.id.slice(0, 12)}...</td>
                  <td className="p-3">
                    <Link to={`/dashboard/devices/${device.id}`} className="text-primary hover:underline font-medium">
                      {device.name}
                    </Link>
                  </td>
                  <td className="p-3 text-muted-foreground text-xs">{device.lastSeen ? new Date(device.lastSeen).toLocaleString() : "—"}</td>
                  <td className="p-3">
                    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase", riskColors[(device.metadata?.riskLevel as string) || "low"] || riskColors.low)}>
                      {(device.metadata?.riskLevel as string) || "Low"}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <Link to={`/dashboard/devices/${device.id}`}>
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                      <CommandButtons deviceId={device.id} />
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}
