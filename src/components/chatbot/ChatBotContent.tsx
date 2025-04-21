
import React, { useState, useRef, useEffect } from 'react';
import { useSearch } from '@/context/SearchContext';
import { useNavigate } from 'react-router-dom';
import { getAllHotels } from '@/services/hotelService';
import { Hotel } from '@/types/hotel';
import { Message, ChatBotContentProps } from './types';
import ChatMessage from './ChatMessage';
import ChatInputForm from './ChatInputForm';
import TypingIndicator from './TypingIndicator';
import { processUserQuery } from './chatUtils';

export const ChatBotContent = ({ isExpanded = false }: ChatBotContentProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', content: 'Hi there! I can help you find the perfect hotel. What are you looking for?', sender: 'bot' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const { updateSearchParams } = useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      setIsLoading(true);
      try {
        const hotelData = await getAllHotels();
        console.log('Hotel data received:', hotelData?.length || 0);
        
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
          console.log('Hotels loaded for chatbot:', formattedHotels.length);
        }
      } catch (error) {
        console.error('Error fetching hotels for chatbot:', error);
        setMessages(prev => [...prev, { 
          id: Date.now().toString(), 
          content: "I'm having trouble accessing hotel information right now. Please try again later.", 
          sender: 'bot' 
        }]);
      } finally {
        setIsLoading(false);
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

  const handleSendMessage = async (input: string) => {
    if (!input.trim()) return;
    
    const userMessage: Message = { id: Date.now().toString(), content: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Process the user's query
      setTimeout(() => {
        try {
          const botResponse = processUserQuery(userMessage.content, hotels, updateSearchParams);
          setMessages(prev => [...prev, { id: Date.now().toString(), content: botResponse, sender: 'bot' }]);
        } catch (error) {
          console.error('Error processing query:', error);
          setMessages(prev => [...prev, { 
            id: Date.now().toString(), 
            content: "Sorry, I had trouble understanding your request. Could you try phrasing it differently?", 
            sender: 'bot' 
          }]);
        } finally {
          setIsLoading(false);
        }
      }, 500);
    } catch (error) {
      console.error('Error processing message:', error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        content: "Sorry, I'm having trouble processing your request. Please try again.", 
        sender: 'bot' 
      }]);
      setIsLoading(false);
    }
  };

  const messageContainerClasses = isExpanded 
    ? "h-[500px] overflow-y-auto px-4 py-2 space-y-4"
    : "flex-1 overflow-y-auto px-4 py-2 space-y-4";

  return (
    <div className="flex flex-col h-full">
      <div className={messageContainerClasses}>
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} hotels={hotels} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={endOfMessagesRef} />
      </div>
      <ChatInputForm onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatBotContent;
