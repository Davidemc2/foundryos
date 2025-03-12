import { useRef, useEffect } from "react";
import { MessageSquare, Code, LayoutList, Rocket } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: MessageSquare,
    title: "Write a Prompt",
    description: "Describe your product idea in natural language, just like you'd explain it to a colleague.",
    example: "\"I need a project management app with task boards, time tracking, and team collaboration.\"",
    color: "violet"
  },
  {
    id: 2,
    icon: LayoutList,
    title: "Tasks Get Broken Down",
    description: "The AI breaks down your idea into comprehensive tasks and creates a detailed development plan.",
    example: "AI: \"I'll build user authentication, task board UI, backend APIs, and real-time collaboration...\"",
    color: "green"
  },
  {
    id: 3,
    icon: Code,
    title: "App Is Built",
    description: "Our AI executes each task with Lovable.dev, building a complete, working application.",
    example: "The AI writes code, tests functionality, and constantly improves based on your feedback.",
    color: "purple"
  },
  {
    id: 4,
    icon: Rocket,
    title: "Launch & Iterate",
    description: "Your finished product is deployed and ready to use. Iterate, improve, and scale as needed.",
    example: "Access your new app immediately and start using it – or request changes and improvements.",
    color: "orange"
  }
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section 
      id="how-it-works" 
      ref={sectionRef}
      className="section-light py-12 md:py-16 opacity-0 transition-opacity duration-1000 ease-out relative"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(139,92,246,0.1)_0%,transparent_100%)]" />
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-violet-100 text-violet-700 mb-6">
            The Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600">
            Our AI project manager handles the entire development process, from planning to launch.
          </p>
        </div>
        
        {/* Process diagram - Animated horizontal timeline */}
        <div className="mb-12 hidden md:block">
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
            <div className="flex justify-between items-center relative z-10">
              {steps.map((step, index) => (
                <div 
                  key={step.id} 
                  className="flex flex-col items-center opacity-0 animate-fadeIn"
                  style={{ animationDelay: `${index * 300}ms` }}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
                    step.color === 'violet' ? 'bg-violet-100 text-violet-700' :
                    step.color === 'green' ? 'bg-green-100 text-green-700' :
                    step.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                    'bg-orange-100 text-orange-700'
                  } hover:scale-110 transition-transform bg-white`}>
                    <step.icon size={28} />
                  </div>
                  <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
                    Step {step.id}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className="white-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 hover:scale-[1.01] opacity-0 animate-slideUp"
              style={{ animationDelay: `${500 + index * 300}ms` }}
            >
              <div className={`flex items-center mb-4 gap-4`}>
                <div className={`w-12 h-12 rounded-xl ${
                  step.color === 'violet' ? 'bg-violet-100 text-violet-700' :
                  step.color === 'green' ? 'bg-green-100 text-green-700' :
                  step.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                  'bg-orange-100 text-orange-700'
                } flex items-center justify-center flex-shrink-0 hover:scale-110 transition-transform`}>
                  <step.icon size={24} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-500">Step {step.id}</div>
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-800">{step.title}</h3>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">
                {step.description}
              </p>
              
              <div className="bg-gray-100 rounded-lg p-3 border border-gray-200 text-sm text-gray-600 italic">
                {step.example}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center opacity-0 animate-fadeIn animation-delay-1600">
          <a 
            href="#early-access" 
            className="btn-glow inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-700 text-white font-medium hover:bg-violet-600 transition-all shadow-md hover:shadow-violet-500/40 transform hover:-translate-y-1 hover:scale-105"
          >
            Start Building Your Product
            <Rocket size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
