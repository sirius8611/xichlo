
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import PlaceCard from "@/components/PlaceCard";
import { getPlaces } from "@/services/placeService";
import { Place } from "@/types/place";
import { Sparkles, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Discovery = () => {
  const [allPlaces, setAllPlaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    const loadPlaces = async () => {
      setLoading(true);
      try {
        const places = await getPlaces();
        setAllPlaces(places);
        setFilteredPlaces(places);
      } catch (error) {
        console.error("Failed to load places:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPlaces();
  }, []);

  useEffect(() => {
    filterPlaces(searchQuery, activeCategory);
  }, [searchQuery, activeCategory, allPlaces]);

  const filterPlaces = (query: string, category: string) => {
    let results = [...allPlaces];

    // Filter by search query
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      results = results.filter(
        place =>
          place.name.toLowerCase().includes(lowercaseQuery) ||
          place.description.toLowerCase().includes(lowercaseQuery) ||
          place.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      );
    }

    // Filter by category
    if (category !== "all") {
      results = results.filter(place => {
        if (category === "localFavorites") return place.localFavorite;
        if (category === "food") {
          return place.tags.some(tag => 
            tag.toLowerCase().includes("food") || 
            tag.toLowerCase().includes("restaurant") || 
            tag.toLowerCase().includes("café") || 
            tag.toLowerCase().includes("cafe") || 
            tag.toLowerCase().includes("drink") || 
            tag.toLowerCase().includes("bar")
          );
        }
        return place.tags.includes(category) || place.travelStyles.includes(category);
      });
    }

    setFilteredPlaces(results);
  };

  const categories = [
    { id: "all", name: "All" },
    { id: "localFavorites", name: "Local Favorites" },
    { id: "food", name: "Food & Drinks" },
    { id: "cultural", name: "Cultural" },
    { id: "nature", name: "Nature" },
    { id: "shopping", name: "Shopping" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Discover Places</h1>

        {/* Search and filter section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search places, tags, or descriptions..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className={
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "border-primary/30 text-foreground/80 hover:text-foreground hover:bg-primary/10"
                }
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Collections */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-primary" />
            Featured Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Food Journey</CardTitle>
                <CardDescription>
                  Authentic tastes of local cuisine
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setActiveCategory("food")}
                >
                  Explore
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Cultural Experiences</CardTitle>
                <CardDescription>
                  Immerse in local traditions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setActiveCategory("cultural")}
                >
                  Explore
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Nature Escapes</CardTitle>
                <CardDescription>
                  Beautiful natural landscapes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setActiveCategory("nature")}
                >
                  Explore
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Places Grid */}
        <div>
          <div className="flex justify-between items-baseline mb-4">
            <h2 className="text-xl font-semibold">
              {filteredPlaces.length} {activeCategory !== "all" ? `${activeCategory} ` : ""}
              Places
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow-md h-80 animate-pulse"
                />
              ))}
            </div>
          ) : filteredPlaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-muted p-8 rounded-lg inline-block">
                <div className="text-muted-foreground mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-foreground mb-1">
                  No places found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Discovery;
