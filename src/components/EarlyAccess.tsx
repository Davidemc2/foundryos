
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
      className="relative py-20 opacity-0 transition-opacity duration-1000 ease-out"
    >
      <div className="absolute inset-0 -z-10 bg-blue-50/80" />
      <div className="absolute top-0 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-blue-100/50 blur-[100px]" />
      <div className="absolute bottom-0 right-0 -z-10 h-[300px] w-[300px] rounded-full bg-blue-100/50 blur-[100px]" />
      
      <div className="container-custom max-w-5xl">
        <div className="glass-card rounded-2xl p-8 md:p-12 text-center bg-white/90 shadow-xl">
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8">
            Limited Early Access
          </div>
          
          <h2 className="heading-lg mb-4">Be among the first to build with AI</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            We're launching with limited spots for early adopters. Join the waitlist today to secure your place and get exclusive founder benefits.
          </p>
          
          <div className="max-w-md mx-auto">
            <a 
              href="https://yourcompany.typeform.com/early-access" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full px-8 py-4 rounded-xl bg-blue-700 text-white font-medium hover:bg-blue-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
            >
              Request Early Access
              <Rocket size={20} />
            </a>
            
            <p className="text-sm text-muted-foreground mt-4">
              No credit card required. Limited spots available.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccess;
