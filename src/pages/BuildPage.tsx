import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send, Mic, Paperclip, FileUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { FilePreview } from "@/components/chat/FilePreview";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { BuildEmailForm } from "@/components/chat/BuildEmailForm";
import { ThankYouCard } from "@/components/chat/ThankYouCard";
import { supabase } from "@/integrations/supabase/client";

type MessageType = "user" | "assistant";

interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
  role?: string;
}

interface TaskItem {
  id: number;
  title: string;
  description: string;
  hours: number;
}

interface LocationState {
  initialPrompt?: string;
}

// Chat flow stages
type ChatStage = 'initial' | 'requirements' | 'scope' | 'tasks' | 'estimate' | 'payment';

const BUILD_STAGES = [
  { key: 'initial', label: 'Initial Idea' },
  { key: 'requirements', label: 'Requirements' },
  { key: 'scope', label: 'Project Scope' },
  { key: 'tasks', label: 'Task Breakdown' },
  { key: 'estimate', label: 'Cost Estimate' },
  { key: 'payment', label: 'Payment' }
];

const BuildPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState(state?.initialPrompt || "");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [currentStage, setCurrentStage] = useState<ChatStage>('initial');
  const [showThankYou, setShowThankYou] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{
    scope: string;
    tasks: TaskItem[];
    estimate: { standard: string; fastTrack: string };
    totalHours: number;
  } | null>(null);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatHistoryRef = useRef<Message[]>([]);

  // Maintain chat history for OpenAI context
  useEffect(() => {
    chatHistoryRef.current = messages;
  }, [messages]);

  // Calculate current progress
  const stageIndex = BUILD_STAGES.findIndex(stage => stage.key === currentStage);
  const progressPercentage = ((stageIndex + 1) / BUILD_STAGES.length) * 100;

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
      content: "Hi there! I'm Foundry OS. Describe your app idea, and I'll help you build it. What would you like to create?",
      timestamp: new Date(),
      role: "assistant"
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

  const formatMessagesForAPI = () => {
    return messages.map(msg => ({
      role: msg.type === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));
  };

  const addAssistantMessage = (content: string) => {
    const newMessage: Message = {
      id: generateUniqueId(),
      type: "assistant",
      content,
      timestamp: new Date(),
      role: "assistant"
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage.id;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isProcessing || (!inputValue.trim() && uploadedFiles.length === 0)) return;
    
    // Add user message
    const userMessage: Message = {
      id: generateUniqueId(),
      type: "user",
      content: uploadedFiles.length > 0 
        ? `${inputValue} ${uploadedFiles.map(file => `[Uploaded: ${file.name}]`).join(" ")}`
        : inputValue,
      timestamp: new Date(),
      role: "user"
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setUploadedFiles([]);
    setIsTyping(true);
    setHasInteracted(true);
    setIsProcessing(true);
    
    try {
      const formattedMessages = [
        ...formatMessagesForAPI(),
        { role: 'user', content: userMessage.content }
      ];

      // Get response from AI
      const response = await supabase.functions.invoke('ai-chat', {
        body: {
          messages: formattedMessages,
          stage: currentStage,
          uploadedFiles: uploadedFiles.map(file => file.name) // We'd handle file content in a real implementation
        }
      });

      setIsTyping(false);

      if (response.error) {
        console.error("AI response error:", response.error);
        toast({
          title: "Error",
          description: `Failed to get AI response: ${response.error}`,
          variant: "destructive"
        });
        
        // Add a fallback message for the user when the API fails
        addAssistantMessage("I'm sorry, I'm having trouble connecting to my AI services right now. This could be due to high traffic or a temporary outage. Please try again in a moment.");
        return;
      }

      // Check if the response data contains an error field
      if (response.data && response.data.error) {
        console.error("AI function error:", response.data.error);
        
        // Special handling for quota exceeded errors
        if (response.data.error.includes("quota exceeded") || response.data.error.includes("insufficient_quota")) {
          toast({
            title: "API Limit Reached",
            description: "The OpenAI API usage limit has been reached. Please update the API key or billing details.",
            variant: "destructive"
          });
          
          // Add a friendly message about the quota issue
          addAssistantMessage("I'm sorry, but it looks like the AI service has reached its usage limit. The administrator will need to update the OpenAI API key or billing details. In a production environment, this would be handled more gracefully.");
        } else {
          toast({
            title: "AI Service Error",
            description: `${response.data.error}`,
            variant: "destructive"
          });
          
          // Add a generic error message
          addAssistantMessage("I'm sorry, but there was an error processing your request. Please try again later.");
        }
        return;
      }

      // Add the AI response
      const aiContent = response.data.response;
      addAssistantMessage(aiContent);

      // Decide if we should move to the next stage based on the message content and current stage
      handleStageProgression(aiContent);

    } catch (error) {
      console.error("Error calling AI function:", error);
      toast({
        title: "Connection Error",
        description: "Failed to connect to AI service. Please try again.",
        variant: "destructive"
      });
      
      // Add a network error message
      addAssistantMessage("I'm having trouble connecting to my services. This might be due to network issues or the server being temporarily unavailable. Please try again in a moment.");
    } finally {
      setIsProcessing(false);
      setIsTyping(false);
    }
  };

  // Analyze the AI response to determine if we should progress to the next stage
  const handleStageProgression = (aiResponse: string) => {
    // Simple stage progression logic based on message content
    // In a real app, this could be more sophisticated
    
    switch (currentStage) {
      case 'initial':
        // After the AI asks questions about the idea, move to requirements stage
        if (aiResponse.includes("features") || aiResponse.includes("requirements") || aiResponse.includes("timeline")) {
          setCurrentStage('requirements');
        }
        break;
      case 'requirements':
        // If the AI is describing project scope, move to scope stage
        if (aiResponse.includes("scope") || aiResponse.includes("proposed") || aiResponse.includes("overview")) {
          setCurrentStage('scope');
        }
        break;
      case 'scope':
        // If the AI is breaking down tasks, move to tasks stage
        if (aiResponse.includes("tasks") || aiResponse.includes("hours") || aiResponse.includes("breakdown")) {
          // Parse tasks from the message
          extractTasksFromResponse(aiResponse);
          setCurrentStage('tasks');
        }
        break;
      case 'tasks':
        // If the AI is providing cost estimates, move to estimate stage
        if (aiResponse.includes("cost") || aiResponse.includes("estimate") || aiResponse.includes("budget") || aiResponse.includes("price")) {
          setCurrentStage('estimate');
        }
        break;
      case 'estimate':
        // If the AI is asking for payment/email info, move to payment stage
        if (aiResponse.includes("email") || aiResponse.includes("proceed") || aiResponse.includes("build your")) {
          setCurrentStage('payment');
        }
        break;
    }
  };

  // Simple task extraction function - in a real application, this would be more sophisticated
  const extractTasksFromResponse = (response: string) => {
    // Try to find tasks in the format "Task Title (X hours)"
    const taskRegex = /##\s*(.*?)\s*\((\d+)\s*hours\)/g;
    const tasks: TaskItem[] = [];
    let match;
    let totalHours = 0;
    
    while ((match = taskRegex.exec(response)) !== null) {
      const title = match[1].trim();
      const hours = parseInt(match[2], 10);
      totalHours += hours;
      
      // Try to extract description - looking for text between task headers
      let description = "Task details";
      const startIdx = match.index + match[0].length;
      const nextMatch = taskRegex.exec(response);
      
      if (nextMatch) {
        description = response.substring(startIdx, nextMatch.index).trim();
        // Reset position to be able to continue matching
        taskRegex.lastIndex = nextMatch.index;
      } else {
        // If this is the last task, extract until the end or until a common delimiter
        const endIdx = response.indexOf("Total estimated", startIdx);
        if (endIdx > 0) {
          description = response.substring(startIdx, endIdx).trim();
        } else {
          description = response.substring(startIdx).trim();
        }
      }
      
      tasks.push({
        id: tasks.length + 1,
        title,
        description: description.replace(/^[\n\r]+|[\n\r]+$/g, ''),
        hours
      });
    }
    
    if (tasks.length > 0) {
      setResult({
        scope: "Based on your requirements, we've outlined the project scope...",
        tasks,
        estimate: {
          standard: `$${totalHours * 100} (${Math.ceil(totalHours/8)} days)`,
          fastTrack: `$${totalHours * 150} (${Math.ceil(totalHours/16)} days priority)` 
        },
        totalHours
      });
    }
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
            {/* Build progress indicator */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                {BUILD_STAGES.map((stage, index) => (
                  <div key={stage.key} className={`${index === stageIndex ? 'text-violet-400 font-medium' : ''}`}>
                    {stage.label}
                  </div>
                ))}
              </div>
              <Progress value={progressPercentage} className="h-1 bg-gray-800" />
            </div>
            
            <div className="flex flex-col h-[600px]">
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
                      onRemove={() => handleRemoveFile(file)}
                    />
                  ))}
                </div>
              )}
              
              {currentStage === 'payment' && result && (
                <BuildEmailForm onSubmit={handleSendToBuilder} />
              )}
              
              {currentStage !== 'payment' && (
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BuildPage;
