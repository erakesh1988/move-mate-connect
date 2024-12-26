import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";

export const NavBar = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignInClick = () => {
    navigate('/login');
  };

  const handleDashboardClick = () => {
    const role = user?.user_metadata?.role || 'customer';
    navigate(`/dashboard/${role}`);
  };

  const getRoleLabel = (role?: string) => {
    if (!role) return 'Customer';
    return role === 'hr' ? 'HR' : role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <nav className="w-full py-4 px-6 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-midnight">Move Mate Connect</h1>
        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm text-gray-600">
              Signed in as {getRoleLabel(user.user_metadata?.role)}
            </span>
          )}
          <div className="flex gap-4">
            {user ? (
              <>
                <Button 
                  onClick={handleDashboardClick}
                  variant="outline"
                >
                  Dashboard
                </Button>
                <Button 
                  onClick={signOut}
                  variant="ghost"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button 
                onClick={handleSignInClick}
                className="bg-coral hover:bg-coral/90 text-white"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};