import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import { determineUserRole } from "@/utils/roleUtils";
import { toast } from "sonner";

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Initial session:", session);
        
        if (session?.user) {
          setUser(session.user);
          const urlParams = new URLSearchParams(window.location.search);
          const role = determineUserRole(session.user, urlParams);
          
          // Update user metadata if role is not present
          if (!session.user.user_metadata?.role) {
            console.log("Updating user metadata with role:", role);
            await supabase.auth.updateUser({
              data: { role }
            });
          }
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
        const role = determineUserRole(session.user, urlParams);
        
        // Update user metadata if role is not present
        if (!session.user.user_metadata?.role) {
          console.log("Updating user metadata with role:", role);
          await supabase.auth.updateUser({
            data: { role }
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
};