import { motion } from "framer-motion";
import { Cpu, Wifi, WifiOff, AlertTriangle, ShieldAlert, Bell } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { StatusIndicator } from "@/components/StatusIndicator";
import { useDashboardStats, useDevices } from "@/hooks/useDevices";
import { Link } from "react-router-dom";
import { CommandButtons } from "@/components/CommandButtons";

const statCards = [
  { key: "totalDevices" as const, label: "Total Devices", icon: Cpu, color: "text-primary" },
  { key: "onlineDevices" as const, label: "Online", icon: Wifi, color: "text-success" },
  { key: "offlineDevices" as const, label: "Offline", icon: WifiOff, color: "text-muted-foreground" },
  { key: "warningDevices" as const, label: "Warnings", icon: AlertTriangle, color: "text-warning" },
  { key: "criticalDevices" as const, label: "Critical", icon: ShieldAlert, color: "text-destructive" },
  { key: "alertCount" as const, label: "Active Alerts", icon: Bell, color: "text-info" },
];

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: devicesData, isLoading: devicesLoading } = useDevices();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Real-time fleet overview</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-panel p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{card.label}</span>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
            <AnimatedCounter
              value={statsLoading ? undefined : (stats?.[card.key] ?? 0)}
              className="text-2xl font-bold text-foreground font-mono"
            />
          </motion.div>
        ))}
      </div>

      {/* Device Table */}
      <div className="glass-panel overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Device Fleet</h2>
        </div>
        {devicesLoading ? (
          <div className="p-8 text-center text-muted-foreground">Loading devices...</div>
        ) : !devicesData?.data?.length ? (
          <div className="p-8 text-center text-muted-foreground">
            No devices found. Connect your backend to see live data.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="p-3 text-muted-foreground font-medium">Status</th>
                  <th className="p-3 text-muted-foreground font-medium">Name</th>
                  <th className="p-3 text-muted-foreground font-medium">Type</th>
                  <th className="p-3 text-muted-foreground font-medium">IP Address</th>
                  <th className="p-3 text-muted-foreground font-medium">Location</th>
                  <th className="p-3 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {devicesData.data.map((device) => (
                  <tr key={device.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="p-3"><StatusIndicator status={device.status} showLabel /></td>
                    <td className="p-3">
                      <Link to={`/dashboard/devices/${device.id}`} className="text-primary hover:underline font-medium">
                        {device.name}
                      </Link>
                    </td>
                    <td className="p-3 text-muted-foreground font-mono text-xs">{device.type}</td>
                    <td className="p-3 text-muted-foreground font-mono text-xs">{device.ipAddress}</td>
                    <td className="p-3 text-muted-foreground">{device.location}</td>
                    <td className="p-3"><CommandButtons deviceId={device.id} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
