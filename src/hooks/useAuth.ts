import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import type { User } from "@/types/device";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("refresh_token", data.refreshToken);
      localStorage.setItem("tenant_id", data.user.tenantId);
      setUser(data.user);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("tenant_id");
    setUser(null);
    navigate("/login");
  }, [navigate]);

  const forgotPassword = useCallback(async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.post("/auth/forgot-password", { email });
    } catch (err: any) {
      setError(err.response?.data?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (token: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.post("/auth/reset-password", { token, password });
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  return { user, loading, error, login, logout, forgotPassword, resetPassword };
}
