
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Send, Mic, Paperclip, FileUp, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { FilePreview } from "@/components/chat/FilePreview";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { MessageResponseContent } from "@/components/chat/MessageResponseContent"; 
import { BuildEmailForm } from "@/components/chat/BuildEmailForm";
import { ThankYouCard } from "@/components/chat/ThankYouCard";

type MessageType = "user" | "assistant";

interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
}

interface TaskItem {
  id: number;
  title: string;
  description: string;
}

interface LocationState {
  initialPrompt?: string;
}

const BuildPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState(state?.initialPrompt || "");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [result, setResult] = useState<{
    scope: string;
    tasks: TaskItem[];
    estimate: { standard: string; fastTrack: string };
  } | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [currentResponseStep, setCurrentResponseStep] = useState(0);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, currentResponseStep]);

  // Add initial welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: generateUniqueId(),
      type: "assistant",
      content: "Hi there! I'm Foundry OS. Describe your app idea, and I'll create a project scope, task breakdown, and cost estimate for you.",
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
    
    // If we have an initial prompt from the teaser, submit it automatically
    if (state?.initialPrompt) {
      setTimeout(() => {
        handleSendMessage(new Event('submit') as any);
      }, 800);
    }
  }, []);

  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() && uploadedFiles.length === 0) return;
    
    // Add user message
    const userMessage: Message = {
      id: generateUniqueId(),
      type: "user",
      content: uploadedFiles.length > 0 
        ? `${inputValue} ${uploadedFiles.map(file => `[Uploaded: ${file.name}]`).join(" ")}`
        : inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setUploadedFiles([]);
    setIsTyping(true);
    setHasInteracted(true);
    setCurrentResponseStep(0);
    
    // Generate mock data response
    const mockResult = {
      scope: `Your ${inputValue.split(" ").slice(0, 3).join(" ")}... app will feature a responsive design with user authentication, data storage, and a clean interface. We'll implement core functionality first, then add advanced features in subsequent iterations.`,
      tasks: [
        {
          id: 1,
          title: "User Authentication System",
          description: "Login, signup, password reset flows with secure token-based authentication."
        },
        {
          id: 2, 
          title: "Core Functionality Implementation",
          description: "Building the primary features described in your idea, including database integration."
        },
        {
          id: 3,
          title: "Responsive UI Design",
          description: "Creating a modern, mobile-first interface that works across all devices."
        },
        {
          id: 4,
          title: "Testing & QA",
          description: "Comprehensive testing to ensure functionality works as expected."
        }
      ],
      estimate: {
        standard: "$0 (7-day)",
        fastTrack: "$250 (2-day fast track)"
      }
    };
    
    setResult(mockResult);
    
    // Show first message after a short delay
    setTimeout(() => {
      setIsTyping(false);
      
      // First message - Project Scope
      const scopeMessage: Message = {
        id: generateUniqueId(),
        type: "assistant",
        content: `Got it! Here's the scope based on what you shared:\n\n📄 **Project Scope:**\n${mockResult.scope}`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, scopeMessage]);
      setCurrentResponseStep(1);
      setIsTyping(true);
      
      // Second message - Task Breakdown after 1.5s
      setTimeout(() => {
        setIsTyping(false);
        
        const tasksMessage: Message = {
          id: generateUniqueId(),
          type: "assistant",
          content: `To build this, here are the main tasks:\n\n✅ **Task Breakdown:**\n${mockResult.tasks.map(task => `• **${task.title}:** ${task.description}`).join('\n')}`,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, tasksMessage]);
        setCurrentResponseStep(2);
        setIsTyping(true);
        
        // Third message - Cost Estimate after another 1.5s
        setTimeout(() => {
          setIsTyping(false);
          
          const costMessage: Message = {
            id: generateUniqueId(),
            type: "assistant",
            content: `💰 **Estimated Cost:**\n${mockResult.estimate.standard} or ${mockResult.estimate.fastTrack}`,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, costMessage]);
          setCurrentResponseStep(3);
        }, 1500);
      }, 1500);
    }, 1000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...filesArray]);
      toast({
        title: "File uploaded",
        description: `${filesArray.length} file(s) added to your message`,
      });
    }
  };

  const handleSendToBuilder = (email: string) => {
    // In a real app, this would send the request to the server
    toast({
      title: "Success!",
      description: "Your build request has been sent to the Foundry team.",
    });
    setShowThankYou(true);
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);
      setUploadedFiles(prev => [...prev, ...filesArray]);
      toast({
        title: "File uploaded",
        description: `${filesArray.length} file(s) added to your message`,
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleRemoveFile = (fileToRemove: File) => {
    setUploadedFiles(uploadedFiles.filter(file => file !== fileToRemove));
  };

  if (showThankYou) {
    return <ThankYouCard onBackToHome={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <div className="bg-gray-900 border-b border-gray-800 p-4">
        <div className="container-custom flex justify-between items-center">
          <Button 
            variant="ghost" 
            className="gap-2 text-gray-300 hover:bg-gray-800 hover:text-white"
            onClick={handleBackToHome}
          >
            <ArrowLeft size={16} />
            Back to Homepage
          </Button>
          <h1 className="text-xl font-semibold text-white">Foundry OS Builder</h1>
          <div className="w-[76px]"></div> {/* Spacer for centering */}
        </div>
      </div>
      
      <div className="flex-1 container-custom py-8">
        <Card className="mx-auto shadow-lg border border-violet-500/20 bg-gray-900 max-w-4xl">
          <CardContent className="p-6">
            <div className="flex flex-col h-[600px]">
              <ScrollArea className="flex-1 pr-4 mb-4" ref={scrollAreaRef}>
                <div className="space-y-4 pb-2">
                  {messages.map((message) => (
                    <ChatMessage 
                      key={message.id}
                      message={message}
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
                      onRemove={() => handleRemoveFile(file)}
                    />
                  ))}
                </div>
              )}
              
              {result && currentResponseStep === 3 && (
                <BuildEmailForm onSubmit={handleSendToBuilder} />
              )}
              
              {(!result || currentResponseStep < 3) && (
                <form 
                  onSubmit={handleSendMessage}
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
                      placeholder="Describe your app idea or upload your scope..."
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
                      disabled={isTyping || (!inputValue.trim() && uploadedFiles.length === 0)}
                      className="rounded-full bg-violet-600 hover:bg-violet-700"
                    >
                      <Send size={18} />
                    </Button>
                  </div>
                  
                  <div className="mt-2 text-xs text-center text-gray-500">
                    {!uploadedFiles.length && <p>Drag & drop files or click the paperclip to upload (.pdf, .doc, .png, .jpg, .txt)</p>}
                  </div>
                </form>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BuildPage;
