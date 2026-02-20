import { motion } from "framer-motion";
import { Shield, Lock, Fingerprint, Network } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/40 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold text-foreground">ZeroTrust IoT</span>
          </Link>
          <Link to="/login"><Button size="sm">Sign In</Button></Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-black text-foreground mb-4">About Zero-Trust IoT</h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            A comprehensive platform built on the principle that no device, user, or network should be trusted by default.
          </p>
        </motion.div>

        <div className="space-y-8">
          {[
            { icon: Lock, title: "Zero Trust Architecture", desc: "Every API request is authenticated and authorized. Device identity is verified through mutual TLS and hardware attestation." },
            { icon: Fingerprint, title: "Device Identity", desc: "Each device receives a unique cryptographic identity bound to its hardware. Credentials are rotated automatically." },
            { icon: Network, title: "Network Segmentation", desc: "Micro-segmented networks ensure lateral movement is impossible. Each tenant operates in complete isolation." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="glass-panel p-6 flex gap-4"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
