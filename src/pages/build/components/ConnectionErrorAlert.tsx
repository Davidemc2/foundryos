
import { AlertCircle, RefreshCw, Settings } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ConnectionErrorAlertProps {
  errorMessage: string;
  onRetry: () => void;
  isApiKeyError?: boolean;
}

export const ConnectionErrorAlert: React.FC<ConnectionErrorAlertProps> = ({ 
  errorMessage, 
  onRetry,
  isApiKeyError = false
}) => {
  const { toast } = useToast();
  
  const handleOpenSupabaseDashboard = () => {
    // Open Supabase dashboard in a new tab
    window.open('https://supabase.com/dashboard/project/jxvlovpsrsbxpxqvebii/settings/functions', '_blank');
    
    // Show toast with instructions
    toast({
      title: "Opening Supabase Dashboard",
      description: "Please add a valid OpenAI API key in your Edge Function secrets.",
    });
  };
  
  return (
    <Alert className="mb-4 border-red-600 bg-red-900/20 text-red-50">
      <AlertCircle className="h-4 w-4 mr-2" />
      <AlertDescription className="flex flex-col space-y-3">
        <div>
          <strong>Connection Error</strong>
          <p>{errorMessage}</p>
          {isApiKeyError && (
            <div className="text-sm mt-1 space-y-2">
              <p>
                The OpenAI API key appears to be invalid or missing. Please check the following:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your Supabase Edge Function has a valid OpenAI API key secret</li>
                <li>The API key starts with "sk-" and hasn't expired</li>
                <li>You have sufficient quota in your OpenAI account</li>
              </ul>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="destructive" onClick={onRetry} className="bg-red-700 hover:bg-red-800">
            <RefreshCw size={14} className="mr-2" />
            Try Again
          </Button>
          {isApiKeyError && (
            <Button 
              variant="outline" 
              className="border-red-600 text-red-50 hover:bg-red-800/30"
              onClick={handleOpenSupabaseDashboard}
            >
              <Settings size={14} className="mr-2" />
              Check API Keys
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};
