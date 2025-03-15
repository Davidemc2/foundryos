
import { ThankYouCard } from "@/components/chat/ThankYouCard";
import { useNavigate } from "react-router-dom";

const EarlyAccessConfirmation = () => {
  const navigate = useNavigate();
  
  const handleBackToHome = () => {
    navigate("/");
  };
  
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <ThankYouCard onBackToHome={handleBackToHome} />
    </div>
  );
};

export default EarlyAccessConfirmation;
