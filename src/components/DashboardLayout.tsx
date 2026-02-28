import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { TopNavbar } from "@/components/TopNavbar";

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground transition-colors duration-300">
      
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Navigation */}
        <TopNavbar />

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}