import { useEffect, useRef } from "react";
interface FeatureSectionProps {
  id: string;
  icon: any;
  title: string;
  description: string;
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
  return <section id={id} ref={sectionRef} className={`py-20 md:py-28 opacity-0 transition-opacity duration-1000 ease-out ${bgClass} relative`}>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_40%_at_50%_50%,hsl(var(--primary)/0.08)_0%,transparent_100%)]" />
      <div className="container-custom">
        
        
        {children}
      </div>
    </section>;
};
export default FeatureSection;