
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';
import { ChatBotContent } from './chatbot/ChatBotContent';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  // Use Dialog for desktop and Drawer for mobile
  return (
    <>
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-hotel-600 text-white shadow-lg hover:bg-hotel-700 border-none"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[80vh]">
            <DrawerHeader className="flex justify-between items-center">
              <DrawerTitle>Hotel Assistant</DrawerTitle>
              <Link 
                to="/chatbot" 
                className="text-sm text-hotel-600 hover:underline"
                onClick={() => setIsOpen(false)}
              >
                Open full page
              </Link>
            </DrawerHeader>
            <ChatBotContent />
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-hotel-600 text-white shadow-lg hover:bg-hotel-700 border-none"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] h-[600px] flex flex-col">
            <DialogHeader className="flex flex-row justify-between items-center">
              <DialogTitle>Hotel Assistant</DialogTitle>
              <Link 
                to="/chatbot" 
                className="text-sm text-hotel-600 hover:underline"
                onClick={() => setIsOpen(false)}
              >
                Open full page
              </Link>
            </DialogHeader>
            <ChatBotContent />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ChatBot;
