
import { ThankYouCard } from "@/components/chat/ThankYouCard";
import { useNavigate } from "react-router-dom";

const EarlyAccessConfirmation = () => {
  const navigate = useNavigate();
  
  const handleBackToHome = () => {
    navigate("/");
  };
  
  return <ThankYouCard onBackToHome={handleBackToHome} />;
};

export default EarlyAccessConfirmation;
