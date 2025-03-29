
import { Place } from "@/types/place";

// Mock data for places in Hanoi
const placesData: Place[] = [
  {
    id: "1",
    name: "Train Street",
    description: "A narrow residential street in Hanoi where trains pass just inches from homes. Watch locals quickly clear their belongings when trains approach.",
    imageUrl: "https://images.unsplash.com/photo-1586868538320-35fe12ede1d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    location: "Hanoi Old Quarter",
    coordinates: {
      lat: 21.0245,
      lng: 105.8412
    },
    rating: 4.7,
    reviewCount: 354,
    priceLevel: 1,
    tags: ["Cultural", "Photography", "Unique"],
    timeToVisit: "Mornings",
    localFavorite: true,
    travelStyles: ["explorer", "photography", "cultural"],
    bestTimeOfDay: "Early morning"
  },
  {
    id: "2",
    name: "Phung Hung Mural Street",
    description: "A revitalized street with beautiful murals depicting Hanoi's history and culture, perfect for photography enthusiasts.",
    imageUrl: "https://images.unsplash.com/photo-1576893598539-8ea0cba1e595?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    location: "Phung Hung Street, Hoan Kiem",
    coordinates: {
      lat: 21.0333,
      lng: 105.8451
    },
    rating: 4.3,
    reviewCount: 187,
    priceLevel: 1,
    tags: ["Art", "Cultural", "Photography"],
    timeToVisit: "Daytime",
    localFavorite: true,
    travelStyles: ["cultural", "photography"]
  },
  {
    id: "3",
    name: "Dong Xuan Market",
    description: "Hanoi's largest indoor market offering everything from food to fabrics. Experience local commerce and daily life.",
    imageUrl: "https://images.unsplash.com/photo-1533792344354-2c5cca218a61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    location: "Dong Xuan Street, Hoan Kiem",
    coordinates: {
      lat: 21.0387,
      lng: 105.8494
    },
    rating: 4.1,
    reviewCount: 642,
    priceLevel: 2,
    tags: ["Shopping", "Food", "Cultural"],
    timeToVisit: "Morning to Evening",
    localFavorite: true,
    travelStyles: ["foodie", "cultural", "social"]
  },
  {
    id: "4",
    name: "Long Bien Bridge",
    description: "Historic cantilever bridge spanning the Red River, offering unique views and a glimpse into Hanoi's past.",
    imageUrl: "https://images.unsplash.com/photo-1567879656601-71de6c46f1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1148&q=80",
    location: "Long Bien District",
    coordinates: {
      lat: 21.0433,
      lng: 105.8583
    },
    rating: 4.5,
    reviewCount: 298,
    priceLevel: 1,
    tags: ["Historical", "Photography", "Architecture"],
    timeToVisit: "Sunset",
    localFavorite: false,
    travelStyles: ["explorer", "photography", "cultural"]
  },
  {
    id: "5",
    name: "Bat Trang Ceramic Village",
    description: "Traditional village known for pottery and ceramics where visitors can watch artisans at work and try making pottery.",
    imageUrl: "https://images.unsplash.com/photo-1605001008338-a3938cc9e4dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    location: "15km Southeast of Hanoi",
    coordinates: {
      lat: 20.9758,
      lng: 105.9144
    },
    rating: 4.4,
    reviewCount: 421,
    priceLevel: 2,
    tags: ["Crafts", "Cultural", "Shopping"],
    timeToVisit: "Daytime",
    localFavorite: true,
    travelStyles: ["cultural", "explorer"]
  },
  {
    id: "6",
    name: "Quang Ba Flower Market",
    description: "Vibrant night flower market where locals buy fresh flowers. Experience the hustle and bustle in the early morning hours.",
    imageUrl: "https://images.unsplash.com/photo-1610547189313-1fbee1dd5fc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    location: "Tay Ho District",
    coordinates: {
      lat: 21.0699,
      lng: 105.8236
    },
    rating: 4.6,
    reviewCount: 156,
    priceLevel: 1,
    tags: ["Local Life", "Photography", "Shopping"],
    timeToVisit: "2AM - 6AM",
    localFavorite: true,
    travelStyles: ["explorer", "photography"]
  },
  {
    id: "7",
    name: "Ancient House at 87 Ma May",
    description: "Preserved traditional Vietnamese merchant's house from the late 19th century, showcasing architecture and lifestyle.",
    imageUrl: "https://images.unsplash.com/photo-1595514535315-e8b5839579a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80",
    location: "87 Ma May, Hoan Kiem",
    coordinates: {
      lat: 21.0352,
      lng: 105.8509
    },
    rating: 4.3,
    reviewCount: 208,
    priceLevel: 1,
    tags: ["Historical", "Architecture", "Cultural"],
    timeToVisit: "Daytime",
    localFavorite: false,
    travelStyles: ["cultural", "explorer"]
  },
  {
    id: "8",
    name: "Banana Island (Bai Giua)",
    description: "A peaceful rural escape in the middle of the Red River, accessible by boat, offering farming communities and a different pace of life.",
    imageUrl: "https://images.unsplash.com/photo-1596422846543-75c6fc197f11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1164&q=80",
    location: "Red River",
    coordinates: {
      lat: 21.0473,
      lng: 105.8693
    },
    rating: 4.5,
    reviewCount: 97,
    priceLevel: 2,
    tags: ["Nature", "Rural", "Off the beaten path"],
    timeToVisit: "Daytime",
    localFavorite: true,
    travelStyles: ["nature", "explorer"]
  },
  {
    id: "9",
    name: "Hanoi Creative City",
    description: "Urban complex with art spaces, skateparks, and unique shops. Popular with young Vietnamese and perfect for those interested in contemporary culture.",
    imageUrl: "https://images.unsplash.com/photo-1545389308-77e4cba76efa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1164&q=80",
    location: "Hai Ba Trung District",
    coordinates: {
      lat: 21.0136,
      lng: 105.8508
    },
    rating: 4.2,
    reviewCount: 312,
    priceLevel: 2,
    tags: ["Art", "Modern", "Shopping"],
    timeToVisit: "Afternoon & Evening",
    localFavorite: false,
    travelStyles: ["social", "explorer"]
  },
  {
    id: "10",
    name: "To Lich River Garden",
    description: "Recently revitalized riverbank with gardens and walkways, showcasing Hanoi's urban renewal efforts.",
    imageUrl: "https://images.unsplash.com/photo-1582284787978-2a1809ff418e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1152&q=80",
    location: "Cau Giay District",
    coordinates: {
      lat: 21.0299,
      lng: 105.7991
    },
    rating: 4.0,
    reviewCount: 76,
    priceLevel: 1,
    tags: ["Nature", "Walking", "Relaxation"],
    timeToVisit: "Morning or Late Afternoon",
    localFavorite: true,
    travelStyles: ["nature", "explorer"]
  },
  {
    id: "11",
    name: "Bun Cha Huong Lien",
    description: "Famous for hosting Anthony Bourdain and President Obama, this restaurant serves authentic bun cha, a local Hanoi specialty.",
    imageUrl: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    location: "24 Le Van Huu, Hai Ba Trung",
    coordinates: {
      lat: 21.0193,
      lng: 105.8500
    },
    rating: 4.7,
    reviewCount: 752,
    priceLevel: 1,
    tags: ["Food", "Cultural", "Famous"],
    timeToVisit: "Lunch",
    localFavorite: true,
    travelStyles: ["foodie", "cultural"]
  },
  {
    id: "12",
    name: "Perfume Pagoda",
    description: "Complex of Buddhist temples built into the limestone Huong Tich mountains, offering both spiritual experience and natural beauty.",
    imageUrl: "https://images.unsplash.com/photo-1570166468067-e7e33c5a894e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    location: "60km Southwest of Hanoi",
    coordinates: {
      lat: 20.6158,
      lng: 105.7459
    },
    rating: 4.6,
    reviewCount: 485,
    priceLevel: 2,
    tags: ["Spiritual", "Nature", "Hiking"],
    timeToVisit: "Full day trip",
    localFavorite: false,
    travelStyles: ["cultural", "nature", "explorer"]
  },
  {
    id: "13",
    name: "Hang Bac Silver Street",
    description: "Historic street known for silver craftsmanship where visitors can watch artisans and buy unique jewelry.",
    imageUrl: "https://images.unsplash.com/photo-1601921004897-b7d582836ec0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1076&q=80",
    location: "Hang Bac Street, Old Quarter",
    coordinates: {
      lat: 21.0358,
      lng: 105.8513
    },
    rating: 4.2,
    reviewCount: 231,
    priceLevel: 2,
    tags: ["Shopping", "Crafts", "Historical"],
    timeToVisit: "Daytime",
    localFavorite: true,
    travelStyles: ["cultural", "shopping"]
  },
  {
    id: "14",
    name: "Hanoi Opera House",
    description: "Magnificent colonial building showcasing the influence of French architecture, hosting performances and cultural events.",
    imageUrl: "https://images.unsplash.com/photo-1563332216-8c9fadf8a872?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    location: "Trang Tien Street, Hoan Kiem",
    coordinates: {
      lat: 21.0243,
      lng: 105.8576
    },
    rating: 4.5,
    reviewCount: 410,
    priceLevel: 3,
    tags: ["Architecture", "Cultural", "Entertainment"],
    timeToVisit: "Evening for performances",
    localFavorite: false,
    travelStyles: ["cultural", "luxury"]
  },
  {
    id: "15",
    name: "Tran Quoc Pagoda",
    description: "Oldest Buddhist temple in Hanoi, situated on a small island in West Lake, offering serene atmosphere and beautiful architecture.",
    imageUrl: "https://images.unsplash.com/photo-1591275644116-95a3aab5d1ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    location: "Thanh Nien Road, Tay Ho",
    coordinates: {
      lat: 21.0491,
      lng: 105.8349
    },
    rating: 4.6,
    reviewCount: 528,
    priceLevel: 1,
    tags: ["Spiritual", "Historical", "Architecture"],
    timeToVisit: "Morning",
    localFavorite: false,
    travelStyles: ["cultural", "photography"]
  },
  {
    id: "16",
    name: "Hanoi Rock City",
    description: "Premier live music venue featuring local and international acts, popular with expats and music lovers.",
    imageUrl: "https://images.unsplash.com/photo-1579103805048-54c5f51d5e10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    location: "Tay Ho District",
    coordinates: {
      lat: 21.0660,
      lng: 105.8128
    },
    rating: 4.3,
    reviewCount: 287,
    priceLevel: 2,
    tags: ["Music", "Nightlife", "Entertainment"],
    timeToVisit: "Evening",
    localFavorite: true,
    travelStyles: ["social", "explorer"]
  },
  {
    id: "17",
    name: "Co Loa Citadel",
    description: "Ancient spiral-shaped citadel from the 3rd century BC, one of Vietnam's oldest structures with historical significance.",
    imageUrl: "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    location: "Dong Anh District",
    coordinates: {
      lat: 21.1259,
      lng: 105.8726
    },
    rating: 4.2,
    reviewCount: 165,
    priceLevel: 1,
    tags: ["Archaeological", "Historical", "Cultural"],
    timeToVisit: "Daytime",
    localFavorite: false,
    travelStyles: ["cultural", "explorer"]
  },
  {
    id: "18",
    name: "Thanh Chuong Viet Palace",
    description: "Artistic complex showcasing traditional Vietnamese architecture, art collections, and cultural artifacts in a serene setting.",
    imageUrl: "https://images.unsplash.com/photo-1573491619969-74f6d86d5e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    location: "Soc Son District",
    coordinates: {
      lat: 21.1375,
      lng: 105.8351
    },
    rating: 4.5,
    reviewCount: 198,
    priceLevel: 2,
    tags: ["Art", "Culture", "Architecture"],
    timeToVisit: "Daytime",
    localFavorite: true,
    travelStyles: ["cultural", "photography"]
  },
  {
    id: "19",
    name: "Hanoi Cooking Centre",
    description: "Culinary school offering cooking classes where visitors learn to prepare traditional Vietnamese dishes after visiting local markets.",
    imageUrl: "https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    location: "Ba Dinh District",
    coordinates: {
      lat: 21.0411,
      lng: 105.8453
    },
    rating: 4.8,
    reviewCount: 342,
    priceLevel: 3,
    tags: ["Food", "Classes", "Cultural Experience"],
    timeToVisit: "Morning to Afternoon",
    localFavorite: false,
    travelStyles: ["foodie", "cultural"]
  },
  {
    id: "20",
    name: "Lotus Ponds of West Lake",
    description: "Beautiful lotus gardens where visitors can take boat rides among the flowers and enjoy lotus tea, especially stunning during summer bloom.",
    imageUrl: "https://images.unsplash.com/photo-1596872581767-3956459185f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    location: "Tay Ho District",
    coordinates: {
      lat: 21.0706,
      lng: 105.8255
    },
    rating: 4.4,
    reviewCount: 207,
    priceLevel: 1,
    tags: ["Nature", "Photography", "Peaceful"],
    timeToVisit: "Early Morning or Late Afternoon",
    localFavorite: true,
    travelStyles: ["nature", "photography", "explorer"]
  }
];

