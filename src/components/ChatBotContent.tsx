
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearch } from '@/context/SearchContext';
import { useNavigate } from 'react-router-dom';
import { getAllHotels } from '@/services/hotelService';
import { Hotel } from '@/types/hotel';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
};

interface ChatBotContentProps {
  isExpanded?: boolean;
}

export const ChatBotContent = ({ isExpanded = false }: ChatBotContentProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', content: 'Hi there! I can help you find the perfect hotel. What are you looking for?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const { updateSearchParams } = useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const hotelData = await getAllHotels();
        if (hotelData && Array.isArray(hotelData)) {
          // Map the database response to the Hotel type
          const formattedHotels: Hotel[] = hotelData.map((hotel: any) => ({
            id: hotel.id || '',
            name: hotel.name || '',
            location: {
              city: hotel.location && hotel.location.includes(',') 
                ? hotel.location.split(',')[0].trim() 
                : '',
              country: hotel.location && hotel.location.includes(',') 
                ? hotel.location.split(',')[1].trim() 
                : hotel.location || '',
              address: hotel.location || '',
            },
            price: hotel.price_per_night || 0,
            currency: "USD",
            rating: hotel.rating || 4,
            reviews: [],
            images: [hotel.image_url || ''],
            description: hotel.description || '',
            amenities: hotel.amenities || [],
            rooms: [],
            // Additional properties from the DB
            image_url: hotel.image_url || '',
            price_per_night: hotel.price_per_night || 0,
            user_id: hotel.user_id || '',
            created_at: hotel.created_at || new Date().toISOString()
          }));
          
          setHotels(formattedHotels);
        }
      } catch (error) {
        console.error('Error fetching hotels for chatbot:', error);
      }
    };
    
    fetchHotels();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), content: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Process the user's query
    setTimeout(() => {
      processUserQuery(userMessage.content);
      setIsLoading(false);
    }, 500);
  };

  const processUserQuery = (query: string) => {
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
    
    setMessages(prev => [...prev, { id: Date.now().toString(), content: botResponse, sender: 'bot' }]);
    
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
  };

  const handleHotelSelection = (hotelId: string) => {
    navigate(`/hotel/${hotelId}`);
  };

  const formatMessage = (content: string) => {
    // Handle markdown-like formatting
    return content.split('\n').map((line, i) => {
      // Bold text
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // Check if this is a hotel in the list
      const hotelMatch = line.match(/^\d+\.\s+\*\*(.*?)\*\*/);
      if (hotelMatch) {
        const hotelName = hotelMatch[1];
        const matchedHotel = hotels.find(h => h.name === hotelName);
        
        if (matchedHotel) {
          return (
            <div key={i} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded" onClick={() => handleHotelSelection(matchedHotel.id)}>
              <div dangerouslySetInnerHTML={{ __html: line }} />
            </div>
          );
        }
      }
      
      return <div key={i} dangerouslySetInnerHTML={{ __html: line }} />;
    });
  };

  const messageContainerClasses = isExpanded 
    ? "h-[500px] overflow-y-auto px-4 py-2 space-y-4"
    : "flex-1 overflow-y-auto px-4 py-2 space-y-4";

  return (
    <div className="flex flex-col h-full">
      <div className={messageContainerClasses}>
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-hotel-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
              }`}
            >
              {formatMessage(message.content)}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>
      <form onSubmit={handleSendMessage} className="p-4 border-t dark:border-gray-700">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about hotels..."
            className="flex-1"
          />
          <Button type="submit" disabled={!input.trim() || isLoading}>
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};
