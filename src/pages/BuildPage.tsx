
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, FileUp, Zap, List, DollarSign, Mail, Send, Mic, Paperclip, ArrowLeft } from "lucide-react";

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

const BuildPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [result, setResult] = useState<{
    scope: string;
    tasks: TaskItem[];
    estimate: { standard: string; fastTrack: string };
  } | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [email, setEmail] = useState("");
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Add initial welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: generateUniqueId(),
      type: "assistant",
      content: "Hi there! I'm Foundry OS. Describe your app idea, and I'll create a project scope, task breakdown, and cost estimate for you.",
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
  }, []);

  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: generateUniqueId(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setHasInteracted(true);
    
    // Simulate typing delay (1.5 - 2.5 seconds)
    const typingDelay = 1500 + Math.random() * 1000;
    
    setTimeout(() => {
      setIsTyping(false);
      
      // Generate response
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
      
      // Format the assistant's response
      const responseContent = `
**Project Scope:**
${mockResult.scope}

**Task Breakdown:**
${mockResult.tasks.map(task => `• **${task.title}:** ${task.description}`).join('\n')}

**Estimated Build Cost:**
${mockResult.estimate.standard} or ${mockResult.estimate.fastTrack}
      `.trim();
      
      // Add assistant message
      const assistantMessage: Message = {
        id: generateUniqueId(),
        type: "assistant",
        content: responseContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    }, typingDelay);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This would handle file uploads in a real implementation
    console.log("File selected:", e.target.files);
  };

  const handleSendToBuilder = () => {
    setShowThankYou(true);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // In a real app, this would send the email to the server
      console.log("Email submitted:", email);
      navigate("/");
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  if (showThankYou) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-lg border-gray-200">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={32} className="text-violet-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Thanks for your submission!</h2>
              <p className="text-gray-600">We'll review your idea and send you our thoughts.</p>
            </div>
            
            <form onSubmit={handleSubmitEmail} className="space-y-4">
              <div>
                <Label htmlFor="email">Where should we send the details?</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com" 
                  value={email} 
                  onChange={handleEmailChange}
                  className="mt-1"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">
                Submit
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full gap-2"
                onClick={handleBackToHome}
              >
                <ArrowLeft size={16} />
                Back to Homepage
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="container-custom flex justify-between items-center">
          <Button 
            variant="ghost" 
            className="gap-2"
            onClick={handleBackToHome}
          >
            <ArrowLeft size={16} />
            Back to Homepage
          </Button>
          <h1 className="text-xl font-semibold text-gray-900">Foundry OS Builder</h1>
          <div className="w-[76px]"></div> {/* Spacer for centering */}
        </div>
      </div>
      
      <div className="flex-1 container-custom py-8">
        <Card className="mx-auto shadow-lg border-gray-200 max-w-4xl">
          <CardContent className="p-6">
            <div className="flex flex-col h-[500px]">
              <ScrollArea className="flex-1 pr-4 mb-4" ref={scrollAreaRef}>
                <div className="space-y-4 pb-2">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex items-start ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-slideUp`}
                    >
                      <div 
                        className={`max-w-[85%] p-3 rounded-lg shadow-sm ${
                          message.type === 'user' 
                            ? 'bg-violet-600 text-white rounded-br-sm ml-auto' 
                            : 'bg-violet-100 text-gray-800 rounded-tl-sm'
                        }`}
                      >
                        {message.type === 'assistant' ? (
                          <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: message.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />') }} />
                        ) : (
                          <p>{message.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex items-start animate-fadeIn">
                      <div className="bg-violet-100 text-gray-800 p-3 rounded-lg rounded-tl-sm shadow-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce animation-delay-200"></div>
                          <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce animation-delay-400"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messageEndRef} />
                </div>
              </ScrollArea>
              
              {result && messages.length > 0 && messages[messages.length - 1].type === 'assistant' && (
                <div className="mb-4 mt-2">
                  <Button 
                    onClick={handleSendToBuilder} 
                    className="w-full gap-2 py-6"
                    variant="outline"
                  >
                    Send to Builder
                    <Mail size={16} />
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-2">We'll email you a copy and notify the team.</p>
                </div>
              )}
              
              <form onSubmit={handleSendMessage} className="flex items-center gap-2 border rounded-lg p-2 bg-white shadow-sm">
                <Label htmlFor="file-upload" className="cursor-pointer text-gray-500 hover:text-violet-600 transition-colors p-2">
                  <Paperclip size={18} />
                  <Input 
                    type="file" 
                    id="file-upload" 
                    className="hidden" 
                    onChange={handleFileChange}
                    multiple
                  />
                </Label>
                
                <Input 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Describe your app idea or upload your scope..."
                  className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
                />
                
                <Button 
                  type="button"
                  variant="ghost" 
                  size="icon"
                  className="text-gray-500 hover:text-violet-600 transition-colors"
                >
                  <Mic size={18} />
                </Button>
                
                <Button 
                  type="submit" 
                  size="icon"
                  disabled={isTyping || !inputValue.trim()}
                  className="rounded-full"
                >
                  <Send size={18} />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BuildPage;
