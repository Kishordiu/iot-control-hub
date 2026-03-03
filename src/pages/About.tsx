import { motion } from "framer-motion";
import { Shield, Lock, Fingerprint, Network, Code, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-black text-foreground mb-2">About</h1>
        <p className="text-muted-foreground max-w-xl">
          A comprehensive zero-trust platform built on the principle that no device, user, or network should be trusted by default.
        </p>
      </motion.div>

      <div className="space-y-4">
        {[
          { icon: Lock, title: "Zero Trust Architecture", desc: "Every API request is authenticated and authorized. Device identity is verified through mutual TLS and hardware attestation." },
          { icon: Fingerprint, title: "Device Identity", desc: "Each device receives a unique cryptographic identity bound to its hardware. Credentials are rotated automatically." },
          { icon: Network, title: "Network Segmentation", desc: "Micro-segmented networks ensure lateral movement is impossible. Each tenant operates in complete isolation." },
          { icon: Zap, title: "Real-Time Monitoring", desc: "Sub-second telemetry streaming via WebSocket. Instant alerting on anomalous behavior patterns." },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-5 flex gap-4 card-glow"
          >
            <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <item.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Creator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-panel p-6 text-center space-y-3"
      >
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <Code className="h-7 w-7 text-primary" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Created by</p>
          <h2 className="text-xl font-bold text-foreground">Code Strikers</h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold gradient-text">SEA MASONS</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Industrial-grade IoT security for the connected world</p>
        </div>
      </motion.div>
    </div>
  );
}
