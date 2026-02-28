import { useMemo } from "react";
import { Shield, Cpu, AlertTriangle, Lock } from "lucide-react";
import { useDevices } from "@/hooks/useDevices";
import { useDeviceLogs } from "@/hooks/useDeviceLogs";
import { StatusIndicator } from "@/components/StatusIndicator";

export default function Dashboard() {
  const { data: devices = [], isLoading } = useDevices();
  const { data: logs = [] } = useDeviceLogs();

  // 📊 Device Statistics
  const stats = useMemo(() => {
    const total = devices.length;
    const trusted = devices.filter(
  (d) => d.trust_state === "verified"
).length;
    const compromised = devices.filter(d => d.trust_state === "compromised").length;
    const unverified = devices.filter(d => d.trust_state === "unverified").length;
    const lockdown = devices.filter(
  (d) => d.lockdown === true
).length;

    return { total, trusted, compromised, unverified, lockdown };
  }, [devices]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Loading Command Center...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* 🔥 Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Zero-Trust IoT Command Center
        </h1>
        <p className="text-muted-foreground">
          Real-time monitoring & autonomous device protection
        </p>
      </div>

      {/* 📊 Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

        <StatCard
          title="Total Devices"
          value={stats.total}
          icon={<Cpu className="h-6 w-6" />}
          color="text-blue-500"
        />

        <StatCard
          title="Trusted"
          value={stats.trusted}
          icon={<Shield className="h-6 w-6" />}
          color="text-green-500"
        />

        <StatCard
          title="Compromised"
          value={stats.compromised}
          icon={<AlertTriangle className="h-6 w-6" />}
          color="text-red-500"
        />

        <StatCard
          title="Unverified"
          value={stats.unverified}
          icon={<Shield className="h-6 w-6" />}
          color="text-yellow-500"
        />

        <StatCard
          title="Lockdown"
          value={stats.lockdown}
          icon={<Lock className="h-6 w-6" />}
          color="text-purple-500"
        />
      </div>

      {/* 🖥 Devices Overview */}
      <div className="bg-card rounded-xl border border-border p-6">
  <h2 className="text-xl font-semibold mb-4">Device Overview</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    {devices.map((device) => (
      <div
        key={device.id}
        className="border border-border rounded-lg p-4 hover:border-primary transition"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-base">
            {device.device_uid}
          </h3>

          <StatusIndicator
            status={
              device.trust_state === "compromised"
                ? "critical"
                : device.lockdown
                ? "warning"
                : "online"
            }
          />
        </div>

        {/* 🔐 Trust Level */}
        <div className="mb-2 text-sm">
          <span className="text-muted-foreground">
            Trust Level:
          </span>{" "}
          <span
            className={`px-2 py-1 rounded-md text-xs font-semibold ${
              device.trust_state === "verified"
                ? "bg-green-500/20 text-green-400"
                : device.trust_state === "compromised"
                ? "bg-red-500/20 text-red-400"
                : "bg-yellow-500/20 text-yellow-400"
            }`}
          >
            {device.trust_state.charAt(0).toUpperCase() +
              device.trust_state.slice(1)}
          </span>
        </div>

        {/* ⚙ Operational State */}
        <div className="mb-2 text-sm">
          <span className="text-muted-foreground">
            Operational State:
          </span>{" "}
          <span
            className={`px-2 py-1 rounded-md text-xs font-semibold ${
              device.lockdown
                ? "bg-red-500/20 text-red-400"
                : "bg-green-500/20 text-green-400"
            }`}
          >
            {device.lockdown ? "Locked" : "Active"}
          </span>
        </div>

        {/* 🕒 Last Seen */}
        <p className="text-xs text-muted-foreground mt-3">
          Last Seen:{" "}
          {device.last_seen
            ? new Date(device.last_seen).toLocaleString()
            : "Never"}
        </p>
      </div>
    ))}
  </div>

  {devices.length === 0 && (
    <div className="text-center text-muted-foreground mt-4">
      No devices registered.
    </div>
  )}
</div>

      {/* 📜 Live Security Logs */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-xl font-semibold mb-4">
          Live Security Logs
        </h2>

        <div className="max-h-80 overflow-y-auto space-y-2">
          {logs.slice(0, 20).map((log) => (
            <div
              key={log.id}
              className={`p-3 rounded-md text-sm border ${
                log.level === "critical"
                  ? "border-red-500 bg-red-500/10 text-red-400"
                  : log.level === "warning"
                  ? "border-yellow-500 bg-yellow-500/10 text-yellow-400"
                  : "border-border bg-muted/30 text-muted-foreground"
              }`}
            >
              <div className="flex justify-between text-xs mb-1 opacity-70">
                <span>{log.device_uid}</span>
                <span>{new Date(log.created_at).toLocaleTimeString()}</span>
              </div>
              {log.message}
            </div>
          ))}

          {logs.length === 0 && (
            <div className="text-muted-foreground text-sm">
              No security events yet.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

/* ========================= */
/* 🔥 Reusable Stat Card */
/* ========================= */

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 flex items-center justify-between hover:border-primary transition">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
      <div className={`${color}`}>{icon}</div>
    </div>
  );
}