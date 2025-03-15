
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
  const [result, setResult] = useState<{
    scope: string;
    tasks: TaskItem[];
    estimate: { standard: string; fastTrack: string };
    totalHours: number;
  } | null>(null);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const simulateTyping = (message: string, delayMs: number = 500): Promise<void> => {
    setIsTyping(true);
    return new Promise(resolve => {
      setTimeout(() => {
        setIsTyping(false);
        resolve();
      }, delayMs);
    });
  };

  const addAssistantMessage = (content: string) => {
    const newMessage: Message = {
      id: generateUniqueId(),
      type: "assistant",
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage.id;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
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
    
    // Process based on current stage
    switch (currentStage) {
      case 'initial':
        await processInitialIdea(userMessage.content);
        break;
      case 'requirements':
        await processRequirements(userMessage.content);
        break;
      case 'scope':
        await processScope(userMessage.content);
        break;
      case 'tasks':
        await processTasks(userMessage.content);
        break;
      case 'estimate':
        await processEstimate(userMessage.content);
        break;
      default:
        await simulateTyping("I'm not sure how to process that at this stage. Let's continue with our current discussion.");
        addAssistantMessage("I'm not sure how to process that at this stage. Let's continue with our current discussion.");
    }
  };

  const processInitialIdea = async (userIdea: string) => {
    // Simulate AI analyzing the idea and asking follow-up questions
    await simulateTyping("", 1500);
    
    const response = `Thanks for sharing your idea! Let me ask a few questions to better understand what you want to build:

1. Who is the primary user of your application?
2. What are the top 3 most important features?
3. Do you have any design preferences or existing brand guidelines?
4. What is your timeline for launching this product?

Feel free to upload any mockups, docs, or references that might help me understand your vision better.`;
    
    addAssistantMessage(response);
    setCurrentStage('requirements');
  };

  const processRequirements = async (requirements: string) => {
    await simulateTyping("", 2000);
    
    // Generate project scope based on requirements
    const scopeResponse = `Based on your requirements, here's the proposed project scope:

## Project Overview
Your app will provide a modern, responsive interface that works across desktop and mobile devices. We'll implement core user flows first, followed by additional features in subsequent iterations.

## Core Features
- User authentication and profile management
- Primary functionality you described
- Data storage and retrieval
- Modern, responsive UI

Does this scope align with your vision? Would you like to add or modify anything before I break it down into tasks?`;

    addAssistantMessage(scopeResponse);
    setCurrentStage('scope');
  };

  const processScope = async (scopeFeedback: string) => {
    await simulateTyping("", 2500);
    
    // Break down into tasks
    const tasks: TaskItem[] = [
      {
        id: 1,
        title: "User Authentication System",
        description: "Login, signup, profile management, and password reset flows with secure token-based authentication.",
        hours: 12
      },
      {
        id: 2, 
        title: "Core Functionality Implementation",
        description: "Building the primary features described in your idea, including database integration.",
        hours: 24
      },
      {
        id: 3,
        title: "Responsive UI Design",
        description: "Creating a modern, mobile-first interface that works across all devices.",
        hours: 16
      },
      {
        id: 4,
        title: "Testing & QA",
        description: "Comprehensive testing to ensure functionality works as expected.",
        hours: 8
      }
    ];
    
    const totalHours = tasks.reduce((sum, task) => sum + task.hours, 0);
    
    const tasksMessage = `I've broken down the project into these key tasks:

${tasks.map(task => `## ${task.title} (${task.hours} hours)\n${task.description}`).join('\n\n')}

**Total estimated development hours: ${totalHours}**

Do these tasks cover everything you need? Would you like to add or modify anything?`;
    
    addAssistantMessage(tasksMessage);
    
    // Store the result
    setResult({
      scope: "Your app will provide a modern, responsive interface that works across desktop and mobile devices...",
      tasks,
      estimate: {
        standard: `$${totalHours * 100} (${Math.ceil(totalHours/8)} days)`,
        fastTrack: `$${totalHours * 150} (${Math.ceil(totalHours/16)} days priority)` 
      },
      totalHours
    });
    
    setCurrentStage('tasks');
  };

  const processTasks = async (tasksFeedback: string) => {
    await simulateTyping("", 1500);
    
    if (!result) return;
    
    // Present cost estimate
    const estimateMessage = `Based on the ${result.totalHours} hours of development work, here are your building options:

## Standard Build
**${result.estimate.standard}**
- Full development of all features
- Regular progress updates
- Delivery in ${Math.ceil(result.totalHours/8)} days

## Fast-Track Build (Priority)
**${result.estimate.fastTrack}**
- Priority development queue
- Daily progress updates
- Delivery in ${Math.ceil(result.totalHours/16)} days

Ready to build your product? Enter your email to continue:`;
    
    addAssistantMessage(estimateMessage);
    setCurrentStage('estimate');
  };

  const processEstimate = async (estimateFeedback: string) => {
    await simulateTyping("", 1000);
    
    const finalMessage = `Thank you for your feedback on the estimate. Please enter your email below to proceed with the build process.`;
    
    addAssistantMessage(finalMessage);
    setCurrentStage('payment');
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
