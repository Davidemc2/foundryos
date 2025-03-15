
import { useRef, useEffect } from "react";
import { ArrowRight, CheckCircle, Rocket } from "lucide-react";

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
            Only 1000 early builder spots available — secure yours now.
          </p>
          <p className="text-sm text-violet-200 italic animate-pulse">
            15 builders have submitted ideas this week
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left side: Value points */}
          <div className="bg-violet-800/30 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">Build Your Product Fast</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="text-green-400 mr-3 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-white font-semibold">Free 7-day build</p>
                  <p className="text-violet-200 text-sm">Standard build timeline, perfect for most ideas</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-green-400 mr-3 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-white font-semibold">$250 2-day fast build</p>
                  <p className="text-violet-200 text-sm">Priority processing for urgent projects</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-green-400 mr-3 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-white font-semibold">Unlimited iterations</p>
                  <p className="text-violet-200 text-sm">Refine your product until it's perfect</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-green-400 mr-3 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-white font-semibold">Full source code ownership</p>
                  <p className="text-violet-200 text-sm">You own everything Foundry builds for you</p>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Right side: CTA box */}
          <div className="bg-white rounded-xl p-8 shadow-2xl hover:shadow-violet-500/20 transition-all duration-300 transform hover:scale-[1.02]">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Secure Your Spot</h3>
              <div className="mb-6">
                <p className="text-lg text-gray-600 mb-2">Founder pricing available to first 200 users</p>
                <div className="inline-block px-4 py-2 rounded-full bg-violet-100 text-violet-800 font-bold">
                  Limited Time Offer
                </div>
              </div>
              
              <a 
                href="https://form.typeform.com/to/qIqMaEXU" 
                className="btn-glow w-full px-8 py-4 rounded-xl bg-violet-700 text-white font-bold 
                  hover:bg-violet-600 transition-all flex items-center justify-center gap-2 shadow-lg 
                  hover:shadow-violet-500/40 transform hover:-translate-y-1 text-lg mb-4"
              >
                Get Early Access
                <Rocket size={20} className="animate-bounce-subtle" />
              </a>
              
              <p className="text-sm text-gray-500">No credit card required to join the waitlist</p>
              
              <div className="mt-6 text-center">
                <a href="#pledge-support" className="text-violet-600 hover:text-violet-700 text-sm">
                  Or pledge support for the project <ArrowRight size={12} className="inline" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccess;
