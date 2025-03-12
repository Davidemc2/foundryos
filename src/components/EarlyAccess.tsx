
import { useRef, useEffect } from "react";
import { Rocket } from "lucide-react";

const EarlyAccess = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
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
  
  return (
    <section 
      id="early-access" 
      ref={sectionRef}
      className="relative py-20 opacity-0 transition-opacity duration-1000 ease-out section-darker"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_40%_at_50%_50%,hsl(var(--primary)/0.15)_0%,transparent_100%)]" />
      <div className="floating-element top-20 left-20 w-[200px] h-[200px] animate-float"></div>
      <div className="floating-element bottom-20 right-20 w-[300px] h-[300px] animate-float-slow"></div>
      
      <div className="container-custom max-w-5xl">
        <div className="glass-card rounded-2xl p-8 md:p-12 text-center border border-violet-900/20 shadow-xl">
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-violet-900/80 text-violet-200 text-sm font-medium mb-8">
            Limited Early Access
          </div>
          
          <h2 className="heading-lg mb-4 text-white">Be among the first to build with AI</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            We're launching with limited spots for early adopters. Join the waitlist today to secure your place and get exclusive founder benefits.
          </p>
          
          <div className="max-w-md mx-auto">
            <a 
              href="https://yourcompany.typeform.com/early-access" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-glow w-full px-8 py-4 rounded-xl bg-violet-700 text-white font-medium hover:bg-violet-600 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-violet-500/40 transform hover:-translate-y-1 text-lg"
            >
              Request Early Access
              <Rocket size={20} />
            </a>
            
            <p className="text-sm text-gray-400 mt-4">
              No credit card required. Limited spots available.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccess;
