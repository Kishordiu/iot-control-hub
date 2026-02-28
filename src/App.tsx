import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import Dashboard from "./pages/Dashboard";
import Devices from "./pages/Devices";
import DeviceDetails from "./pages/DeviceDetails";
import DeviceControlPage from "./pages/DeviceControlPage";
import Company from "./pages/Company";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { DashboardLayout } from "./components/DashboardLayout";

const queryClient = new QueryClient({
defaultOptions: {
queries: {
retry: 1,
refetchOnWindowFocus: false,
},
},
});

const App = () => {
return (
<QueryClientProvider client={queryClient}>
<TooltipProvider>
<Toaster />
<Sonner />
<BrowserRouter>
<AuthProvider>
<NotificationProvider>
<Routes>

{/* PUBLIC ROUTES */}  
            <Route path="/" element={<Landing />} />  
            <Route path="/login" element={<Login />} />  
            <Route path="/register" element={<Register />} />  
            <Route path="/forgot-password" element={<ForgotPassword />} />  
            <Route path="/reset-password" element={<ResetPassword />} />  

            {/* PROTECTED DASHBOARD */}  
            <Route  
              path="/dashboard"  
              element={  
                <ProtectedRoute>  
                  <DashboardLayout />  
                </ProtectedRoute>  
              }  
            >  
              <Route index element={<Dashboard />} />  
              <Route path="devices" element={<Devices />} />  
              <Route path="devices/:id" element={<DeviceDetails />} />  
              <Route path="devices/:id/control" element={<DeviceControlPage />} />  
              <Route path="company" element={<Company />} />  
              <Route path="about" element={<About />} />  
            </Route>  

            {/* 404 */}  
            <Route path="*" element={<NotFound />} />  

          </Routes>  
        </NotificationProvider>  
      </AuthProvider>  
    </BrowserRouter>  
  </TooltipProvider>  
</QueryClientProvider>

);
};

export default App;