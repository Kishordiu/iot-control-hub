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
      <header className="h-16 border-b border-white/10 bg-black/30 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
        
        {/* Left Section */}
        <div className="flex items-center gap-4 flex-1">
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Desktop Title */}
          <div className="hidden md:flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-cyan-400" />
            <span className="text-white font-medium">
              {user?.name
                ? `${user.name}'s Organization`
                : "ZeroTrust Command Center"}
            </span>
          </div>

          {/* Search */}
          <div className="relative max-w-md w-full ml-auto md:ml-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search devices, logs, commands..."
              className="pl-9 bg-white/5 border-white/10 text-white h-9 focus:ring-cyan-500"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 ml-4">
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
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Sidebar Drawer */}
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.25 }}
              className="fixed top-0 left-0 h-full w-64 z-50 md:hidden"
            >
              <div className="relative h-full">
                
                {/* Close Button */}
                <button
                  onClick={() => setMobileOpen(false)}
                  className="absolute top-4 right-4 text-white p-2 rounded-lg hover:bg-white/10 transition z-50"
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