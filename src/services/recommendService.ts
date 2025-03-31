
import { v4 as uuidv4 } from 'uuid';

// Key for storing recommended places in localStorage
const RECOMMENDED_PLACES_STORAGE_KEY = 'recommendedPlaces';

/**
 * Save or remove a place from recommended list
 */
export const saveRecommendedPlace = async (placeId: string, isRecommended: boolean): Promise<void> => {
  try {
    // Get existing recommended places
    const existingRecommendedJson = localStorage.getItem(RECOMMENDED_PLACES_STORAGE_KEY);
    let recommendedPlaces: string[] = existingRecommendedJson ? JSON.parse(existingRecommendedJson) : [];
    
    if (isRecommended) {
      // Add to recommended if not already there
      if (!recommendedPlaces.includes(placeId)) {
        recommendedPlaces.push(placeId);
      }
    } else {
      // Remove from recommended
      recommendedPlaces = recommendedPlaces.filter(id => id !== placeId);
    }
    
    // Save updated recommended places
    localStorage.setItem(RECOMMENDED_PLACES_STORAGE_KEY, JSON.stringify(recommendedPlaces));
  } catch (error) {
    console.error('Error saving recommended place:', error);
    throw new Error('Failed to save recommended place');
  }
};

/**
 * Check if a place is saved as recommended
 */
export const isPlaceRecommended = async (placeId: string): Promise<boolean> => {
  try {
    const recommendedJson = localStorage.getItem(RECOMMENDED_PLACES_STORAGE_KEY);
    if (!recommendedJson) return false;
    
    const recommendedPlaces: string[] = JSON.parse(recommendedJson);
    return recommendedPlaces.includes(placeId);
  } catch (error) {
    console.error('Error checking recommended place:', error);
    return false;
  }
};

/**
 * Get all recommended place IDs
 */
export const getRecommendedPlaceIds = async (): Promise<string[]> => {
  try {
    const recommendedJson = localStorage.getItem(RECOMMENDED_PLACES_STORAGE_KEY);
    if (!recommendedJson) return [];
    
    return JSON.parse(recommendedJson);
  } catch (error) {
    console.error('Error getting recommended places:', error);
    return [];
  }
};
