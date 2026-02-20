import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { motion } from "framer-motion";

const CHART_COLORS = {
  primary: "hsl(190, 95%, 50%)",
  success: "hsl(152, 70%, 45%)",
  warning: "hsl(38, 92%, 50%)",
  destructive: "hsl(0, 72%, 51%)",
  info: "hsl(210, 80%, 55%)",
  muted: "hsl(215, 12%, 50%)",
};

// Hook for chart data from API
function useChartData(endpoint: string, key: string) {
  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      const { data } = await api.get(endpoint);
      return data;
    },
    refetchInterval: 30000,
  });
}

export function ActivityLineChart() {
  const { data, isLoading } = useChartData("/analytics/activity", "activity-chart");

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">Device Activity Over Time</h3>
      {isLoading ? (
        <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">Loading chart data...</div>
      ) : !data?.length ? (
        <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">No activity data available. Connect backend to view trends.</div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
            <XAxis dataKey="time" tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 11 }} stroke="hsl(220, 14%, 18%)" />
            <YAxis tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 11 }} stroke="hsl(220, 14%, 18%)" />
            <Tooltip contentStyle={{ background: "hsl(220, 18%, 10%)", border: "1px solid hsl(220, 14%, 18%)", borderRadius: 8, color: "hsl(210, 20%, 92%)" }} />
            <Line type="monotone" dataKey="devices" stroke={CHART_COLORS.primary} strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="alerts" stroke={CHART_COLORS.destructive} strokeWidth={2} dot={false} />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  );
}

export function RiskBarChart() {
  const { data, isLoading } = useChartData("/analytics/risk-distribution", "risk-chart");

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">Risk Level Distribution</h3>
      {isLoading ? (
        <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">Loading chart data...</div>
      ) : !data?.length ? (
        <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">No risk data available. Connect backend to view distribution.</div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
            <XAxis dataKey="level" tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 11 }} stroke="hsl(220, 14%, 18%)" />
            <YAxis tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 11 }} stroke="hsl(220, 14%, 18%)" />
            <Tooltip contentStyle={{ background: "hsl(220, 18%, 10%)", border: "1px solid hsl(220, 14%, 18%)", borderRadius: 8, color: "hsl(210, 20%, 92%)" }} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {(data || []).map((_: any, i: number) => (
                <Cell key={i} fill={[CHART_COLORS.success, CHART_COLORS.warning, CHART_COLORS.destructive][i % 3]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  );
}

export function DeviceStatusDonut() {
  const { data, isLoading } = useChartData("/analytics/device-status", "device-status-chart");

  const COLORS = [CHART_COLORS.success, CHART_COLORS.muted, CHART_COLORS.warning, CHART_COLORS.destructive];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">Device Status</h3>
      {isLoading ? (
        <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">Loading chart data...</div>
      ) : !data?.length ? (
        <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">No status data available. Connect backend to view breakdown.</div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value" nameKey="name">
              {(data || []).map((_: any, i: number) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ background: "hsl(220, 18%, 10%)", border: "1px solid hsl(220, 14%, 18%)", borderRadius: 8, color: "hsl(210, 20%, 92%)" }} />
            <Legend formatter={(value: string) => <span style={{ color: "hsl(215, 12%, 50%)", fontSize: 12 }}>{value}</span>} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  );
}
