
import { useState, useRef, useEffect } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What platforms can you build on?",
    answer: "Our AI can build web applications, mobile-responsive web apps, and APIs. We use modern frameworks and technologies to ensure your product is fast, responsive, and scalable."
  },
  {
    question: "Can I customize the app after it's built?",
    answer: "Absolutely! You'll have complete access to the codebase. You can make changes yourself, have our AI make further modifications, or bring in your own development team."
  },
  {
    question: "How long does it take to build an app?",
    answer: "The timeline depends on the complexity of your idea, but our AI works significantly faster than traditional development. Simple apps can be ready in hours, while more complex products might take days instead of weeks or months."
  },
  {
    question: "Do I own the intellectual property?",
    answer: "Yes, you own 100% of the intellectual property for any app created using our platform. We retain no rights to your code or business idea."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
  
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section 
      id="faq" 
      ref={sectionRef}
      className="py-20 opacity-0 transition-opacity duration-1000 ease-out section-dark relative"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_40%_at_50%_50%,hsl(var(--primary)/0.08)_0%,transparent_100%)]" />
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">
            Common questions about our AI-powered development process
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="white-card overflow-hidden border border-gray-200/10 hover:border-violet-100/30 transition-colors"
            >
              <button
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                onClick={() => toggleFaq(index)}
              >
                <h3 className="font-medium text-lg text-gray-800">{faq.question}</h3>
                <div className="flex-shrink-0 ml-4">
                  {openIndex === index ? (
                    <Minus size={18} className="text-violet-600" />
                  ) : (
                    <Plus size={18} className="text-gray-500" />
                  )}
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 pt-0 text-gray-600">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
