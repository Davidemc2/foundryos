
import { useRef, useEffect } from "react";
import { MessageSquare, Code, LayoutList, Rocket } from "lucide-react";

const steps = [{
  id: 1,
  icon: MessageSquare,
  title: "Write a Prompt",
  description: "Describe your product idea in natural language, just like you'd explain it to a colleague.",
  example: "\"I need a project management app with task boards, time tracking, and team collaboration.\"",
  color: "violet"
}, {
  id: 2,
  icon: LayoutList,
  title: "Tasks Get Broken Down",
  description: "The AI breaks down your idea into comprehensive tasks and creates a detailed development plan.",
  example: "AI: \"I'll build user authentication, task board UI, backend APIs, and real-time collaboration...\"",
  color: "green"
}, {
  id: 3,
  icon: Code,
  title: "App Is Built",
  description: "Our AI executes each task with Lovable.dev, building a complete, working application.",
  example: "The AI writes code, tests functionality, and constantly improves based on your feedback.",
  color: "purple"
}, {
  id: 4,
  icon: Rocket,
  title: "Launch & Iterate",
  description: "Your finished product is deployed and ready to use. Iterate, improve, and scale as needed.",
  example: "Access your new app immediately and start using it – or request changes and improvements.",
  color: "orange"
}];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
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
    <section id="how-it-works" ref={sectionRef} className="py-24 bg-gray-950 relative opacity-0 transition-opacity duration-1000 ease-out">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            How Foundry Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A simple process that takes you from idea to launched product in days, not months
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="glass-card p-6 rounded-xl group hover:scale-105 transition-all duration-300">
              <div className={`w-14 h-14 rounded-full bg-${step.color}-500/20 flex items-center justify-center mb-4 group-hover:bg-${step.color}-500/30 transition-colors`}>
                <step.icon className={`text-${step.color}-400`} size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-300 mb-4">{step.description}</p>
              <p className="text-sm italic text-gray-400">{step.example}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
