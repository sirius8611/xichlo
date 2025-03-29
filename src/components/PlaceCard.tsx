
import { 
  Heart, 
  Star, 
  MapPin, 
  DollarSign, 
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Place } from "@/types/place";
import { Link } from "react-router-dom";

interface PlaceCardProps {
  place: Place;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
  const [liked, setLiked] = useState(false);

  const renderPriceLevel = (level: number) => {
    return Array(3)
      .fill(0)
      .map((_, i) => (
        <DollarSign
          key={i}
          className={`h-3.5 w-3.5 ${
            i < level ? "text-foreground" : "text-muted-foreground/30"
          }`}
        />
      ));
  };

  return (
    <Link to={`/place/${place.id}`} className="block">
      <div className="bg-card rounded-lg border shadow-sm overflow-hidden hover-lift">
        <div className="relative">
          <img
            src={place.imageUrl}
            alt={place.name}
            className="w-full h-48 object-cover"
          />
          <Button
            variant="outline"
            size="icon"
            className={`absolute top-2 right-2 rounded-full bg-white/80 backdrop-blur-sm ${
              liked ? "text-red-500" : "text-gray-600"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setLiked(!liked);
            }}
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
          </Button>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">{place.name}</h3>
              {place.localFavorite && (
                <Badge className="mt-1 w-fit bg-primary text-primary-foreground">
                  Local Favorite
                </Badge>
              )}
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
              <span className="text-sm font-medium">{place.rating.toFixed(1)}</span>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span className="truncate">{place.location}</span>
          </div>
          
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              {renderPriceLevel(place.priceLevel)}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>{place.timeToVisit}</span>
            </div>
          </div>
          
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {place.tags.slice(0, 3).map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="bg-secondary/50 text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {place.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCard;
