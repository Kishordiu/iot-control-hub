import { useState } from "react";
import { Search, Shield, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { NotificationCenter } from "@/components/NotificationCenter";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { AppSidebar } from "@/components/AppSidebar";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export function TopNavbar() {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="h-16 border-b border-border bg-background flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
        
        {/* Left Section */}
        <div className="flex items-center gap-4 flex-1">

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-muted transition"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Desktop Title */}
          <div className="hidden md:flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-primary" />
            <span className="font-medium">
              {user?.name
                ? `${user.name}'s Organization`
                : "ZeroTrust Command Center"}
            </span>
          </div>

          {/* Search */}
          <div className="relative max-w-md w-full ml-auto md:ml-10">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search devices, logs, commands..."
              className="pl-9 h-9 bg-muted border-border focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 ml-6">
          <NotificationCenter />
          <ProfileDropdown />
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Sidebar Drawer */}
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.2 }}
              className="fixed top-0 left-0 h-full w-64 z-50 md:hidden bg-background border-r border-border"
            >
              <div className="relative h-full">
                
                {/* Close Button */}
                <button
                  onClick={() => setMobileOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground hover:bg-muted transition"
                >
                  <X className="h-5 w-5" />
                </button>

                <AppSidebar />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}