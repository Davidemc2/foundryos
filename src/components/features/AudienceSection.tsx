
import { ArrowRight, Users } from "lucide-react";
import FeatureSection from "./FeatureSection";

interface AudienceItemProps {
  title: string;
  description: string;
  cta: string;
}

const AudienceItem = ({ title, description, cta }: AudienceItemProps) => (
  <div className="white-card p-6 hover:shadow-xl transition-all group transform hover:-translate-y-1 hover:scale-[1.01]">
    <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <p className="text-sm font-medium text-violet-600 flex items-center">
      {cta}
      <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
    </p>
  </div>
);

const AudienceSection = () => {
  const audienceItems = [
    {
      title: "Solo Founders",
      description: "Turn your vision into reality without needing a technical team to execute it.",
      cta: "Build without hiring devs"
    },
    {
      title: "Indie Hackers",
      description: "Build and iterate faster than ever, with an AI partner that understands product development.",
      cta: "Ship your side project in days, not months"
    },
    {
      title: "Lean Startups",
      description: "Maximize your runway by automating development and focusing on what matters most.",
      cta: "Extend your team with AI"
    }
  ];

  return (
    <FeatureSection
      id="who"
      icon={Users}
      title="Who it's for"
      description="Made specifically for those building with limited resources and big ambitions."
      bgClass="section-dark"
    >
      <div className="grid md:grid-cols-3 gap-8">
        {audienceItems.map((item, i) => (
          <AudienceItem key={i} {...item} />
        ))}
      </div>
    </FeatureSection>
  );
};

export default AudienceSection;
