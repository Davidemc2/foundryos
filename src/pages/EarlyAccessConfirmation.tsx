
import { ThankYouCard } from "@/components/chat/ThankYouCard";
import { useNavigate } from "react-router-dom";

const EarlyAccessConfirmation = () => {
  const navigate = useNavigate();
  
  const handleBackToHome = () => {
    navigate("/");
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-gray-950">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_40%_at_50%_50%,rgba(155,135,245,0.12)_0%,transparent_100%)]" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>
      
      <ThankYouCard onBackToHome={handleBackToHome} />
    </div>
  );
};

export default EarlyAccessConfirmation;
