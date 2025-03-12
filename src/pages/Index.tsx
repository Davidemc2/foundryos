
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import EarlyAccess from "@/components/EarlyAccess";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = "AIBuilder - Turn your idea into a product with AI";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
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
