
import { useState, useEffect, useRef } from "react";
import { MessageSquare, BrainCircuit, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    id: 1,
    icon: MessageSquare,
    title: "Share your idea",
    description: "Describe your startup or upload your sketch",
    color: "violet"
  },
  {
    id: 2,
    icon: BrainCircuit,
    title: "AI breaks it down",
    description: "Foundry writes the scope and tasks for you",
    color: "green"
  },
  {
    id: 3,
    icon: Rocket,
    title: "Get a build plan",
    description: "Instant cost estimate. Choose to start building.",
    color: "blue"
  }
];

const HowFoundryWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(139,92,246,0.05)_0%,transparent_100%)]" />
      
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            How Foundry OS Works
          </h2>
          <p className="text-lg text-gray-600">
            Transform your idea into a fully-scoped product in minutes
          </p>
        </div>

        <div 
          ref={sectionRef}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16"
        >
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`relative transform transition-all duration-700 ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-violet-500/50 transition-colors shadow-xl relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-violet-100/30 to-transparent rounded-2xl" />
                
                <div className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center bg-${step.color}-100 text-${step.color}-500`}>
                  <step.icon size={32} />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
          >
            Get Early Access
            <Rocket className="ml-2" size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowFoundryWorks;
