
import { useRef, useEffect } from "react";
import { ArrowRight, CheckCircle, Rocket, Clock, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EarlyAccess = () => {
  const navigate = useNavigate();
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
  
  const handleGetStarted = () => {
    navigate("/build");
  };
  
  return (
    <section id="early-access" ref={sectionRef} className="relative py-24 opacity-0 transition-opacity duration-1000 ease-out bg-gray-50">
      {/* Background elements and gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(123,104,238,0.05)_0%,transparent_100%)]" />
      
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Get Early Access to Foundry OS
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your build speed — no code needed.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left side: Pricing tiers */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Build Speed</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="mt-1 bg-violet-100 p-2 rounded-full">
                  <Clock className="text-violet-700" size={20} />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold flex items-center">
                    Free
                    <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">Standard</span>
                  </p>
                  <p className="text-gray-600">Delivered in 2 weeks</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="mt-1 bg-violet-100 p-2 rounded-full">
                  <Zap className="text-violet-700" size={20} />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">$100</p>
                  <p className="text-gray-600">Delivered in 5 days</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="mt-1 bg-violet-100 p-2 rounded-full">
                  <Zap className="text-violet-700" size={20} />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">$250</p>
                  <p className="text-gray-600">Delivered in 2 days</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4 p-4 rounded-lg bg-violet-50 hover:bg-violet-100 transition-colors">
                <div className="mt-1 bg-violet-200 p-2 rounded-full">
                  <Rocket className="text-violet-700" size={20} />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold flex items-center">
                    $500
                    <span className="ml-2 px-2 py-1 bg-violet-200 text-violet-700 text-xs rounded-full">Popular</span>
                  </p>
                  <p className="text-gray-600">Delivered in 24 hours</p>
                </div>
              </li>
            </ul>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-gray-500 text-sm">All plans include:</p>
              <ul className="mt-2 space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="text-green-500" size={16} />
                  <span>Full ownership of code</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="text-green-500" size={16} />
                  <span>Unlimited revisions</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="text-green-500" size={16} />
                  <span>Deploy-ready codebase</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Right side: CTA box */}
          <div className="bg-white rounded-xl p-8 shadow-xl border border-violet-100 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-violet-100 rounded-full -mr-20 -mt-20 opacity-60"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Secure Your Build Slot</h3>
                <p className="text-gray-600">Start building your product today</p>
              </div>
              
              <button 
                onClick={handleGetStarted}
                className="btn-glow w-full px-8 py-4 rounded-xl bg-violet-600 text-white font-bold 
                  hover:bg-violet-700 transition-all flex items-center justify-center gap-2 shadow-lg 
                  hover:shadow-violet-500/30 transform hover:-translate-y-1 text-lg mb-6"
              >
                Secure Your Build Slot
                <ArrowRight size={20} />
              </button>
              
              <div className="text-center text-sm text-gray-500 mb-6">
                Only 1,000 early builder spots available
              </div>
              
              <div className="bg-violet-50 rounded-lg p-4 text-center">
                <p className="text-violet-700 font-medium">
                  15 builders submitted this week
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    <img src="/placeholder.svg" alt="Founder" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left">
                    <p className="text-gray-900 font-medium">– John Doe</p>
                    <p className="text-gray-500 text-sm">Founder of Foundry OS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccess;
