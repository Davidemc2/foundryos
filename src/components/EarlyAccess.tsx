import { useRef, useEffect } from "react";
import { Lock, CreditCard, Shield, ArrowRight } from "lucide-react";

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
      id="pledge-support" 
      ref={sectionRef}
      className="relative py-20 opacity-0 transition-opacity duration-1000 ease-out"
      style={{ backgroundColor: "#4314A0" }}
    >
      {/* Background elements and gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.2)_0%,transparent_100%)]" />
      <div className="floating-element top-20 left-20 w-[200px] h-[200px] animate-float"></div>
      <div className="floating-element bottom-20 right-20 w-[300px] h-[300px] animate-float-slow"></div>
      
      <div className="container-custom max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Pledge Your Support — Lock In Lifetime Founder Pricing
          </h2>
          <p className="text-xl text-violet-100 max-w-3xl mx-auto">
            Reserve unlimited monthly usage at just $50/month — no charge today. This helps us prioritize serious users for early access.
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <a 
            href="/early-access" 
            className="btn-glow w-full px-8 py-4 rounded-xl bg-white text-violet-800 font-bold 
            hover:bg-violet-100 transition-all flex items-center justify-center gap-2 shadow-lg 
            hover:shadow-white/40 transform hover:-translate-y-1 hover:scale-105 text-lg"
          >
            Get Early Access
            <ArrowRight size={16} className="animate-bounce-subtle" />
          </a>
          
          <div className="flex items-center justify-center mt-6 text-sm text-violet-200">
            <Shield size={16} className="mr-2 text-emerald-400" />
            <p>Secure your spot before public launch. You can cancel or upgrade anytime.</p>
          </div>
          
          <div className="mt-4 flex items-center justify-center text-sm text-violet-200">
            <CreditCard size={16} className="mr-2" />
            <p>No charges until official launch — your payment details are securely saved for later.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccess;
