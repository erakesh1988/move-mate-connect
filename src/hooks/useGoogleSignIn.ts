import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import type { UserRole } from "@/constants/auth";

export const useGoogleSignIn = () => {
  const { toast } = useToast();

  const signInWithGoogle = async (role: UserRole) => {
    try {
      console.log("Initiating Google sign in with role:", role);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard/${role}`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
            role: role,
          },
        },
      });

      if (error) {
        console.error('Google sign in error:', error);
        toast({
          title: "Error signing in",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Unexpected error during Google sign in:', error);
      toast({
        title: "Error signing in",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return { signInWithGoogle };
};