import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";

export const NavBar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSignInClick = () => {
    navigate('/login');
  };

  return (
    <nav className="w-full py-4 px-6 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-midnight">Move Mate Connect</h1>
        {!user && (
          <Button 
            onClick={handleSignInClick}
            className="bg-coral hover:bg-coral/90 text-white"
          >
            Sign In
          </Button>
        )}
      </div>
    </nav>
  );
};