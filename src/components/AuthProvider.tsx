import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import { toast } from "sonner";

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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Initial session:", session);
        
        if (session?.user) {
          setUser(session.user);
          
          // Get role from metadata or URL
          const urlParams = new URLSearchParams(window.location.search);
          const roleFromUrl = urlParams.get('role');
          const userMetadata = session.user.user_metadata;
          console.log("User metadata:", userMetadata);
          console.log("Role from URL:", roleFromUrl);
          
          // Try to get role from different possible locations
          const role = roleFromUrl || 
                      userMetadata?.role || 
                      session.user.app_metadata?.role || 
                      'customer';
                      
          console.log("Determined role:", role);
          
          // Update user metadata if role is not present
          if (!userMetadata?.role) {
            console.log("Updating user metadata with role:", role);
            await supabase.auth.updateUser({
              data: { role: role }
            });
          }
          
          navigate(`/dashboard/${role}`);
        }
      } catch (error) {
        console.error("Error getting session:", error);
        toast.error("Error initializing authentication");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log("Auth state changed:", _event);
      console.log("Session:", session);
      
      if (session?.user) {
        setUser(session.user);
        const urlParams = new URLSearchParams(window.location.search);
        const roleFromUrl = urlParams.get('role');
        const userMetadata = session.user.user_metadata;
        console.log("User metadata on auth change:", userMetadata);
        console.log("Role from URL:", roleFromUrl);
        
        // Try to get role from different possible locations
        const role = roleFromUrl || 
                    userMetadata?.role || 
                    session.user.app_metadata?.role || 
                    'customer';
                    
        console.log("Redirecting to dashboard with role:", role);
        
        // Update user metadata if role is not present
        if (!userMetadata?.role) {
          console.log("Updating user metadata with role:", role);
          await supabase.auth.updateUser({
            data: { role: role }
          });
        }
        
        navigate(`/dashboard/${role}`);
      } else {
        setUser(null);
        navigate('/login');
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      navigate('/login');
      toast.success("Successfully signed out");
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error("Error signing out");
    }
  };

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