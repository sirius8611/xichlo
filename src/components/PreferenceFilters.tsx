
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Coffee, 
  Map, 
  Utensils, 
  Camera, 
  History, 
  Tent,
  Users,
  Compass,
  DollarSign,
  Sun,
  MapPin,
  Crown
} from "lucide-react";

const travelStyles = [
  { id: "explorer", label: "Explorer", icon: <Compass className="h-4 w-4" /> },
  { id: "cultural", label: "Cultural", icon: <History className="h-4 w-4" /> },
  { id: "foodie", label: "Foodie", icon: <Utensils className="h-4 w-4" /> },
  { id: "photography", label: "Photography", icon: <Camera className="h-4 w-4" /> },
  { id: "social", label: "Social", icon: <Users className="h-4 w-4" /> },
  { id: "nature", label: "Nature", icon: <Tent className="h-4 w-4" /> },
  { id: "luxury", label: "Luxury", icon: <Crown className="h-4 w-4" /> },
];

interface PreferenceFiltersProps {
  onFilterChange: (preferences: {
    travelStyles: string[];
    budget: number;
    useRealTimeLocation: boolean;
  }) => void;
  initialUseLocation?: boolean;
}

const PreferenceFilters: React.FC<PreferenceFiltersProps> = ({ 
  onFilterChange, 
  initialUseLocation = false 
}) => {
  const [selectedStyles, setSelectedStyles] = useState<string[]>(["explorer"]);
  const [budget, setBudget] = useState(2);
  const [useRealTimeLocation, setUseRealTimeLocation] = useState(initialUseLocation);

  const toggleTravelStyle = (styleId: string) => {
    setSelectedStyles(prev => {
      const newStyles = prev.includes(styleId)
        ? prev.filter(id => id !== styleId)
        : [...prev, styleId];
      
      // Ensure at least one style is selected
      if (newStyles.length === 0) return prev;
      
      // Update parent component with new filters
      onFilterChange({
        travelStyles: newStyles,
        budget,
        useRealTimeLocation
      });
      
      return newStyles;
    });
  };

  const handleBudgetChange = (value: number) => {
    setBudget(value);
    onFilterChange({
      travelStyles: selectedStyles,
      budget: value,
      useRealTimeLocation
    });
  };

  const toggleLocationUse = () => {
    setUseRealTimeLocation(!useRealTimeLocation);
    onFilterChange({
      travelStyles: selectedStyles,
      budget,
      useRealTimeLocation: !useRealTimeLocation
    });
  };

  return (
    <div className="bg-card rounded-lg border shadow-sm p-6 space-y-6">
      <div>
        <h3 className="text-foreground font-medium mb-3">Travel Style</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {travelStyles.map(style => (
            <Button
              key={style.id}
              variant={selectedStyles.includes(style.id) ? "default" : "outline"}
              className={selectedStyles.includes(style.id) 
                ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
                : "border-primary text-primary hover:bg-primary/10"}
              onClick={() => toggleTravelStyle(style.id)}
              size="sm"
            >
              {style.icon}
              <span className="ml-2">{style.label}</span>
            </Button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-foreground font-medium mb-3">Budget</h3>
        <div className="flex justify-between items-center space-x-3">
          <Button 
            variant={budget === 1 ? "default" : "outline"}
            size="sm" 
            onClick={() => handleBudgetChange(1)}
            className="flex-1"
          >
            <DollarSign className="h-4 w-4 mr-1" />
            Budget
          </Button>
          <Button 
            variant={budget === 3 ? "default" : "outline"}
            size="sm" 
            onClick={() => handleBudgetChange(3)}
            className="flex-1"
          >
            <DollarSign className="h-4 w-4 mr-1" />
            <DollarSign className="h-4 w-4 mr-1" />
            Mid-range
          </Button>
          <Button 
            variant={budget === 5 ? "default" : "outline"}
            size="sm" 
            onClick={() => handleBudgetChange(5)}
            className="flex-1"
          >
            <DollarSign className="h-4 w-4 mr-1" />
            <DollarSign className="h-4 w-4 mr-1" />
            <DollarSign className="h-4 w-4" />
            Luxury
          </Button>
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-primary mr-2" />
              <h3 className="text-foreground font-medium">Use Current Location</h3>
            </div>
            <p className="text-sm text-foreground/70">
              Enable real-time recommendations based on your location
            </p>
          </div>
          <Switch
            checked={useRealTimeLocation}
            onCheckedChange={toggleLocationUse}
            className="data-[state=checked]:bg-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default PreferenceFilters;
