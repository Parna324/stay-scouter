
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatInputFormProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInputForm: React.FC<ChatInputFormProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
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
  );
};

export default ChatInputForm;
