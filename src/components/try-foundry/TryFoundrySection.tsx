
import { useEffect } from "react";
import { Container } from "./Container";
import { AnimatedPlaceholder } from "./AnimatedPlaceholder";
import { FoundryPromptForm } from "./FoundryPromptForm";

const TryFoundrySection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-900 to-gray-950" />
      
      {/* Animated background effects */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_40%_at_50%_50%,rgba(155,135,245,0.12)_0%,transparent_100%)]" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>
      
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Start building with Foundry AI</h2>
          <p className="text-muted-foreground">Describe your app idea, and we'll help you build it.</p>
        </div>
        
        <div className="max-w-2xl mx-auto transform hover:scale-[1.01] transition-all duration-300">
          <FoundryPromptForm />
        </div>
      </Container>
    </section>
  );
};

export default TryFoundrySection;
