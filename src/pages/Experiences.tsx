
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import PlaceCard from "@/components/PlaceCard";
import { Place } from "@/types/place";
import { getPlaces } from "@/services/placeService";
import { getRecommendedPlaceIds } from "@/services/recommendService";
import { toast } from "@/components/ui/use-toast";
import { ThumbsUp } from "lucide-react";

const Experiences = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedPlaces = async () => {
      setLoading(true);
      try {
        const recommendedPlaceIds = await getRecommendedPlaceIds();
        const allPlaces = await getPlaces();
        
        // Filter places that are in the recommended list
        const recommendedPlaces = allPlaces.filter(place => 
          recommendedPlaceIds.includes(place.id)
        );
        
        setPlaces(recommendedPlaces);
      } catch (error) {
        console.error("Error fetching recommended places:", error);
        toast({
          title: "Error",
          description: "Failed to load recommended places",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedPlaces();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <ThumbsUp className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Your Recommended Places</h1>
        </div>
        
        <p className="text-muted-foreground mb-8">
          Places you've recommended during your travels.
        </p>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="bg-card rounded-lg h-64 animate-pulse" />
            ))}
          </div>
        ) : places.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map(place => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-muted p-8 rounded-lg inline-block">
              <div className="text-muted-foreground mb-4">
                <ThumbsUp className="mx-auto h-12 w-12" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-1">No recommendations yet</h3>
              <p className="text-muted-foreground mb-4">
                Visit Explore or Discovery pages to recommend places you like.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Experiences;
