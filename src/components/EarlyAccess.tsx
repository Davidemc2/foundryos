
import { useRef, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import EmailCapture from "./EmailCapture";

const EarlyAccess = () => {
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
    <section id="pledge-support" ref={sectionRef} className="relative py-24 opacity-0 transition-opacity duration-1000 ease-out" style={{
      backgroundColor: "#4314A0"
    }}>
      {/* Background elements and gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.2)_0%,transparent_100%)]" />
      <div className="floating-element top-20 left-20 w-[200px] h-[200px] animate-float"></div>
      <div className="floating-element bottom-20 right-20 w-[300px] h-[300px] animate-float-slow"></div>
      
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Get Early Access to Foundry OS
          </h2>
          <p className="text-xl text-violet-100 max-w-3xl mx-auto mb-6">
            Only 200 early builder spots available — secure yours now.
          </p>
          <p className="text-sm text-violet-200 italic animate-pulse">
            15 builders have submitted ideas this week
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className="max-w-lg bg-white rounded-xl p-8 shadow-2xl hover:shadow-violet-500/20 transition-all duration-300">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Secure Your Spot</h3>
              <div className="mb-6">
                <p className="text-lg text-gray-600 mb-2">Founder pricing available to first 200 users</p>
                <div className="inline-block px-4 py-2 rounded-full bg-violet-100 text-violet-800 font-bold">
                  Limited Time Offer
                </div>
              </div>
              
              <EmailCapture 
                className="mb-6"
                placeholder="Enter your email"
                buttonText="Join Now" 
              />
              
              <p className="text-sm text-gray-500">No credit card required to join the waitlist</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccess;
