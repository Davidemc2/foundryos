
import { useState, useRef, useEffect } from "react";
import { ChatStage, Message, ProjectResult, MessageType } from "../constants";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export function useBuilderChat(initialPrompt: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState(initialPrompt);
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [currentStage, setCurrentStage] = useState<ChatStage>('initial');
  const [showThankYou, setShowThankYou] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [result, setResult] = useState<ProjectResult | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string>("");
  
  const chatHistoryRef = useRef<Message[]>([]);

  // Maintain chat history for OpenAI context
  useEffect(() => {
    chatHistoryRef.current = messages;
  }, [messages]);

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

  const callAIFunction = async (formattedMessages: any[], retryCount = 0) => {
    try {
      console.log("Calling AI function, attempt:", retryCount + 1);
      setConnectionError(null);
      
      // Add a slight delay on retries to prevent overwhelming the API
      if (retryCount > 0) {
        await new Promise(resolve => setTimeout(resolve, retryCount * 1500));
      }
      
      // Add debugging information to help troubleshoot API issues
      console.log(`Calling edge function with ${formattedMessages.length} messages and stage: ${currentStage}`);
      
      const response = await supabase.functions.invoke('ai-chat', {
        body: {
          messages: formattedMessages,
          stage: currentStage,
          uploadedFiles: uploadedFiles.map(file => file.name)
        }
      });

      console.log("Edge function response:", response);

      if (response.error) {
        console.error("AI response error:", response.error);
        throw new Error(`Failed to get AI response: ${response.error}`);
      }

      // Check if the response data contains an error field
      if (response.data && response.data.error) {
        console.error("AI function error:", response.data.error, response.data.details);
        
        // Handle different error types with appropriate messages
        const errorType = response.data.errorType || "unknown";
        
        switch(errorType) {
          case "authentication":
            throw new Error("The AI service is experiencing authentication issues. Please contact the administrator.");
          case "configuration":
            throw new Error("The AI service is not properly configured. Please contact the administrator.");
          case "rate_limit":
            throw new Error("The AI service is currently experiencing high traffic. Please try again in a moment.");
          case "timeout":
            throw new Error("The request took too long to process. Please try with a simpler query.");
          default:
            throw new Error(response.data.error);
        }
      }

      // Log usage statistics if available
      if (response.data && response.data.usage) {
        console.log("Token usage:", response.data.usage);
      }

      return response.data.response;
    } catch (error) {
      console.error("Error in callAIFunction:", error);
      
      // Retry logic - only retry for specific errors and up to max retries
      const maxRetries = 3;
      const shouldRetry = 
        error.message?.includes("rate limit") || 
        error.message?.includes("timeout") || 
        error.message?.includes("network") ||
        error.message?.includes("500") || 
        error.message?.includes("503") ||
        error.message?.includes("429") ||
        error.message?.includes("high traffic");
        
      if (retryCount < maxRetries && shouldRetry) {
        console.log(`Retrying AI function call, attempt ${retryCount + 2}`);
        setRetryCount(prev => prev + 1);
        return callAIFunction(formattedMessages, retryCount + 1);
      }
      
      // Set appropriate error message based on error type
      if (retryCount >= maxRetries) {
        setConnectionError("Failed to connect after multiple attempts. The service might be temporarily unavailable. Please try again later.");
      } else if (error.message?.includes("authentication") || error.message?.includes("API key")) {
        setConnectionError("Authentication error with AI service. Please contact the administrator.");
      } else if (error.message?.includes("configuration")) {
        setConnectionError("The AI service is not properly configured. Please contact the administrator.");
      } else if (error.message?.includes("rate limit") || error.message?.includes("high traffic") || error.message?.includes("429")) {
        setConnectionError("The AI service is currently experiencing high traffic. Please try again in a moment.");
      } else if (error.message?.includes("timeout")) {
        setConnectionError("The request timed out. Please try with a simpler query.");
      } else {
        setConnectionError(`Connection error: ${error.message}`);
      }
      
      throw error;
    }
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
    setConnectionError(null);
    
    try {
      // Show a loading toast to indicate processing
      const loadingToastId = toast({
        title: "Processing your request",
        description: "Our AI is analyzing your input...",
      });
      
      const formattedMessages = [
        ...formatMessagesForAPI(),
        { role: 'user', content: userMessage.content }
      ];

      // Get response from AI using our new function with retry logic
      const aiContent = await callAIFunction(formattedMessages);
      
      // Dismiss the loading toast
      toast({
        id: loadingToastId,
        title: "Response ready",
        description: "Check out the AI's response below",
        variant: "default"
      });
      
      // Add the AI response
      addAssistantMessage(aiContent);

      // Decide if we should move to the next stage based on the message content and current stage
      handleStageProgression(aiContent);
      
      // Reset retry count on success
      setRetryCount(0);

      // Track message exchange
      try {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'message_exchange', {
            'event_category': 'engagement',
            'event_label': currentStage,
            'value': messages.length + 1
          });
        }
      } catch (error) {
        console.error("Error tracking message exchange:", error);
      }
    } catch (error) {
      console.error("Error processing message:", error);
      
      // Show a user-friendly error message based on the error type
      if (error.message?.includes("quota exceeded") || error.message?.includes("insufficient_quota") || error.message?.includes("rate limit")) {
        toast({
          title: "AI Service Limit",
          description: "The AI service is currently busy. Please try again in a moment.",
          variant: "destructive"
        });
        
        addAssistantMessage("I'm sorry, but it looks like the AI service is currently experiencing high demand. Please try again in a moment.");
      } else if (error.message?.includes("Invalid") && error.message?.includes("API key")) {
        toast({
          title: "Authentication Error",
          description: "There was an issue connecting to the AI service.",
          variant: "destructive"
        });
        
        addAssistantMessage("I'm sorry, but the AI service is experiencing authentication issues. Please try again or contact support if the problem persists.");
      } else if (error.message?.includes("timeout")) {
        toast({
          title: "Connection Timeout",
          description: "The request took too long to complete. Please try again.",
          variant: "destructive"
        });
        
        addAssistantMessage("I'm sorry, but your request took too long to process. This might be due to high traffic or complex queries. Please try again with a simpler request.");
      } else {
        toast({
          title: "Connection Error",
          description: "Failed to connect to AI service. Please try again.",
          variant: "destructive"
        });
        
        addAssistantMessage("I'm having trouble connecting to my services. This might be due to network issues or high traffic. Please try again in a moment.");
      }
    } finally {
      setIsProcessing(false);
      setIsTyping(false);
    }
  };

  const handleRetry = () => {
    const lastUserMessage = messages.filter(msg => msg.type === "user").pop();
    if (lastUserMessage) {
      setInputValue(lastUserMessage.content.replace(/\[Uploaded: .*?\]/g, "").trim());
      // Remove the last user message and AI response
      const filteredMessages = messages.filter(msg => 
        msg.id !== lastUserMessage.id && 
        (messages.indexOf(msg) < messages.findIndex(m => m.id === lastUserMessage.id) - 1)
      );
      setMessages(filteredMessages);
      setConnectionError(null);
      // Trigger the send message after a short delay
      setTimeout(() => {
        handleSendMessage(new Event('submit') as any);
      }, 500);
    } else {
      setConnectionError(null);
    }
  };

  // Analyze the AI response to determine if we should progress to the next stage
  const handleStageProgression = (aiResponse: string) => {
    // Simple stage progression logic based on message content
    
    switch (currentStage) {
      case 'initial':
        // After the AI asks questions about the idea, move to requirements stage
        if (aiResponse.includes("features") || aiResponse.includes("requirements") || aiResponse.includes("timeline")) {
          setCurrentStage('requirements');
          // Track stage progression
          trackStageProgression('requirements');
        }
        break;
      case 'requirements':
        // If the AI is describing project scope, move to scope stage
        if (aiResponse.includes("scope") || aiResponse.includes("proposed") || aiResponse.includes("overview")) {
          setCurrentStage('scope');
          trackStageProgression('scope');
        }
        break;
      case 'scope':
        // If the AI is breaking down tasks, move to tasks stage
        if (aiResponse.includes("tasks") || aiResponse.includes("hours") || aiResponse.includes("breakdown")) {
          // Parse tasks from the message
          extractTasksFromResponse(aiResponse);
          setCurrentStage('tasks');
          trackStageProgression('tasks');
        }
        break;
      case 'tasks':
        // If the AI is providing cost estimates, move to estimate stage
        if (aiResponse.includes("cost") || aiResponse.includes("estimate") || aiResponse.includes("budget") || aiResponse.includes("price")) {
          setCurrentStage('estimate');
          trackStageProgression('estimate');
        }
        break;
      case 'estimate':
        // If the AI is asking for payment/email info, move to payment stage
        if (aiResponse.includes("email") || aiResponse.includes("proceed") || aiResponse.includes("build your")) {
          setCurrentStage('payment');
          trackStageProgression('payment');
        }
        break;
    }
  };

  const trackStageProgression = (stage: string) => {
    try {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'stage_progression', {
          'event_category': 'flow',
          'event_label': stage
        });
      }
    } catch (error) {
      console.error("Error tracking stage progression:", error);
    }
  };

  // Simple task extraction function
  const extractTasksFromResponse = (response: string) => {
    // Try to find tasks in the format "Task Title (X hours)"
    const taskRegex = /##\s*(.*?)\s*\((\d+)\s*hours\)/g;
    const tasks: Array<{id: number, title: string, description: string, hours: number}> = [];
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

  const handleRemoveFile = (fileToRemove: File) => {
    setUploadedFiles(uploadedFiles.filter(file => file !== fileToRemove));
  };

  const handleSendToBuilder = async (email: string) => {
    setIsProcessing(true);
    
    try {
      // Save build request with email to database
      const buildData = {
        email,
        status: 'pending',
        project_name: result ? extractProjectName(messages) : 'New Project',
        project_scope: result?.scope || '',
        estimated_hours: result?.totalHours || 0,
        messages: JSON.stringify(messages.map(m => ({ 
          role: m.type, 
          content: m.content,
          timestamp: m.timestamp 
        }))),
        created_at: new Date().toISOString()
      };
      
      // Check if email is already in waitlist
      const { data: existingWaitlist } = await supabase
        .from('waitlist')
        .select('email')
        .eq('email', email)
        .maybeSingle();
        
      // If not in waitlist, add them
      if (!existingWaitlist) {
        await supabase
          .from('waitlist')
          .insert([{ 
            email,
            source: 'builder',
            interest_area: 'builder'
          }]);
      }
      
      // Store build request in builds table if it exists or directly in waitlist metadata
      try {
        // Attempt to store in builds table first
        const { error: buildError } = await supabase
          .from('builds')
          .insert([buildData]);
          
        if (buildError) {
          // If builds table doesn't exist, update waitlist entry with build info
          const { error: updateError } = await supabase
            .from('waitlist')
            .update({ 
              build_requests: buildData
            })
            .eq('email', email);
            
          if (updateError) {
            console.error("Error storing build data:", updateError);
          }
        }
      } catch (storageError) {
        console.error("Error storing build data:", storageError);
      }
      
      // Track conversion
      try {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'build_request', {
            'event_category': 'conversion',
            'event_label': email
          });
        }
      } catch (trackingError) {
        console.error("Error tracking build request:", trackingError);
      }
      
      toast({
        title: "Success!",
        description: "Your build request has been sent to the Foundry team.",
      });
      
      setSubmittedEmail(email);
      setShowThankYou(true);
    } catch (error) {
      console.error("Error sending build request:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const extractProjectName = (messages: Message[]): string => {
    // Find the first user message for project name
    const firstUserMessage = messages.find(m => m.type === 'user');
    if (!firstUserMessage) return 'New Project';
    
    // Extract first sentence or up to 50 chars
    let projectName = firstUserMessage.content.split('.')[0];
    if (projectName.length > 50) {
      projectName = projectName.substring(0, 47) + '...';
    }
    return projectName || 'New Project';
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

  return {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    hasInteracted,
    uploadedFiles,
    currentStage,
    showThankYou,
    isProcessing,
    connectionError,
    result,
    submittedEmail,
    handleSendMessage,
    handleRemoveFile,
    handleFileChange,
    handleRetry,
    handleSendToBuilder,
    handleFileDrop,
    handleDragOver
  };
}
