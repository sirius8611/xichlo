
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Search, X } from "lucide-react";

interface LocationPickerProps {
  onClose: () => void;
  onSelectLocation: (lat: number, lng: number, locationName: string) => void;
}

interface LocationSuggestion {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

// For demo purposes, we'll use some hardcoded locations
const popularLocations: LocationSuggestion[] = [
  { id: "1", name: "Paris, France", lat: 48.8566, lng: 2.3522 },
  { id: "2", name: "Tokyo, Japan", lat: 35.6762, lng: 139.6503 },
  { id: "3", name: "New York, USA", lat: 40.7128, lng: -74.0060 },
  { id: "4", name: "Sydney, Australia", lat: -33.8688, lng: 151.2093 },
  { id: "5", name: "Cairo, Egypt", lat: 30.0444, lng: 31.2357 },
  { id: "6", name: "Rio de Janeiro, Brazil", lat: -22.9068, lng: -43.1729 },
  { id: "7", name: "London, UK", lat: 51.5074, lng: -0.1278 },
  { id: "8", name: "Bangkok, Thailand", lat: 13.7563, lng: 100.5018 },
];

const LocationPicker = ({ onClose, onSelectLocation }: LocationPickerProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<LocationSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Simple search function for demo - would be replaced with real geocoding API
    if (searchQuery.trim().length > 2) {
      const filteredLocations = popularLocations.filter(location => 
        location.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredLocations);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSelectLocation = (location: LocationSuggestion) => {
    onSelectLocation(location.lat, location.lng, location.name);
    setIsOpen(false);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose a location</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9 pr-4"
              placeholder="Search for a city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-9 w-9"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {searchResults.length > 0 && (
            <div className="border rounded-md overflow-hidden">
              <div className="divide-y">
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    className="flex items-center gap-2 w-full p-3 text-left hover:bg-muted transition-colors"
                    onClick={() => handleSelectLocation(result)}
                  >
                    <MapPin className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                    <span>{result.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {searchQuery.trim().length > 2 && searchResults.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-2">
              No locations found. Try a different search term.
            </p>
          )}
          
          <div className="space-y-2">
            <Label className="text-sm font-medium">Popular Destinations</Label>
            <div className="grid grid-cols-2 gap-2">
              {popularLocations.slice(0, 6).map((location) => (
                <button
                  key={location.id}
                  className="flex items-center gap-1.5 text-sm p-2 border rounded-md hover:bg-muted transition-colors"
                  onClick={() => handleSelectLocation(location)}
                >
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="truncate">{location.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="flex space-x-2 sm:justify-end">
          <Button variant="outline" onClick={handleDialogClose}>Cancel</Button>
          <Button 
            onClick={() => {
              // Use browser geolocation
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    onSelectLocation(
                      position.coords.latitude,
                      position.coords.longitude,
                      "Your Current Location"
                    );
                    setIsOpen(false);
                  },
                  (error) => {
                    console.error("Error getting location:", error);
                  }
                );
              }
            }}
          >
            Use My Location
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LocationPicker;
