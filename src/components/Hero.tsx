
import { ArrowRight, MessageSquare, LayoutList, Code, Rocket } from "lucide-react";

const Hero = () => {
  return (
    <section className="section-dark pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
      {/* Enhanced floating elements */}
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
          
          <div className="flex flex-col sm:flex-row gap-4 items-center opacity-0 animate-fadeIn animation-delay-1000">
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
          <div className="mt-8 max-w-xl mx-auto opacity-0 animate-fadeIn animation-delay-1200">
            <p className="text-sm italic text-gray-400 px-4">
              "I built this because I was tired of writing code, prompting AIs, and piecing together tools every time I had a new idea. Foundry OS is the product I've always needed."
            </p>
          </div>
        </div>

        {/* Visual Journey - 4-step process with enhanced animations - REDUCED MARGIN */}
        <div className="mt-12 white-card p-8 opacity-0 animate-slideUp animation-delay-1200 shadow-xl">
          <h3 className="heading-sm mb-5 text-gray-800">Your Journey from Idea to Product</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="journey-step group opacity-0 animate-fadeIn animation-delay-1400">
              <div className="journey-icon-container bg-violet-100 text-violet-700 group-hover:bg-violet-700 group-hover:text-white hover:shadow-md">
                <MessageSquare size={32} />
              </div>
              <h4 className="font-semibold text-lg text-gray-800 mb-2">Prompt</h4>
              <p className="text-sm text-gray-600">Describe your product idea in natural language</p>
            </div>
            
            <div className="journey-step group opacity-0 animate-fadeIn animation-delay-1600">
              <div className="journey-icon-container bg-violet-100 text-violet-700 group-hover:bg-violet-700 group-hover:text-white hover:shadow-md">
                <LayoutList size={32} />
              </div>
              <h4 className="font-semibold text-lg text-gray-800 mb-2">Task Breakdown</h4>
              <p className="text-sm text-gray-600">AI breaks down your idea into comprehensive tasks</p>
            </div>
            
            <div className="journey-step group opacity-0 animate-fadeIn animation-delay-1800">
              <div className="journey-icon-container bg-violet-100 text-violet-700 group-hover:bg-violet-700 group-hover:text-white hover:shadow-md">
                <Code size={32} />
              </div>
              <h4 className="font-semibold text-lg text-gray-800 mb-2">App Built</h4>
              <p className="text-sm text-gray-600">Our AI builds your app with Lovable.dev</p>
            </div>
            
            <div className="journey-step group opacity-0 animate-fadeIn animation-delay-2000">
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
