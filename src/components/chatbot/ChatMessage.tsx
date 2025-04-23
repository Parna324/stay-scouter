
import React from 'react';
import { Message } from './types';
import { Hotel } from '@/types/hotel';
import { useNavigate } from 'react-router-dom';

interface ChatMessageProps {
  message: Message;
  hotels: Hotel[];
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, hotels }) => {
  const navigate = useNavigate();

  const handleHotelSelection = (hotelId: string) => {
    if (hotelId) {
      console.log('Navigating to hotel:', hotelId);
      navigate(`/hotel/${hotelId}`);
    }
  };

  const formatMessage = (content: string) => {
    if (!content) return <div>No message content</div>;

    // Handle markdown-like formatting
    return content.split('\n').map((line, i) => {
      // Bold text
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // Check if this is a hotel in the list
      const hotelMatch = line.match(/^\d+\.\s+\*\*(.*?)\*\*/);
      if (hotelMatch && hotels && hotels.length > 0) {
        const hotelName = hotelMatch[1];
        const matchedHotel = hotels.find(h => h.name === hotelName);
        
        if (matchedHotel) {
          return (
            <div key={i} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded" 
                 onClick={() => handleHotelSelection(matchedHotel.id)}>
              <div dangerouslySetInnerHTML={{ __html: line }} />
            </div>
          );
        }
      }
      
      return <div key={i} dangerouslySetInnerHTML={{ __html: line }} />;
    });
  };

  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} my-2`}>
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
  );
};

export default ChatMessage;
