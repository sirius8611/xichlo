
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getPlaceById } from "@/services/placeService";
import { Place } from "@/types/place";
import { ArrowLeft, MapPin, Star, Clock, DollarSign, Calendar, Image as ImageIcon, Book } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Sample guide type for display in the place details
interface Guide {
  id: string;
  title: string;
  description: string;
  places: string[];
  imageUrl: string;
  createdAt: string;
  createdBy?: {
    id: string;
    name: string;
  };
}

// Sample guides for demo
const sampleGuides: Guide[] = [
  {
    id: "guide1",
    title: "Best Food Tour in Hanoi",
    description: "A 3-day food adventure exploring the best street food in Hanoi.",
    places: ["place1", "place2", "place3"],
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
    createdAt: "2023-09-01",
    createdBy: {
      id: "user1",
      name: "Travel Explorer"
    }
  },
  {
    id: "guide2",
    title: "Weekend in Da Nang",
    description: "A perfect weekend itinerary for exploring Da Nang's beaches and mountains.",
    places: ["place4", "place5"],
    imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    createdAt: "2023-10-15",
    createdBy: {
      id: "user2",
      name: "Beach Lover"
    }
  }
];

const PlaceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [relatedGuides, setRelatedGuides] = useState<Guide[]>([]);

  useEffect(() => {
    const loadPlace = async () => {
      setLoading(true);
      setImageError(false);
      try {
        if (id) {
          const placeData = await getPlaceById(id);
          setPlace(placeData || null);
          
          // Find guides that include this place
          if (placeData) {
            const guidesWithThisPlace = sampleGuides.filter(guide => 
              guide.places.includes(placeData.id)
            );
            setRelatedGuides(guidesWithThisPlace);
          }
        }
      } catch (error) {
        console.error("Failed to load place:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPlace();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse h-96 bg-secondary rounded-lg mb-6"></div>
          <div className="animate-pulse h-10 bg-secondary rounded-lg w-1/3 mb-4"></div>
          <div className="animate-pulse h-4 bg-secondary rounded-lg w-2/3 mb-2"></div>
          <div className="animate-pulse h-4 bg-secondary rounded-lg w-1/2 mb-6"></div>
          <div className="animate-pulse h-40 bg-secondary rounded-lg mb-8"></div>
        </div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-medium mb-4">Place not found</h2>
          <p className="mb-6">The place you're looking for doesn't exist or has been removed.</p>
          <Link to="/explore">
            <Button>Return to Explore</Button>
          </Link>
        </div>
      </div>
    );
  }

  const renderPriceLevel = (level: number) => {
    return Array(3)
      .fill(0)
      .map((_, i) => (
        <DollarSign
          key={i}
          className={`h-3.5 w-3.5 ${i < level ? "text-foreground" : "text-muted-foreground/30"}`}
        />
      ));
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <Link to="/explore" className="inline-flex items-center text-sm mb-6 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Explore
        </Link>

        <div className="w-full h-72 md:h-96 rounded-lg overflow-hidden mb-8">
          {imageError ? (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <ImageIcon className="h-20 w-20 text-muted-foreground/50" />
              <span className="text-muted-foreground ml-2">Image not available</span>
            </div>
          ) : (
            <img 
              src={place.imageUrl} 
              alt={place.name} 
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="mb-6">
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-2xl md:text-3xl font-semibold">{place.name}</h1>
                <div className="flex items-center bg-secondary px-2 py-1 rounded">
                  <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                  <span className="font-medium">{place.rating.toFixed(1)}</span>
                  <span className="text-xs text-muted-foreground ml-1">({place.reviewCount})</span>
                </div>
              </div>

              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                <span>{place.location}</span>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {place.tags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="bg-background text-foreground text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-medium mb-3">About this place</h2>
              <p className="text-muted-foreground">{place.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-medium mb-3">Travel Guides featuring this place</h2>
              {relatedGuides.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {relatedGuides.map(guide => (
                    <Card key={guide.id} className="overflow-hidden">
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-36 h-24 bg-muted">
                          {guide.imageUrl ? (
                            <img
                              src={guide.imageUrl}
                              alt={guide.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-muted">
                              <Book className="h-8 w-8 text-muted-foreground/30" />
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium mb-1">{guide.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{guide.description}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>By {guide.createdBy?.name || "Anonymous"}</span>
                            <span className="mx-1">•</span>
                            <span>{new Date(guide.createdAt).toLocaleDateString()}</span>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <Book className="h-5 w-5 text-muted-foreground mr-2" />
                      <p className="text-sm text-muted-foreground italic">
                        No travel guides include this place yet. 
                        <Link to="/creator/guide/add" className="ml-1 text-primary hover:underline">
                          Create the first guide!
                        </Link>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <div>
            <div className="sticky top-24">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Plan your visit</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Best time to visit</span>
                      </div>
                      <span className="text-sm font-medium">{place.timeToVisit}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm">
                        <DollarSign className="h-4 w-4 mr-2" />
                        <span>Price range</span>
                      </div>
                      <div className="flex">
                        {renderPriceLevel(place.priceLevel)}
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full mb-2">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book a tour
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    Tours provided by local guides
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
