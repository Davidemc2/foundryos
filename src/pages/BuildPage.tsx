
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
import { useAIConversation, ChatStage } from "@/hooks/useAIConversation";

interface LocationState {
  initialPrompt?: string;
}

// Build stages for the progress indicator
const BUILD_STAGES = [
  { key: 'initial', label: 'Initial Idea' },
  { key: 'requirements', label: 'Requirements' },
  { key: 'scope', label: 'Project Scope' },
  { key: 'tasks', label: 'Task Breakdown' },
  { key: 'estimate', label: 'Cost Estimate' },
  { key: 'payment', label: 'Payment' }
];

// API key - in a real app, you would use environment variables or a secure storage
// This is a placeholder that users would need to fill in
const OPENAI_API_KEY = "";

const BuildPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const [inputValue, setInputValue] = useState(state?.initialPrompt || "");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showThankYou, setShowThankYou] = useState(false);
  const [apiKey, setApiKey] = useState(OPENAI_API_KEY);
  const [showApiKeyInput, setShowApiKeyInput] = useState(!OPENAI_API_KEY);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize AI conversation hook
  const {
    visibleMessages: messages,
    isProcessing,
    currentStage,
    projectResult,
    initializeConversation,
    sendMessage
  } = useAIConversation({
    apiKey,
    initialPrompt: state?.initialPrompt
  });

  // Calculate current progress
  const stageIndex = BUILD_STAGES.findIndex(stage => stage.key === currentStage);
  const progressPercentage = ((stageIndex + 1) / BUILD_STAGES.length) * 100;

  // Initialize conversation when API key is available
  useEffect(() => {
    if (apiKey && !showApiKeyInput) {
      initializeConversation();
    }
  }, [apiKey, showApiKeyInput, initializeConversation]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isProcessing]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() && uploadedFiles.length === 0) return;
    
    // Create file descriptions
    const fileDescriptions = uploadedFiles.map(file => `[Uploaded: ${file.name}]`);
    
    await sendMessage(inputValue, fileDescriptions);
    
    setInputValue("");
    setUploadedFiles([]);
    setHasInteracted(true);
  };

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key to continue.",
        variant: "destructive"
      });
      return;
    }
    
    setShowApiKeyInput(false);
    initializeConversation();
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

  if (showApiKeyInput) {
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
        
        <div className="flex-1 container-custom py-8 flex items-center justify-center">
          <Card className="mx-auto shadow-lg border border-violet-500/20 bg-gray-900 max-w-md w-full">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Enter OpenAI API Key</h2>
              <p className="text-gray-400 mb-6">
                To use the AI-powered builder, please provide your OpenAI API key. 
                Your key will only be used for this session and won't be stored.
              </p>
              
              <form onSubmit={handleApiKeySubmit}>
                <Input 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="mb-4 bg-gray-800 border-gray-700 text-white"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-violet-600 hover:bg-violet-700"
                >
                  Continue
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
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
                  
                  {isProcessing && <TypingIndicator />}
                  
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
              
              {currentStage === 'payment' && projectResult && (
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
