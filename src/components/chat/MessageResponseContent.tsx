
import React from "react";

interface MessageResponseContentProps {
  content: string;
}

export const MessageResponseContent: React.FC<MessageResponseContentProps> = ({ content }) => {
  // Replace markdown-style formatting with HTML
  const formattedContent = content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Bold text
    .replace(/\n/g, '<br />');  // Line breaks
  
  return (
    <div 
      className="prose prose-sm max-w-none prose-invert" 
      dangerouslySetInnerHTML={{ __html: formattedContent }} 
    />
  );
};
