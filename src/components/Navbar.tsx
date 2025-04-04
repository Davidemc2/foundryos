
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-8",
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm border-b border-gray-800/50"
          : "bg-transparent"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        <a 
          href="#top" 
          className="text-xl font-bold text-white flex items-center gap-2 z-50"
        >
          <span className="text-violet-500 text-2xl">●</span>
          Foundry OS<span className="text-violet-500">.</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#who" className="text-sm font-medium text-gray-300 hover:text-violet-400 transition-colors">
            Who it's for
          </a>
          <a href="#problem" className="text-sm font-medium text-gray-300 hover:text-violet-400 transition-colors">
            The Problem
          </a>
          <a href="#solution" className="text-sm font-medium text-gray-300 hover:text-violet-400 transition-colors">
            Our Solution
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-gray-300 hover:text-violet-400 transition-colors">
            How It Works
          </a>
          <a href="#faq" className="text-sm font-medium text-gray-300 hover:text-violet-400 transition-colors">
            FAQ
          </a>
        </nav>
        
        {/* CTA Button */}
        <a
          href="#early-access"
          className="btn-glow hidden md:flex px-4 py-2 rounded-full text-sm font-medium bg-violet-700 text-white hover:bg-violet-600 transition-all shadow-sm hover:shadow-violet-500/40 transform hover:scale-105"
        >
          Request Early Access
        </a>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden z-50 p-2 text-gray-300"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-background z-40 transition-transform duration-300 ease-in-out transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
          <div className="flex flex-col items-center justify-center h-full gap-8 text-center">
            <a 
              href="#who" 
              className="text-lg font-medium text-gray-300 hover:text-violet-400 transition-colors"
              onClick={closeMobileMenu}
            >
              Who it's for
            </a>
            <a 
              href="#problem" 
              className="text-lg font-medium text-gray-300 hover:text-violet-400 transition-colors"
              onClick={closeMobileMenu}
            >
              The Problem
            </a>
            <a 
              href="#solution" 
              className="text-lg font-medium text-gray-300 hover:text-violet-400 transition-colors"
              onClick={closeMobileMenu}
            >
              Our Solution
            </a>
            <a 
              href="#how-it-works" 
              className="text-lg font-medium text-gray-300 hover:text-violet-400 transition-colors"
              onClick={closeMobileMenu}
            >
              How It Works
            </a>
            <a 
              href="#faq" 
              className="text-lg font-medium text-gray-300 hover:text-violet-400 transition-colors"
              onClick={closeMobileMenu}
            >
              FAQ
            </a>
            <a
              href="#early-access"
              className="btn-glow px-6 py-3 rounded-full text-base font-medium bg-violet-700 text-white hover:bg-violet-600 transition-colors mt-4 shadow-sm hover:shadow-violet-500/40 transform hover:scale-105"
              onClick={closeMobileMenu}
            >
              Request Early Access
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
