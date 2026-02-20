import { motion } from "framer-motion";
import { Shield, Users, Globe, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Company() {
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
          <h1 className="text-4xl font-black text-foreground mb-4">Our Company</h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            We build infrastructure for the next generation of connected devices. Our zero-trust platform secures millions of IoT endpoints worldwide.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {[
            { icon: Users, title: "200+ Enterprises", desc: "Trusted by leading manufacturers and operators" },
            { icon: Globe, title: "40+ Countries", desc: "Deployed across global edge networks" },
            { icon: Shield, title: "Zero Breaches", desc: "Perfect security track record since founding" },
            { icon: Award, title: "SOC 2 Type II", desc: "Certified compliance and audit readiness" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6"
            >
              <item.icon className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
