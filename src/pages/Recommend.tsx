
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Place } from "@/types/place";
import { Plus, Edit, Trash2, Search, MapPin, Image as ImageIcon, AlertCircle, Map, ThumbsUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { getPlaces, deletePlace } from "@/services/placeService";
import { getRecommendedPlaceIds, saveRecommendedPlace } from "@/services/recommendService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
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
  const [recommendedPlaces, setRecommendedPlaces] = useState<Place[]>([]);
  const [myPlaces, setMyPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("recommended");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [deleteInProgress, setDeleteInProgress] = useState<string | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadPlacesAndRecommendations = async () => {
      setLoading(true);
      try {
        const [fetchedPlaces, recommendedIds] = await Promise.all([
          getPlaces(),
          getRecommendedPlaceIds()
        ]);
        
        // Filter recommended places
        const userRecommendedPlaces = fetchedPlaces.filter(place => 
          recommendedIds.includes(place.id)
        );
        
        // Filter user created places
        const userCreatedPlaces = fetchedPlaces.filter(place => 
          place.createdBy?.id === CURRENT_USER_ID
        );
        
        setPlaces(fetchedPlaces);
        setRecommendedPlaces(userRecommendedPlaces);
        setMyPlaces(userCreatedPlaces);
        setFilteredPlaces(activeTab === "recommended" ? userRecommendedPlaces : userCreatedPlaces);
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
    
    loadPlacesAndRecommendations();
  }, [activeTab]);
  
  useEffect(() => {
    const currentList = activeTab === "recommended" ? recommendedPlaces : myPlaces;
    
    if (searchQuery.trim() === "") {
      setFilteredPlaces(currentList);
    } else {
      const filtered = currentList.filter(place => 
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPlaces(filtered);
    }
  }, [searchQuery, recommendedPlaces, myPlaces, activeTab]);
  
  const handleDeletePlace = async (id: string) => {
    setDeleteInProgress(id);
    try {
      await deletePlace(id);
      
      // Update both lists
      const updatedMyPlaces = myPlaces.filter(place => place.id !== id);
      setMyPlaces(updatedMyPlaces);
      
      const updatedRecommendedPlaces = recommendedPlaces.filter(place => place.id !== id);
      setRecommendedPlaces(updatedRecommendedPlaces);
      
      // Update filtered list based on active tab
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

  const handleToggleRecommend = async (placeId: string, currently: boolean) => {
    try {
      await saveRecommendedPlace(placeId, !currently);
      
      if (currently) {
        // Remove from recommended list
        setRecommendedPlaces(prev => prev.filter(place => place.id !== placeId));
        if (activeTab === "recommended") {
          setFilteredPlaces(prev => prev.filter(place => place.id !== placeId));
        }
      } else {
        // Add to recommended list
        const placeToAdd = places.find(place => place.id === placeId);
        if (placeToAdd) {
          setRecommendedPlaces(prev => [...prev, placeToAdd]);
          if (activeTab === "recommended") {
            setFilteredPlaces(prev => [...prev, placeToAdd]);
          }
        }
      }
      
      toast({
        title: currently ? "Removed from recommendations" : "Added to recommendations",
        description: currently 
          ? "This place has been removed from your recommendations" 
          : "This place has been added to your recommendations",
      });
    } catch (error) {
      console.error("Failed to update recommendation:", error);
      toast({
        title: "Error",
        description: "Failed to update recommendation status",
        variant: "destructive"
      });
    }
  };

  // Check if current user is the owner of the place
  const isOwner = (place: Place) => {
    return place.createdBy?.id === CURRENT_USER_ID;
  };
  
  // Check if place is recommended
  const isRecommended = (placeId: string) => {
    return recommendedPlaces.some(place => place.id === placeId);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchQuery("");
    
    // Update filtered results based on selected tab
    if (value === "recommended") {
      setFilteredPlaces(recommendedPlaces);
    } else {
      setFilteredPlaces(myPlaces);
    }
  };
  
  const renderPlaceList = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 gap-4">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row gap-4">
              <Skeleton className="h-32 w-full sm:w-48" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    if (filteredPlaces.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="bg-muted p-8 rounded-lg inline-block">
            <div className="text-muted-foreground mb-4">
              {activeTab === "recommended" ? (
                <ThumbsUp className="mx-auto h-12 w-12" />
              ) : (
                <Map className="mx-auto h-12 w-12" />
              )}
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">
              {activeTab === "recommended" 
                ? "No recommended places yet" 
                : "You haven't added any places yet"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {activeTab === "recommended"
                ? "Explore places and click the recommend button to add them here."
                : "Start by adding your first place to the map."}
            </p>
            {activeTab === "myplaces" && (
              <Button asChild>
                <Link to="/recommend/add">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Place
                </Link>
              </Button>
            )}
          </div>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 gap-4">
        {filteredPlaces.map(place => (
          <div 
            key={place.id} 
            className={`bg-card rounded-lg border overflow-hidden flex flex-col sm:flex-row ${
              isRecommended(place.id) ? 'border-primary/30 bg-primary/5' : ''
            }`}
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
                      className={`${isRecommended(place.id) ? 'text-amber-500' : ''}`}
                      onClick={() => handleToggleRecommend(place.id, isRecommended(place.id))}
                    >
                      <ThumbsUp className={`h-4 w-4 ${isRecommended(place.id) ? 'fill-current' : ''}`} />
                    </Button>
                    
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
                
                {isRecommended(place.id) && (
                  <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-1 rounded-full flex items-center">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    Recommended
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Map className="h-8 w-8 text-primary" />
              My Maps
            </h1>
            <p className="text-muted-foreground">
              Manage your recommended places and add new locations to the map.
            </p>
          </div>
          
          <Button asChild>
            <Link to="/recommend/add">
              <Plus className="mr-2 h-4 w-4" />
              Add New Place
            </Link>
          </Button>
        </div>
        
        <Tabs 
          defaultValue="recommended" 
          value={activeTab} 
          onValueChange={handleTabChange}
          className="space-y-6"
        >
          <TabsList className="mb-4">
            <TabsTrigger value="recommended" className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4" />
              <span>Recommended Places</span>
            </TabsTrigger>
            <TabsTrigger value="myplaces" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>My Added Places</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search ${activeTab === 'recommended' ? 'recommended' : 'your'} places...`}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <TabsContent value="recommended" className="mt-0 space-y-4">
            {renderPlaceList()}
          </TabsContent>
          
          <TabsContent value="myplaces" className="mt-0 space-y-4">
            {renderPlaceList()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Recommend;
