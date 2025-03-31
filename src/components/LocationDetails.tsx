
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Navigation, Info, History, MapPin, Image as ImageIcon, ScrollText, AlertTriangle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

interface LocationDetailsProps {
  latitude: number | null;
  longitude: number | null;
  loading: boolean;
}

interface LocationInfo {
  address?: {
    road?: string;
    house_number?: string;
    quarter?: string;
    suburb?: string;
    city?: string;
    state?: string;
    country?: string;
    postcode?: string;
  };
  displayName?: string;
  placeId?: number;
}

interface PlaceHistory {
  title: string;
  content: string;
  imageUrl?: string;
}

interface PlaceCulture {
  title: string;
  rules: string[];
}

const LocationDetails = ({ latitude, longitude, loading }: LocationDetailsProps) => {
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [history, setHistory] = useState<PlaceHistory[]>([]);
  const [culture, setCulture] = useState<PlaceCulture | null>(null);
  const [imageError, setImageError] = useState(false);

  // Fetch location data
  useEffect(() => {
    if (!latitude || !longitude) return;
    
    const fetchLocationDetails = async () => {
      setLoadingDetails(true);
      
      try {
        // Fetch address data from OpenStreetMap Nominatim API
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
        );
        
        if (response.ok) {
          const data = await response.json();
          setLocationInfo(data);
          
          // Simulate fetching history and cultural data
          // In a real application, you would call your API with the place details
          simulateDataFetch(data);
        }
      } catch (error) {
        console.error("Failed to fetch location details:", error);
      } finally {
        setLoadingDetails(false);
      }
    };
    
    fetchLocationDetails();
  }, [latitude, longitude]);

  // Simulate fetching historical and cultural data based on location
  // In a real app, you would fetch this from your backend or an API
  const simulateDataFetch = (data: any) => {
    // Extract place name or district
    const placeName = data.address?.suburb || data.address?.quarter || data.address?.city || "Hanoi";
    
    // Check for specific locations in Hanoi
    if (placeName.includes("Văn Miếu") || data.display_name?.includes("Văn Miếu")) {
      setHistory([
        {
          title: "Temple of Literature (Văn Miếu)",
          content: "Built in 1070 during the reign of King Lý Thánh Tông, Văn Miếu is a Temple of Confucius and hosted Vietnam's first national university. It is one of Hanoi's most significant cultural and historical sites, dedicated to scholars and literary accomplishments.",
          imageUrl: "https://images.unsplash.com/photo-1580354526434-8f5d0b826a87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
        }
      ]);
      setCulture({
        title: "Visitor Etiquette",
        rules: [
          "Dress modestly when visiting this historical site",
          "Speak quietly to respect the scholarly atmosphere",
          "Photography is allowed but no flash in certain areas",
          "Remove hats when entering temple buildings"
        ]
      });
    } else if (placeName.includes("Hoàn Kiếm") || data.display_name?.includes("Hoàn Kiếm")) {
      setHistory([
        {
          title: "Hoàn Kiếm Lake",
          content: "The name 'Hoàn Kiếm' means 'returned sword', derived from a legend where Emperor Lê Lợi returned a magical sword to a golden turtle god in the lake. Dating back to the 15th century, this lake is the historical and cultural center of Hanoi.",
          imageUrl: "https://images.unsplash.com/photo-1593251270331-fad747620199?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
        }
      ]);
      setCulture({
        title: "Local Customs",
        rules: [
          "Morning exercise around the lake starts as early as 5AM",
          "Weekends feature pedestrian-only areas with cultural performances",
          "Popular for wedding photography and celebration gatherings",
          "Traditional water puppet shows are performed nearby"
        ]
      });
    } else if (placeName.includes("Cầu Giấy") || data.display_name?.includes("Cầu Giấy")) {
      setHistory([
        {
          title: "Cầu Giấy District",
          content: "Formerly an area known for paper production ('giấy' means paper in Vietnamese), Cầu Giấy has transformed into a modern urban district with universities, tech companies, and shopping centers while preserving cultural heritage sites.",
          imageUrl: "https://images.unsplash.com/photo-1595854341625-f33e32bc3c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
        }
      ]);
      setCulture({
        title: "Modern Urban Life",
        rules: [
          "Home to several prestigious universities and students",
          "Known for contemporary cafes and international cuisine",
          "Popular shopping destinations like Indochina Plaza",
          "Business etiquette emphasizes punctuality and respect"
        ]
      });
    } else if (placeName.includes("Ba Đình") || data.display_name?.includes("Ba Đình")) {
      setHistory([
        {
          title: "Ba Đình District",
          content: "Ba Đình is the political center of Vietnam, home to the Presidential Palace, Ho Chi Minh Mausoleum, and One Pillar Pagoda. It was here that Ho Chi Minh read the Declaration of Independence on September 2, 1945, establishing the Democratic Republic of Vietnam.",
          imageUrl: "https://images.unsplash.com/photo-1557624642-c90e40da9f3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
        }
      ]);
      setCulture({
        title: "Respectful Visitation",
        rules: [
          "Modest dress required when visiting the mausoleum (no shorts/sleeveless tops)",
          "Photography prohibited inside the mausoleum",
          "Maintain silence and avoid pointing in sacred areas",
          "Remove hats and sunglasses at memorials"
        ]
      });
    } else {
      // Default Hanoi information
      setHistory([
        {
          title: "Hanoi - Vietnam's Capital",
          content: "Founded over 1,000 years ago, Hanoi is one of the oldest capitals in the world. The city has evolved through Chinese domination, French colonization, and the Vietnam War to become a vibrant cultural center blending ancient traditions with modern development.",
          imageUrl: "https://images.unsplash.com/photo-1566913485242-694e995e51b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
        }
      ]);
      setCulture({
        title: "Vietnamese Customs",
        rules: [
          "Greet others with a slight bow and say 'Xin chào'",
          "Remove shoes when entering homes and some businesses",
          "Use both hands when giving or receiving items from elders",
          "Avoid public displays of affection as they may be considered impolite"
        ]
      });
    }
  };

  // Format address for display
  const getFormattedAddress = () => {
    if (!locationInfo || !locationInfo.address) return "Address information unavailable";
    
    const addr = locationInfo.address;
    const parts = [];
    
    if (addr.house_number) parts.push(addr.house_number);
    if (addr.road) parts.push(addr.road);
    if (addr.quarter) parts.push(addr.quarter);
    if (addr.suburb) parts.push(addr.suburb);
    if (addr.city) parts.push(addr.city);
    if (addr.postcode) parts.push(addr.postcode);
    
    return parts.join(", ");
  };

  if (loading || loadingDetails) {
    return (
      <Card>
        <CardContent className="p-6">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-6" />
          <Skeleton className="h-64 w-full mb-4 rounded-md" />
          <Skeleton className="h-8 w-1/2 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-primary" />
            Your Current Location
          </h3>
          
          <div className="bg-muted/40 rounded-md p-3 mb-3">
            <div className="flex items-start gap-2">
              <Navigation className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">{getFormattedAddress()}</p>
                {locationInfo?.displayName && (
                  <p className="text-sm text-muted-foreground mt-1">{locationInfo.displayName}</p>
                )}
              </div>
            </div>
          </div>
          
          {!latitude && !longitude && (
            <div className="flex items-center gap-2 text-sm text-yellow-600 mb-3">
              <AlertTriangle className="h-4 w-4" />
              <span>Unable to access precise location. Showing general information.</span>
            </div>
          )}
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {history.length > 0 && (
            <AccordionItem value="history">
              <AccordionTrigger className="font-medium">
                <div className="flex items-center gap-2">
                  <History className="h-4 w-4 text-primary" />
                  <span>Historical Background</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {history.map((item, index) => (
                  <div key={index} className="mb-3">
                    <h4 className="font-medium mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{item.content}</p>
                    
                    {item.imageUrl && (
                      <div className="relative h-48 w-full rounded-md overflow-hidden mb-3">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={() => setImageError(true)}
                        />
                        {imageError && (
                          <div className="absolute inset-0 bg-muted flex items-center justify-center">
                            <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          )}
          
          {culture && (
            <AccordionItem value="culture">
              <AccordionTrigger className="font-medium">
                <div className="flex items-center gap-2">
                  <ScrollText className="h-4 w-4 text-primary" />
                  <span>{culture.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {culture.rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-sm">{rule}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}
          
          <AccordionItem value="info">
            <AccordionTrigger className="font-medium">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                <span>Local Tips</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium mb-1">Weather Considerations</h4>
                  <p className="text-sm text-muted-foreground">
                    Hanoi has four distinct seasons, with hot summers and cool winters. 
                    Carry an umbrella during monsoon season (May-September).
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1">Transportation</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="bg-background">
                      Ride-hailing apps
                    </Badge>
                    <Badge variant="outline" className="bg-background">
                      Motorbike taxis
                    </Badge>
                    <Badge variant="outline" className="bg-background">
                      Public buses
                    </Badge>
                    <Badge variant="outline" className="bg-background">
                      Walking (in Old Quarter)
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1">Food Recommendations</h4>
                  <p className="text-sm text-muted-foreground">
                    Try local specialties like phở, bún chả, and egg coffee at nearby street food vendors.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default LocationDetails;
