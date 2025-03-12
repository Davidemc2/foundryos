
import { Rocket, Brain, Cpu, Workflow, LightbulbIcon, Zap } from "lucide-react";
import FeatureSection from "./FeatureSection";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: any;
  title: string;
  benefit: string;
  index: number;
}

const FeatureCard = ({ icon: Icon, title, benefit, index }: FeatureCardProps) => (
  <div 
    className={cn(
      "opacity-0 animate-slideUp bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-violet-100/20",
      "shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center",
      "transform hover:-translate-y-1 hover:border-violet-300/30"
    )}
    style={{ animationDelay: `${index * 200}ms` }}
  >
    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 text-white flex items-center justify-center mb-6">
      <Icon size={30} />
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">{title}</h3>
    <p className="text-gray-600 text-lg text-center">{benefit}</p>
  </div>
);

const SolutionSection = () => {
  const solutionFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Planning",
      benefit: "Breaks your idea into shippable tasks in seconds."
    },
    {
      icon: Zap,
      title: "Smart Development",
      benefit: "Writes, tests, and refines your entire codebase automatically."
    },
    {
      icon: Workflow,
      title: "Seamless Deployment",
      benefit: "Your product is deployed and ready to use immediately."
    }
  ];

  return (
    <FeatureSection
      id="solution"
      icon={Rocket}
      title="Our Solution"
      description="A complete AI project manager that turns your idea into a finished product without the manual work."
      bgClass="section-light"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {solutionFeatures.map((feature, i) => (
          <FeatureCard
            key={i}
            icon={feature.icon}
            title={feature.title}
            benefit={feature.benefit}
            index={i}
          />
        ))}
      </div>
    </FeatureSection>
  );
};

export default SolutionSection;
