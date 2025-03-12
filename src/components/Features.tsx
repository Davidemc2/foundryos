import { ArrowRight, Code, Rocket, Users, X, Check, AlertTriangle, GitMerge, RefreshCcw, Layers, Bug, BarChart, Zap, Cloud, Terminal, Brain, Cpu, Workflow } from "lucide-react";
import { useEffect, useRef } from "react";

const FeatureSection = ({ 
  id, 
  icon: Icon, 
  title, 
  description, 
  children,
  bgClass = ""
}: { 
  id: string;
  icon: any;
  title: string;
  description: string;
  children: React.ReactNode;
  bgClass?: string;
}) => {
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
      id={id} 
      ref={sectionRef}
      className={`py-20 md:py-28 opacity-0 transition-opacity duration-1000 ease-out ${bgClass} relative`}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_40%_at_50%_50%,hsl(var(--primary)/0.08)_0%,transparent_100%)]" />
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-violet-900/80 text-violet-200 mb-6">
            <Icon size={24} />
          </div>
          <h2 className="heading-lg mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>
        
        {children}
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <>
      <FeatureSection
        id="who"
        icon={Users}
        title="Who it's for"
        description="Made specifically for those building with limited resources and big ambitions."
        bgClass="section-dark"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Solo Founders",
              description: "Turn your vision into reality without needing a technical team to execute it.",
              cta: "Build without hiring devs"
            },
            {
              title: "Indie Hackers",
              description: "Build and iterate faster than ever, with an AI partner that understands product development.",
              cta: "Ship your side project in days, not months"
            },
            {
              title: "Lean Startups",
              description: "Maximize your runway by automating development and focusing on what matters most.",
              cta: "Extend your team with AI"
            }
          ].map((item, i) => (
            <div 
              key={i} 
              className="white-card p-6 hover:shadow-xl transition-all group transform hover:-translate-y-1 hover:scale-[1.01]"
            >
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <p className="text-sm font-medium text-violet-600 flex items-center">
                {item.cta}
                <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
              </p>
            </div>
          ))}
        </div>
      </FeatureSection>
      
      <div className="section-light">
        <FeatureSection
          id="problem"
          icon={AlertTriangle}
          title="The Problem vs The Solution"
          description="AI tools and no-code builders still require significant manual effort."
          bgClass="section-light"
        >
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            <div className="white-card rounded-xl p-8 border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 hover:scale-[1.01] bg-gray-50">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-red-500">The Problem</h3>
              <p className="text-gray-700 mb-8 text-center font-medium">
                AI tools don't manage projects. No-code is still manual. Time is wasted.
              </p>
              
              <ul className="space-y-5">
                {[
                  {
                    icon: AlertTriangle,
                    text: "AI tools generate code snippets, not full applications"
                  },
                  {
                    icon: GitMerge,
                    text: "Manual integration between different parts of your product"
                  },
                  {
                    icon: RefreshCcw,
                    text: "Limited context leads to inconsistent development"
                  },
                  {
                    icon: Layers,
                    text: "No continuous iteration based on feedback"
                  },
                  {
                    icon: Bug,
                    text: "Building a real product requires dozens of manual steps"
                  }
                ].map((item, i) => (
                  <li 
                    key={i} 
                    className="problem-item flex items-start opacity-0 animate-fadeIn"
                    style={{ animationDelay: `${i * 200}ms` }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center mr-4 mt-0.5 hover:scale-110 transition-transform">
                      <item.icon size={20} className="stroke-[2.5]" />
                    </div>
                    <p className="text-gray-700 text-lg">{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="dark-glass-card rounded-xl p-6 border border-gray-200/50">
              <h3 className="heading-sm mb-4 text-center text-green-500">The Solution</h3>
              <p className="text-gray-700 mb-6 text-center font-medium">
                An artificial intelligence project manager that builds for you, from start to finish.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Complete end-to-end project management",
                  "Automatic integration of all components",
                  "AI maintains full context across your entire project",
                  "Continuous improvement based on your feedback",
                  "One AI builds your entire product, from start to finish"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-500 flex items-center justify-center mr-3 mt-0.5">
                      <Check size={14} className="stroke-[3]" />
                    </div>
                    <p className="text-gray-700">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FeatureSection>
      </div>
      
      <FeatureSection
        id="solution"
        icon={Rocket}
        title="Our Solution"
        description="A complete AI project manager that turns your idea into a finished product without the manual work."
        bgClass="section-dark"
      >
        {/* Redesigned Solution Section with 3 vertically stacked cards */}
        <div className="flex flex-col md:flex-row gap-6">
          {[
            {
              icon: Brain,
              title: "Automated Planning",
              benefit: "Your app is broken into build-ready tasks instantly"
            },
            {
              icon: Cpu,
              title: "Smart Development",
              benefit: "AI writes, tests, and refines your entire codebase"
            },
            {
              icon: Workflow,
              title: "Instant Deployment",
              benefit: "Your product is deployed and ready to use immediately"
            }
          ].map((feature, i) => (
            <div 
              key={i}
              className="flex flex-col glass-card p-8 rounded-xl border border-violet-800/30 opacity-0 animate-slideUp"
              style={{ animationDelay: `${i * 200}ms` }}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-violet-900/80 text-violet-200 flex items-center justify-center mb-6 mx-auto">
                <feature.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 text-center">{feature.title}</h3>
              <p className="text-gray-300 text-lg text-center">{feature.benefit}</p>
            </div>
          ))}
        </div>
      </FeatureSection>
    </>
  );
};

export default Features;
