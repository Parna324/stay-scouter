
import React from 'react';
import { Message } from './types';
import { Hotel } from '@/types/hotel';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

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
            <div 
              key={i} 
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded transition-all duration-300 transform hover:scale-102" 
              onClick={() => handleHotelSelection(matchedHotel.id)}
            >
              <div dangerouslySetInnerHTML={{ __html: line }} />
            </div>
          );
        }
      }
      
      return <div key={i} dangerouslySetInnerHTML={{ __html: line }} />;
    });
  };

  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} my-3 animate-fade-in`}>
      <div
        className={`
          max-w-[80%] rounded-2xl px-6 py-3 shadow-sm
          ${message.sender === 'user'
            ? 'bg-hotel-600 text-white ml-4'
            : 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 mr-4'
          }
          ${message.sender === 'bot' ? 'flex items-start gap-2' : ''}
        `}
      >
        {message.sender === 'bot' && (
          <MessageCircle className="w-5 h-5 mt-1 text-hotel-600 dark:text-hotel-400 flex-shrink-0" />
        )}
        <div className="space-y-2">
          {formatMessage(message.content)}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
