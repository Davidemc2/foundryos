
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";

const TryFoundrySection = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) return;
    
    // Show thinking animation
    setIsThinking(true);
    
    // Redirect after a brief delay to simulate thinking
    setTimeout(() => {
      // Navigate to build page (optionally could pass the prompt as state)
      navigate("/build", { state: { initialPrompt: prompt } });
    }, 1500);
  };

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_40%_at_50%_50%,rgba(155,135,245,0.12)_0%,transparent_100%)]" />
      
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Start Building Instantly</h2>
          <p className="text-muted-foreground">Tell Foundry what you're working on and watch it build your scope.</p>
        </div>
        
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-5 border border-gray-100 hover:shadow-xl transition-shadow">
          <form onSubmit={handleSubmit} className="relative">
            <Input
              ref={inputRef}
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="I want to build an AI tool that helps recruiters..."
              className="pr-12 py-6 text-base bg-transparent focus-visible:ring-violet-400"
              disabled={isThinking}
            />
            
            <Button 
              type="submit"
              size="icon" 
              className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-violet-600 hover:bg-violet-700 transition-all ${isThinking ? 'opacity-70' : ''}`}
              disabled={isThinking}
            >
              {isThinking ? (
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce animation-delay-200"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce animation-delay-400"></div>
                </div>
              ) : (
                <SendHorizontal size={16} />
              )}
            </Button>
          </form>
          
          <p className="text-xs text-gray-500 mt-3 text-center">
            No login needed. Just tell us what you're building.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TryFoundrySection;
