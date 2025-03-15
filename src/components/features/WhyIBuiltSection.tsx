
import { User } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import FeatureSection from "./FeatureSection";
import { Card } from "@/components/ui/card";

const WhyIBuiltSection = () => {
  const [visibleParagraphs, setVisibleParagraphs] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const paragraphs = [
    "I got tired of wasting hours stitching together tools, prompting AIs, writing glue code, and still not launching anything.",
    "Every new idea meant a blank page, a dev sprint, and a week of lost time. So I built Foundry OS — the system I needed.",
    "It turns an idea into a project scope, breaks it down into tasks, and builds it with Lovable.dev — no code, no team, no delays.",
    "Now, I use it to ship faster — and I'm opening it up to early builders like you."
  ];

  // Observer to start animation when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleParagraphs === 0) {
          setIsTyping(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [visibleParagraphs]);

  // Typewriter animation effect
  useEffect(() => {
    if (!isTyping) return;
    
    if (currentParagraph < paragraphs.length) {
      const targetText = paragraphs[currentParagraph];
      
      if (currentText.length < targetText.length) {
        const timer = setTimeout(() => {
          setCurrentText(targetText.substring(0, currentText.length + 1));
        }, 30); // Typing speed
        
        return () => clearTimeout(timer);
      } else {
        // Complete paragraph
        const timer = setTimeout(() => {
          setVisibleParagraphs(prev => prev + 1);
          setCurrentText("");
          setCurrentParagraph(prev => prev + 1);
        }, 500); // Pause between paragraphs
        
        return () => clearTimeout(timer);
      }
    }
  }, [isTyping, currentText, currentParagraph, paragraphs]);

  return (
    <FeatureSection
      id="why-i-built"
      icon={User}
      title="Why I Built Foundry OS"
      bgClass="bg-gradient-to-br from-violet-800 to-violet-900"
    >
      <div className="max-w-4xl mx-auto" ref={sectionRef}>
        <Card className="p-8 border border-violet-300/20 shadow-2xl hover:shadow-violet-500/10 transition-all bg-white/95 backdrop-blur-sm">
          <blockquote className="space-y-6 text-gray-800">
            {paragraphs.map((text, index) => (
              <p 
                key={index} 
                className={`text-lg md:text-xl ${index === paragraphs.length - 1 ? 'font-medium' : ''} overflow-hidden`}
              >
                {index < visibleParagraphs ? (
                  text
                ) : index === currentParagraph ? (
                  <>
                    <span>{currentText}</span>
                    <span className="inline-block w-2 h-5 bg-violet-600 ml-1 animate-pulse"></span>
                  </>
                ) : (
                  ""
                )}
              </p>
            ))}
          </blockquote>
        </Card>
      </div>
      
      {/* Floating decoration elements in the background */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-violet-600/10 blur-3xl animate-float"></div>
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-violet-500/10 blur-3xl animate-float-slow animation-delay-500"></div>
    </FeatureSection>
  );
};

export default WhyIBuiltSection;
