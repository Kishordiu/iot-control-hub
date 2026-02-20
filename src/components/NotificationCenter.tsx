import { useState } from "react";
import { Bell, Check, Trash2, AlertTriangle, Info, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotifications, type NotificationLevel } from "@/context/NotificationContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const levelConfig: Record<NotificationLevel, { icon: typeof Bell; className: string }> = {
  info: { icon: Info, className: "text-info" },
  warning: { icon: AlertTriangle, className: "text-warning" },
  critical: { icon: ShieldAlert, className: "text-destructive" },
};

export function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllRead, clearAll } = useNotifications();

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" className="relative" onClick={() => setOpen(!open)}>
        <Bell className="h-5 w-5 text-muted-foreground" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </motion.span>
        )}
      </Button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-80 max-h-96 overflow-hidden glass-panel z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-3 border-b border-border">
                <span className="text-sm font-semibold text-foreground">Notifications</span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={markAllRead} title="Mark all read">
                    <Check className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={clearAll} title="Clear all">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              <div className="overflow-y-auto flex-1">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground text-sm">
                    No notifications yet
                  </div>
                ) : (
                  notifications.map((n) => {
                    const config = levelConfig[n.level];
                    const Icon = config.icon;
                    return (
                      <button
                        key={n.id}
                        onClick={() => markAsRead(n.id)}
                        className={cn(
                          "w-full text-left p-3 border-b border-border/50 hover:bg-secondary/40 transition-colors flex gap-3",
                          !n.read && "bg-primary/5",
                          n.level === "critical" && !n.read && "animate-pulse"
                        )}
                      >
                        <Icon className={cn("h-4 w-4 mt-0.5 shrink-0", config.className)} />
                        <div className="flex-1 min-w-0">
                          <p className={cn("text-sm font-medium truncate", n.read ? "text-muted-foreground" : "text-foreground")}>
                            {n.title}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">{n.message}</p>
                          <p className="text-[10px] text-muted-foreground mt-1">
                            {new Date(n.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                        {!n.read && <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />}
                      </button>
                    );
                  })
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
