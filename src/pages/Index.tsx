import React from "react";
import TryFoundrySection from "@/components/try-foundry";
import EarlyAccessSection from "@/components/EarlyAccessSection";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TryFoundrySection />
      <PricingSection />
      <EarlyAccessSection />
      <Footer />
    </>
  );
};

export default Index;
