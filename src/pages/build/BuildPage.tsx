
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { BuildStageProgress } from "./components/BuildStageProgress";
import { BuildChatSection } from "./components/BuildChatSection";
import { ConnectionErrorAlert } from "./components/ConnectionErrorAlert";
import { BuildEmailForm } from "@/components/chat/BuildEmailForm";
import { ThankYouCard } from "@/components/chat/ThankYouCard";
import { useBuilderChat } from "./hooks/useBuilderChat";
import { BUILD_STAGES } from "./constants";

interface LocationState {
  initialPrompt?: string;
}

const BuildPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  const { 
    messages,
    inputValue,
    setInputValue,
    isTyping,
    isProcessing,
    uploadedFiles,
    currentStage,
    connectionError,
    result,
    hasInteracted,
    showThankYou,
    submittedEmail,
    handleSendMessage,
    handleRemoveFile,
    handleFileChange,
    handleRetry,
    handleSendToBuilder
  } = useBuilderChat(state?.initialPrompt || "");

  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Track page view
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'page_view', {
          'page_title': 'Build Page',
          'page_location': window.location.href,
          'page_path': window.location.pathname
        });
      }
    } catch (error) {
      console.error("Error tracking page view:", error);
    }
    
    // If we have an initial prompt from the teaser, submit it automatically
    if (state?.initialPrompt) {
      setTimeout(() => {
        handleSendMessage(new Event('submit') as any);
      }, 800);
    }
  }, []);

  const handleBackToHome = () => {
    navigate("/");
  };

  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (showThankYou) {
    return <ThankYouCard onBackToHome={handleBackToHome} email={submittedEmail} />;
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
            <BuildStageProgress 
              stages={BUILD_STAGES} 
              currentStage={currentStage} 
            />
            
            <div className="flex flex-col h-[600px]">
              <BuildChatSection 
                messages={messages}
                isTyping={isTyping}
                isProcessing={isProcessing}
                uploadedFiles={uploadedFiles}
                onRemoveFile={handleRemoveFile}
                onSendMessage={handleSendMessage}
                inputValue={inputValue}
                setInputValue={setInputValue}
                fileInputRef={fileInputRef}
                triggerFileUpload={triggerFileUpload}
                handleFileChange={handleFileChange}
                currentStage={currentStage}
              />
              
              {connectionError && (
                <ConnectionErrorAlert 
                  errorMessage={connectionError} 
                  onRetry={handleRetry} 
                />
              )}
              
              {currentStage === 'payment' && result && (
                <BuildEmailForm onSubmit={handleSendToBuilder} />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BuildPage;
