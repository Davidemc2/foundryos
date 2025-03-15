
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TryFoundrySection from "@/components/TryFoundrySection";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
import EarlyAccess from "@/components/EarlyAccess";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = "Foundry OS - Turn your idea into a product with AI";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <TryFoundrySection />
        <Features />
        <HowItWorks />
        <FAQ />
        <EarlyAccess />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
