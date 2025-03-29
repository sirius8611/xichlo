
export interface Place {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  rating: number;
  reviewCount: number;
  priceLevel: number; // 1-3 representing $ to $$$
  tags: string[];
  timeToVisit: string;
  localFavorite: boolean;
  travelStyles: string[];
  bestTimeOfDay?: string;
  createdBy?: {
    id: string;
    name: string;
    isLocal: boolean;
  };
}
