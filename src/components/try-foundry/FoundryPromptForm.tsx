
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { AnimatedPlaceholder } from "./AnimatedPlaceholder";
import { usePlaceholders } from "./usePlaceholders";

export const FoundryPromptForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  
  const placeholders = usePlaceholders();
  const { currentPlaceholder } = AnimatedPlaceholder({ placeholders });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleFocus = () => {
    // Optional: pause the animation when the user focuses on the textarea
    if (textareaRef.current) {
      textareaRef.current.placeholder = "";
    }
  };
  
  const handleBlur = () => {
    // Optional: resume the animation if the field is empty
    if (textareaRef.current && !inputValue) {
      textareaRef.current.placeholder = currentPlaceholder;
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    setIsLoading(true);
    
    // Show a toast notification indicating the prompt is being processed
    toast({
      title: "Processing your idea",
      description: "Taking you to the build page...",
    });
    
    // Navigate to the build page with the prompt after a small delay
    setTimeout(() => {
      try {
        navigate("/build", { state: { initialPrompt: inputValue } });
      } catch (error) {
        console.error("Navigation error:", error);
        setIsLoading(false);
        toast({
          title: "Error",
          description: "Failed to navigate to the build page. Please try again.",
          variant: "destructive"
        });
      }
    }, 500);
  };
  
  return (
    <div className="relative group">
      {/* Glow Effect Border */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-violet-400 rounded-xl blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-1000"></div>
      
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl shadow-xl p-6 border border-gray-800">
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-3xl">⚒️</span>
            <span className="text-xl text-white font-bold">Foundry AI</span>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative focus-within:ring-2 focus-within:ring-violet-500/50 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 rounded-lg transition-all duration-300">
              <Textarea 
                ref={textareaRef}
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={currentPlaceholder}
                className="min-h-[120px] bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-violet-500 resize-none"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-violet-700 hover:bg-violet-600 hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.7)] h-12 px-6 btn-glow transition-all duration-300"
              disabled={isLoading || !inputValue.trim()}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Start Building <Send size={16} className="animate-bounce-subtle" />
                </div>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
