
import { useEffect, useState } from "react";

interface AnimatedPlaceholderProps {
  placeholders: string[];
  onComplete?: () => void;
}

export const AnimatedPlaceholder: React.FC<AnimatedPlaceholderProps> = ({ 
  placeholders,
  onComplete 
}) => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Effect for the auto-typing animation
  useEffect(() => {
    const typingSpeed = 70; // ms per character
    const deletingSpeed = 30; // ms per character
    const pauseBetweenPhrases = 1500; // ms to wait after typing
    
    let timeout: number;
    
    if (!isDeleting && charIndex < placeholders[placeholderIndex].length) {
      // Still typing the current placeholder
      timeout = window.setTimeout(() => {
        setCurrentPlaceholder(placeholders[placeholderIndex].substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, typingSpeed);
    } else if (!isDeleting && charIndex >= placeholders[placeholderIndex].length) {
      // Finished typing, pause before deleting
      timeout = window.setTimeout(() => {
        setIsDeleting(true);
      }, pauseBetweenPhrases);
    } else if (isDeleting && charIndex > 0) {
      // Deleting the current placeholder
      timeout = window.setTimeout(() => {
        setCurrentPlaceholder(placeholders[placeholderIndex].substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, deletingSpeed);
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting, move to next placeholder
      setIsDeleting(false);
      setPlaceholderIndex((placeholderIndex + 1) % placeholders.length);
      
      if (onComplete && placeholderIndex === placeholders.length - 1) {
        onComplete();
      }
    }
    
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, placeholderIndex, placeholders, onComplete]);
  
  return { currentPlaceholder };
};
