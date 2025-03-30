import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Place } from "@/types/place";
import { Book, Building, Edit, Trash2, Plus, MapPin, User, Image as ImageIcon } from "lucide-react";
import { getPlaces, deletePlace } from "@/services/placeService";
import { toast } from "@/components/ui/use-toast";
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

// Sample guide type for demo purposes
interface Guide {
  id: string;
  title: string;
  description: string;
  places: string[];
  imageUrl: string;
  createdAt: string;
}

// Sample guides for demo
const sampleGuides: Guide[] = [
  {
    id: "guide1",
    title: "Best Food Tour in Hanoi",
    description: "A 3-day food adventure exploring the best street food in Hanoi.",
    places: ["place1", "place2", "place3"],
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
    createdAt: "2023-09-01"
  },
  {
    id: "guide2",
    title: "Weekend in Da Nang",
    description: "A perfect weekend itinerary for exploring Da Nang's beaches and mountains.",
    places: ["place4", "place5"],
    imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    createdAt: "2023-10-15"
  }
];

const Creator = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [guides, setGuides] = useState<Guide[]>(sampleGuides);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("places");
  const [deleteInProgress, setDeleteInProgress] = useState<string | null>(null);
  
  useEffect(() => {
    const loadPlaces = async () => {
      setLoading(true);
      try {
        const fetchedPlaces = await getPlaces();
        // Filter to only show places where user is marked as owner
        const ownedPlaces = fetchedPlaces.filter(place => place.createdBy?.isLocal === true);
        setPlaces(ownedPlaces);
      } catch (error) {
        console.error("Failed to load places:", error);
        toast({
          title: "Error",
          description: "Failed to load your places. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadPlaces();
  }, []);
  
  const handleDeletePlace = async (id: string) => {
    setDeleteInProgress(id);
    try {
      await deletePlace(id);
      setPlaces(prevPlaces => prevPlaces.filter(place => place.id !== id));
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
  
  const handleDeleteGuide = async (id: string) => {
    // This would be an API call in a real app
    // For demo purposes, we'll just update the local state
    setGuides(guides.filter(guide => guide.id !== id));
    toast({
      title: "Guide deleted",
      description: "The guide has been successfully deleted."
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Creator Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your places and create travel guides
            </p>
          </div>
        </div>
        
        <Tabs 
          defaultValue="places" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="places" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span>My Places</span>
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              <span>My Guides</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="places" className="space-y-4">
            <div className="flex justify-end">
              <Button asChild>
                <Link to="/recommend/add">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Place
                </Link>
              </Button>
            </div>
            
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, idx) => (
                  <div key={idx} className="bg-card rounded-lg shadow-md h-32 animate-pulse" />
                ))}
              </div>
            ) : places.length > 0 ? (
              <div className="space-y-4">
                {places.map((place) => (
                  <Card key={place.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
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
                      
                      <CardContent className="p-4 flex-grow flex flex-col justify-between">
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
                                onClick={() => window.open(`/place/${place.id}`, '_blank')}
                              >
                                <MapPin className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                asChild
                              >
                                <Link to={`/recommend/edit/${place.id}`}>
                                  <Edit className="h-4 w-4" />
                                </Link>
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
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
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
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            Owner
                          </span>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-muted p-8 rounded-lg inline-block">
                  <div className="text-muted-foreground mb-4">
                    <Building className="mx-auto h-12 w-12" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-1">No places found</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't added any places as an owner/manager yet.
                  </p>
                  <Button asChild>
                    <Link to="/recommend/add">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Place
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="guides" className="space-y-4">
            <div className="flex justify-end">
              <Button asChild>
                <Link to="/creator/guide/add">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Guide
                </Link>
              </Button>
            </div>
            
            {guides.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {guides.map((guide) => (
                  <Card key={guide.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-48 bg-muted relative">
                      {guide.imageUrl ? (
                        <img
                          src={guide.imageUrl}
                          alt={guide.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <Book className="h-12 w-12 text-muted-foreground/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-xl font-semibold text-white">{guide.title}</h3>
                        <div className="flex items-center text-white/80 text-sm mt-1">
                          <User className="h-3.5 w-3.5 mr-1" />
                          <span>You • {new Date(guide.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 flex gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                          asChild
                        >
                          <Link to={`/creator/guide/edit/${guide.id}`}>
                            <Edit className="h-4 w-4 text-white" />
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                            >
                              <Trash2 className="h-4 w-4 text-white" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Guide</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete '{guide.title}'? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => handleDeleteGuide(guide.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-muted-foreground line-clamp-2">{guide.description}</p>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {guide.places.length} {guide.places.length === 1 ? 'place' : 'places'}
                        </span>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/creator/guide/edit/${guide.id}`}>
                            Edit Guide
                          </Link>
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
                    <Book className="mx-auto h-12 w-12" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-1">No guides created</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first travel guide to share with others.
                  </p>
                  <Button asChild>
                    <Link to="/creator/guide/add">
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Guide
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Creator;
