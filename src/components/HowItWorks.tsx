import { useRef, useEffect } from "react";
import { MessageSquare, Code, LayoutList, Rocket } from "lucide-react";
const steps = [{
  id: 1,
  icon: MessageSquare,
  title: "Write a Prompt",
  description: "Describe your product idea in natural language, just like you'd explain it to a colleague.",
  example: "\"I need a project management app with task boards, time tracking, and team collaboration.\"",
  color: "violet"
}, {
  id: 2,
  icon: LayoutList,
  title: "Tasks Get Broken Down",
  description: "The AI breaks down your idea into comprehensive tasks and creates a detailed development plan.",
  example: "AI: \"I'll build user authentication, task board UI, backend APIs, and real-time collaboration...\"",
  color: "green"
}, {
  id: 3,
  icon: Code,
  title: "App Is Built",
  description: "Our AI executes each task with Lovable.dev, building a complete, working application.",
  example: "The AI writes code, tests functionality, and constantly improves based on your feedback.",
  color: "purple"
}, {
  id: 4,
  icon: Rocket,
  title: "Launch & Iterate",
  description: "Your finished product is deployed and ready to use. Iterate, improve, and scale as needed.",
  example: "Access your new app immediately and start using it – or request changes and improvements.",
  color: "orange"
}];
const HowItWorks = () => {
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
  return;
};
export default HowItWorks;