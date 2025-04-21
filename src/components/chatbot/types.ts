
import { Hotel } from '@/types/hotel';

export type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
};

export interface ChatBotContentProps {
  isExpanded?: boolean;
}
