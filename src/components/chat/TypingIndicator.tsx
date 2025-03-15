
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start animate-fadeIn">
      <Avatar className="mr-2 h-8 w-8 bg-violet-900/50 border border-violet-600/30">
        <AvatarFallback className="text-white">OS</AvatarFallback>
      </Avatar>
      <div className="bg-gray-800 text-gray-100 p-3 rounded-lg rounded-tl-sm border border-gray-700 shadow-md">
        <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce"></div>
          <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce animation-delay-200"></div>
          <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce animation-delay-400"></div>
        </div>
      </div>
    </div>
  );
};
