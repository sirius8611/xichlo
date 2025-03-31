
import { v4 as uuidv4 } from 'uuid';

// Key for storing favorites in localStorage
const FAVORITES_STORAGE_KEY = 'favoritePlace';

/**
 * Save or remove a place from favorites
 */
export const saveFavoritePlace = async (placeId: string, isFavorite: boolean): Promise<void> => {
  try {
    // Get existing favorites
    const existingFavoritesJson = localStorage.getItem(FAVORITES_STORAGE_KEY);
    let favorites: string[] = existingFavoritesJson ? JSON.parse(existingFavoritesJson) : [];
    
    if (isFavorite) {
      // Add to favorites if not already there
      if (!favorites.includes(placeId)) {
        favorites.push(placeId);
      }
    } else {
      // Remove from favorites
      favorites = favorites.filter(id => id !== placeId);
    }
    
    // Save updated favorites
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorite place:', error);
    throw new Error('Failed to save favorite place');
  }
};

/**
 * Check if a place is saved as favorite
 */
export const isFavoritePlaceSaved = async (placeId: string): Promise<boolean> => {
  try {
    const favoritesJson = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!favoritesJson) return false;
    
    const favorites: string[] = JSON.parse(favoritesJson);
    return favorites.includes(placeId);
  } catch (error) {
    console.error('Error checking favorite place:', error);
    return false;
  }
};

/**
 * Get all favorite place IDs
 */
export const getFavoritePlaceIds = async (): Promise<string[]> => {
  try {
    const favoritesJson = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!favoritesJson) return [];
    
    return JSON.parse(favoritesJson);
  } catch (error) {
    console.error('Error getting favorite places:', error);
    return [];
  }
};
