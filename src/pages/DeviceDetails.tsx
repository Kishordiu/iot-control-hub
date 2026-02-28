import { useParams } from "react-router-dom";
import { useDevice, useDeviceLogs } from "@/hooks/useDevices";
import { CommandButtons } from "@/components/CommandButtons";
import { SimulatorControl } from "@/components/SimulatorControl";

export default function DeviceDetails() {
  const { id } = useParams();
  const { data: device, isLoading } = useDevice(id || "");
  const { data: logs = [] } = useDeviceLogs(device?.device_uid);

  if (isLoading || !device) return <div className="p-6">Loading...</div>;

  const isOnline =
    device.last_seen &&
    new Date(device.last_seen).getTime() >
      Date.now() - 2 * 60 * 1000;

  return (
    <div className="p-8 space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{device.device_uid}</h1>
          <p className="text-sm text-muted-foreground">
            Firmware: {device.firmware_version ?? "N/A"}
          </p>
        </div>

        <div className="flex gap-4 items-center">
          <span
            className={`px-3 py-1 rounded-full text-xs ${
              isOnline ? "bg-green-600" : "bg-gray-600"
            }`}
          >
            {isOnline ? "ONLINE" : "OFFLINE"}
          </span>

          <span
            className={`px-3 py-1 rounded-full text-xs ${
              device.tamper_detected
                ? "bg-red-600"
                : "bg-green-600"
            }`}
          >
            {device.tamper_detected
              ? "TAMPER DETECTED"
              : "SECURE"}
          </span>
        </div>
      </div>

      {/* Security Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card title="Trust State" value={device.trust_state} />
        <Card title="Lockdown" value={device.lockdown ? "YES" : "NO"} />
        <Card title="Key Version" value={device.key_version.toString()} />
      </div>

      {/* Commands */}
      <div className="bg-card p-6 rounded-xl border">
        <h2 className="font-semibold mb-4">Command Center</h2>
        <CommandButtons
          deviceUid={device.device_uid}
          tamperDetected={device.tamper_detected}
        />
      </div>
      <div className="mt-4 border-t pt-4">
        <SimulatorControl/>
      </div>

      {/* Logs */}
      <div className="bg-card p-6 rounded-xl border">
        <h2 className="font-semibold mb-4">Activity Timeline</h2>
        <div className="space-y-3 max-h-72 overflow-y-auto">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-3 bg-muted/30 rounded"
            >
              <div className="flex justify-between text-xs opacity-70">
                <span>{log.event_type}</span>
                <span>
                  {new Date(log.created_at).toLocaleString()}
                </span>
              </div>
              <div>{log.message}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-card border rounded-xl p-6">
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="text-xl font-bold mt-2">{value}</div>
    </div>
  );
}