export const getPlaces = (): Promise<Place[]> => {
  return Promise.resolve(placesData);
};

export const getPlaceById = (id: string): Promise<Place | undefined> => {
  return Promise.resolve(placesData.find(place => place.id === id));
};

export const getFilteredPlaces = (
  travelStyles: string[] = [], 
  maxPriceLevel: number = 3,
  near?: { lat: number; lng: number; radius: number }
): Promise<Place[]> => {
  let filtered = [...placesData];
  
  // Filter by travel styles if any are specified
  if (travelStyles.length > 0) {
    filtered = filtered.filter(place => 
      place.travelStyles.some(style => travelStyles.includes(style))
    );
  }
  
  // Filter by price level
  filtered = filtered.filter(place => place.priceLevel <= maxPriceLevel);
  
  // Filter by proximity if location is provided
  if (near) {
    filtered = filtered.filter(place => {
      // Simple distance calculation (not accounting for Earth's curvature)
      const distance = Math.sqrt(
        Math.pow(place.coordinates.lat - near.lat, 2) + 
        Math.pow(place.coordinates.lng - near.lng, 2)
      );
      
      // Convert distance to approximate kilometers (very rough estimate)
      const distanceInKm = distance * 111;
      
      return distanceInKm <= near.radius;
    });
  }
  
  return Promise.resolve(filtered);
};
