
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import PlaceCard from "@/components/PlaceCard";
import PreferenceFilters from "@/components/PreferenceFilters";
import { getFilteredPlaces } from "@/services/placeService";
import { Place } from "@/types/place";
import { MapPin, Compass, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Explore = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    travelStyles: ["explorer"],
    budget: 3,
    useRealTimeLocation: false
  });
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const loadPlaces = async () => {
      setLoading(true);
      try {
        // For demo purposes, we're simulating a location in Hanoi
        const nearbyLocation = filters.useRealTimeLocation 
          ? { lat: 21.0278, lng: 105.8342, radius: 10 } // Hanoi center coordinates
          : undefined;
        
        const filteredPlaces = await getFilteredPlaces(
          filters.travelStyles,
          filters.budget,
          nearbyLocation
        );
        
        setPlaces(filteredPlaces);
      } catch (error) {
        console.error("Failed to load places:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPlaces();
  }, [filters]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="min-h-screen bg-vietnam-cream">
      <Navbar />
      
      {/* Header */}
      <header className="bg-vietnam-green py-12 px-4 text-white">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Explore Vietnam's Hidden Treasures
            </h1>
            <p className="text-white/80 mb-6">
              Discover authentic local experiences curated for your travel style and preferences
            </p>
            
            {isMobile && (
              <Button 
                onClick={toggleFilters}
                className="bg-white text-vietnam-green hover:bg-vietnam-cream"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            )}
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
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
                <PreferenceFilters onFilterChange={handleFilterChange} />
              </div>
            </div>
          )}
          
          {/* Places Grid */}
          <div className={`${(showFilters || !isMobile) ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
            {/* Current filter summary */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <div className="flex items-center text-vietnam-blue/70 mr-2">
                <Compass className="h-4 w-4 mr-1" />
                <span className="font-medium">Exploring:</span>
              </div>
              
              {filters.travelStyles.map(style => (
                <span key={style} className="bg-vietnam-green/10 text-vietnam-green px-3 py-1 rounded-full text-sm">
                  {style.charAt(0).toUpperCase() + style.slice(1)}
                </span>
              ))}
              
              <span className="bg-vietnam-terracotta/10 text-vietnam-terracotta px-3 py-1 rounded-full text-sm">
                Budget: {Array(filters.budget).fill('$').join('')}
              </span>
              
              {filters.useRealTimeLocation && (
                <span className="bg-vietnam-blue/10 text-vietnam-blue px-3 py-1 rounded-full text-sm flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  Near Hanoi
                </span>
              )}
            </div>
            
            {/* Results count */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-vietnam-blue mb-1">
                {loading ? 'Finding places...' : `${places.length} places found`}
              </h2>
              <p className="text-vietnam-blue/70 text-sm">
                {filters.useRealTimeLocation 
                  ? 'Showing places near Hanoi city center' 
                  : 'Showing places across Hanoi region'}
              </p>
            </div>
            
            {/* Places grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white rounded-lg shadow-md h-80 animate-pulse"
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
                <div className="bg-vietnam-cream p-8 rounded-lg inline-block">
                  <div className="text-vietnam-blue/40 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-vietnam-blue mb-1">No places found</h3>
                  <p className="text-vietnam-blue/70 mb-4">Try adjusting your filters to see more results</p>
                  <Button 
                    variant="outline" 
                    className="border-vietnam-green text-vietnam-green hover:bg-vietnam-green/10"
                    onClick={() => setFilters({ travelStyles: ["explorer"], budget: 3, useRealTimeLocation: false })}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-vietnam-blue py-8 text-white mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/70 text-sm">
            © 2023 WanderWise Vietnam. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Explore;
