
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-8",
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        <a 
          href="#" 
          className="text-xl font-bold text-foreground flex items-center gap-2"
        >
          <span className="text-blue-600 text-2xl">●</span>
          AIBuilder
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#who" className="text-sm font-medium text-foreground/80 hover:text-blue-600 transition-colors">
            Who it's for
          </a>
          <a href="#problem" className="text-sm font-medium text-foreground/80 hover:text-blue-600 transition-colors">
            The Problem
          </a>
          <a href="#solution" className="text-sm font-medium text-foreground/80 hover:text-blue-600 transition-colors">
            Our Solution
          </a>
        </nav>
        
        <a
          href="#early-access"
          className="px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
        >
          Join Early Access
        </a>
      </div>
    </header>
  );
};

export default Navbar;
