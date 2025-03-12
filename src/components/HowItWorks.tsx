
import { useRef, useEffect } from "react";
import { MessageSquare, Code, LayoutList, Rocket } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: MessageSquare,
    title: "Prompt",
    description: "Describe your product idea in natural language, just like you'd explain it to a colleague.",
    example: "\"I need a project management app with task boards, time tracking, and team collaboration.\"",
    color: "blue"
  },
  {
    id: 2,
    icon: LayoutList,
    title: "Plan",
    description: "The AI breaks down your idea into comprehensive tasks and creates a detailed development plan.",
    example: "AI: \"I'll build user authentication, task board UI, backend APIs, and real-time collaboration...\"",
    color: "green"
  },
  {
    id: 3,
    icon: Code,
    title: "Build",
    description: "Our AI executes each task with Lovable.dev, building a complete, working application.",
    example: "The AI writes code, tests functionality, and constantly improves based on your feedback.",
    color: "purple"
  },
  {
    id: 4,
    icon: Rocket,
    title: "Launch",
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
      className="py-20 md:py-28 bg-gradient-to-b from-white to-blue-50/50 opacity-0 transition-opacity duration-1000 ease-out"
    >
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 mb-6">
            The Process
          </span>
          <h2 className="heading-lg mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">
            Our AI project manager handles the entire development process, from planning to launch.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className="glass-card rounded-xl p-6 hover:shadow-md transition-all group"
            >
              <div className={`flex items-center mb-4 gap-4`}>
                <div className={`w-12 h-12 rounded-xl bg-${step.color}-100 text-${step.color}-600 flex items-center justify-center flex-shrink-0`}>
                  <step.icon size={24} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-400">Step {step.id}</div>
                  <h3 className="heading-sm">{step.title}</h3>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">
                {step.description}
              </p>
              
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 text-sm text-gray-600 italic">
                {step.example}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#early-access" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-700 text-white font-medium hover:bg-blue-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
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
