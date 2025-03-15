
import { useRef, useEffect } from "react";
import { ArrowRight, CheckCircle, Clock, Zap, Rocket, User } from "lucide-react";

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
    <section id="pledge-support" ref={sectionRef} className="relative py-24 opacity-0 transition-opacity duration-1000 ease-out bg-[#F1F0FB]">
      {/* Background elements and gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(155,135,245,0.15)_0%,transparent_100%)]" />
      <div className="floating-element top-20 left-20 w-[200px] h-[200px] animate-float"></div>
      <div className="floating-element bottom-20 right-20 w-[300px] h-[300px] animate-float-slow"></div>
      
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Get Early Access to Foundry OS
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Choose your build speed — no code needed.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left side: Pricing tiers */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Build Speed Options</h3>
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="bg-violet-100 p-2 rounded-lg mr-4">
                  <Clock className="text-violet-700" size={20} />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">Free</p>
                  <p className="text-gray-600">Delivered in 2 weeks</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-violet-100 p-2 rounded-lg mr-4">
                  <Zap className="text-violet-700" size={20} />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">$100</p>
                  <p className="text-gray-600">Delivered in 5 days</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-violet-100 p-2 rounded-lg mr-4">
                  <Zap className="text-violet-700" size={20} />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">$250</p>
                  <p className="text-gray-600">Delivered in 2 days</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-violet-100 p-2 rounded-lg mr-4">
                  <Rocket className="text-violet-700" size={20} />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">$500</p>
                  <p className="text-gray-600">Delivered in 1 day</p>
                </div>
              </li>
            </ul>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                  <User className="text-violet-700" size={18} />
                </div>
                <p className="text-gray-700 text-sm">
                  – John Smith, Founder of Foundry OS
                </p>
              </div>
            </div>
          </div>
          
          {/* Right side: CTA box */}
          <div className="bg-white rounded-xl p-8 shadow-2xl hover:shadow-violet-500/20 transition-all duration-300 transform hover:scale-[1.02]">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Secure Your Build Slot</h3>
              <div className="mb-6">
                <p className="text-lg text-gray-600 mb-2">Only 1,000 early builder spots available</p>
                <div className="inline-block px-4 py-2 rounded-full bg-violet-100 text-violet-800 font-bold">
                  15 submitted this week
                </div>
              </div>
              
              <a 
                href="https://form.typeform.com/to/qIqMaEXU" 
                className="btn-glow w-full px-8 py-4 rounded-xl bg-violet-700 text-white font-bold 
                  hover:bg-violet-600 transition-all flex items-center justify-center gap-2 shadow-lg 
                  hover:shadow-violet-500/40 transform hover:-translate-y-1 text-lg mb-4"
              >
                Secure Your Build Slot
                <ArrowRight size={20} />
              </a>
              
              <p className="text-sm text-gray-500">No credit card required to join the waitlist</p>
              
              <div className="mt-6">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={16} />
                    <span className="text-gray-600 text-sm">Full source code ownership</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={16} />
                    <span className="text-gray-600 text-sm">Unlimited iterations on your build</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={16} />
                    <span className="text-gray-600 text-sm">Priority support via email</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccess;
