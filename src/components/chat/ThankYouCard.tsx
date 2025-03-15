
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";

interface ThankYouCardProps {
  onBackToHome: () => void;
}

export const ThankYouCard: React.FC<ThankYouCardProps> = ({ onBackToHome }) => {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-lg border-violet-500/20 bg-gray-900 text-white">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <div className="bg-violet-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <CheckCircle size={32} className="text-violet-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">✅ Build request received!</h2>
            <p className="text-gray-400">You'll hear from us soon with next steps for your project.</p>
          </div>
          
          <Button 
            type="button" 
            variant="outline" 
            className="w-full gap-2 border-gray-700 text-gray-300 hover:bg-gray-800"
            onClick={onBackToHome}
          >
            <ArrowLeft size={16} />
            Return to Homepage
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
