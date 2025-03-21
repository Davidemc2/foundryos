
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TryFoundrySection from "@/components/TryFoundrySection";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
import EarlyAccess from "@/components/EarlyAccess";
import Footer from "@/components/Footer";
import FounderStory from "@/components/FounderStory";

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
        <FounderStory />
        <Features />
        <TryFoundrySection />
        <FAQ />
        <EarlyAccess />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
