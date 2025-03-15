
import { useState, useEffect, useRef } from "react";
import { ArrowRight, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [currentExample, setCurrentExample] = useState("");
  const [exampleIndex, setExampleIndex] = useState(0);
  const [typingIndex, setTypingIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const examples = [
    "I want to build a task manager for freelancers...",
    "An app that matches mentors with startup founders...",
    "A marketplace for vintage clothing collectors...",
    "A subscription service for curated coffee beans..."
  ];

  // Handle the typing animation effect
  useEffect(() => {
    if (typingIndex < examples[exampleIndex].length) {
      // Continue typing the current example
      const typingTimeout = setTimeout(() => {
        setCurrentExample(prev => prev + examples[exampleIndex][typingIndex]);
        setTypingIndex(prev => prev + 1);
      }, 50); // Speed of typing
      
      return () => clearTimeout(typingTimeout);
    } else {
      // Pause at the end of typing before erasing
      const pauseTimeout = setTimeout(() => {
        // Start erasing
        const erasingInterval = setInterval(() => {
          setCurrentExample(prev => prev.slice(0, -1));
          if (currentExample.length <= 1) {
            clearInterval(erasingInterval);
            setTypingIndex(0);
            setCurrentExample("");
            setExampleIndex((prev) => (prev + 1) % examples.length);
          }
        }, 30); // Speed of erasing
        
        return () => clearInterval(erasingInterval);
      }, 2000); // Pause at the end
      
      return () => clearTimeout(pauseTimeout);
    }
  }, [typingIndex, exampleIndex, currentExample, examples]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      navigate("/build", { state: { initialPrompt: inputValue } });
    } else {
      // Redirect with current example as fallback if empty
      navigate("/build", { 
        state: { initialPrompt: examples[exampleIndex] } 
      });
    }
  };

  return (
    <section className="section-dark pt-32 pb-10 md:pt-40 md:pb-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="floating-element top-20 left-20 w-[300px] h-[300px]"></div>
      <div className="floating-element bottom-20 right-20 w-[400px] h-[400px]"></div>
      <div className="floating-element top-40 right-40 w-[250px] h-[250px]"></div>
      <div className="floating-element bottom-40 left-40 w-[200px] h-[200px]"></div>
      
      <div className="container-custom relative">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-violet-900/80 text-violet-200 mb-8">
            Introducing the AI project manager for builders
          </span>
          
          <div className="mb-6 w-full">
            <h1 className="heading-xl">
              <span className="block">
                From Prompt to Product. 
              </span>
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-violet-600">
                No Coding. No Team. No Delay.
              </span>
            </h1>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
            Artificial intelligence that breaks down your idea, builds your app with Lovable.dev, and iterates until it's ready to ship — no coding needed
          </p>
          
          {/* ChatGPT-style Input Bar with Auto-typing Examples */}
          <div className="w-full max-w-3xl mx-auto mb-8">
            {/* Example prompts above input */}
            <div className="h-6 mb-2 text-violet-400 text-sm">
              <span className="font-mono">{currentExample}</span>
              <span className="inline-block w-1 h-4 ml-0.5 bg-violet-400 animate-cursor-blink"></span>
            </div>
            
            <form 
              onSubmit={handleSubmit}
              className="relative w-full"
            >
              <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg overflow-hidden transition-all duration-200 focus-within:ring-2 focus-within:ring-violet-500/50 focus-within:border-violet-500/70">
                <div className="flex-1">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Describe your idea..."
                    className="border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 py-6 px-4 text-base placeholder:text-gray-500"
                  />
                </div>
                <Button 
                  type="submit"
                  className="mr-2 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 rounded-md transition-colors"
                >
                  Build It <ArrowRight className="h-5 w-5 ml-1" />
                </Button>
              </div>
            </form>
          </div>
          
          {/* Founder Quote */}
          <div className="mt-4 max-w-xl mx-auto">
            <p className="text-sm italic text-gray-400 px-4">
              "I built this because I was tired of prompting, coding, and never launching. Foundry OS is what I needed."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
