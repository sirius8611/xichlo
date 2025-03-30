
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Star } from "lucide-react";
import { Place } from "@/types/place";
import { getPlaces, getPlaceById } from "@/services/placeService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddEditExperience = () => {
  const navigate = useNavigate();
  const { id, placeId } = useParams<{ id?: string; placeId?: string }>();
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    placeId: placeId || "",
    rating: 5,
  });
  
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const loadPlaces = async () => {
      setLoading(true);
      try {
        const fetchedPlaces = await getPlaces();
        setPlaces(fetchedPlaces);
        
        // If placeId is provided, fetch the place details
        if (placeId) {
          const place = await getPlaceById(placeId);
          setSelectedPlace(place);
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
  }, [placeId]);
  
  // For edit mode - would fetch the experience by ID in a real app
  useEffect(() => {
    if (isEditMode && id) {
      // This would be replaced with an API call in a real app
      // For demo purposes, we'll just show a toast
      toast({
        title: "Demo Mode",
        description: "Editing functionality is part of the demo. No actual data is fetched.",
      });
    }
  }, [id, isEditMode]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePlaceChange = async (value: string) => {
    setFormData(prev => ({ ...prev, placeId: value }));
    
    try {
      const place = await getPlaceById(value);
      setSelectedPlace(place);
    } catch (error) {
      console.error("Failed to load place details:", error);
      setSelectedPlace(null);
    }
  };
  
  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.placeId) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    // This would be an API call in a real app
    // For demo purposes, we'll just show a success toast
    setTimeout(() => {
      toast({
        title: isEditMode ? "Experience updated" : "Experience shared",
        description: isEditMode 
          ? "Your experience has been successfully updated." 
          : "Your experience has been successfully shared."
      });
      
      setLoading(false);
      navigate("/experiences");
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate("/experiences")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Experiences
          </Button>
          
          <h1 className="text-3xl font-bold mb-6">
            {isEditMode ? "Edit Experience" : "Share Your Experience"}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Give your experience a title"
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="placeId">Place *</Label>
                    <Select
                      value={formData.placeId}
                      onValueChange={handlePlaceChange}
                      disabled={Boolean(placeId)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a place" />
                      </SelectTrigger>
                      <SelectContent>
                        {places.map((place) => (
                          <SelectItem key={place.id} value={place.id}>
                            {place.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedPlace && (
                    <div className="bg-muted p-3 rounded-md">
                      <h3 className="font-medium">{selectedPlace.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedPlace.location}
                      </p>
                    </div>
                  )}
                  
                  <div className="grid gap-2">
                    <Label>Rating</Label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="focus:outline-none"
                          onClick={() => handleRatingChange(star)}
                        >
                          <Star
                            className={`h-6 w-6 ${
                              star <= formData.rating
                                ? "text-yellow-500 fill-current"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="content">Your Experience *</Label>
                    <Textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="Share your experience in detail..."
                      rows={8}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/experiences")}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : isEditMode ? "Update Experience" : "Share Experience"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditExperience;
