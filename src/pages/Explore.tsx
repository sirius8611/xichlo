
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import PlaceCard from "@/components/PlaceCard";
import PreferenceFilters from "@/components/PreferenceFilters";
import LocationDetails from "@/components/LocationDetails";
import { getFilteredPlaces } from "@/services/placeService";
import { Place } from "@/types/place";
import { MapPin, Compass, SlidersHorizontal, X, Navigation, MapPinned, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "@/hooks/use-location";
import { toast } from "@/components/ui/use-toast";
import LocationPicker from "@/components/LocationPicker";
import { Card, CardContent } from "@/components/ui/card";

const Explore = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    travelStyles: ["explorer"],
    budget: 3,
    useRealTimeLocation: true
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [customLocation, setCustomLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationInfo, setLocationInfo] = useState<any>(null);
  const [loadingLocationInfo, setLoadingLocationInfo] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  useEffect(() => {
    if (location.error && !location.error.includes("default")) {
      toast({
        title: "Location Error",
        description: location.error,
        variant: "destructive"
      });
    }
  }, [location.error]);

  useEffect(() => {
    const fetchLocationInfo = async () => {
      if (!location.latitude || !location.longitude) return;
      
      setLoadingLocationInfo(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.latitude}&lon=${location.longitude}&zoom=10`
        );
        
        if (response.ok) {
          const data = await response.json();
          setLocationInfo(data);
        }
      } catch (error) {
        console.error("Failed to fetch location details:", error);
      } finally {
        setLoadingLocationInfo(false);
      }
    };

    if (filters.useRealTimeLocation && location.latitude && location.longitude && !customLocation) {
      fetchLocationInfo();
    } else {
      setLocationInfo(null);
    }
  }, [location.latitude, location.longitude, filters.useRealTimeLocation, customLocation]);

  useEffect(() => {
    const loadPlaces = async () => {
      setLoading(true);
      try {
        let nearbyLocation;
        
        if (customLocation) {
          nearbyLocation = { 
            lat: customLocation.lat, 
            lng: customLocation.lng, 
            radius: 10 
          };
        } else if (filters.useRealTimeLocation && (location.latitude && location.longitude)) {
          nearbyLocation = { 
            lat: location.latitude, 
            lng: location.longitude, 
            radius: 10 
          };
        } else {
          nearbyLocation = { lat: 21.0278, lng: 105.8342, radius: 10 }; // Hanoi center coordinates as fallback
        }
        
        const filteredPlaces = await getFilteredPlaces(
          filters.travelStyles,
          filters.budget,
          nearbyLocation
        );
        
        setPlaces(filteredPlaces);
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

    if (!location.loading || location.error) {
      loadPlaces();
    }
  }, [filters, location.loading, location.latitude, location.longitude, location.error, customLocation]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleLocationSelect = (lat: number, lng: number, locationName: string) => {
    setCustomLocation({ lat, lng });
    setShowLocationPicker(false);
    toast({
      title: "Location updated",
      description: `Showing places near ${locationName}`
    });
  };

  const getLocationInfo = () => {
    if (loadingLocationInfo) {
      return "Loading location information...";
    }
    
    if (locationInfo?.address) {
      const address = locationInfo.address;
      return [
        address.city || address.town || address.village || address.county || "",
        address.state || "",
        address.country || ""
      ].filter(Boolean).join(", ");
    }
    
    return null;
  };

  const getLocationName = () => {
    if (customLocation) {
      return "Custom Location";
    }
    
    if (location.error && location.error.includes("default")) {
      return "Hanoi (Default)";
    }
    
    if (location.latitude && location.longitude) {
      return `Your Location (${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)})`;
    }
    
    return "Loading location...";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <header className="bg-primary py-12 px-4 text-primary-foreground">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Explore Nearby Places
            </h1>
            <div className="flex items-center text-primary-foreground/80 mb-2">
              <Navigation className="h-5 w-5 mr-2 animate-pulse" />
              <p>{getLocationName()}</p>
            </div>
            
            {getLocationInfo() && (
              <div className="flex items-start text-primary-foreground/80 mb-4">
                <Info className="h-5 w-5 mr-2 mt-0.5" />
                <div>
                  <p className="mb-1">{getLocationInfo()}</p>
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={() => setShowLocationPicker(true)}
                className="bg-background text-primary hover:bg-background/90"
              >
                <MapPinned className="mr-2 h-4 w-4" />
                Change Location
              </Button>
              
              {isMobile && (
                <Button 
                  onClick={toggleFilters}
                  className="bg-background text-primary hover:bg-background/90"
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {!showFilters && (
          <LocationDetails 
            latitude={customLocation?.lat ?? location.latitude}
            longitude={customLocation?.lng ?? location.longitude}
            loading={location.loading || loadingLocationInfo}
          />
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {(showFilters || !isMobile) && (
            <div className="lg:col-span-1 relative">
              <div className="lg:sticky lg:top-24">
                {isMobile && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-2 top-2 z-10"
                    onClick={toggleFilters}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                )}
                <PreferenceFilters onFilterChange={handleFilterChange} initialUseLocation={true} />
              </div>
            </div>
          )}
          
          <div className={`${(showFilters || !isMobile) ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <div className="flex items-center text-foreground/70 mr-2">
                <Compass className="h-4 w-4 mr-1" />
                <span className="font-medium">Exploring:</span>
              </div>
              
              {filters.travelStyles.map(style => (
                <span key={style} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {style.charAt(0).toUpperCase() + style.slice(1)}
                </span>
              ))}
              
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                Budget: {Array(filters.budget).fill('$').join('')}
              </span>
              
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                Near {getLocationName()}
              </span>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-1">
                {loading ? 'Finding places...' : `${places.length} places found`}
              </h2>
              <p className="text-foreground/70 text-sm">
                {customLocation
                  ? 'Showing places near custom location'
                  : filters.useRealTimeLocation 
                    ? `Showing places near ${getLocationName()}` 
                    : 'Showing places across this region'}
              </p>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, idx) => (
                  <div 
                    key={idx} 
                    className="bg-card rounded-lg shadow-md h-64 animate-pulse"
                  />
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
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-1">No places found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your filters to see more results</p>
                  <Button 
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary/10"
                    onClick={() => setFilters({ travelStyles: ["explorer"], budget: 3, useRealTimeLocation: true })}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {showLocationPicker && (
        <LocationPicker 
          onClose={() => setShowLocationPicker(false)} 
          onSelectLocation={handleLocationSelect}
        />
      )}
    </div>
  );
};

export default Explore;
