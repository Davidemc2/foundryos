
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_50%_at_50%_50%,hsl(var(--primary)/0.1)_0%,hsl(var(--background))_100%)]" />
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-blue-100/20 blur-[100px]" />
      
      <div className="container-custom relative">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 mb-8 opacity-0 animate-fadeIn animation-delay-200">
            Introducing the AI project manager for builders
          </span>
          
          <h1 className="heading-xl mb-6 opacity-0 animate-fadeIn animation-delay-400">
            From Prompt to Product. No Coding. No Team. No Delay.
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 opacity-0 animate-fadeIn animation-delay-600">
            Artificial intelligence that breaks down your idea, builds your app with Lovable.dev, and iterates until it's ready to ship — no coding needed
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center opacity-0 animate-fadeIn animation-delay-800">
            <a 
              href="#early-access" 
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              Join Early Access
              <ArrowRight size={16} />
            </a>
            
            <a 
              href="#who" 
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-800 font-medium hover:bg-gray-50 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="relative mt-16 md:mt-24 opacity-0 animate-slideUp animation-delay-800">
          <div className="glass-card rounded-2xl p-1 md:p-2 shadow-xl">
            <div className="bg-gray-800 rounded-xl overflow-hidden">
              <img 
                src="https://placehold.co/1200x600/1f2937/fff?text=AI+Building+Your+App"
                alt="AI Building Your App"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          <div className="absolute -bottom-6 -right-6 -z-10 h-[300px] w-[300px] rounded-full bg-blue-100/30 blur-[100px]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
