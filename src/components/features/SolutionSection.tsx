
import { Rocket, Brain, Cpu, Workflow } from "lucide-react";
import FeatureSection from "./FeatureSection";

interface FeatureCardProps {
  icon: any;
  title: string;
  benefit: string;
  index: number;
}

const FeatureCard = ({ icon: Icon, title, benefit, index }: FeatureCardProps) => (
  <div 
    className="flex flex-col glass-card p-8 rounded-xl border border-violet-800/30 opacity-0 animate-slideUp"
    style={{ animationDelay: `${index * 200}ms` }}
  >
    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-violet-900/80 text-violet-200 flex items-center justify-center mb-6 mx-auto">
      <Icon size={32} />
    </div>
    <h3 className="text-2xl font-bold text-white mb-3 text-center">{title}</h3>
    <p className="text-gray-300 text-lg text-center">{benefit}</p>
  </div>
);

const SolutionSection = () => {
  const solutionFeatures = [
    {
      icon: Brain,
      title: "Automated Planning",
      benefit: "Your app is broken into build-ready tasks instantly"
    },
    {
      icon: Cpu,
      title: "Smart Development",
      benefit: "AI writes, tests, and refines your entire codebase"
    },
    {
      icon: Workflow,
      title: "Instant Deployment",
      benefit: "Your product is deployed and ready to use immediately"
    }
  ];

  return (
    <FeatureSection
      id="solution"
      icon={Rocket}
      title="Our Solution"
      description="A complete AI project manager that turns your idea into a finished product without the manual work."
      bgClass="section-dark"
    >
      <div className="flex flex-col md:flex-row gap-6">
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
