
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    setIsSubmitting(true);
    
    try {
      // Store email in Supabase
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email }]);
      
      if (error) {
        if (error.code === '23505') { // Unique violation error code
          toast({
            title: "Already on the waitlist",
            description: "This email is already on our waitlist. Thank you for your interest!",
            variant: "default",
          });
        } else {
          console.error("Error submitting email:", error);
          toast({
            title: "Something went wrong",
            description: "Please try again later.",
            variant: "destructive",
          });
        }
        setIsSubmitting(false);
        return;
      }

      console.log("Email submitted to waitlist:", email);
      setEmail("");
      
      // Navigate to thank you page
      navigate("/early-access");
    } catch (error) {
      console.error("Error in submission:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          disabled={isSubmitting}
        />
        <Button 
          type="submit" 
          className={`btn-glow flex gap-2 ${variant === "hero" ? 
            "bg-violet-700 hover:bg-violet-600 h-12 px-6" : 
            "bg-violet-700 hover:bg-violet-600"}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : buttonText}
          <Rocket size={16} className={isSubmitting ? "" : "animate-bounce-subtle"} />
        </Button>
      </div>
      <p className="text-xs text-center sm:text-left mt-2 text-muted-foreground">
        No credit card required to join the waitlist
      </p>
    </form>
  );
};

export default EmailCapture;
