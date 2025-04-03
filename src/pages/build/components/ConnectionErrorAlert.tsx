
import { AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ConnectionErrorAlertProps {
  errorMessage: string;
  onRetry: () => void;
}

export const ConnectionErrorAlert: React.FC<ConnectionErrorAlertProps> = ({ 
  errorMessage, 
  onRetry 
}) => {
  return (
    <Alert className="mb-4 border-red-600 bg-red-900/20 text-red-50">
      <AlertCircle className="h-4 w-4 mr-2" />
      <AlertDescription className="flex items-center justify-between">
        <div>
          <strong>Connection Error</strong>
          <p>{errorMessage}</p>
        </div>
        <Button variant="destructive" onClick={onRetry} className="ml-2 bg-red-700 hover:bg-red-800">
          <RefreshCw size={14} className="mr-2" />
          Try Again
        </Button>
      </AlertDescription>
    </Alert>
  );
};
