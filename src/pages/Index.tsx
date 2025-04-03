
import React from "react";
import TryFoundrySection from "@/components/try-foundry";
import EarlyAccess from "@/components/EarlyAccess";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <TryFoundrySection />
      <PricingSection />
      <EarlyAccess />
      <Footer />
    </>
  );
};

export default Index;
