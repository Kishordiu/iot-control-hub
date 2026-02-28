import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeviceControlPanel from "../components/DeviceControlPanel";
import { Device } from "../types/device";
import { supabase } from "../supabaseClient";
import axios from "axios";

interface Telemetry {
  id: string;
  deviceId: string;
  event_type: string;
  pay_load: any;
  created_at: string;
}

const DeviceControlPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [device, setDevice] = useState<Device | null>(null);
  const [telemetry, setTelemetry] = useState<Telemetry[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DEVICE ================= */
  const fetchDevice = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("devices")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error("Error fetching device:", error);
        setDevice(null);
      } else {
        setDevice(data as Device);
      }
    } catch (err) {
      console.error("Device fetch failed:", err);
      setDevice(null);
    } finally {
      setLoading(false);
    }
  };

  /* ================= FETCH TELEMETRY ================= */
  const fetchTelemetry = async () => {
    if (!device?.id) return;
    try {
      const { data, error } = await supabase
        .from("telemetry")
        .select("*")
        .eq("deviceId", device.id)
        .order("created_at", { ascending: false });

      setTelemetry(Array.isArray(data) ? data : []);
      if (error) console.error("Telemetry fetch error:", error);
    } catch (err) {
      console.error("Telemetry fetch failed:", err);
      setTelemetry([]);
    }
  };

  /* ================= REAL-TIME SUBSCRIPTIONS ================= */
  useEffect(() => { fetchDevice(); }, [id]);

  useEffect(() => {
    if (!device?.id) return;
    fetchTelemetry();

    const channel = supabase
      .channel(`telemetry-${device.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "telemetry",
          filters: [`deviceId=eq.${device.id}`],
        },
        fetchTelemetry
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [device]);

  /* ================= HANDLE COMMAND ================= */
  // ✅ Fixed to match DeviceControlPanel signature
  const handleCommand = async (deviceId: string, command: string) => {
    try {
      await axios.post(`/api/devices/${deviceId}/command`, { command });
      fetchDevice();
      fetchTelemetry();
    } catch (err) {
      console.error("Command failed:", err);
    }
  };

  if (loading) return <div className="p-6 text-gray-400">Loading device control...</div>;
  if (!device) return <div className="p-6 text-red-400">Device not found!</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold gradient-text">Device Control</h1>

      {/* INFO PANEL */}
      <div className="glass-panel p-4 card-glow grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <span className="text-gray-500 text-sm">Device Name</span>
          <p className="font-semibold">{device.name}</p>
        </div>
        <div>
          <span className="text-gray-500 text-sm">Firmware</span>
          <p className="font-semibold">
            {device.firmwareVersion}{" "}
            {device.metadata?.firmwareHash && (
              <span className="text-xs text-gray-400">
                ({device.metadata.firmwareHash.slice(0, 8)})
              </span>
            )}
          </p>
        </div>
        <div>
          <span className="text-gray-500 text-sm">Tampered</span>
          <p className={`font-semibold ${device.metadata?.tamperDetected ? "text-red-500" : "text-green-500"}`}>
            {device.metadata?.tamperDetected ? "YES" : "NO"}
          </p>
        </div>
        <div>
          <span className="text-gray-500 text-sm">Lockdown</span>
          <p className={`font-semibold ${device.lockdown ? "text-red-500" : "text-green-500"}`}>
            {device.lockdown ? "YES" : "NO"}
          </p>
        </div>
      </div>

      {/* CONTROL PANEL */}
      <DeviceControlPanel devices={[device]} handleCommand={handleCommand} />

      {/* TELEMETRY FEED */}
      <div className="glass-panel p-4 card-glow mt-6">
        <h2 className="font-semibold mb-2">Real-Time Telemetry</h2>
        {telemetry.length === 0 ? (
          <p className="text-gray-400">No telemetry data yet.</p>
        ) : (
          <ul className="max-h-64 overflow-y-auto space-y-1 text-sm">
            {telemetry.map(t => (
              <li key={t.id} className="border-b py-1">
                <span className="font-medium">{t.event_type.toUpperCase()}</span> |{" "}
                {new Date(t.created_at).toLocaleString()} | Payload: {JSON.stringify(t.pay_load)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DeviceControlPage;