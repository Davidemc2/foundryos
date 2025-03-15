
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageResponseContent } from "@/components/chat/MessageResponseContent";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLoading = false }) => {
  return (
    <div 
      className={`flex items-start ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-slideUp`}
    >
      {message.type === 'assistant' && (
        <Avatar className="mr-2 h-8 w-8 bg-violet-900/50 border border-violet-600/30">
          <AvatarFallback className="text-white">OS</AvatarFallback>
        </Avatar>
      )}
      
      <div 
        className={`max-w-[85%] p-3 rounded-lg shadow-md ${
          message.type === 'user' 
            ? 'bg-violet-600 text-white rounded-br-sm ml-auto' 
            : 'bg-gray-800 text-gray-100 rounded-tl-sm border border-gray-700'
        }`}
      >
        {message.type === 'assistant' ? (
          <MessageResponseContent content={message.content} />
        ) : (
          <p>{message.content}</p>
        )}
        {isLoading && (
          <div className="h-4 w-12 mt-2 flex justify-start space-x-1">
            <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></div>
            <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
            <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
          </div>
        )}
      </div>
    </div>
  );
};
