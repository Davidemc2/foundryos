
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
      {/* Floating elements */}
      <div className="floating-element top-20 left-20 w-[300px] h-[300px] animate-float"></div>
      <div className="floating-element bottom-20 right-20 w-[400px] h-[400px] animate-float-slow animation-delay-800"></div>
      <div className="floating-element top-40 right-40 w-[250px] h-[250px] animate-float animation-delay-400"></div>
      <div className="floating-element bottom-40 left-40 w-[200px] h-[200px] animate-float-slow animation-delay-1200"></div>
      
      {/* Enhanced orbiting elements */}
      <div className="absolute top-1/4 left-1/4 h-0 w-0">
        <div className="orbiting-element animate-orbit"></div>
      </div>
      <div className="absolute top-1/3 right-1/3 h-0 w-0">
        <div className="orbiting-element animate-orbit-slow animation-delay-400"></div>
      </div>
      <div className="absolute bottom-1/4 right-1/4 h-0 w-0">
        <div className="orbiting-element animate-orbit-reverse"></div>
      </div>
      <div className="absolute bottom-1/3 left-1/3 h-0 w-0">
        <div className="orbiting-element animate-orbit animation-delay-600"></div>
      </div>
      <div className="absolute top-1/2 left-1/2 h-0 w-0">
        <div className="orbiting-element animate-orbit-slow animation-delay-800"></div>
      </div>
      
      <div className="container-custom relative">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-violet-900/80 text-violet-200 mb-8 opacity-0 animate-fadeIn animation-delay-200">
            Introducing the AI project manager for builders
          </span>
          
          <div className="mb-6 w-full">
            <h1 className="heading-xl overflow-hidden">
              <span className="block opacity-0 animate-fadeIn animation-delay-400">
                From Prompt to Product. 
              </span>
              <span className="typewriter-container block mt-2">
                <span className="typewriter-text text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-violet-600">
                  No Coding. No Team. No Delay.
                </span>
              </span>
            </h1>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 opacity-0 animate-fadeIn animation-delay-800">
            Artificial intelligence that breaks down your idea, builds your app with Lovable.dev, and iterates until it's ready to ship — no coding needed
          </p>
          
          {/* New Interactive Build Teaser */}
          <div className="w-full max-w-4xl mx-auto mb-10 opacity-0 animate-fadeIn animation-delay-1000">
            <form 
              onSubmit={handleSubmit}
              className="w-full relative group"
            >
              <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-3 border border-gray-800 shadow-lg hover:shadow-violet-500/10 transition-all duration-300 transform group-hover:border-violet-500/30">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 h-8 w-8 bg-violet-600/20 flex items-center justify-center rounded-full">
                    <Settings size={18} className="text-violet-400 animate-pulse" />
                  </div>
                  
                  <div className="relative flex-1">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={placeholders[placeholderIndex]}
                      className="bg-gray-800/90 border-gray-700 focus:border-violet-500 focus:ring-violet-500/30 pl-3 pr-28 py-2 h-12 text-base md:text-lg shadow-inner text-white placeholder:text-gray-400 focus-visible:ring-violet-500/50 transition-all duration-300"
                    />
                    
                    <Button 
                      type="submit"
                      className="absolute right-1 top-1 h-10 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 rounded-lg px-4 text-white shadow-md hover:shadow-violet-500/30 border-0 transition-all duration-300 transform hover:scale-105"
                    >
                      Let's Build It <ArrowRight size={16} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Soft glow effect underneath */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </form>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center opacity-0 animate-fadeIn animation-delay-1200">
            <a 
              href="https://form.typeform.com/to/qIqMaEXU" 
              className="btn-glow w-full sm:w-auto px-6 py-3 rounded-full bg-violet-700 text-white font-medium hover:bg-violet-600 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-violet-500/40 transform hover:-translate-y-1 hover:scale-105 text-lg animate-bounce-subtle"
            >
              Get Early Access
              <ArrowRight size={16} />
            </a>
            
            <a 
              href="#how-it-works" 
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gray-800 border border-gray-700 text-gray-200 font-medium hover:bg-gray-700 transition-all transform hover:scale-105"
            >
              See How It Works
            </a>
          </div>
          
          {/* Founder Quote */}
          <div className="mt-8 max-w-xl mx-auto opacity-0 animate-fadeIn animation-delay-1400">
            <p className="text-sm italic text-gray-400 px-4">
              "I built this because I was tired of writing code, prompting AIs, and piecing together tools every time I had a new idea. Foundry OS is the product I've always needed."
            </p>
          </div>
        </div>

        {/* Visual Journey - 4-step process with enhanced animations - REDUCED MARGIN */}
        <div className="mt-12 white-card p-8 opacity-0 animate-slideUp animation-delay-1600 shadow-xl">
          <h3 className="heading-sm mb-5 text-gray-800">Your Journey from Idea to Product</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="journey-step group opacity-0 animate-fadeIn animation-delay-1800">
              <div className="journey-icon-container bg-violet-100 text-violet-700 group-hover:bg-violet-700 group-hover:text-white hover:shadow-md">
                <MessageSquare size={32} />
              </div>
              <h4 className="font-semibold text-lg text-gray-800 mb-2">Prompt</h4>
              <p className="text-sm text-gray-600">Describe your product idea in natural language</p>
            </div>
            
            <div className="journey-step group opacity-0 animate-fadeIn animation-delay-2000">
              <div className="journey-icon-container bg-violet-100 text-violet-700 group-hover:bg-violet-700 group-hover:text-white hover:shadow-md">
                <LayoutList size={32} />
              </div>
              <h4 className="font-semibold text-lg text-gray-800 mb-2">Task Breakdown</h4>
              <p className="text-sm text-gray-600">AI breaks down your idea into comprehensive tasks</p>
            </div>
            
            <div className="journey-step group opacity-0 animate-fadeIn animation-delay-2200">
              <div className="journey-icon-container bg-violet-100 text-violet-700 group-hover:bg-violet-700 group-hover:text-white hover:shadow-md">
                <Code size={32} />
              </div>
              <h4 className="font-semibold text-lg text-gray-800 mb-2">App Built</h4>
              <p className="text-sm text-gray-600">Our AI builds your app with Lovable.dev</p>
            </div>
            
            <div className="journey-step group opacity-0 animate-fadeIn animation-delay-2400">
              <div className="journey-icon-container bg-violet-100 text-violet-700 group-hover:bg-violet-700 group-hover:text-white hover:shadow-md">
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
