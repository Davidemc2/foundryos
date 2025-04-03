
import { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Mic, Paperclip } from "lucide-react";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { FilePreview } from "@/components/chat/FilePreview";
import { Message, ChatStage } from "../constants";
import { toast } from "@/hooks/use-toast";

interface BuildChatSectionProps {
  messages: Message[];
  isTyping: boolean;
  isProcessing: boolean;
  uploadedFiles: File[];
  onRemoveFile: (file: File) => void;
  onSendMessage: (e: React.FormEvent) => void;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  triggerFileUpload: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentStage: ChatStage;
}

export const BuildChatSection: React.FC<BuildChatSectionProps> = ({
  messages,
  isTyping,
  isProcessing,
  uploadedFiles,
  onRemoveFile,
  onSendMessage,
  inputValue,
  setInputValue,
  fileInputRef,
  triggerFileUpload,
  handleFileChange,
  currentStage
}) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);
  
  const handleFileDrop = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);
      // This should be handled by the parent component
      handleFileChange({
        target: {
          files: e.dataTransfer.files
        }
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  return (
    <>
      <ScrollArea className="flex-1 pr-4 mb-4" ref={scrollAreaRef}>
        <div className="space-y-4 pb-2">
          {messages.map((message, index) => (
            <ChatMessage 
              key={message.id}
              message={message}
              isLoading={index === messages.length - 1 && isProcessing}
            />
          ))}
          
          {isTyping && <TypingIndicator />}
          
          <div ref={messageEndRef} />
        </div>
      </ScrollArea>
      
      {uploadedFiles.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {uploadedFiles.map((file, index) => (
            <FilePreview 
              key={index}
              file={file}
              onRemove={() => onRemoveFile(file)}
            />
          ))}
        </div>
      )}
      
      {currentStage !== 'payment' && (
        <form 
          onSubmit={onSendMessage}
          onDrop={handleFileDrop}
          onDragOver={handleDragOver}
          className="relative focus-within:ring-2 focus-within:ring-violet-500/50 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 rounded-lg transition-all duration-300"
        >
          <div className="flex items-center gap-2 border border-gray-700 rounded-lg p-2 bg-gray-800 shadow-inner group transition-all duration-300 focus-within:border-violet-500/50">
            <Input 
              type="file" 
              id="file-upload" 
              className="hidden" 
              onChange={handleFileChange}
              ref={fileInputRef}
              accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
              multiple
            />
            <Button
              type="button"
              variant="ghost" 
              size="icon"
              className="text-gray-400 hover:text-violet-400 transition-colors"
              onClick={triggerFileUpload}
            >
              <Paperclip size={18} />
            </Button>
            
            <Input 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={currentStage === 'initial' 
                ? "Describe your app idea..." 
                : "Type your response..."}
              className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base bg-transparent text-white"
            />
            
            <Button 
              type="button"
              variant="ghost" 
              size="icon"
              className="text-gray-400 hover:text-violet-400 transition-colors"
            >
              <Mic size={18} />
            </Button>
            
            <Button 
              type="submit" 
              size="icon"
              disabled={isProcessing || (!inputValue.trim() && uploadedFiles.length === 0)}
              className="rounded-full bg-violet-600 hover:bg-violet-700"
            >
              {isProcessing ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Send size={18} />
              )}
            </Button>
          </div>
          
          <div className="mt-2 text-xs text-center text-gray-500">
            {!uploadedFiles.length && <p>Drag & drop files or click the paperclip to upload (.pdf, .doc, .png, .jpg, .txt)</p>}
          </div>
        </form>
      )}
    </>
  );
}
