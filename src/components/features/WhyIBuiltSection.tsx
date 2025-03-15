
import { User } from "lucide-react";
import FeatureSection from "./FeatureSection";
import { Card } from "@/components/ui/card";

const WhyIBuiltSection = () => {
  return (
    <FeatureSection
      id="why-i-built"
      icon={User}
      title="Why I Built Foundry OS"
      bgClass="section-light"
    >
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all bg-white">
          <blockquote className="space-y-4 text-gray-800">
            <p className="text-lg md:text-xl">
              I got tired of wasting hours stitching together tools, prompting AIs, writing glue code, and still not launching anything.
            </p>
            <p className="text-lg md:text-xl">
              Every new idea meant a blank page, a dev sprint, and a week of lost time. So I built Foundry OS — the system I needed.
            </p>
            <p className="text-lg md:text-xl">
              It turns an idea into a project scope, breaks it down into tasks, and builds it with Lovable.dev — no code, no team, no delays.
            </p>
            <p className="text-lg md:text-xl font-medium">
              Now, I use it to ship faster — and I'm opening it up to early builders like you.
            </p>
          </blockquote>
        </Card>
      </div>
    </FeatureSection>
  );
};

export default WhyIBuiltSection;
