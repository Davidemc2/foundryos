
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const TryFoundrySection = () => {
  const navigate = useNavigate();

  const handleLaunchChat = () => {
    navigate("/build");
  };

  return (
    <section className="py-12 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_40%_at_50%_50%,rgba(155,135,245,0.06)_0%,transparent_100%)]" />
      
      <div className="container-custom">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 bg-violet-100 p-3 rounded-full">
              <MessageSquare size={24} className="text-violet-600" />
            </div>
            <p className="text-lg font-medium text-gray-800">Got an idea? Start building it here →</p>
          </div>
          <Button 
            onClick={handleLaunchChat}
            className="w-full md:w-auto gap-2 bg-violet-600 hover:bg-violet-700 text-white shadow-md hover:shadow-violet-500/20 transition-all"
          >
            Launch Chat
            <MessageSquare size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TryFoundrySection;
