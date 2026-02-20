import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Activity, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ActivityItem {
  id: string;
  type: "connected" | "disconnected" | "alert" | "command";
  message: string;
  timestamp: string;
  deviceName?: string;
}

const typeConfig = {
  connected: { icon: CheckCircle, color: "text-success" },
  disconnected: { icon: XCircle, color: "text-muted-foreground" },
  alert: { icon: AlertTriangle, color: "text-warning" },
  command: { icon: Activity, color: "text-primary" },
};

export function ActivityFeed() {
  const { data, isLoading } = useQuery<ActivityItem[]>({
    queryKey: ["activity-feed"],
    queryFn: async () => {
      const { data } = await api.get("/activity/recent");
      return data;
    },
    refetchInterval: 15000,
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-panel flex flex-col">
      <div className="p-4 border-b border-border flex items-center gap-2">
        <Activity className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Real-Time Activity</h3>
      </div>
      <div className="flex-1 overflow-y-auto max-h-80">
        {isLoading ? (
          <div className="p-6 text-center text-muted-foreground text-sm">Loading activity...</div>
        ) : !data?.length ? (
          <div className="p-6 text-center text-muted-foreground text-sm">
            No recent activity. Events will appear here when backend is connected.
          </div>
        ) : (
          data.map((item, i) => {
            const config = typeConfig[item.type];
            const Icon = config.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-start gap-3 p-3 border-b border-border/40 hover:bg-secondary/30 transition-colors"
              >
                <Icon className={cn("h-4 w-4 mt-0.5 shrink-0", config.color)} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{item.message}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {new Date(item.timestamp).toLocaleTimeString()}
                    {item.deviceName && ` · ${item.deviceName}`}
                  </p>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}
