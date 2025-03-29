
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="sticky top-0 z-50 bg-vietnam-cream/95 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-full bg-vietnam-green w-10 h-10 flex items-center justify-center">
            <MapPin className="text-vietnam-cream h-6 w-6" />
          </div>
          <h1 className="text-vietnam-green text-xl font-bold">WanderWise Vietnam</h1>
        </Link>

        {isMobile ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-vietnam-green" />
              ) : (
                <Menu className="h-6 w-6 text-vietnam-green" />
              )}
            </Button>

            {isMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-vietnam-cream shadow-lg p-4 animate-fade-in">
                <div className="flex flex-col gap-2">
                  <Link 
                    to="/" 
                    className="text-vietnam-green hover:bg-vietnam-green/10 py-2 px-3 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/explore" 
                    className="text-vietnam-green hover:bg-vietnam-green/10 py-2 px-3 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Explore
                  </Link>
                  <Link 
                    to="/about" 
                    className="text-vietnam-green hover:bg-vietnam-green/10 py-2 px-3 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link 
                    to="/contribute" 
                    className="text-vietnam-green hover:bg-vietnam-green/10 py-2 px-3 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contribute
                  </Link>
                  <Button className="mt-2 bg-vietnam-terracotta hover:bg-vietnam-darkTerracotta">
                    <User className="mr-2 h-4 w-4" /> Sign In
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center gap-6">
            <Link to="/" className="text-vietnam-green hover:text-vietnam-darkTerracotta transition-colors">
              Home
            </Link>
            <Link to="/explore" className="text-vietnam-green hover:text-vietnam-darkTerracotta transition-colors">
              Explore
            </Link>
            <Link to="/about" className="text-vietnam-green hover:text-vietnam-darkTerracotta transition-colors">
              About
            </Link>
            <Link to="/contribute" className="text-vietnam-green hover:text-vietnam-darkTerracotta transition-colors">
              Contribute
            </Link>
            <Button className="bg-vietnam-terracotta hover:bg-vietnam-darkTerracotta">
              <User className="mr-2 h-4 w-4" /> Sign In
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
