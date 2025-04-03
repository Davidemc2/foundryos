
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type EmailCaptureProps = {
  buttonText?: string;
  placeholder?: string;
  className?: string;
  variant?: "default" | "hero";
  collectMoreInfo?: boolean;
};

const EmailCapture = ({ 
  buttonText = "Get Early Access", 
  placeholder = "Your email address", 
  className = "",
  variant = "default",
  collectMoreInfo = false
}: EmailCaptureProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [interest, setInterest] = useState<string>("developer");
  const [acceptUpdates, setAcceptUpdates] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [stage, setStage] = useState<"email" | "details">(collectMoreInfo ? "email" : "email");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !validateEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    if (collectMoreInfo && stage === "email") {
      setStage("details");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Additional user data to store
      const userData = {
        email,
        ...(name ? { name } : {}),
        ...(interest ? { interest_area: interest } : {}),
        accept_marketing: acceptUpdates,
        source: window.location.pathname,
        referrer: document.referrer || "direct",
        utm_source: new URLSearchParams(window.location.search).get("utm_source") || null
      };
      
      // Store email and additional data in Supabase
      const { error } = await supabase
        .from('waitlist')
        .insert([userData]);
      
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
      
      // Track conversion event
      try {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'waitlist_signup', {
            'event_category': 'engagement',
            'event_label': interest || 'not specified'
          });
        }
      } catch (trackingError) {
        console.error("Error tracking conversion:", trackingError);
      }
      
      setEmail("");
      setName("");
      
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

  // Reset to email stage if going back to just collecting email
  if (!collectMoreInfo && stage === "details") {
    setStage("email");
  }

  return (
    <form onSubmit={handleSubmit} className={`${className} ${variant === "hero" ? "max-w-md mx-auto" : ""}`}>
      <div className={`${stage === "details" && collectMoreInfo ? "space-y-4" : "flex flex-col sm:flex-row gap-3"} ${variant === "hero" ? "justify-center" : ""}`}>
        {/* Email Input Stage */}
        {stage === "email" && (
          <>
            <div className={`relative ${variant === "hero" ? "w-full" : ""}`}>
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-violet-600 via-purple-500 to-violet-400 rounded-md blur-sm animate-glow-pulse ${isFocused ? 'opacity-80' : 'opacity-30'}`}></div>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                className={`relative bg-background border-violet-400/20 focus:border-violet-400 focus:ring-1 focus:ring-violet-400/50 ${variant === "hero" ? "h-12" : ""}`}
                required
                disabled={isSubmitting}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>
            <Button 
              type={collectMoreInfo ? "button" : "submit"}
              onClick={collectMoreInfo ? () => validateEmail(email) && setStage("details") : undefined}
              className={`btn-glow flex gap-2 ${variant === "hero" ? 
                "bg-violet-700 hover:bg-violet-600 hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.7)] h-12 px-6" : 
                "bg-violet-700 hover:bg-violet-600 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]"}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : collectMoreInfo ? "Continue" : buttonText}
              <Rocket size={16} className={isSubmitting ? "" : "animate-bounce-subtle"} />
            </Button>
          </>
        )}
        
        {/* Details Stage */}
        {stage === "details" && collectMoreInfo && (
          <div className="space-y-4 animate-fade-in bg-gray-900/50 p-4 rounded-lg border border-violet-500/20">
            <h3 className="text-violet-200 font-medium">Just a few more details</h3>
            
            <div className="space-y-2">
              <Label htmlFor="name" className="text-violet-200">Your Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="bg-background/70 border-violet-400/20 focus:border-violet-400"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="interest" className="text-violet-200">I'm interested as a...</Label>
              <Select value={interest} onValueChange={setInterest}>
                <SelectTrigger className="bg-background/70 border-violet-400/20 focus:border-violet-400">
                  <SelectValue placeholder="Select your interest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="founder">Founder/Entrepreneur</SelectItem>
                  <SelectItem value="business">Business Professional</SelectItem>
                  <SelectItem value="investor">Investor</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox 
                id="accept-updates" 
                checked={acceptUpdates}
                onCheckedChange={(checked) => setAcceptUpdates(checked as boolean)}
                className="border-violet-400/40 data-[state=checked]:bg-violet-600"
              />
              <Label htmlFor="accept-updates" className="text-sm text-violet-200">
                Keep me updated about Foundry OS and related news
              </Label>
            </div>
            
            <div className="flex gap-2 pt-2">
              <Button 
                type="button"
                variant="outline"
                onClick={() => setStage("email")}
                className="flex-1 border-violet-500/20 text-violet-300 hover:text-violet-100 hover:bg-violet-900/50"
              >
                Back
              </Button>
              <Button 
                type="submit" 
                className="flex-1 btn-glow gap-2 bg-violet-700 hover:bg-violet-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : buttonText}
                <Rocket size={16} className={isSubmitting ? "" : "animate-bounce-subtle"} />
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {stage === "email" && (
        <p className="text-xs text-center sm:text-left mt-2 text-muted-foreground">
          We'll only contact you when your build is ready — no spam.
        </p>
      )}
    </form>
  );
};

export default EmailCapture;
