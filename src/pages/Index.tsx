
import React from "react";
import TryFoundrySection from "@/components/try-foundry";
import EarlyAccess from "@/components/EarlyAccess";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Hero />
      <Features />
      <TryFoundrySection />
      <PricingSection />
      <EarlyAccess />
      <Footer />
    </>
  );
};

export default Index;
