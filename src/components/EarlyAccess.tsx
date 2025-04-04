
import { useRef, useEffect, useState } from "react";
import EmailCapture from "./EmailCapture";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EarlyAccess = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("individual");

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
    <section id="early-access" ref={sectionRef} className="relative py-24 opacity-0 transition-opacity duration-1000 ease-out" style={{
      backgroundColor: "#4314A0"
    }}>
      {/* Background elements and gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.2)_0%,transparent_100%)]" />
      <div className="floating-element top-20 left-20 w-[200px] h-[200px] animate-float"></div>
      <div className="floating-element bottom-20 right-20 w-[300px] h-[300px] animate-float-slow"></div>
      
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12 mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Get Early Access to Foundry OS
          </h2>
          <p className="text-xl text-violet-100 mx-auto mb-6">
            Only 200 early builder spots available — secure yours now.
          </p>
          <p className="text-sm text-violet-200 italic mb-12">
            8 builders have joined the waitlist this week
          </p>
          
          <Tabs defaultValue="individual" className="max-w-lg mx-auto" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-10 bg-violet-800/30">
              <TabsTrigger value="individual" className="data-[state=active]:bg-violet-700">Individual</TabsTrigger>
              <TabsTrigger value="business" className="data-[state=active]:bg-violet-700">Business</TabsTrigger>
            </TabsList>
            
            <TabsContent value="individual" className="space-y-8 animate-fadeIn">
              <EmailCapture 
                placeholder="Your email address"
                buttonText="Get Early Access" 
                className="scale-110"
                variant="hero"
                collectMoreInfo={true}
              />
            </TabsContent>
            
            <TabsContent value="business" className="space-y-8 animate-fadeIn">
              <div className="text-white mb-4">
                <h3 className="text-xl font-semibold mb-2">Enterprise-ready solutions</h3>
                <p className="text-violet-200 text-sm">
                  Sign up for early access to Foundry OS for your business and get priority onboarding, dedicated support, and custom features.
                </p>
              </div>
              <EmailCapture 
                placeholder="Your work email"
                buttonText="Contact Sales" 
                className="scale-110"
                variant="hero"
                collectMoreInfo={true}
              />
            </TabsContent>
            
            <div className="flex items-center justify-center gap-4 animate-fadeIn animation-delay-400 mt-8">
              <div className="flex-1 h-[1px] bg-violet-300/20"></div>
              <span className="text-violet-200 text-sm font-medium">Limited Time Offer</span>
              <div className="flex-1 h-[1px] bg-violet-300/20"></div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 animate-fadeIn animation-delay-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-violet-100 text-sm">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-violet-100 text-sm">Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-violet-100 text-sm">24/7 support</span>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccess;
