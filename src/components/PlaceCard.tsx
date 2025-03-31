
import { 
  Heart, 
  MapPin,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Place } from "@/types/place";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { saveFavoritePlace, isFavoritePlaceSaved } from "@/services/favoriteService";

interface PlaceCardProps {
  place: Place;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
  const [liked, setLiked] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Check if this place is already saved as a favorite
    const checkIfFavorite = async () => {
      const isFavorite = await isFavoritePlaceSaved(place.id);
      setLiked(isFavorite);
    };
    
    checkIfFavorite();
  }, [place.id]);

  const handleLikeToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    try {
      await saveFavoritePlace(place.id, !liked);
      setLiked(!liked);
      
      toast({
        title: liked ? "Removed from favorites" : "Added to favorites",
        description: liked 
          ? `You've removed ${place.name} from your favorites` 
          : `You've added ${place.name} to your favorites`,
      });
    } catch (error) {
      console.error("Failed to update favorite status:", error);
      toast({
        title: "Error",
        description: "Failed to update favorite status",
        variant: "destructive"
      });
    }
  };

  return (
    <Link to={`/place/${place.id}`} className="block">
      <div className="bg-card rounded-lg overflow-hidden hover-lift relative h-64 group">
        {/* Image container */}
        {imageError ? (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
          </div>
        ) : (
          <img
            src={place.imageUrl}
            alt={place.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-1">
              <div>
                {place.localFavorite && (
                  <Badge variant="outline" className="bg-primary/80 text-white text-xs mb-2 backdrop-blur-sm">
                    Local Favorite
                  </Badge>
                )}
                <h3 className="text-xl font-semibold text-white">{place.name}</h3>
              </div>
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full bg-white/30 backdrop-blur-sm ${
                  liked ? "text-red-500" : "text-white"
                }`}
                onClick={handleLikeToggle}
              >
                <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
              </Button>
            </div>
            
            <div className="flex items-center text-white/90 text-sm mb-1">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span className="truncate">{place.location}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCard;
