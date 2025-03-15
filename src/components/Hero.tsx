import { useState, useEffect, useRef } from "react";
import { ArrowRight, MessageSquare, LayoutList, Code, Rocket, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const placeholders = [
    "I want to build an app that helps freelancers get paid faster...",
    "I need an AI assistant that summarizes research papers...",
    "Create a marketplace for vintage clothing sellers..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      navigate("/build", { state: { initialPrompt: inputValue } });
    } else {
      // Redirect with placeholder as fallback if empty
      navigate("/build", { 
        state: { initialPrompt: placeholders[placeholderIndex] } 
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
          
          {/* ChatGPT-style Input Bar */}
          <div className="w-full max-w-3xl mx-auto mb-12">
            <form 
              onSubmit={handleSubmit}
              className="relative w-full"
            >
              <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-violet-500/50 focus-within:border-violet-500/70 transition-all duration-200">
                <div className="flex-1">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={placeholders[placeholderIndex]}
                    className="border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 py-6 px-4 text-base placeholder:text-gray-500"
                  />
                </div>
                <Button 
                  type="submit"
                  className="mr-2 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 rounded-md transition-colors"
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </form>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://form.typeform.com/to/qIqMaEXU" 
              className="px-6 py-3 rounded-full bg-violet-700 text-white font-medium hover:bg-violet-600 transition-colors flex items-center justify-center gap-2 text-base"
            >
              Get Early Access
              <ArrowRight className="h-4 w-4" />
            </a>
            
            <a 
              href="#how-it-works" 
              className="px-6 py-3 rounded-full bg-gray-800 border border-gray-700 text-gray-200 font-medium hover:bg-gray-700 transition-colors"
            >
              See How It Works
            </a>
          </div>
          
          {/* Founder Quote */}
          <div className="mt-8 max-w-xl mx-auto">
            <p className="text-sm italic text-gray-400 px-4">
              "I built this because I was tired of writing code, prompting AIs, and piecing together tools every time I had a new idea. Foundry OS is the product I've always needed."
            </p>
          </div>
        </div>

        {/* Visual Journey - 4-step process */}
        <div className="mt-12 white-card p-8 shadow-xl">
          <h3 className="heading-sm mb-5 text-gray-800">Your Journey from Idea to Product</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="journey-step">
              <div className="journey-icon-container bg-violet-100 text-violet-700">
                <MessageSquare className="h-8 w-8" />
              </div>
              <h4 className="font-semibold text-lg text-gray-800 mb-2">Prompt</h4>
              <p className="text-sm text-gray-600">Describe your product idea in natural language</p>
            </div>
            
            <div className="journey-step">
              <div className="journey-icon-container bg-violet-100 text-violet-700">
                <LayoutList size={32} />
              </div>
              <h4 className="font-semibold text-lg text-gray-800 mb-2">Task Breakdown</h4>
              <p className="text-sm text-gray-600">AI breaks down your idea into comprehensive tasks</p>
            </div>
            
            <div className="journey-step">
              <div className="journey-icon-container bg-violet-100 text-violet-700">
                <Code size={32} />
              </div>
              <h4 className="font-semibold text-lg text-gray-800 mb-2">App Built</h4>
              <p className="text-sm text-gray-600">Our AI builds your app with Lovable.dev</p>
            </div>
            
            <div className="journey-step">
              <div className="journey-icon-container bg-violet-100 text-violet-700">
                <Rocket size={32} />
              </div>
              <h4 className="font-semibold text-lg text-gray-800 mb-2">Launch</h4>
              <p className="text-sm text-gray-600">Your finished product is deployed and ready</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
