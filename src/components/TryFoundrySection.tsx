
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, FileUp, Zap, List, DollarSign, Mail, Send, Mic, Paperclip } from "lucide-react";

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

const TryFoundrySection = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [result, setResult] = useState<{
    scope: string;
    tasks: TaskItem[];
    estimate: { standard: string; fastTrack: string };
  } | null>(null);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

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
    alert("Your project details have been sent to our team! We'll email you a copy and notify the team.");
  };

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_40%_at_50%_50%,rgba(155,135,245,0.06)_0%,transparent_100%)]" />
      
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="heading-md text-gray-900 mb-2">Try Foundry Instantly</h2>
          <p className="text-gray-600 text-lg">Turn your idea into a scoped build — no signup needed.</p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-lg border-gray-200">
          <CardContent className="p-6">
            <div className="flex flex-col h-[500px]">
              <ScrollArea className="flex-1 pr-4 mb-4" ref={scrollAreaRef}>
                <div className="space-y-4 pb-2">
                  {!hasInteracted && (
                    <div className="flex items-start mb-4 animate-fadeIn">
                      <div className="max-w-[85%] bg-violet-100 text-gray-800 p-3 rounded-lg rounded-tl-sm shadow-sm">
                        <p>Hi there! I'm Foundry OS. Describe your app idea, and I'll create a project scope, task breakdown, and cost estimate for you.</p>
                      </div>
                    </div>
                  )}
                  
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
    </section>
  );
};

export default TryFoundrySection;
