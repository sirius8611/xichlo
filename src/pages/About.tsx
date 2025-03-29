
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Heart, Users, Leaf } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-vietnam-cream">
      <Navbar />
      
      {/* Header */}
      <header className="bg-vietnam-green py-16 px-4 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">About WanderWise Vietnam</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Discover the story behind our mission to promote sustainable tourism
            and connect travelers with authentic Vietnamese experiences
          </p>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Our Story */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-vietnam-blue mb-4">Our Story</h2>
              <p className="text-vietnam-blue/80 mb-4">
                WanderWise Vietnam was born from a simple observation: while Vietnam's most famous destinations were becoming overcrowded, its most authentic and unique experiences remained hidden from most travelers.
              </p>
              <p className="text-vietnam-blue/80 mb-4">
                We set out to create a platform that would connect visitors with these lesser-known treasures, guided by the wisdom of locals who know their regions best.
              </p>
              <p className="text-vietnam-blue/80">
                By highlighting these overlooked destinations, we hope to reduce the pressure on overtourism hotspots while providing more authentic and meaningful experiences for travelers.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1535953472862-9cc610a70f8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Vietnamese landscape" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
        
        {/* Our Mission */}
        <section className="mb-16" id="sustainability">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-vietnam-green mb-4">Our Mission</h2>
            <p className="text-vietnam-blue/80 max-w-3xl mx-auto">
              We're committed to promoting sustainable and responsible tourism across Vietnam
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full bg-vietnam-green/10 w-16 h-16 flex items-center justify-center mb-4">
                <Leaf className="text-vietnam-green h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-vietnam-blue mb-3">Sustainable Tourism</h3>
              <p className="text-vietnam-blue/70">
                We promote less-visited destinations to reduce the environmental impact of overtourism and spread economic benefits to more communities.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full bg-vietnam-terracotta/10 w-16 h-16 flex items-center justify-center mb-4">
                <Heart className="text-vietnam-terracotta h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-vietnam-blue mb-3">Authentic Experiences</h3>
              <p className="text-vietnam-blue/70">
                We connect travelers with genuine Vietnamese culture, traditions, and daily life beyond the tourist facade.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full bg-vietnam-blue/10 w-16 h-16 flex items-center justify-center mb-4">
                <Users className="text-vietnam-blue h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-vietnam-blue mb-3">Community Powered</h3>
              <p className="text-vietnam-blue/70">
                Our platform is built on the knowledge of locals and experienced travelers who share their insider tips and hidden gems.
              </p>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-vietnam-blue mb-6 text-center">How WanderWise Works</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-vietnam-terracotta w-8 h-8 flex items-center justify-center text-white font-bold mr-3">
                      1
                    </div>
                    <h3 className="text-xl font-semibold text-vietnam-blue">Personal Recommendations</h3>
                  </div>
                  <p className="text-vietnam-blue/70 pl-11">
                    Tell us your travel style, budget, and preferences, and we'll suggest places that match your interests.
                  </p>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-vietnam-terracotta w-8 h-8 flex items-center justify-center text-white font-bold mr-3">
                      2
                    </div>
                    <h3 className="text-xl font-semibold text-vietnam-blue">Real-time Context</h3>
                  </div>
                  <p className="text-vietnam-blue/70 pl-11">
                    Enable location services for recommendations based on where you are, the time of day, and even current weather conditions.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-vietnam-terracotta w-8 h-8 flex items-center justify-center text-white font-bold mr-3">
                      3
                    </div>
                    <h3 className="text-xl font-semibold text-vietnam-blue">Community Insights</h3>
                  </div>
                  <p className="text-vietnam-blue/70 pl-11">
                    Benefit from reviews and tips from both locals and fellow travelers who've visited before you.
                  </p>
                </div>
              </div>
              
              <div>
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-vietnam-green w-8 h-8 flex items-center justify-center text-white font-bold mr-3">
                      4
                    </div>
                    <h3 className="text-xl font-semibold text-vietnam-blue">Contribute Your Discoveries</h3>
                  </div>
                  <p className="text-vietnam-blue/70 pl-11">
                    Found an amazing spot? Share it with our community to help other travelers discover it too.
                  </p>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-vietnam-green w-8 h-8 flex items-center justify-center text-white font-bold mr-3">
                      5
                    </div>
                    <h3 className="text-xl font-semibold text-vietnam-blue">Plan Or Explore Spontaneously</h3>
                  </div>
                  <p className="text-vietnam-blue/70 pl-11">
                    Use our platform to plan your trip in advance or find something wonderful to do right now.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-vietnam-green w-8 h-8 flex items-center justify-center text-white font-bold mr-3">
                      6
                    </div>
                    <h3 className="text-xl font-semibold text-vietnam-blue">Support Local Communities</h3>
                  </div>
                  <p className="text-vietnam-blue/70 pl-11">
                    By visiting our recommended places, you're helping spread tourism's economic benefits to more communities across Vietnam.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="text-center bg-vietnam-terracotta text-white p-12 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Ready to Discover Vietnam Differently?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Start exploring authentic experiences and hidden gems that make Vietnam truly special
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/explore">
              <Button className="bg-white text-vietnam-terracotta hover:bg-vietnam-cream px-8">
                Explore Now
              </Button>
            </Link>
            <Link to="/contribute">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                Share Your Recommendations
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-vietnam-blue py-8 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="rounded-full bg-white w-8 h-8 flex items-center justify-center">
              <MapPin className="text-vietnam-green h-4 w-4" />
            </div>
            <h3 className="text-lg font-bold">WanderWise Vietnam</h3>
          </div>
          <p className="text-white/70 text-sm">
            © 2023 WanderWise Vietnam. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
