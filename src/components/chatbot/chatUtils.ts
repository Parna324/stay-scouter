
import { Hotel } from '@/types/hotel';
import { Message } from './types';

export const processUserQuery = (query: string, hotels: Hotel[], updateSearchParams: any) => {
  // Log for debugging
  console.log('Processing user query:', query);
  console.log('Available hotels:', hotels.length);
  
  const lowerQuery = query.toLowerCase();
  
  // Handle greetings and common phrases first
  if (lowerQuery.includes('hello') || lowerQuery.includes('hi ') || lowerQuery === 'hi') {
    return "Hello! I'm your hotel assistant. How can I help you today? You can ask me about hotels, destinations, or travel recommendations.";
  } 
  
  if (lowerQuery.includes('how are you')) {
    return "I'm doing well, thanks for asking! I'm ready to help you find the perfect hotel. What are you looking for?";
  } 
  
  if (lowerQuery.includes('thank you') || lowerQuery.includes('thanks')) {
    return "You're welcome! Is there anything else I can help you with?";
  }

  if (lowerQuery.includes('help') || lowerQuery.includes('what can you do')) {
    return "I can help you find hotels based on location, price range, or amenities. Try asking something like 'Find hotels in New York under $200' or 'Show me hotels with a pool in Miami'.";
  }
  
  // Parse location
  let location = '';
  if (lowerQuery.includes('in ')) {
    const locationMatch = lowerQuery.match(/in\s+([a-z\s]+)(?:,|\s|$)/i);
    if (locationMatch && locationMatch[1]) {
      location = locationMatch[1].trim();
      console.log('Detected location:', location);
    }
  }
  
  // Parse price range
  let minPrice = 0;
  let maxPrice = 0;
  if (lowerQuery.includes('under ')) {
    const priceMatch = lowerQuery.match(/under\s+(\d+)/i);
    if (priceMatch && priceMatch[1]) {
      maxPrice = parseInt(priceMatch[1]);
      console.log('Detected max price:', maxPrice);
    }
  } else if (lowerQuery.includes('between ')) {
    const priceMatch = lowerQuery.match(/between\s+(\d+)\s+and\s+(\d+)/i);
    if (priceMatch && priceMatch[1] && priceMatch[2]) {
      minPrice = parseInt(priceMatch[1]);
      maxPrice = parseInt(priceMatch[2]);
      console.log('Detected price range:', minPrice, '-', maxPrice);
    }
  }
  
  // Parse amenities
  const amenities: string[] = [];
  const amenityKeywords = ['wifi', 'pool', 'spa', 'gym', 'restaurant', 'free breakfast', 'parking', 'beach', 'bar'];
  
  amenityKeywords.forEach(amenity => {
    if (lowerQuery.includes(amenity)) {
      amenities.push(amenity);
    }
  });
  
  if (amenities.length > 0) {
    console.log('Detected amenities:', amenities);
  }
  
  // Check for rating request
  let rating = 0;
  if (lowerQuery.includes('star')) {
    const ratingMatch = lowerQuery.match(/(\d+)\s+star/i);
    if (ratingMatch && ratingMatch[1]) {
      rating = parseInt(ratingMatch[1]);
      console.log('Detected rating:', rating);
    }
  }
  
  // Filter hotels based on the query - handle empty or undefined values safely
  let filteredHotels = [...hotels].filter(hotel => hotel !== undefined && hotel !== null);
  
  if (location && location.length > 0) {
    filteredHotels = filteredHotels.filter(
      hotel => {
        if (!hotel.location) return false;
        
        const cityMatch = hotel.location.city && 
                          hotel.location.city.toLowerCase().includes(location.toLowerCase());
        const countryMatch = hotel.location.country && 
                            hotel.location.country.toLowerCase().includes(location.toLowerCase());
        return cityMatch || countryMatch;
      }
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
      hotel.amenities && amenities.some(amenity => 
        hotel.amenities.some(a => 
          a.toLowerCase().includes(amenity.toLowerCase())
        )
      )
    );
  }
  
  if (rating > 0) {
    filteredHotels = filteredHotels.filter(hotel => Math.floor(hotel.rating) >= rating);
  }

  console.log('Filtered hotels count:', filteredHotels.length);

  // Generate response
  let botResponse = '';
  
  if (filteredHotels.length > 0) {
    // Hotel search responses
    const topHotels = filteredHotels.slice(0, 3);
    botResponse = `I found ${filteredHotels.length} hotels that match your criteria. Here are the top matches:\n\n` +
      topHotels.map((hotel, index) => 
        `${index + 1}. **${hotel.name}** in ${hotel.location.city || ''}, ${hotel.location.country || ''}. Price: $${hotel.price} per night. Rating: ${hotel.rating}/5.`
      ).join('\n\n') +
      `\n\nWould you like to see more details about any of these hotels or refine your search?`;
  } else if (location || minPrice > 0 || maxPrice > 0 || amenities.length > 0 || rating > 0) {
    botResponse = "I couldn't find any hotels matching your criteria. Try asking about different locations, price ranges, or amenities. For example, 'Show me hotels in Barcelona' or 'Find hotels under $150'.";
  } else {
    botResponse = "I'm not sure what you're looking for. Try asking about specific locations, price ranges, or amenities. For example, 'Show me hotels in New York' or 'Find hotels with a pool under $200'.";
  }
  
  // Update search context if there are filters
  if (location || minPrice > 0 || maxPrice > 0 || amenities.length > 0 || rating > 0) {
    try {
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
    } catch (error) {
      console.error('Error updating search params:', error);
    }
  }
  
  return botResponse;
};
