
import React, { useRef, useEffect } from "react";

const PricingSection = () => {
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
      id="pricing" 
      ref={sectionRef}
      className="py-20 opacity-0 transition-opacity duration-1000 ease-out section-dark relative"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_40%_at_50%_50%,hsl(var(--primary)/0.08)_0%,transparent_100%)]" />
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Pay only for what you need, with no hidden fees
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* We'll add actual pricing cards here later */}
          <div className="white-card p-8 border-2 border-violet-100 hover:border-violet-400 transition-colors">
            <h3 className="text-2xl font-bold mb-4">Builder Plan</h3>
            <p className="text-gray-600 mb-6">Perfect for solo founders and indie hackers</p>
            <div className="text-5xl font-bold mb-4">$199<span className="text-xl font-normal text-gray-500">/mo</span></div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Up to 5 apps/month</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Full code ownership</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>AI Project Manager</span>
              </li>
            </ul>
            <button className="w-full py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
              Coming Soon
            </button>
          </div>
          
          <div className="white-card p-8 border-2 border-violet-400 hover:border-violet-500 transition-colors relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-violet-600 text-white text-xs py-1 px-3 rounded-bl">POPULAR</div>
            <h3 className="text-2xl font-bold mb-4">Startup Plan</h3>
            <p className="text-gray-600 mb-6">For teams building the next big thing</p>
            <div className="text-5xl font-bold mb-4">$499<span className="text-xl font-normal text-gray-500">/mo</span></div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Unlimited apps</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Full code ownership</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Priority support</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>AI Project Manager</span>
              </li>
            </ul>
            <button className="w-full py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
