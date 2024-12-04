import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full py-4 px-6 border-b">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Move Mate Connect</h1>
        <Button 
          variant="outline"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </div>
    </nav>
  );
};