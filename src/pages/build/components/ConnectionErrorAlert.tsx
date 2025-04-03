
import { AlertCircle, RefreshCw, Settings } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

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
  return (
    <Alert className="mb-4 border-red-600 bg-red-900/20 text-red-50">
      <AlertCircle className="h-4 w-4 mr-2" />
      <AlertDescription className="flex flex-col space-y-3">
        <div>
          <strong>Connection Error</strong>
          <p>{errorMessage}</p>
          {isApiKeyError && (
            <p className="text-sm mt-1">
              Please ask your administrator to check the OpenAI API key configuration in the Supabase Edge Function secrets.
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="destructive" onClick={onRetry} className="bg-red-700 hover:bg-red-800">
            <RefreshCw size={14} className="mr-2" />
            Try Again
          </Button>
          {isApiKeyError && (
            <a 
              href={`https://supabase.com/dashboard/project/jxvlovpsrsbxpxqvebii/settings/functions`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="border-red-600 text-red-50 hover:bg-red-800/30">
                <Settings size={14} className="mr-2" />
                Check API Keys
              </Button>
            </a>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};
