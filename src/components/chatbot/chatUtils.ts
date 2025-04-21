
import { Hotel } from '@/types/hotel';
import { Message } from './types';
import { useSearch } from '@/context/SearchContext';

export const processUserQuery = (query: string, hotels: Hotel[], updateSearchParams: ReturnType<typeof useSearch>['updateSearchParams']) => {
  const lowerQuery = query.toLowerCase();
  
  // Parse location
  let location = '';
  if (lowerQuery.includes('in ')) {
    const locationMatch = lowerQuery.match(/in\s+([a-z\s]+)(?:,|\s|$)/i);
    if (locationMatch && locationMatch[1]) {
      location = locationMatch[1].trim();
    }
  }
  
  // Parse price range
  let minPrice = 0;
  let maxPrice = 0;
  if (lowerQuery.includes('under ')) {
    const priceMatch = lowerQuery.match(/under\s+(\d+)/i);
    if (priceMatch && priceMatch[1]) {
      maxPrice = parseInt(priceMatch[1]);
    }
  } else if (lowerQuery.includes('between ')) {
    const priceMatch = lowerQuery.match(/between\s+(\d+)\s+and\s+(\d+)/i);
    if (priceMatch && priceMatch[1] && priceMatch[2]) {
      minPrice = parseInt(priceMatch[1]);
      maxPrice = parseInt(priceMatch[2]);
    }
  }
  
  // Parse amenities
  const amenities: string[] = [];
  const amenityKeywords = ['wifi', 'pool', 'spa', 'gym', 'restaurant', 'free breakfast', 'parking'];
  
  amenityKeywords.forEach(amenity => {
    if (lowerQuery.includes(amenity)) {
      amenities.push(amenity);
    }
  });
  
  // Check for rating request
  let rating = 0;
  if (lowerQuery.includes('star')) {
    const ratingMatch = lowerQuery.match(/(\d+)\s+star/i);
    if (ratingMatch && ratingMatch[1]) {
      rating = parseInt(ratingMatch[1]);
    }
  }
  
  // Filter hotels based on the query
  let filteredHotels = [...hotels];
  
  if (location) {
    filteredHotels = filteredHotels.filter(
      hotel => hotel.location.city?.toLowerCase().includes(location.toLowerCase()) || 
              hotel.location.country?.toLowerCase().includes(location.toLowerCase())
    );
  }
  
  if (maxPrice > 0) {
    filteredHotels = filteredHotels.filter(hotel => hotel.price <= maxPrice);
  }
  
  if (minPrice > 0) {
    filteredHotels = filteredHotels.filter(hotel => hotel.price >= minPrice);
  }
  
  if (amenities.length > 0) {
    filteredHotels = filteredHotels.filter(hotel => 
      amenities.every(amenity => 
        hotel.amenities.some(a => a.toLowerCase().includes(amenity.toLowerCase()))
      )
    );
  }
  
  if (rating > 0) {
    filteredHotels = filteredHotels.filter(hotel => Math.floor(hotel.rating) >= rating);
  }

  // Generate response
  let botResponse = '';
  
  if (filteredHotels.length > 0) {
    const topHotels = filteredHotels.slice(0, 3);
    botResponse = `I found ${filteredHotels.length} hotels that match your criteria. Here are the top matches:\n\n` +
      topHotels.map((hotel, index) => 
        `${index + 1}. **${hotel.name}** in ${hotel.location.city}, ${hotel.location.country}. Price: $${hotel.price} per night. Rating: ${hotel.rating}/5.`
      ).join('\n\n') +
      `\n\nWould you like to see more details about any of these hotels or refine your search?`;
  } else {
    botResponse = "I couldn't find any hotels matching your exact criteria. Could you try being a bit more general or adjust your preferences?";
  }
  
  // Update search context if there are filters
  if (location || minPrice || maxPrice || amenities.length > 0 || rating > 0) {
    const searchParams = {
      ...(location && { location }),
      ...(minPrice > 0 || maxPrice > 0) && { 
        priceRange: { 
          min: minPrice > 0 ? minPrice : 0, 
          max: maxPrice > 0 ? maxPrice : 5000 
        } 
      },
      ...(amenities.length > 0 && { amenities }),
      ...(rating > 0 && { rating }),
    };
    
    updateSearchParams(searchParams);
  }
  
  return botResponse;
};
