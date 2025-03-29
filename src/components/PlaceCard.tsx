
import { 
  Heart, 
  Star, 
  MapPin, 
  DollarSign, 
  Clock, 
  Share2,
  User,
  MessageCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Place } from "@/types/place";

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
            i < level ? "text-vietnam-terracotta" : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover-lift">
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
          onClick={() => setLiked(!liked)}
        >
          <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
        </Button>
        {place.localFavorite && (
          <Badge className="absolute top-2 left-2 bg-vietnam-green text-white">
            Local Favorite
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-vietnam-blue">{place.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
            <span className="text-sm font-medium">{place.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-vietnam-blue/70 mb-3">
          <MapPin className="h-3.5 w-3.5 mr-1 text-vietnam-terracotta" />
          <span className="truncate">{place.location}</span>
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            {renderPriceLevel(place.priceLevel)}
          </div>
          <div className="flex items-center text-sm text-vietnam-blue/70">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{place.timeToVisit}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {place.tags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="bg-vietnam-cream/50 text-vietnam-green border-vietnam-green/20 text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        <p className="text-sm text-vietnam-blue/80 mb-4 line-clamp-2">
          {place.description}
        </p>
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center text-xs text-vietnam-blue/60">
            <User className="h-3 w-3 mr-1" />
            <span className="mr-3">{place.reviewCount} visitors</span>
            <MessageCircle className="h-3 w-3 mr-1" />
            <span>{place.reviewCount} reviews</span>
          </div>
          <Button variant="ghost" size="sm" className="text-vietnam-green hover:text-vietnam-terracotta hover:bg-vietnam-cream/20">
            <Share2 className="h-3.5 w-3.5 mr-1" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
