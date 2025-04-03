
import { ThankYouCard } from "@/components/chat/ThankYouCard";
import { useNavigate, useLocation } from "react-router-dom";

const EarlyAccessConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  
  const handleBackToHome = () => {
    navigate("/");
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-gray-950">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(139,92,246,0.15)_0%,transparent_100%)]" />
      <div className="absolute top-20 left-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl max-h-3xl opacity-20 bg-[radial-gradient(circle,rgba(139,92,246,0.2)_0%,transparent_70%)]"></div>
      
      <ThankYouCard onBackToHome={handleBackToHome} email={email} />
    </div>
  );
};

export default EarlyAccessConfirmation;
