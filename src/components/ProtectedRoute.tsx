import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { toast } from "sonner";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        console.log("No user found, redirecting to login");
        navigate("/login");
        toast.error("Please sign in to access this page");
      } else {
        // Get user role from metadata
        const userRole = user.user_metadata?.role || 'customer';
        const currentPath = location.pathname;
        
        // Check if user is accessing the correct dashboard for their role
        if (currentPath.includes('/dashboard')) {
          const allowedPath = `/dashboard/${userRole}`;
          if (!currentPath.startsWith(allowedPath)) {
            console.log(`User role: ${userRole}, Current path: ${currentPath}`);
            console.log("User accessing wrong dashboard, redirecting to:", allowedPath);
            navigate(allowedPath);
            toast.error("You don't have access to this dashboard");
          }
        }
      }
    }
  }, [user, loading, navigate, location]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return user ? <>{children}</> : null;
};