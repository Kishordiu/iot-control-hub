import { useState } from "react";
import { User, LogOut, Settings, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="relative">
      <Button variant="ghost" className="gap-2 h-9 px-2" onClick={() => setOpen(!open)}>
        <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center">
          <User className="h-3.5 w-3.5 text-primary" />
        </div>
        <span className="text-sm text-foreground hidden md:inline">{user?.name || "Admin"}</span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </Button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute right-0 top-full mt-1 w-48 glass-panel z-50 py-1"
            >
              <div className="px-3 py-2 border-b border-border">
                <p className="text-sm font-medium text-foreground">{user?.name || "Admin"}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email || "admin@company.com"}</p>
              </div>
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
                <Settings className="h-4 w-4" /> Settings
              </button>
              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
