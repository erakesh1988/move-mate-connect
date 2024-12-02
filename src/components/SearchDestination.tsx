import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export const SearchDestination = () => {
  const [destination, setDestination] = useState("");
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) {
      toast({
        title: "Please enter a destination",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Searching for movers",
      description: `Looking for moving experts in ${destination}`,
    });
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center w-full gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Where are you moving to?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full pl-12 h-14 text-lg bg-white/80 backdrop-blur-sm border-2 border-gray-100 focus:border-primary/50 transition-all duration-300"
          />
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
        <Button type="submit" size="lg" className="h-14 px-8 text-lg">
          Find Movers
        </Button>
      </div>
    </form>
  );
};