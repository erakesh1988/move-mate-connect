import { createContext, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { useAuthState } from "@/hooks/useAuthState";
import { determineUserRole } from "@/utils/roleUtils";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuthState();

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
      toast.success("Successfully signed out");
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error("Error signing out");
    }
  };

  useEffect(() => {
    if (!loading) {
      if (user) {
        const urlParams = new URLSearchParams(window.location.search);
        const role = determineUserRole(user, urlParams);
        const currentPath = location.pathname;
        const expectedPath = `/dashboard/${role}`;
        
        if (!currentPath.startsWith(expectedPath) && currentPath !== '/login') {
          console.log(`Redirecting to ${expectedPath}`);
          navigate(expectedPath);
        }
      } else if (location.pathname !== '/login' && location.pathname !== '/') {
        console.log("No user found, redirecting to login");
        navigate('/login');
      }
    }
  }, [user, loading, navigate, location.pathname]);

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};