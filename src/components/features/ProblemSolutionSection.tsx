
import { AlertTriangle, GitMerge, RefreshCcw, Layers, Bug, Check } from "lucide-react";
import FeatureSection from "./FeatureSection";

interface ProblemItemProps {
  icon: any;
  text: string;
  index: number;
}

const ProblemItem = ({ icon: Icon, text, index }: ProblemItemProps) => (
  <li 
    className="problem-item flex items-start opacity-0 animate-fadeIn"
    style={{ animationDelay: `${index * 200}ms` }}
  >
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center mr-4 mt-0.5 hover:scale-110 transition-transform">
      <Icon size={20} className="stroke-[2.5]" />
    </div>
    <p className="text-gray-700 text-lg">{text}</p>
  </li>
);

const SolutionItem = ({ text, index }: { text: string; index: number }) => (
  <li 
    className="problem-item flex items-start opacity-0 animate-fadeIn"
    style={{ animationDelay: `${index * 200}ms` }}
  >
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 text-green-500 flex items-center justify-center mr-4 mt-0.5 hover:scale-110 transition-transform">
      <Check size={20} className="stroke-[2.5]" />
    </div>
    <p className="text-gray-700 text-lg">{text}</p>
  </li>
);

const ProblemSolutionSection = () => {
  const problemItems = [
    {
      icon: AlertTriangle,
      text: "AI tools generate code snippets, not full applications"
    },
    {
      icon: GitMerge,
      text: "Manual integration between different parts of your product"
    },
    {
      icon: RefreshCcw,
      text: "Limited context leads to inconsistent development"
    },
    {
      icon: Layers,
      text: "No continuous iteration based on feedback"
    },
    {
      icon: Bug,
      text: "Building a real product requires dozens of manual steps"
    }
  ];

  const solutionItems = [
    "Complete end-to-end project management",
    "Automatic integration of all components",
    "AI maintains full context across your entire project",
    "Continuous improvement based on your feedback",
    "One AI builds your entire product, from start to finish"
  ];

  return (
    <FeatureSection
      id="problem"
      title="AI tools and no-code builders still require significant manual effort."
      bgClass="section-light"
    >
      <div className="grid md:grid-cols-2 gap-12 items-stretch">
        <div className="white-card rounded-xl p-8 border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 hover:scale-[1.01] bg-gray-50">
          <div className="flex justify-center mb-3">
            <AlertTriangle size={32} className="text-red-500" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[#ea384c]">The Problem</h3>
          
          <ul className="space-y-5">
            {problemItems.map((item, i) => (
              <ProblemItem key={i} icon={item.icon} text={item.text} index={i} />
            ))}
          </ul>
        </div>
        
        <div className="white-card rounded-xl p-8 border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 hover:scale-[1.01] bg-gray-50">
          <div className="flex justify-center mb-3">
            <Check size={32} className="text-green-500" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-green-500">The Solution</h3>
          
          <ul className="space-y-5">
            {solutionItems.map((item, i) => (
              <SolutionItem key={i} text={item} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </FeatureSection>
  );
};

export default ProblemSolutionSection;
