import { useState } from "react";
import { User, Settings, LogOut, Moon, Sun, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

export function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(!open)}
        className="rounded-full"
      >
        <User className="h-5 w-5 text-muted-foreground" />
      </Button>

      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-64 glass-panel z-50 p-3 space-y-2 rounded-2xl shadow-xl"
            >
              {/* Profile Header */}
              <div className="flex items-center gap-3 p-2 rounded-xl bg-secondary/40">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold">
                  U
                </div>
                <div>
                  <p className="text-sm font-semibold">Username</p>
                  <p className="text-xs text-muted-foreground">
                    user@email.com
                  </p>
                </div>
              </div>

              {/* Menu Items */}
              <button className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-secondary/50 transition">
                <Settings className="h-4 w-4" />
                <span className="text-sm">Settings</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-secondary/50 transition"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Dark Mode</span>
                  </>
                )}
              </button>

              {/* Fun Bonus Section */}
              <div className="p-2 rounded-xl bg-gradient-to-r from-primary/20 to-purple-500/20 flex items-center gap-2 text-xs">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Pro Mode Coming Soon 🚀</span>
              </div>

              <div className="border-t border-border my-2" />

              <button className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-destructive/10 text-destructive transition">
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Logout</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}