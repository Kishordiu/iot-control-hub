import { useState } from "react";
import { LogOut, Moon, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/AuthContext";

export function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, logout, loading } = useAuth();

  const displayName = user?.name || user?.email?.split("@")[0] || "Operator";
  const displayEmail = user?.email || "No active session";
  const initials = displayName
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = async () => {
    await logout();
    setOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen((value) => !value)}
        aria-label="Open profile menu"
        className="rounded-full"
      >
        <User className="h-5 w-5 text-muted-foreground" />
      </Button>

      <AnimatePresence>
        {open && (
          <>
            <button
              type="button"
              aria-label="Close profile menu"
              className="fixed inset-0 z-40 cursor-default"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.16 }}
              className="absolute right-0 mt-2 w-64 glass-panel z-50 p-3 space-y-2 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-3 p-2 rounded-xl bg-secondary/40">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{displayName}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {displayEmail}
                  </p>
                </div>
              </div>

              <div className="px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                Role · {user?.role ?? "unknown"}
              </div>

              <button
                onClick={toggleTheme}
                type="button"
                className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-secondary/50 transition"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="h-4 w-4" />
                    <span className="text-sm">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4" />
                    <span className="text-sm">Dark Mode</span>
                  </>
                )}
              </button>

              <div className="border-t border-border my-2" />

              <button
                onClick={handleLogout}
                type="button"
                disabled={loading}
                className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-destructive/10 text-destructive transition disabled:opacity-50"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">
                  {loading ? "Signing out..." : "Sign out"}
                </span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
