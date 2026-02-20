import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Cpu, Thermometer, HardDrive, Wifi, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useDevice } from "@/hooks/useDevices";
import { StatusIndicator } from "@/components/StatusIndicator";
import { CommandButtons } from "@/components/CommandButtons";
import { Button } from "@/components/ui/button";

function MetricCard({ icon: Icon, label, value, unit, color }: { icon: any; label: string; value?: number; unit: string; color: string }) {
  return (
    <div className="glass-panel p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`h-4 w-4 ${color}`} />
        <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <span className="text-2xl font-bold text-foreground font-mono">
        {value !== undefined ? value : "—"}
        <span className="text-sm text-muted-foreground ml-1">{unit}</span>
      </span>
    </div>
  );
}

export default function DeviceDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: device, isLoading } = useDevice(id || "");

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading device...</div>;
  }

  if (!device) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-muted-foreground">Device not found. Ensure backend is connected.</p>
        <Link to="/dashboard">
          <Button variant="outline" className="gap-2"><ArrowLeft className="h-4 w-4" /> Back</Button>
        </Link>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/dashboard">
          <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">{device.name}</h1>
            <StatusIndicator status={device.status} showLabel size="lg" />
          </div>
          <p className="text-sm text-muted-foreground font-mono mt-1">{device.id}</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <MetricCard icon={Cpu} label="CPU" value={device.metrics?.cpuUsage} unit="%" color="text-primary" />
        <MetricCard icon={HardDrive} label="Memory" value={device.metrics?.memoryUsage} unit="%" color="text-info" />
        <MetricCard icon={Thermometer} label="Temp" value={device.metrics?.temperature} unit="°C" color="text-warning" />
        <MetricCard icon={Wifi} label="Signal" value={device.metrics?.signalStrength} unit="dBm" color="text-success" />
        <MetricCard icon={Clock} label="Uptime" value={device.metrics?.uptime} unit="hrs" color="text-muted-foreground" />
      </div>

      {/* Info + Commands */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 space-y-3">
          <h2 className="font-semibold text-foreground mb-4">Device Info</h2>
          {[
            ["Type", device.type],
            ["IP Address", device.ipAddress],
            ["MAC Address", device.macAddress],
            ["Firmware", device.firmwareVersion],
            ["Location", device.location],
            ["Last Seen", device.lastSeen],
          ].map(([label, val]) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{label}</span>
              <span className="text-foreground font-mono">{val}</span>
            </div>
          ))}
        </div>
        <div className="glass-panel p-6">
          <h2 className="font-semibold text-foreground mb-4">Commands</h2>
          <CommandButtons deviceId={device.id} />
        </div>
      </div>
    </motion.div>
  );
}
