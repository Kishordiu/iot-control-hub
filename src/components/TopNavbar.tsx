import { Bell, Search, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { NotificationCenter } from "@/components/NotificationCenter";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { useAuth } from "@/context/AuthContext";

export function TopNavbar() {
  const { user } = useAuth();

  return (
    <header className="h-16 border-b border-border bg-card/60 backdrop-blur-lg flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-4 flex-1">
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
          <Shield className="h-4 w-4 text-primary" />
          <span className="font-medium text-foreground">{user?.name ? `${user.name}'s Organization` : "Dashboard"}</span>
        </div>
        <div className="relative max-w-md w-full ml-auto md:ml-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search devices, commands..."
            className="pl-9 bg-secondary border-border h-9"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 ml-4">
        <NotificationCenter />
        <ProfileDropdown />
      </div>
    </header>
  );
}
