
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Menu, X } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-full bg-primary w-8 h-8 flex items-center justify-center">
            <MapPin className="text-primary-foreground h-4 w-4" />
          </div>
          <h1 className="text-primary text-lg font-medium">WanderWise</h1>
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
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>

            {isMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-background border-b shadow-sm p-4 animate-fade-in">
                <div className="flex flex-col gap-2">
                  <Link 
                    to="/" 
                    className="text-muted-foreground hover:text-foreground py-2 px-3 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/explore" 
                    className="text-muted-foreground hover:text-foreground py-2 px-3 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Explore
                  </Link>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center gap-6">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Home
            </Link>
            <Link to="/explore" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Explore
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
