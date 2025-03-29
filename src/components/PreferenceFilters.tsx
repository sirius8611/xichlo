
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
  MapPin
} from "lucide-react";

const travelStyles = [
  { id: "explorer", label: "Explorer", icon: <Compass className="h-4 w-4" /> },
  { id: "cultural", label: "Cultural", icon: <History className="h-4 w-4" /> },
  { id: "foodie", label: "Foodie", icon: <Utensils className="h-4 w-4" /> },
  { id: "photography", label: "Photography", icon: <Camera className="h-4 w-4" /> },
  { id: "social", label: "Social", icon: <Users className="h-4 w-4" /> },
  { id: "nature", label: "Nature", icon: <Tent className="h-4 w-4" /> },
];

interface PreferenceFiltersProps {
  onFilterChange: (preferences: {
    travelStyles: string[];
    budget: number;
    useRealTimeLocation: boolean;
  }) => void;
}

const PreferenceFilters: React.FC<PreferenceFiltersProps> = ({ onFilterChange }) => {
  const [selectedStyles, setSelectedStyles] = useState<string[]>(["explorer"]);
  const [budget, setBudget] = useState(2);
  const [useRealTimeLocation, setUseRealTimeLocation] = useState(false);

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

  const handleBudgetChange = (value: number[]) => {
    const newBudget = value[0];
    setBudget(newBudget);
    onFilterChange({
      travelStyles: selectedStyles,
      budget: newBudget,
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
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div>
        <h3 className="text-vietnam-blue font-medium mb-3">Travel Style</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {travelStyles.map(style => (
            <Button
              key={style.id}
              variant={selectedStyles.includes(style.id) ? "default" : "outline"}
              className={selectedStyles.includes(style.id) 
                ? "bg-vietnam-green hover:bg-vietnam-green/90 text-white" 
                : "border-vietnam-green text-vietnam-green hover:bg-vietnam-green/10"}
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
        <h3 className="text-vietnam-blue font-medium mb-3">Budget</h3>
        <div className="px-2">
          <Slider
            defaultValue={[budget]}
            max={5}
            min={1}
            step={1}
            onValueChange={handleBudgetChange}
            className="my-4"
          />
          <div className="flex justify-between text-sm text-vietnam-blue/70">
            <div className="flex flex-col items-center">
              <DollarSign className="h-4 w-4" />
              <span>Budget</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex">
                {[...Array(3)].map((_, i) => (
                  <DollarSign key={i} className={`h-4 w-4 ${i < budget ? 'text-vietnam-green' : 'text-vietnam-green/30'}`} />
                ))}
              </div>
              <span>Mid-range</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <DollarSign key={i} className={`h-4 w-4 ${i < budget ? 'text-vietnam-green' : 'text-vietnam-green/30'}`} />
                ))}
              </div>
              <span>Luxury</span>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-vietnam-terracotta mr-2" />
              <h3 className="text-vietnam-blue font-medium">Use Current Location</h3>
            </div>
            <p className="text-sm text-vietnam-blue/70">
              Enable real-time recommendations based on your location
            </p>
          </div>
          <Switch
            checked={useRealTimeLocation}
            onCheckedChange={toggleLocationUse}
            className="data-[state=checked]:bg-vietnam-terracotta"
          />
        </div>
      </div>
    </div>
  );
};

export default PreferenceFilters;
