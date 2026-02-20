import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Cpu, Lock, Zap, ArrowRight, Globe, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Shield, title: "Zero-Trust Security", description: "Every device request is verified. No implicit trust, ever." },
  { icon: Cpu, title: "Real-Time Monitoring", description: "Live telemetry, status tracking, and instant alerts across your fleet." },
  { icon: Lock, title: "Remote Commands", description: "Lock, unlock, reset, or emergency shutdown any device instantly." },
  { icon: Globe, title: "Multi-Tenant", description: "Isolated environments per organization with role-based access control." },
  { icon: Zap, title: "Edge-Ready", description: "Designed for low-latency edge deployments with Socket.io real-time feeds." },
  { icon: BarChart3, title: "Fleet Analytics", description: "CPU, memory, temperature, and signal strength metrics at a glance." },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border bg-card/40 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold text-foreground">ZeroTrust IoT</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link to="/company" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Company</Link>
            <Link to="/login">
              <Button size="sm">Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 py-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Shield className="h-3.5 w-3.5" /> Enterprise-Grade IoT Security
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground leading-[1.1] mb-6">
              Secure Every
              <br />
              <span className="gradient-text">Connected Device</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed">
              Multi-tenant zero-trust device management. Monitor, control, and secure your entire IoT fleet from a single pane of glass.
            </p>
            <div className="flex gap-4">
              <Link to="/login">
                <Button size="lg" className="gap-2 font-semibold">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="font-semibold">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 card-glow"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <span>© 2026 ZeroTrust IoT. All rights reserved.</span>
          <div className="flex gap-6">
            <Link to="/company" className="hover:text-foreground transition-colors">Company</Link>
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
