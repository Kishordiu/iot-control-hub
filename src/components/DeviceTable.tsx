import { Link } from "react-router-dom";
import { useDevices } from "@/hooks/useDevices";
import { StatusIndicator } from "@/components/StatusIndicator";

export function DeviceTable() {
  const { data: devices = [], isLoading } = useDevices();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="p-3">Status</th>
            <th className="p-3">Device UID</th>
            <th className="p-3">Trust</th>
            <th className="p-3">Last Seen</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.id} className="border-b border-border/50 hover:bg-muted/20">
              <td className="p-3">
                <StatusIndicator
                  status={
                    device.trust_state === "compromised"
                      ? "critical"
                      : device.lockdown
                      ? "warning"
                      : "online"
                  }
                />
              </td>
              <td className="p-3">
                <Link to={`/dashboard/devices/${device.id}`}>
                  {device.device_uid}
                </Link>
              </td>
              <td className="p-3 capitalize">{device.trust_state}</td>
              <td className="p-3 text-xs">
                {device.last_seen
                  ? new Date(device.last_seen).toLocaleString()
                  : "Never"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}