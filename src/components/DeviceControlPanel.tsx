import React from "react";
import { Device } from "../types/device";
import { Lock, Unlock, RefreshCw, AlertCircle, ShieldOff } from "lucide-react";
import { motion } from "framer-motion";

interface DeviceControlPanelProps {
  devices: Device[];
  handleCommand: (deviceId: string, command: string) => void;
}

const DeviceControlPanel: React.FC<DeviceControlPanelProps> = ({ devices, handleCommand }) => {
  return (
    <div className="glass-panel p-4 card-glow mt-6">
      <h2 className="font-semibold mb-4 text-lg">Device Control Panel</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left">
            <th>Name</th>
            <th>UID</th>
            <th>Firmware</th>
            <th>Status</th>
            <th>Security</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {devices.map(device => {
            const isCompromised = device.metadata?.tamperDetected === true;
            return (
              <motion.tr
                key={device.id}
                className={`border-b hover:bg-card/40 transition-colors duration-300 ${isCompromised ? "bg-red-50" : ""}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <td>{device.name}</td>
                <td>{device.id}</td>
                <td>
                  {device.firmwareVersion}{" "}
                  {device.metadata?.firmwareHash && (
                    <span className="text-xs text-gray-400">({device.metadata.firmwareHash.slice(0, 8)})</span>
                  )}
                  {isCompromised && <span className="text-red-500 font-bold ml-1">(Tampered)</span>}
                </td>
                <td>
                  <span className={`status-dot-${device.status} inline-block w-3 h-3 rounded-full`} />
                </td>
                <td>
                  {isCompromised ? (
                    <ShieldOff className="text-red-500 inline h-5 w-5" />
                  ) : (
                    <span className="text-green-500 font-medium">Secure</span>
                  )}
                </td>
                <td className="flex gap-2 flex-wrap">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary/20 px-2 py-1 rounded hover:bg-primary/40 transition"
                    onClick={() => handleCommand(device.id, "lock")}
                    disabled={isCompromised}
                  >
                    <Lock className="inline h-4 w-4 mr-1" /> Lock
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-success/20 px-2 py-1 rounded hover:bg-success/40 transition"
                    onClick={() => handleCommand(device.id, "unlock")}
                    disabled={isCompromised}
                  >
                    <Unlock className="inline h-4 w-4 mr-1" /> Unlock
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-info/20 px-2 py-1 rounded hover:bg-info/40 transition"
                    onClick={() => handleCommand(device.id, "reset")}
                  >
                    <RefreshCw className="inline h-4 w-4 mr-1" /> Reset
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-destructive/20 px-2 py-1 rounded hover:bg-destructive/40 transition"
                    onClick={() => handleCommand(device.id, "emergency_shutdown")}
                  >
                    <AlertCircle className="inline h-4 w-4 mr-1" /> Shutdown
                  </motion.button>

                  {isCompromised && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-warning/20 px-2 py-1 rounded hover:bg-warning/40 transition"
                      onClick={() => handleCommand(device.id, "admin_override")}
                    >
                      <ShieldOff className="inline h-4 w-4 mr-1" /> Admin Override
                    </motion.button>
                  )}
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceControlPanel;