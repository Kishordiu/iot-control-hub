import { motion } from "framer-motion";
import { Cpu, Wifi, WifiOff, AlertTriangle, ShieldAlert, Bell } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { useDashboardStats } from "@/hooks/useDevices";
import { SkeletonCard } from "@/components/SkeletonCard";
import { DeviceTable } from "@/components/DeviceTable";
import { ActivityLineChart, RiskBarChart, DeviceStatusDonut } from "@/components/DashboardCharts";
import { ActivityFeed } from "@/components/ActivityFeed";

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Real-time fleet overview</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statsLoading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : statCards.map((card, i) => (
              <motion.div
                key={card.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-panel p-4 card-glow"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{card.label}</span>
                  <card.icon className={`h-4 w-4 ${card.color}`} />
                </div>
                <AnimatedCounter
                  value={stats?.[card.key] ?? 0}
                  className="text-2xl font-bold text-foreground font-mono"
                />
              </motion.div>
            ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        <ActivityLineChart />
        <RiskBarChart />
        <DeviceStatusDonut />
      </div>

      {/* Table + Activity Feed */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DeviceTable />
        </div>
        <ActivityFeed />
      </div>
    </div>
  );
}
