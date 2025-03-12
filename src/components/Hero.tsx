
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="section-darker pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
      {/* Floating elements */}
      <div className="floating-element top-20 left-20 w-[300px] h-[300px] animate-float"></div>
      <div className="floating-element bottom-20 right-20 w-[400px] h-[400px] animate-float-slow animation-delay-800"></div>
      
      {/* Orbiting elements */}
      <div className="absolute top-1/4 left-1/4 h-0 w-0">
        <div className="orbiting-element animate-orbit"></div>
      </div>
      <div className="absolute top-1/3 right-1/3 h-0 w-0">
        <div className="orbiting-element animate-orbit-slow animation-delay-400"></div>
      </div>
      <div className="absolute bottom-1/4 right-1/4 h-0 w-0">
        <div className="orbiting-element animate-orbit-reverse"></div>
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
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-violet-600 opacity-0 animate-fadeIn animation-delay-600">
                No Coding. No Team. No Delay.
              </span>
            </h1>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 opacity-0 animate-fadeIn animation-delay-800">
            Artificial intelligence that breaks down your idea, builds your app with Lovable.dev, and iterates until it's ready to ship — no coding needed
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center opacity-0 animate-fadeIn animation-delay-1000">
            <a 
              href="#early-access" 
              className="btn-glow w-full sm:w-auto px-6 py-3 rounded-full bg-violet-700 text-white font-medium hover:bg-violet-600 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-violet-500/40 transform hover:-translate-y-1 text-lg"
            >
              Request Early Access
              <ArrowRight size={16} />
            </a>
            
            <a 
              href="#how-it-works" 
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gray-800 border border-gray-700 text-gray-200 font-medium hover:bg-gray-700 transition-all"
            >
              See How It Works
            </a>
          </div>
        </div>

        <div className="relative mt-16 md:mt-24 opacity-0 animate-slideUp animation-delay-1200">
          <div className="glass-card rounded-2xl p-1 md:p-2 shadow-xl border border-violet-900/20">
            <div className="bg-gray-800 rounded-xl overflow-hidden p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
                <div className="flex-1 flex flex-col items-center text-center md:text-left md:items-start">
                  <div className="bg-violet-900/80 text-violet-200 w-10 h-10 rounded-full flex items-center justify-center mb-3">1</div>
                  <h3 className="font-medium mb-1 text-white">Prompt</h3>
                  <p className="text-sm text-gray-400">Describe your idea in natural language</p>
                </div>
                
                <div className="hidden md:block text-gray-600">
                  <ArrowRight size={24} />
                </div>
                
                <div className="flex-1 flex flex-col items-center text-center">
                  <div className="bg-green-900/80 text-green-200 w-10 h-10 rounded-full flex items-center justify-center mb-3">2</div>
                  <h3 className="font-medium mb-1 text-white">Task Breakdown</h3>
                  <p className="text-sm text-gray-400">AI plans development steps</p>
                </div>
                
                <div className="hidden md:block text-gray-600">
                  <ArrowRight size={24} />
                </div>
                
                <div className="flex-1 flex flex-col items-center text-center md:text-right md:items-end">
                  <div className="bg-purple-900/80 text-purple-200 w-10 h-10 rounded-full flex items-center justify-center mb-3">3</div>
                  <h3 className="font-medium mb-1 text-white">App Creation</h3>
                  <p className="text-sm text-gray-400">Built with Lovable.dev and launched</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
