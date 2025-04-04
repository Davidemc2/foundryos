
import { useEffect, useRef } from "react";

interface FeatureSectionProps {
  id: string;
  icon?: any; // Make icon optional
  title: string;
  description?: string; // Make description optional
  children: React.ReactNode;
  bgClass?: string;
}

const FeatureSection = ({ 
  id, 
  icon: Icon, 
  title, 
  description, 
  children,
  bgClass = ""
}: FeatureSectionProps) => {
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
      className={`py-10 md:py-14 opacity-0 transition-opacity duration-1000 ease-out ${bgClass} relative overflow-hidden`}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_40%_at_50%_50%,hsl(var(--primary)/0.08)_0%,transparent_100%)]" />
      <div className="container-custom relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          {Icon && (
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-violet-900/80 text-violet-200 mb-6">
              <Icon size={24} />
            </div>
          )}
          <h2 className="heading-lg mb-4">{title}</h2>
          {description && <p className="text-lg text-muted-foreground">{description}</p>}
        </div>
        
        {children}
      </div>
    </section>
  );
};

export default FeatureSection;
