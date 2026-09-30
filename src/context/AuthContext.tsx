import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import type { User } from "@/types/device";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (password: string) => Promise<void>;
  clearError: () => void;
}

interface RegisterPayload {
  companyName?: string;
  adminName?: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthState | null>(null);

const toAppUser = (authUser: {
  id: string;
  email?: string | null;
  user_metadata?: Record<string, unknown>;
}): User => {
  const metadata = authUser.user_metadata ?? {};
  const email = authUser.email ?? "";
  const fallbackName = email.split("@")[0] || "Operator";
  const metadataRole = metadata.role;
  const role =
    metadataRole === "admin" ||
    metadataRole === "operator" ||
    metadataRole === "viewer"
      ? metadataRole
      : "viewer";

  return {
    id: authUser.id,
    email,
    name:
      typeof metadata.name === "string" && metadata.name.trim()
        ? metadata.name.trim()
        : typeof metadata.full_name === "string" && metadata.full_name.trim()
          ? metadata.full_name.trim()
          : fallbackName,
    role,
    tenantId:
      typeof metadata.tenant_id === "string"
        ? metadata.tenant_id
        : typeof metadata.tenantId === "string"
          ? metadata.tenantId
          : "",
  };
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isMounted) return;
      setUser(session?.user ? toAppUser(session.user) : null);
      setInitializing(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ? toAppUser(session.user) : null);
      }
    );

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          setUser(toAppUser(data.user));
          navigate("/dashboard");
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Authentication failed");
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase.auth.signUp({
          email: payload.email,
          password: payload.password,
          options: {
            data: {
              name: payload.adminName ?? "",
              company_name: payload.companyName ?? "",
              role: "admin",
            },
          },
        });

        if (error) throw error;

        if (data.user) {
          setUser(toAppUser(data.user));
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Registration failed");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      navigate("/login");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Logout failed");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const forgotPassword = useCallback(async (email: string) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/reset-password",
      });

      if (error) throw error;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(
    async (password: string) => {
      setLoading(true);
      setError(null);

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          throw new Error(
            "Your password-reset session has expired. Please request a new reset link."
          );
        }

        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;

        await supabase.auth.signOut();
        setUser(null);
        navigate("/login");
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Password reset failed");
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  if (initializing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
