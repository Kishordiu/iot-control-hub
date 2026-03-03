import { useNavigate } from "react-router-dom";
import { useDevices } from "@/hooks/useDevices";
import { StatusIndicator } from "@/components/StatusIndicator";

export default function Devices() {
  const { data: devices = [], isLoading } = useDevices();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="text-muted-foreground">
        Loading devices...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Registered Devices
        </h1>
        <p className="text-sm text-muted-foreground">
          Monitor and manage all connected IoT devices.
        </p>
      </div>

      {devices.length === 0 ? (
        <div className="text-muted-foreground text-center py-16 border border-border rounded-2xl bg-card">
          No devices registered yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {devices.map((device) => (
            <div
              key={device.id}
              onClick={() =>
                navigate(`/dashboard/devices/${device.id}`)
              }
              className={`
                group
                bg-card
                border border-border
                rounded-2xl
                p-6
                cursor-pointer
                shadow-sm
                hover:shadow-md
                hover:-translate-y-0.5
                transition-all duration-200
                ${device.lockdown ? "border-red-500/40" : ""}
              `}
            >
              {/* Top Row */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="font-semibold tracking-tight">
                    {device.device_uid}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Device ID
                  </p>
                </div>

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

              {/* Metadata Section */}
              <div className="space-y-3 text-sm">
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Trust Level
                  </span>
                  <span className="capitalize font-medium">
                    {device.trust_state}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Tamper Status
                  </span>
                  <span className={device.tamper_flag ? "text-red-500 font-medium" : "text-green-500 font-medium"}>
                    {device.tamper_flag ? "Detected" : "Safe"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Lockdown
                  </span>
                  <span className="font-medium">
                    {device.lockdown ? "Enabled" : "Disabled"}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-border text-xs text-muted-foreground">
                Last Seen:{" "}
                {device.last_seen
                  ? new Date(device.last_seen).toLocaleString()
                  : "Never"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}