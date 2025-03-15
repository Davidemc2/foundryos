
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { Link } from "react-router-dom";

type EmailCaptureProps = {
  buttonText?: string;
  placeholder?: string;
  className?: string;
  variant?: "default" | "hero";
};

const EmailCapture = ({ 
  buttonText = "Get Early Access", 
  placeholder = "Enter your email to join the waitlist", 
  className = "",
  variant = "default"
}: EmailCaptureProps) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    // In a real app, we'd send this to a server
    console.log("Email submitted:", email);
    setSubmitted(true);
    setEmail("");
    
    // Navigate to thank you page
    window.location.href = "/early-access-confirmation";
  };

  if (submitted) {
    return (
      <div className={`text-center p-4 ${className}`}>
        <p className="text-green-500 font-medium mb-2">Thanks for joining our waitlist!</p>
        <p className="text-sm text-muted-foreground">We'll notify you when early access is available.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`${className} ${variant === "hero" ? "max-w-md mx-auto" : ""}`}>
      <div className={`flex flex-col sm:flex-row gap-3 ${variant === "hero" ? "justify-center" : ""}`}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className={`${variant === "hero" ? "h-12" : ""}`}
          required
        />
        <Button 
          type="submit" 
          className={`btn-glow flex gap-2 ${variant === "hero" ? 
            "bg-violet-700 hover:bg-violet-600 h-12 px-6" : 
            "bg-violet-700 hover:bg-violet-600"}`}
        >
          {buttonText}
          <Rocket size={16} className="animate-bounce-subtle" />
        </Button>
      </div>
      <p className="text-xs text-center sm:text-left mt-2 text-muted-foreground">
        No credit card required to join the waitlist
      </p>
    </form>
  );
};

export default EmailCapture;
