import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { RoleSelector } from "@/components/auth/RoleSelector";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const role = user.user_metadata?.role || 'customer';
      console.log("User authenticated, redirecting to dashboard with role:", role);
      navigate(`/dashboard/${role}`);
      toast.success(`Welcome back!`);
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-powderblue to-white px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-midnight">
            Welcome to Move Mate Connect
          </CardTitle>
          <CardDescription>Choose your role to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <RoleSelector defaultRole="customer" />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;