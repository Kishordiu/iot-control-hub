import { Bell, Search, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TopNavbar() {
  return (
    <header className="h-16 border-b border-border bg-card/60 backdrop-blur-lg flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search devices, commands..."
            className="pl-9 bg-secondary border-border h-9"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </Button>
        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
          <Shield className="h-4 w-4 text-primary" />
        </div>
      </div>
    </header>
  );
}
