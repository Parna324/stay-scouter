
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChatBotContent } from '@/components/ChatBotContent';
import { Bot } from 'lucide-react';

const ChatbotPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 flex items-center justify-center gap-3">
            <Bot className="h-8 w-8 text-hotel-600" />
            <span>Hotel Assistant</span>
          </h1>
          
          <p className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            Ask our AI assistant about hotels, destinations, or travel recommendations. I can help you find the perfect place for your next stay.
          </p>
          
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <ChatBotContent isExpanded={true} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChatbotPage;
