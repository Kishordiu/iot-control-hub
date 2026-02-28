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
  resetPassword: (token: string, password: string) => Promise<void>;
  clearError: () => void;
}

interface RegisterPayload {
  companyName?: string;
  adminName?: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  // ✅ Proper session restore + listener
  useEffect(() => {
    let isMounted = true;

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isMounted) return;

      if (session?.user) {
        setUser({
          email: session.user.email ?? "",
          tenantId: "",
        });
      } else {
        setUser(null);
      }

      setInitializing(false);
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser({
            email: session.user.email ?? "",
            tenantId: "",
          });
        } else {
          setUser(null);
        }
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
        const { data, error } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });

        if (error) throw error;

        if (data.user) {
          setUser({
            email: data.user.email ?? "",
            tenantId: "",
          });

          navigate("/dashboard");
        }
      } catch (err: any) {
        setError(err.message || "Authentication failed");
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const register = useCallback(async (payload: RegisterPayload) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
      });

      if (error) throw error;

      alert("Registration successful! You can now log in.");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);

    try {
      await supabase.auth.signOut();
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const forgotPassword = useCallback(async (email: string) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo:
            window.location.origin + "/reset-password",
        }
      );

      if (error) throw error;

      alert("Check your email for password reset link!");
    } catch (err: any) {
      setError(err.message || "Request failed");
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(
    async (token: string, password: string) => {
      setLoading(true);
      setError(null);

      try {
        const { error } = await supabase.auth.updateUser(
          { password },
          { accessToken: token }
        );

        if (error) throw error;

        alert("Password reset successful! Please log in.");
        navigate("/login");
      } catch (err: any) {
        setError(err.message || "Reset failed");
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  // Show loading spinner while restoring session
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
  if (!ctx)
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  return ctx;
}