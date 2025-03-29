
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PlaceCard from "@/components/PlaceCard";
import { Button } from "@/components/ui/button";
import { Compass, MapPin } from "lucide-react";
import { getPlaces } from "@/services/placeService";
import { Place } from "@/types/place";

const Index = () => {
  const [featuredPlaces, setFeaturedPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedPlaces = async () => {
      try {
        const allPlaces = await getPlaces();
        // Get 6 local favorites with high ratings
        const featured = allPlaces
          .filter(place => place.localFavorite)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 6);
        
        setFeaturedPlaces(featured);
      } catch (error) {
        console.error("Failed to load featured places:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedPlaces();
  }, []);

  return (
    <div className="min-h-screen bg-vietnam-cream">
      <Navbar />
      <Hero />
      
      {/* Featured Places Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-vietnam-green mb-3">
              Hidden Gems of Hanoi
            </h2>
            <p className="text-vietnam-blue/80 max-w-2xl mx-auto">
              Discover authentic local experiences and lesser-known destinations loved by locals.
              Explore beyond the tourist hotspots and experience the true spirit of Vietnam.
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-lg shadow-md h-80 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPlaces.map(place => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link to="/explore">
              <Button className="bg-vietnam-terracotta hover:bg-vietnam-darkTerracotta text-white px-8">
                <Compass className="mr-2 h-5 w-5" />
                Explore All Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-vietnam-green mb-3">
              How WanderWise Works
            </h2>
            <p className="text-vietnam-blue/80 max-w-2xl mx-auto">
              Discover authentic experiences with our community-powered travel recommendations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center p-6">
              <div className="rounded-full bg-vietnam-green/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-vietnam-green h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-vietnam-blue mb-3">Personalized Recommendations</h3>
              <p className="text-vietnam-blue/70">
                Get suggestions tailored to your travel style, budget, and current location
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="rounded-full bg-vietnam-terracotta/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="text-vietnam-terracotta h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7v-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-vietnam-blue mb-3">Local Knowledge</h3>
              <p className="text-vietnam-blue/70">
                Benefit from recommendations by locals who know the area best
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="rounded-full bg-vietnam-blue/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="text-vietnam-blue h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-vietnam-blue mb-3">Sustainable Tourism</h3>
              <p className="text-vietnam-blue/70">
                Discover lesser-known destinations and help reduce overcrowding at tourist hotspots
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call To Action */}
      <section className="py-16 bg-vietnam-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Discover Vietnam's Hidden Treasures?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Join our community of travelers and locals sharing authentic Vietnamese experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/explore">
              <Button className="bg-white text-vietnam-green hover:bg-vietnam-cream px-8">
                Start Exploring
              </Button>
            </Link>
            <Link to="/contribute">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                Share Your Recommendations
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-vietnam-blue py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="rounded-full bg-white w-8 h-8 flex items-center justify-center">
                  <MapPin className="text-vietnam-green h-4 w-4" />
                </div>
                <h3 className="text-lg font-bold">WanderWise Vietnam</h3>
              </div>
              <p className="text-white/70 text-sm">
                Discover authentic local experiences and hidden gems across Vietnam.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Explore</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link to="/explore" className="hover:text-white">Destinations</Link></li>
                <li><Link to="/explore?style=food" className="hover:text-white">Food Experiences</Link></li>
                <li><Link to="/explore?style=cultural" className="hover:text-white">Cultural Sites</Link></li>
                <li><Link to="/explore?style=nature" className="hover:text-white">Nature Spots</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link to="/contribute" className="hover:text-white">Add a Place</Link></li>
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/about#sustainability" className="hover:text-white">Sustainability</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="/cookies" className="hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/50">
            <p>© 2023 WanderWise Vietnam. All rights reserved.</p>
            <p className="mt-1">Created with love for sustainable travel and authentic experiences.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
