
import { useEffect, useState } from "react";
import { ThankYouCard } from "@/components/chat/ThankYouCard";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LoaderCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const EarlyAccessConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [loading, setLoading] = useState(true);
  const [waitlistPosition, setWaitlistPosition] = useState<number | null>(null);
  const [referralCode, setReferralCode] = useState<string>("");
  
  useEffect(() => {
    // If no email is provided, redirect to homepage
    if (!email) {
      navigate("/");
      return;
    }

    const fetchWaitlistInfo = async () => {
      try {
        // Get total count of waitlist entries to calculate position
        const { count: totalCount } = await supabase
          .from('waitlist')
          .select('*', { count: 'exact', head: true });
          
        // Get the user's entry to check creation time
        const { data: userData } = await supabase
          .from('waitlist')
          .select('created_at')
          .eq('email', email)
          .single();
          
        if (userData) {
          // Count entries created before this user's entry
          const { count: positionCount } = await supabase
            .from('waitlist')
            .select('*', { count: 'exact', head: true })
            .lt('created_at', userData.created_at);
            
          setWaitlistPosition(positionCount ? positionCount + 1 : 1);
          
          // Generate a unique referral code for this user
          const code = `FOUNDRY${Math.floor(Math.random() * 10000)}`;
          setReferralCode(code);
        }
      } catch (error) {
        console.error("Error fetching waitlist info:", error);
        toast({
          title: "Something went wrong",
          description: "We couldn't retrieve your waitlist position.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWaitlistInfo();
  }, [email, navigate]);
  
  const handleBackToHome = () => {
    navigate("/");
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-gray-950">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(139,92,246,0.15)_0%,transparent_100%)]" />
        <LoaderCircle className="h-10 w-10 text-violet-500 animate-spin mb-4" />
        <p className="text-violet-200">Loading your confirmation...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-gray-950">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(139,92,246,0.15)_0%,transparent_100%)]" />
      <div className="absolute top-20 left-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl max-h-3xl opacity-20 bg-[radial-gradient(circle,rgba(139,92,246,0.2)_0%,transparent_70%)]"></div>
      
      <ThankYouCard 
        onBackToHome={handleBackToHome} 
        email={email} 
        waitlistPosition={waitlistPosition}
        referralCode={referralCode}
      />
    </div>
  );
};

export default EarlyAccessConfirmation;
