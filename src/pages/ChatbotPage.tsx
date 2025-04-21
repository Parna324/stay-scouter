
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChatBotContent } from '@/components/ChatBotContent';

const ChatbotPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Hotel Assistant
          </h1>
          
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
            <ChatBotContent isExpanded={true} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChatbotPage;
