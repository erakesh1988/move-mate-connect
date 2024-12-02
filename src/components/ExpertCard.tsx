import { Star, Truck, Badge, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExpertCardProps {
  name: string;
  rating: number;
  reviews: number;
  image: string;
  verified: boolean;
  experience: number;
}

export const ExpertCard = ({
  name,
  rating,
  reviews,
  image,
  verified,
  experience,
}: ExpertCardProps) => {
  return (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 hover:border-primary/50 transition-all duration-300 animate-fade-up">
      <div className="flex items-start gap-4">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">{name}</h3>
            {verified && (
              <Badge className="h-4 w-4 text-primary" aria-label="Verified mover" />
            )}
          </div>
          <div className="flex items-center gap-1 mt-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{rating}</span>
            <span className="text-gray-500">({reviews} reviews)</span>
          </div>
          <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Truck className="h-4 w-4" />
              <span>{experience}+ moves</span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" />
              <span>98% satisfaction</span>
            </div>
          </div>
        </div>
      </div>
      <Button className="w-full mt-4">Contact Expert</Button>
    </div>
  );
};