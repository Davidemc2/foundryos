
import { useState, useEffect, useRef } from "react";
import { User } from "lucide-react";

const FounderStory = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentSentence, setCurrentSentence] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showSignature, setShowSignature] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const sentences = [
    "I built this because I was tired of prompting, coding, and still never launching.",
    "Foundry OS is the product I needed — so I built it for you too."
  ];

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

    const currentQuote = sentences[currentSentence];
    
    if (displayText.length < currentQuote.length) {
      const typingTimer = setTimeout(() => {
        setDisplayText(currentQuote.substring(0, displayText.length + 1));
      }, 50); // Typing speed
      
      return () => clearTimeout(typingTimer);
    } else {
      // Finished typing current sentence
      if (currentSentence < sentences.length - 1) {
        // Move to next sentence after a pause
        const pauseTimer = setTimeout(() => {
          setDisplayText("");
          setCurrentSentence(currentSentence + 1);
        }, 1500); // Pause between sentences
        
        return () => clearTimeout(pauseTimer);
      } else {
        // Finished all sentences, show signature
        const signatureTimer = setTimeout(() => {
          setShowSignature(true);
        }, 800);
        
        return () => clearTimeout(signatureTimer);
      }
    }
  }, [displayText, currentSentence, sentences, isTyping]);

  return (
    <section 
      className="py-16 bg-gray-50 dark:bg-gray-900/40"
      ref={sectionRef}
    >
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm dark:bg-gray-800/30 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="h-32 flex items-center justify-center">
              <div className="font-mono text-xl md:text-2xl text-gray-800 dark:text-gray-200">
                {currentSentence < sentences.length && (
                  <>
                    <span>{displayText}</span>
                    <span className="inline-block w-2 h-5 bg-violet-600 ml-1 animate-pulse"></span>
                  </>
                )}
                {currentSentence >= sentences.length && !showSignature && (
                  <>
                    <span>{sentences[sentences.length - 1]}</span>
                    <span className="inline-block w-2 h-5 bg-violet-600 ml-1 animate-pulse"></span>
                  </>
                )}
              </div>
            </div>
            
            {showSignature && (
              <div className="mt-8 flex items-center justify-center space-x-3 opacity-0 animate-fadeIn">
                <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center text-violet-600 dark:text-violet-400">
                  <User size={20} />
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  David Edwards, Founder of Foundry OS
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
