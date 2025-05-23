
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Compass, Menu, X, Plus, Book, UserCircle, Map } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: "Explore", path: "/", icon: MapPin },
    { name: "Discovery", path: "/discovery", icon: Compass },
    { name: "Maps", path: "/recommend", icon: Map },
    { name: "Experiences", path: "/experiences", icon: Book },
    { name: "Creator", path: "/creator", icon: UserCircle },
  ];

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
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {isMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-background border-b shadow-sm p-4 animate-fade-in">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground py-2 px-3 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <link.icon className="h-4 w-4" />
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                <link.icon className="h-3.5 w-3.5" />
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
