
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass, Map } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 vietnam-pattern"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-vietnam-green/10 to-vietnam-cream/80"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-vietnam-green">
              <span className="block">Discover the Hidden</span>
              <span className="block text-vietnam-terracotta">Gems of Vietnam</span>
            </h1>
            <p className="text-lg md:text-xl text-vietnam-blue/80 max-w-md mx-auto md:mx-0">
              Explore authentic local experiences and lesser-known destinations
              that showcase the true beauty of Vietnam.
            </p>
            <div className="pt-6 flex flex-wrap gap-4 justify-center md:justify-start">
              <Button className="bg-vietnam-terracotta hover:bg-vietnam-darkTerracotta text-white rounded-full px-6">
                <Compass className="mr-2 h-5 w-5" />
                Start Exploring
              </Button>
              <Link to="/about">
                <Button variant="outline" className="border-vietnam-green text-vietnam-green hover:bg-vietnam-green/10 rounded-full px-6">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl rotate-2 hover-lift">
              <img 
                src="https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Vietnam landscape" 
                className="w-full object-cover aspect-[4/3]"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-2xl overflow-hidden shadow-xl -rotate-3 w-40 hover-lift z-20">
              <img 
                src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                alt="Local Vietnamese food" 
                className="w-full object-cover aspect-square"
              />
            </div>
            <div className="absolute -top-8 -right-4 bg-vietnam-cream rounded-lg shadow-lg p-3 rotate-6 z-10 hover-lift">
              <div className="flex items-center gap-2">
                <Map className="h-5 w-5 text-vietnam-green" />
                <span className="text-vietnam-green font-medium">Discover Hanoi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
