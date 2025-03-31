
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Plus, X, GripVertical, MapPin, Image as ImageIcon, Search } from "lucide-react";
import { Place } from "@/types/place";
import { getPlaces } from "@/services/placeService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { v4 as uuidv4 } from 'uuid';

// Enhanced guide type with more details
interface Guide {
  id: string;
  title: string;
  description: string;
  places: string[]; // Place IDs
  imageUrl: string;
  createdAt: string;
  createdBy?: {
    id: string;
    name: string;
  };
  tags?: string[];
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
    tags: ["food", "local", "hanoi"]
  },
  {
    id: "guide2",
    title: "Weekend in Da Nang",
    description: "A perfect weekend itinerary for exploring Da Nang's beaches and mountains.",
    places: ["place4", "place5"],
    imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    createdAt: "2023-10-15",
    tags: ["beach", "mountains", "weekend"]
  }
];

const AddEditGuide = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState<Partial<Guide>>({
    title: "",
    description: "",
    places: [],
    imageUrl: "",
    tags: [],
  });
  
  const [allPlaces, setAllPlaces] = useState<Place[]>([]);
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [tagInput, setTagInput] = useState("");
  
  useEffect(() => {
    const loadPlaces = async () => {
      setLoading(true);
      try {
        const fetchedPlaces = await getPlaces();
        setAllPlaces(fetchedPlaces);
        
        // If editing, load the guide data
        if (isEditMode && id) {
          const guide = sampleGuides.find(g => g.id === id);
          if (guide) {
            setFormData({
              title: guide.title,
              description: guide.description,
              places: guide.places,
              imageUrl: guide.imageUrl,
              tags: guide.tags,
            });
            
            // Find the selected places
            const placesInGuide = fetchedPlaces.filter(place => 
              guide.places.includes(place.id)
            );
            setSelectedPlaces(placesInGuide);
          } else {
            // Guide not found
            toast({
              title: "Guide not found",
              description: "The guide you're trying to edit doesn't exist.",
              variant: "destructive"
            });
            navigate("/creator");
          }
        }
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
  }, [id, isEditMode, navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddPlace = (placeId: string) => {
    const place = allPlaces.find(p => p.id === placeId);
    if (place && !selectedPlaces.some(p => p.id === placeId)) {
      setSelectedPlaces([...selectedPlaces, place]);
      setFormData(prev => ({
        ...prev,
        places: [...(prev.places || []), placeId]
      }));
      
      toast({
        title: "Place added",
        description: `${place.name} has been added to your guide.`
      });
    }
  };
  
  const handleRemovePlace = (placeId: string) => {
    const place = selectedPlaces.find(p => p.id === placeId);
    setSelectedPlaces(selectedPlaces.filter(place => place.id !== placeId));
    setFormData(prev => ({
      ...prev,
      places: prev.places?.filter(id => id !== placeId) || []
    }));
    
    if (place) {
      toast({
        title: "Place removed",
        description: `${place.name} has been removed from your guide.`
      });
    }
  };
  
  const handleMovePlaceUp = (index: number) => {
    if (index === 0) return;
    
    const newSelectedPlaces = [...selectedPlaces];
    const newPlaceIds = [...(formData.places || [])];
    
    // Swap places
    [newSelectedPlaces[index - 1], newSelectedPlaces[index]] = 
      [newSelectedPlaces[index], newSelectedPlaces[index - 1]];
    
    // Swap IDs
    [newPlaceIds[index - 1], newPlaceIds[index]] = 
      [newPlaceIds[index], newPlaceIds[index - 1]];
    
    setSelectedPlaces(newSelectedPlaces);
    setFormData(prev => ({ ...prev, places: newPlaceIds }));
  };
  
  const handleMovePlaceDown = (index: number) => {
    if (index === selectedPlaces.length - 1) return;
    
    const newSelectedPlaces = [...selectedPlaces];
    const newPlaceIds = [...(formData.places || [])];
    
    // Swap places
    [newSelectedPlaces[index], newSelectedPlaces[index + 1]] = 
      [newSelectedPlaces[index + 1], newSelectedPlaces[index]];
    
    // Swap IDs
    [newPlaceIds[index], newPlaceIds[index + 1]] = 
      [newPlaceIds[index + 1], newPlaceIds[index]];
    
    setSelectedPlaces(newSelectedPlaces);
    setFormData(prev => ({ ...prev, places: newPlaceIds }));
  };
  
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      
      if (!formData.tags?.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...(prev.tags || []), newTag]
        }));
      }
      
      setTagInput("");
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag) || []
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.places?.length) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields and add at least one place.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    // Create a new guide object
    const newGuide: Guide = {
      id: isEditMode && id ? id : uuidv4(),
      title: formData.title!,
      description: formData.description!,
      places: formData.places!,
      imageUrl: formData.imageUrl || "",
      createdAt: isEditMode ? sampleGuides.find(g => g.id === id)?.createdAt || new Date().toISOString() : new Date().toISOString(),
      tags: formData.tags || [],
      createdBy: {
        id: "user1", // In a real app, this would be the current user's ID
        name: "Current User", // In a real app, this would be the current user's name
      }
    };
    
    // In a real app, this would be an API call to save the guide
    // For demo purposes, we'll just show a success toast
    setTimeout(() => {
      toast({
        title: isEditMode ? "Guide updated" : "Guide created",
        description: isEditMode 
          ? "Your guide has been successfully updated and linked to the selected places." 
          : "Your guide has been successfully created and linked to the selected places."
      });
      
      setLoading(false);
      navigate("/creator");
    }, 1000);
  };
  
  // Filter places based on search term
  const filteredPlaces = allPlaces
    .filter(place => !selectedPlaces.some(p => p.id === place.id))
    .filter(place => 
      searchTerm === "" || 
      place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate("/creator")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Creator Dashboard
          </Button>
          
          <h1 className="text-3xl font-bold mb-6">
            {isEditMode ? "Edit Guide" : "Create New Guide"}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Guide Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Give your guide a title"
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your guide..."
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="imageUrl">Cover Image URL</Label>
                    <Input
                      id="imageUrl"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      placeholder="Enter image URL for your guide cover"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="tags">Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.tags?.map((tag, index) => (
                        <div 
                          key={index} 
                          className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm flex items-center"
                        >
                          {tag}
                          <button 
                            type="button" 
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 text-secondary-foreground/70 hover:text-secondary-foreground"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <Input
                      id="tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      placeholder="Type a tag and press Enter"
                    />
                    <p className="text-xs text-muted-foreground">
                      Add tags to help users find your guide. Press Enter to add each tag.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Places in Your Guide</h2>
              </div>
              
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <Label htmlFor="search-places">Search Places</Label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search-places"
                        type="text"
                        placeholder="Search by name, location, or tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                      {filteredPlaces.length > 0 ? (
                        filteredPlaces.map((place) => (
                          <div 
                            key={place.id} 
                            className="flex items-center justify-between p-2 border rounded-md hover:bg-muted cursor-pointer"
                            onClick={() => handleAddPlace(place.id)}
                          >
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-muted rounded-md mr-2 flex-shrink-0">
                                {place.imageUrl ? (
                                  <img 
                                    src={place.imageUrl} 
                                    alt={place.name} 
                                    className="w-full h-full object-cover rounded-md"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <ImageIcon className="h-4 w-4 text-muted-foreground/50" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">{place.name}</h4>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  <span>{place.location}</span>
                                </div>
                              </div>
                            </div>
                            <Plus className="h-4 w-4 text-muted-foreground" />
                          </div>
                        ))
                      ) : (
                        <div className="col-span-2 text-center py-4 text-muted-foreground">
                          {searchTerm ? "No places match your search" : "No more places available to add"}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {selectedPlaces.length > 0 ? (
                <div className="space-y-2">
                  <h3 className="text-base font-medium">Selected Places</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Arrange places in the order you want them to appear in your guide
                  </p>
                  
                  {selectedPlaces.map((place, index) => (
                    <Card key={place.id} className="overflow-hidden">
                      <div className="flex items-center p-4">
                        <div className="mr-3 text-muted-foreground">
                          <GripVertical className="h-5 w-5 cursor-move" />
                        </div>
                        
                        <div className="w-12 h-12 bg-muted rounded-md mr-4 flex-shrink-0">
                          {place.imageUrl ? (
                            <img 
                              src={place.imageUrl} 
                              alt={place.name} 
                              className="w-full h-full object-cover rounded-md"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="h-6 w-6 text-muted-foreground/50" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-grow">
                          <h3 className="font-medium">{place.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5 mr-1" />
                            <span>{place.location}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleMovePlaceUp(index)}
                            disabled={index === 0}
                            className="text-muted-foreground"
                          >
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="16" 
                              height="16" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            >
                              <path d="m18 15-6-6-6 6"/>
                            </svg>
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleMovePlaceDown(index)}
                            disabled={index === selectedPlaces.length - 1}
                            className="text-muted-foreground"
                          >
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="16" 
                              height="16" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            >
                              <path d="m6 9 6 6 6-6"/>
                            </svg>
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemovePlace(place.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-muted rounded-lg">
                  <div className="text-muted-foreground">
                    <svg 
                      className="mx-auto h-12 w-12" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1.5} 
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                      />
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1.5} 
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-foreground mt-4 mb-2">No places added yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Add places to include in your guide
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/creator")}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : isEditMode ? "Update Guide" : "Create Guide"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditGuide;
