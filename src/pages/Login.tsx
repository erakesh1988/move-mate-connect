import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { USER_ROLES, type UserRole } from "@/constants/auth";
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
          <Tabs defaultValue="customer" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              {USER_ROLES.map((role) => (
                <TabsTrigger key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
            {USER_ROLES.map((role) => (
              <TabsContent key={role} value={role}>
                <GoogleSignInButton role={role as UserRole} />
                {role === 'hr' && (
                  <p className="mt-4 text-sm text-gray-600 text-center">
                    Sign in as HR to manage your employees' relocations
                  </p>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;