
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const placeholders = [
  "I want to build an app that helps creators...",
  "I need a website for my coaching business...",
  "I want to create a marketplace for vintage clothes...",
  "I need a subscription platform for my newsletter..."
];

const TryFoundrySection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-900 to-gray-950" />
      
      {/* Animated background effects */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_40%_at_50%_50%,rgba(155,135,245,0.12)_0%,transparent_100%)]" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>
      
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Have an idea? Foundry is launching soon.</h2>
          <p className="text-muted-foreground">We're refining our AI builder. Get early access to be the first to use it.</p>
        </div>
        
        <div className="max-w-2xl mx-auto transform hover:scale-[1.01] transition-all duration-300">
          <div className="relative group">
            {/* Glow Effect Border - only on focus */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-violet-400 rounded-xl blur-sm opacity-0 transition-opacity duration-300 group-focus-within:opacity-75"></div>
            
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl shadow-xl p-5 border border-gray-800">
              <div className="space-y-6 text-center p-4">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <span className="text-3xl">⚒️</span>
                  <span className="text-xl text-white font-bold">Foundry AI</span>
                </div>
                
                <div className="relative">
                  <div className="p-6 bg-gray-800/50 border-gray-700 rounded-lg text-gray-300">
                    <p className="mb-2 text-violet-400 font-medium">Coming Soon</p>
                    <p className="text-lg mb-4">Our AI builder is currently in private beta testing.</p>
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                      {placeholders.map((placeholder, i) => (
                        <span key={i} className="px-3 py-1 bg-violet-900/30 rounded-full text-sm text-violet-300">
                          {placeholder.substring(0, 25)}...
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-400">Join our early access list to be the first to build your app with AI</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Link to="/early-access">
                    <Button 
                      className="px-8 py-6 rounded-full bg-violet-600 hover:bg-violet-700 transition-all w-full"
                    >
                      Get Early Access <ArrowRight size={16} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TryFoundrySection;
