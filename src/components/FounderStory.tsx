
import { useState, useEffect, useRef } from "react";
import { User } from "lucide-react";

const FounderStory = () => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const fullText = "I built Foundry OS because I was tired of endless prompting, coding, and still never launching. This tool helps you go from idea to build — fast, focused, and without the mess. Foundry OS is the product I needed. So I built it for you too.";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsTyping(true);
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.5 }
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

  useEffect(() => {
    if (!isTyping) return;
    
    if (displayText.length < fullText.length) {
      const typingTimer = setTimeout(() => {
        setDisplayText(fullText.substring(0, displayText.length + 1));
      }, 40); 
      
      return () => clearTimeout(typingTimer);
    } else {
      // Finished typing, show signature
      const signatureTimer = setTimeout(() => {
        setShowSignature(true);
      }, 800);
      
      return () => clearTimeout(signatureTimer);
    }
  }, [displayText, fullText, isTyping]);

  return (
    <section 
      className="py-12 bg-[#F3EAFB]"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-sm border border-purple-100">
            <div className="min-h-28 flex items-center justify-center">
              <div className="font-sans text-xl md:text-2xl text-[#333333]">
                <span>{displayText}</span>
                <span className="inline-block w-2 h-5 bg-violet-600 ml-1 animate-pulse"></span>
              </div>
            </div>
            
            {showSignature && (
              <div className="mt-6 opacity-0 animate-fadeIn flex items-center justify-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                  <User size={20} />
                </div>
                <p className="text-[#333333] font-['Dancing_Script',_cursive] text-xl">
                  – David Edwards, Founder of Foundry OS
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderStory;
