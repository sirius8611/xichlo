
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Place } from "@/types/place";
import { Plus, Edit, Trash2, Search, MapPin, Image as ImageIcon, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { getPlaces, deletePlace } from "@/services/placeService";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Mock user ID for demo purposes - in a real app this would come from auth
const CURRENT_USER_ID = "user123";

const Recommend = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [deleteInProgress, setDeleteInProgress] = useState<string | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadPlaces = async () => {
      setLoading(true);
      try {
        const fetchedPlaces = await getPlaces();
        setPlaces(fetchedPlaces);
        setFilteredPlaces(fetchedPlaces);
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
      setFilteredPlaces(places);
    } else {
      const filtered = places.filter(place => 
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPlaces(filtered);
    }
  }, [searchQuery, places]);
  
  const handleDeletePlace = async (id: string) => {
    setDeleteInProgress(id);
    try {
      await deletePlace(id);
      setPlaces(prevPlaces => prevPlaces.filter(place => place.id !== id));
      setFilteredPlaces(prevFiltered => prevFiltered.filter(place => place.id !== id));
      toast({
        title: "Place deleted",
        description: "The place has been successfully deleted."
      });
    } catch (error) {
      console.error("Failed to delete place:", error);
      toast({
        title: "Error",
        description: "Failed to delete the place. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setDeleteInProgress(null);
    }
  };

  // Check if current user is the owner of the place
  const isOwner = (place: Place) => {
    return place.createdBy?.id === CURRENT_USER_ID;
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Recommend Places</h1>
            <p className="text-muted-foreground">
              Share your favorite places or add your own business.
            </p>
          </div>
          
          <Button asChild>
            <Link to="/recommend/add">
              <Plus className="mr-2 h-4 w-4" />
              Add New Place
            </Link>
          </Button>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search places..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="bg-card rounded-lg shadow-md h-32 animate-pulse" />
            ))}
          </div>
        ) : filteredPlaces.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredPlaces.map(place => (
              <div 
                key={place.id} 
                className="bg-card rounded-lg border overflow-hidden flex flex-col sm:flex-row"
              >
                <div className="w-full sm:w-48 h-32 bg-muted">
                  {place.imageUrl ? (
                    <img 
                      src={place.imageUrl} 
                      alt={place.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "";
                        e.currentTarget.parentElement!.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center bg-muted">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground/50">
                              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                              <circle cx="9" cy="9" r="2"/>
                              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                            </svg>
                          </div>
                        `;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                  )}
                </div>
                
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{place.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          <span>{place.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => navigate(`/place/${place.id}`)}
                        >
                          <MapPin className="h-4 w-4" />
                        </Button>
                        
                        {isOwner(place) ? (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => navigate(`/recommend/edit/${place.id}`)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Place</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete '{place.name}'? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    onClick={() => handleDeletePlace(place.id)}
                                    disabled={deleteInProgress === place.id}
                                  >
                                    {deleteInProgress === place.id ? "Deleting..." : "Delete"}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </>
                        ) : (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <AlertCircle className="h-4 w-4 mr-1 text-amber-500" />
                            <span className="text-xs">Only owners can edit</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex justify-between items-center">
                    <div className="flex flex-wrap gap-1">
                      {place.tags.slice(0, 3).map((tag, index) => (
                        <span 
                          key={index} 
                          className="inline-block px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                      {place.tags.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{place.tags.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    {place.createdBy?.isLocal && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        Owner
                      </span>
                    )}
                  </div>
                </div>
              </div>
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
              <h3 className="text-lg font-medium text-foreground mb-1">No places found</h3>
              {searchQuery ? (
                <p className="text-muted-foreground mb-4">No places match your search criteria</p>
              ) : (
                <p className="text-muted-foreground mb-4">Start by adding your favorite places</p>
              )}
              <Button asChild>
                <Link to="/recommend/add">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Place
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommend;
