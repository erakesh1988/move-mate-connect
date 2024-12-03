import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Apple, Mail } from "lucide-react";

const Login = () => {
  const { toast } = useToast();

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleAppleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "apple",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to continue to Move Mate Connect</p>
        </div>
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full py-6 text-lg"
            onClick={handleGoogleLogin}
          >
            <Mail className="mr-2" />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="w-full py-6 text-lg"
            onClick={handleAppleLogin}
          >
            <Apple className="mr-2" />
            Continue with Apple
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;