
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Camera, Check } from "lucide-react";

const travelStyles = [
  { id: "explorer", label: "Explorer" },
  { id: "cultural", label: "Cultural" },
  { id: "foodie", label: "Foodie" },
  { id: "photography", label: "Photography" },
  { id: "social", label: "Social" },
  { id: "nature", label: "Nature" },
];

const Contribute = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Recommendation submitted!",
        description: "Thank you for contributing to WanderWise Vietnam!",
      });
    }, 1500);
  };
  
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-vietnam-cream">
        <Navbar />
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="rounded-full bg-vietnam-green/10 w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Check className="text-vietnam-green h-10 w-10" />
            </div>
            <h1 className="text-3xl font-bold text-vietnam-green mb-4">Thank You!</h1>
            <p className="text-vietnam-blue/80 mb-8">
              Your recommendation has been submitted successfully. Our team will review it and add it to our platform soon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-vietnam-terracotta hover:bg-vietnam-darkTerracotta"
                onClick={() => setIsSubmitted(false)}
              >
                Submit Another Place
              </Button>
              <Button 
                variant="outline" 
                className="border-vietnam-green text-vietnam-green hover:bg-vietnam-green/10"
                onClick={() => window.location.href = "/explore"}
              >
                Explore Recommendations
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-vietnam-cream">
      <Navbar />
      
      {/* Header */}
      <header className="bg-vietnam-terracotta py-12 px-4 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Share Your Hidden Gems</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Help other travelers discover authentic Vietnamese experiences by recommending your favorite places
          </p>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-vietnam-blue mb-4">Why Share Your Discoveries?</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-vietnam-green flex items-center">
                    <Check className="h-5 w-5 mr-2" />
                    Support Local Communities
                  </h3>
                  <p className="text-sm text-vietnam-blue/70 mt-1 pl-7">
                    Help spread tourism's benefits to lesser-known areas
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-vietnam-green flex items-center">
                    <Check className="h-5 w-5 mr-2" />
                    Promote Sustainable Tourism
                  </h3>
                  <p className="text-sm text-vietnam-blue/70 mt-1 pl-7">
                    Reduce overcrowding at popular destinations
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-vietnam-green flex items-center">
                    <Check className="h-5 w-5 mr-2" />
                    Share Authentic Experiences
                  </h3>
                  <p className="text-sm text-vietnam-blue/70 mt-1 pl-7">
                    Help others discover the real Vietnam beyond tourist spots
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-vietnam-green flex items-center">
                    <Check className="h-5 w-5 mr-2" />
                    Join Our Community
                  </h3>
                  <p className="text-sm text-vietnam-blue/70 mt-1 pl-7">
                    Connect with fellow travelers and locals who love Vietnam
                  </p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="font-medium text-vietnam-blue mb-2">Need Help?</h3>
                <p className="text-sm text-vietnam-blue/70 mb-4">
                  Have questions about recommending places? We're here to help!
                </p>
                <Button variant="outline" className="w-full border-vietnam-terracotta text-vietnam-terracotta hover:bg-vietnam-terracotta/10">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
          
          {/* Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-vietnam-blue mb-6">Recommend a Place</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-vietnam-green border-b border-vietnam-green/20 pb-2">
                    Basic Information
                  </h3>
                  
                  <div>
                    <Label htmlFor="placeName" className="text-vietnam-blue">
                      Place Name <span className="text-vietnam-terracotta">*</span>
                    </Label>
                    <Input 
                      id="placeName" 
                      placeholder="E.g., Train Street, Phung Hung Mural Street" 
                      required
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="location" className="text-vietnam-blue">
                      Location <span className="text-vietnam-terracotta">*</span>
                    </Label>
                    <Input 
                      id="location" 
                      placeholder="E.g., Hanoi Old Quarter, Tay Ho District" 
                      required
                      className="mt-1"
                    />
                    <p className="text-xs text-vietnam-blue/60 mt-1">
                      Please be as specific as possible to help others find this place
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="description" className="text-vietnam-blue">
                      Description <span className="text-vietnam-terracotta">*</span>
                    </Label>
                    <Textarea 
                      id="description" 
                      placeholder="Tell us what makes this place special and why others should visit..." 
                      required
                      className="mt-1 min-h-[120px]"
                    />
                  </div>
                </div>
                
                {/* Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-vietnam-green border-b border-vietnam-green/20 pb-2">
                    Details
                  </h3>
                  
                  <div>
                    <Label className="text-vietnam-blue mb-2 block">
                      Travel Styles <span className="text-vietnam-terracotta">*</span>
                    </Label>
                    <p className="text-xs text-vietnam-blue/60 mb-3">
                      What type of travelers would enjoy this place? (Select all that apply)
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {travelStyles.map((style) => (
                        <div key={style.id} className="flex items-center space-x-2">
                          <Checkbox id={`style-${style.id}`} />
                          <Label htmlFor={`style-${style.id}`} className="text-sm text-vietnam-blue/80">
                            {style.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-vietnam-blue mb-2 block">
                      Price Level <span className="text-vietnam-terracotta">*</span>
                    </Label>
                    <RadioGroup defaultValue="1" className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="price-1" />
                        <Label htmlFor="price-1" className="text-sm text-vietnam-blue/80">$</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2" id="price-2" />
                        <Label htmlFor="price-2" className="text-sm text-vietnam-blue/80">$$</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="3" id="price-3" />
                        <Label htmlFor="price-3" className="text-sm text-vietnam-blue/80">$$$</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label htmlFor="bestTime" className="text-vietnam-blue">
                      Best Time to Visit
                    </Label>
                    <Input 
                      id="bestTime" 
                      placeholder="E.g., Early morning, Sunset, Weekdays" 
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="tags" className="text-vietnam-blue">
                      Tags
                    </Label>
                    <Input 
                      id="tags" 
                      placeholder="E.g., Food, Photography, Architecture (separate with commas)" 
                      className="mt-1"
                    />
                  </div>
                </div>
                
                {/* Photos */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-vietnam-green border-b border-vietnam-green/20 pb-2">
                    Photos
                  </h3>
                  
                  <div className="bg-vietnam-cream/30 border-2 border-dashed border-vietnam-cream rounded-lg p-6 text-center">
                    <Camera className="h-8 w-8 text-vietnam-blue/40 mx-auto mb-2" />
                    <p className="text-vietnam-blue/70 mb-4">Upload photos of this place</p>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="border-vietnam-blue text-vietnam-blue hover:bg-vietnam-blue/10"
                    >
                      Select Photos
                    </Button>
                    <p className="text-xs text-vietnam-blue/60 mt-2">
                      You can upload up to 5 photos (max 5MB each)
                    </p>
                  </div>
                </div>
                
                {/* About You */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-vietnam-green border-b border-vietnam-green/20 pb-2">
                    About You
                  </h3>
                  
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Checkbox id="isLocal" />
                      <Label htmlFor="isLocal" className="text-vietnam-blue">
                        I am a local resident
                      </Label>
                    </div>
                    <p className="text-xs text-vietnam-blue/60">
                      We highlight recommendations from locals to help travelers find authentic experiences
                    </p>
                  </div>
                </div>
                
                {/* Submit */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2 mb-6">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm text-vietnam-blue/80">
                      I confirm this is a genuine place and my recommendation complies with the 
                      <a href="/terms" className="text-vietnam-terracotta hover:underline"> community guidelines</a>
                    </Label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-vietnam-terracotta hover:bg-vietnam-darkTerracotta"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <MapPin className="mr-2 h-4 w-4" />
                        Submit Recommendation
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
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

export default Contribute;
