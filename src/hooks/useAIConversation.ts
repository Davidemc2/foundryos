
import { useState, useCallback } from 'react';
import { ChatMessage, createChatCompletion } from '@/services/openai';
import { toast } from '@/hooks/use-toast';
import { 
  initialSystemPrompt, 
  requirementsSystemPrompt, 
  scopeSystemPrompt, 
  tasksSystemPrompt, 
  estimateSystemPrompt, 
  paymentSystemPrompt 
} from '@/services/prompts';

// Chat flow stages
export type ChatStage = 'initial' | 'requirements' | 'scope' | 'tasks' | 'estimate' | 'payment';

interface TaskItem {
  id: number;
  title: string;
  description: string;
  hours: number;
}

export interface ProjectResult {
  scope: string;
  tasks: TaskItem[];
  estimate: { standard: string; fastTrack: string };
  totalHours: number;
}

export interface UseAIConversationProps {
  apiKey: string;
  initialPrompt?: string;
}

export function useAIConversation({ apiKey, initialPrompt }: UseAIConversationProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [visibleMessages, setVisibleMessages] = useState<{
    id: string;
    type: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStage, setCurrentStage] = useState<ChatStage>('initial');
  const [projectResult, setProjectResult] = useState<ProjectResult | null>(null);
  
  // Gets system prompt based on current stage
  const getSystemPrompt = useCallback(() => {
    switch (currentStage) {
      case 'initial': return initialSystemPrompt;
      case 'requirements': return requirementsSystemPrompt;
      case 'scope': return scopeSystemPrompt;
      case 'tasks': return tasksSystemPrompt;
      case 'estimate': return estimateSystemPrompt;
      case 'payment': return paymentSystemPrompt;
      default: return initialSystemPrompt;
    }
  }, [currentStage]);
  
  // Initialize conversation
  const initializeConversation = useCallback(async () => {
    if (!apiKey) {
      toast({
        title: "API Key Missing",
        description: "Please provide an OpenAI API key to continue.",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Add system message (not visible to user)
      const systemMessage: ChatMessage = {
        role: 'system',
        content: getSystemPrompt()
      };
      
      // Create welcome message
      const initialPromptResult = await createChatCompletion(
        apiKey, 
        [systemMessage],
        { temperature: 0.7 }
      );
      
      // Add to visible messages
      const welcomeMessage = {
        id: Date.now().toString(36) + Math.random().toString(36).substring(2),
        type: 'assistant' as const,
        content: initialPromptResult,
        timestamp: new Date()
      };
      
      setVisibleMessages([welcomeMessage]);
      
      // Store in internal messages
      setMessages([
        systemMessage,
        { role: 'assistant', content: initialPromptResult }
      ]);
      
      // If we have an initial prompt, process it
      if (initialPrompt) {
        await sendMessage(initialPrompt);
      }
    } catch (error) {
      console.error('Error initializing conversation:', error);
      toast({
        title: "Error",
        description: "Failed to start conversation. Please check your API key.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  }, [apiKey, initialPrompt, getSystemPrompt]);
  
  // Process user message
  const sendMessage = useCallback(async (userInput: string, fileDescriptions: string[] = []) => {
    if (!apiKey || !userInput.trim()) return;
    
    setIsProcessing(true);
    
    try {
      // Add file descriptions if any
      const fullUserInput = fileDescriptions.length > 0
        ? `${userInput}\n\nAttached files: ${fileDescriptions.join(", ")}`
        : userInput;
      
      // Add user message to visible messages
      const userMessage = {
        id: Date.now().toString(36) + Math.random().toString(36).substring(2),
        type: 'user' as const,
        content: fullUserInput,
        timestamp: new Date()
      };
      
      setVisibleMessages(prev => [...prev, userMessage]);
      
      // Add to internal chat history
      const userChatMessage: ChatMessage = {
        role: 'user',
        content: fullUserInput
      };
      
      // Get the updated messages array including the system prompt
      const updatedMessages: ChatMessage[] = [
        { role: 'system', content: getSystemPrompt() },
        ...messages.filter(msg => msg.role !== 'system'),
        userChatMessage
      ];
      
      setMessages(updatedMessages);
      
      // Get response from OpenAI
      const responseContent = await createChatCompletion(
        apiKey,
        updatedMessages,
        { temperature: 0.7 }
      );
      
      // Add assistant response to visible messages
      const assistantMessage = {
        id: Date.now().toString(36) + Math.random().toString(36).substring(2),
        type: 'assistant' as const,
        content: responseContent,
        timestamp: new Date()
      };
      
      setVisibleMessages(prev => [...prev, assistantMessage]);
      
      // Add to internal chat history
      const assistantChatMessage: ChatMessage = {
        role: 'assistant',
        content: responseContent
      };
      
      setMessages(prev => [...prev.filter(msg => msg.role !== 'system'), assistantChatMessage]);
      
      // Advance to the next stage based on the current stage
      advanceStage();
      
      return assistantMessage;
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, [apiKey, messages, getSystemPrompt]);
  
  // Advance to the next stage
  const advanceStage = useCallback(() => {
    switch (currentStage) {
      case 'initial':
        setCurrentStage('requirements');
        break;
      case 'requirements':
        setCurrentStage('scope');
        
        // Simulate extracting project scope (in a real app, we would parse the AI's response)
        const mockTasks: TaskItem[] = [
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
        
        const totalHours = mockTasks.reduce((sum, task) => sum + task.hours, 0);
        
        setProjectResult({
          scope: "Project scope based on requirements...",
          tasks: mockTasks,
          estimate: {
            standard: `$${totalHours * 100} (${Math.ceil(totalHours/8)} days)`,
            fastTrack: `$${totalHours * 150} (${Math.ceil(totalHours/16)} days priority)` 
          },
          totalHours
        });
        break;
      case 'scope':
        setCurrentStage('tasks');
        break;
      case 'tasks':
        setCurrentStage('estimate');
        break;
      case 'estimate':
        setCurrentStage('payment');
        break;
      default:
        break;
    }
  }, [currentStage]);
  
  return {
    visibleMessages,
    isProcessing,
    currentStage,
    projectResult,
    initializeConversation,
    sendMessage
  };
}
