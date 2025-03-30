
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Place } from "@/types/place";
import { Search, Plus, User, Star, Calendar, MapPin } from "lucide-react";
import { getPlaces } from "@/services/placeService";
import { toast } from "@/components/ui/use-toast";

// For demo purposes - would come from an API in a real app
interface Experience {
  id: string;
  title: string;
  content: string;
  placeId: string;
  placeName: string;
  placeLocation: string;
  rating: number;
  author: {
    name: string;
    avatar?: string;
  };
  date: string;
}

const sampleExperiences: Experience[] = [
  {
    id: "exp1",
    title: "Amazing Food Experience",
    content: "The food here was incredible! I especially loved the traditional dishes and the staff was very friendly.",
    placeId: "place1",
    placeName: "Local Restaurant",
    placeLocation: "Hanoi, Vietnam",
    rating: 5,
    author: {
      name: "John Doe"
    },
    date: "2023-08-15"
  },
  {
    id: "exp2",
    title: "Beautiful Views",
    content: "This place has the most stunning views I've ever seen. Perfect for photography enthusiasts.",
    placeId: "place2",
    placeName: "Mountain Viewpoint",
    placeLocation: "Da Nang, Vietnam",
    rating: 4.5,
    author: {
      name: "Jane Smith"
    },
    date: "2023-09-20"
  }
];

const Experiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>(sampleExperiences);
  const [places, setPlaces] = useState<Place[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>(sampleExperiences);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadPlaces = async () => {
      setLoading(true);
      try {
        const fetchedPlaces = await getPlaces();
        setPlaces(fetchedPlaces);
      } catch (error) {
        console.error("Failed to load places:", error);
        toast({
          title: "Error",
          description: "Failed to load places. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadPlaces();
  }, []);
  
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredExperiences(experiences);
    } else {
      const filtered = experiences.filter(exp => 
        exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.placeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredExperiences(filtered);
    }
  }, [searchQuery, experiences]);
  
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating) 
              ? "text-yellow-500 fill-current" 
              : i < rating 
                ? "text-yellow-500 fill-current opacity-50" 
                : "text-muted-foreground/30"
          }`}
        />
      ));
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Travel Experiences</h1>
            <p className="text-muted-foreground">
              Share your experiences or read about others' adventures.
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button asChild variant="outline">
              <Link to={`/experiences/add`}>
                <Plus className="mr-2 h-4 w-4" />
                Share Experience
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search experiences..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Write about a place you've visited</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {places.slice(0, 3).map((place) => (
              <Card key={place.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-32 bg-muted relative">
                  {place.imageUrl ? (
                    <img
                      src={place.imageUrl}
                      alt={place.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <MapPin className="h-8 w-8 text-muted-foreground/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <h3 className="absolute bottom-0 left-0 text-white font-medium p-4">{place.name}</h3>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      {place.location}
                    </div>
                    <Button asChild size="sm">
                      <Link to={`/experiences/add/${place.id}`}>
                        Write
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {places.length > 3 && (
            <div className="text-center mt-4">
              <Button variant="outline" asChild>
                <Link to="/discovery">View More Places</Link>
              </Button>
            </div>
          )}
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Experiences</h2>
          
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="bg-card rounded-lg shadow-md h-40 animate-pulse" />
              ))}
            </div>
          ) : filteredExperiences.length > 0 ? (
            <div className="space-y-4">
              {filteredExperiences.map((experience) => (
                <Card key={experience.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{experience.title}</h3>
                      <div className="flex">{renderStars(experience.rating)}</div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        <Link 
                          to={`/place/${experience.placeId}`}
                          className="hover:text-foreground"
                        >
                          {experience.placeName}
                        </Link>
                        <span>•</span>
                        <span>{experience.placeLocation}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1 sm:mt-0">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{new Date(experience.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <p className="text-foreground mb-4">{experience.content}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span className="text-sm font-medium">{experience.author.name}</span>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => 
                          toast({
                            title: "Feature coming soon",
                            description: "Reading full experiences will be available soon!"
                          })
                        }
                      >
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-muted p-8 rounded-lg inline-block">
                <div className="text-muted-foreground mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-foreground mb-1">No experiences found</h3>
                {searchQuery ? (
                  <p className="text-muted-foreground mb-4">No experiences match your search criteria</p>
                ) : (
                  <p className="text-muted-foreground mb-4">Be the first to share your travel experiences</p>
                )}
                <Button asChild>
                  <Link to="/experiences/add">
                    <Plus className="mr-2 h-4 w-4" />
                    Share Experience
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Experiences;
