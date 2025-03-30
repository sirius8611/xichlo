
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";
import { Place } from "@/types/place";
import { getPlaceById, savePlace } from "@/services/placeService";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, MinusCircle, MapPin, ArrowLeft } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

const AddEditPlace = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState<Partial<Place>>({
    name: "",
    description: "",
    imageUrl: "",
    location: "",
    coordinates: { lat: 0, lng: 0 },
    rating: 4.5,
    reviewCount: 0,
    priceLevel: 1,
    tags: [],
    timeToVisit: "1-2 hours",
    localFavorite: false,
    travelStyles: ["explorer"],
    bestTimeOfDay: "Morning",
    createdBy: {
      id: "user-1", // Placeholder user ID
      name: "Current User", // Placeholder user name
      isLocal: false
    }
  });
  
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  
  useEffect(() => {
    const loadPlace = async () => {
      if (isEditMode && id) {
        setLoading(true);
        try {
          const place = await getPlaceById(id);
          setFormData(place);
          setIsOwner(place.createdBy?.isLocal || false);
        } catch (error) {
          console.error("Failed to load place:", error);
          toast({
            title: "Error",
            description: "Failed to load place data. Please try again later.",
            variant: "destructive"
          });
          navigate("/recommend");
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadPlace();
  }, [id, isEditMode, navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (checked: boolean, name: string) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSliderChange = (value: number[]) => {
    setFormData(prev => ({ ...prev, priceLevel: value[0] }));
  };
  
  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag("");
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };
  
  const handleTravelStyleChange = (style: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      travelStyles: checked
        ? [...(prev.travelStyles || []), style]
        : prev.travelStyles?.filter(s => s !== style) || []
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.location) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Update createdBy with owner status
      const updatedFormData = {
        ...formData,
        createdBy: {
          ...formData.createdBy,
          isLocal: isOwner
        }
      };
      
      // For new places, generate an ID
      if (!isEditMode) {
        updatedFormData.id = uuidv4();
      }
      
      await savePlace(updatedFormData as Place);
      
      toast({
        title: isEditMode ? "Place updated" : "Place added",
        description: isEditMode 
          ? "The place has been successfully updated." 
          : "The place has been successfully added."
      });
      
      navigate("/recommend");
    } catch (error) {
      console.error("Failed to save place:", error);
      toast({
        title: "Error",
        description: "Failed to save the place. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  if (loading && isEditMode) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-64 bg-muted rounded w-full max-w-2xl mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate("/recommend")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Recommendations
          </Button>
          
          <h1 className="text-3xl font-bold mb-6">
            {isEditMode ? "Edit Place" : "Add New Place"}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Place Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter the name of the place"
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
                      placeholder="Describe this place..."
                      rows={5}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="location">Location *</Label>
                    <div className="flex gap-2">
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="e.g., 123 Main St, City, Country"
                        className="flex-grow"
                        required
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        title="Use current location"
                      >
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                      id="imageUrl"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      placeholder="Enter image URL"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="timeToVisit">Recommended Visit Duration</Label>
                    <Input
                      id="timeToVisit"
                      name="timeToVisit"
                      value={formData.timeToVisit}
                      onChange={handleInputChange}
                      placeholder="e.g., 2-3 hours"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>Price Level (${formData.priceLevel})</Label>
                    <Slider
                      value={[formData.priceLevel || 1]}
                      min={1}
                      max={3}
                      step={1}
                      onValueChange={handleSliderChange}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>Tags</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add a tag"
                        className="flex-grow"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTag();
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addTag}
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tags?.map((tag) => (
                        <div 
                          key={tag} 
                          className="flex items-center gap-1 bg-secondary rounded-full px-3 py-1"
                        >
                          <span className="text-sm">{tag}</span>
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <MinusCircle className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>Travel Styles</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {['explorer', 'foodie', 'cultural', 'adventure', 'relaxation', 'nightlife'].map((style) => (
                        <div key={style} className="flex items-center space-x-2">
                          <Checkbox
                            id={`style-${style}`}
                            checked={formData.travelStyles?.includes(style) || false}
                            onCheckedChange={(checked) => 
                              handleTravelStyleChange(style, checked as boolean)
                            }
                          />
                          <Label htmlFor={`style-${style}`} className="capitalize">
                            {style}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="localFavorite"
                      checked={formData.localFavorite}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange(checked as boolean, 'localFavorite')
                      }
                    />
                    <Label htmlFor="localFavorite">Mark as Local Favorite</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isOwner"
                      checked={isOwner}
                      onCheckedChange={(checked) => setIsOwner(checked as boolean)}
                    />
                    <Label htmlFor="isOwner">I am the owner/manager of this place</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/recommend")}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : isEditMode ? "Update Place" : "Add Place"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditPlace;
