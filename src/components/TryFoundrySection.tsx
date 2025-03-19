
import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const placeholders = [
  "I want to build an app that helps creators...",
  "I need a website for my coaching business...",
  "I want to create a marketplace for vintage clothes...",
  "I need a subscription platform for my newsletter..."
];

const TryFoundrySection = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const navigate = useNavigate();
  
  // Effect for the auto-typing animation
  useEffect(() => {
    const typingSpeed = 70; // ms per character
    const deletingSpeed = 30; // ms per character
    const pauseBetweenPhrases = 1500; // ms to wait after typing
    
    let timeout: number;
    
    if (!isDeleting && charIndex < placeholders[placeholderIndex].length) {
      // Still typing the current placeholder
      timeout = window.setTimeout(() => {
        setCurrentPlaceholder(placeholders[placeholderIndex].substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, typingSpeed);
    } else if (!isDeleting && charIndex >= placeholders[placeholderIndex].length) {
      // Finished typing, pause before deleting
      timeout = window.setTimeout(() => {
        setIsDeleting(true);
      }, pauseBetweenPhrases);
    } else if (isDeleting && charIndex > 0) {
      // Deleting the current placeholder
      timeout = window.setTimeout(() => {
        setCurrentPlaceholder(placeholders[placeholderIndex].substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, deletingSpeed);
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting, move to next placeholder
      setIsDeleting(false);
      setPlaceholderIndex((placeholderIndex + 1) % placeholders.length);
    }
    
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, placeholderIndex]);
  
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
    
    // Navigate to the build page with the prompt
    setTimeout(() => {
      navigate("/build", { state: { initialPrompt: inputValue } });
    }, 500); // Small delay to show loading state
  };
  
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-900 to-gray-950" />
      
      {/* Animated background effects */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_40%_at_50%_50%,rgba(155,135,245,0.12)_0%,transparent_100%)]" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>
      
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Start building with Foundry AI</h2>
          <p className="text-muted-foreground">Describe your app idea, and we'll help you build it.</p>
        </div>
        
        <div className="max-w-2xl mx-auto transform hover:scale-[1.01] transition-all duration-300">
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
        </div>
      </div>
    </section>
  );
};

export default TryFoundrySection;
