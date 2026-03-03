import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { TopNavbar } from "@/components/TopNavbar";

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen w-full bg-muted/40 text-foreground">

      {/* Sidebar */}
      <div className="border-r border-border bg-background">
        <AppSidebar />
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top Navigation */}
        <div className="border-b border-border bg-background">
          <TopNavbar />
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl p-6 md:p-10">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}