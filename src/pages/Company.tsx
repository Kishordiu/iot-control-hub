import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Building2, Mail, Cpu, Wifi, Calendar, Shield } from "lucide-react";
import api from "@/lib/api";
import { SkeletonCard } from "@/components/SkeletonCard";

interface CompanyInfo {
  name: string;
  adminEmail: string;
  totalDevices: number;
  activeDevices: number;
  createdAt: string;
}

export default function Company() {
  const { data, isLoading } = useQuery<CompanyInfo>({
    queryKey: ["company"],
    queryFn: async () => {
      const { data } = await api.get("/company");
      return data;
    },
  });

  const fields = data
    ? [
        { icon: Building2, label: "Company Name", value: data.name },
        { icon: Mail, label: "Admin Email", value: data.adminEmail },
        { icon: Cpu, label: "Total Devices", value: String(data.totalDevices) },
        { icon: Wifi, label: "Active Devices", value: String(data.activeDevices) },
        { icon: Calendar, label: "Created", value: new Date(data.createdAt).toLocaleDateString() },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Company</h1>
        <p className="text-muted-foreground text-sm mt-1">Organization overview</p>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-4">
          {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : !data ? (
        <div className="glass-panel p-12 text-center space-y-2">
          <Shield className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Company data unavailable. Connect your backend to view organization details.</p>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel divide-y divide-border">
          {fields.map((field, i) => (
            <motion.div
              key={field.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 p-4"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <field.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{field.label}</p>
                <p className="text-foreground font-medium font-mono">{field.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
