import { useNavigate } from "react-router-dom";
import { useDevices } from "@/hooks/useDevices";
import { StatusIndicator } from "@/components/StatusIndicator";

export default function Devices() {
  const { data: devices = [], isLoading } = useDevices();
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="p-6 text-muted-foreground">Loading devices...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Registered Devices</h1>

      {devices.length === 0 ? (
        <div className="text-muted-foreground text-center mt-10">
          No devices registered yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {devices.map((device) => (
            <div
              key={device.id}
              onClick={() => navigate(`/dashboard/devices/${device.id}`)}
              className={`bg-card border border-border rounded-xl p-5 cursor-pointer hover:border-primary transition ${
                device.lockdown ? "border-red-500/50" : ""
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">{device.device_uid}</h2>
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

              <p className="text-sm text-muted-foreground">
                Trust: <span className="capitalize">{device.trust_state}</span>
              </p>

              <p className="text-sm text-muted-foreground">
                Tamper: {device.tamper_flag ? "DETECTED" : "Safe"}
              </p>

              <p className="text-sm text-muted-foreground">
                Lockdown: {device.lockdown ? "Enabled" : "Disabled"}
              </p>

              <p className="text-xs text-muted-foreground mt-2">
                Last Seen:{" "}
                {device.last_seen
                  ? new Date(device.last_seen).toLocaleString()
                  : "Never"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}