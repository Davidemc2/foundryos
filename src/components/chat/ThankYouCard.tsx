
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Calendar, Twitter, Linkedin } from "lucide-react";

interface ThankYouCardProps {
  onBackToHome: () => void;
}

export const ThankYouCard: React.FC<ThankYouCardProps> = ({ onBackToHome }) => {
  return (
    <Card className="max-w-xl w-full shadow-lg border-violet-500/20 bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <CardContent className="p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-violet-600 to-violet-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-3">You're In!</h2>
          <p className="text-gray-300 text-lg mb-6">You're on the list for early access to Foundry OS.</p>
          
          <div className="w-full bg-gray-800 h-2 rounded-full mb-6 overflow-hidden">
            <div className="bg-gradient-to-r from-violet-500 to-violet-700 h-full w-[30%] rounded-full"></div>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-sm text-violet-300 mb-8">
            <span className="inline-block w-2 h-2 bg-violet-500 rounded-full"></span>
            <span>30% of spots filled</span>
          </div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-6 mb-8 border border-gray-700/50">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-violet-100 flex-shrink-0 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="David Chen" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-gray-300 italic mb-3">
                "Thank you for joining our early access list! We're building Foundry with people like you in mind. 
                I'm personally excited to share our progress and get your feedback once we launch."
              </p>
              <p className="text-sm text-violet-300 font-medium">David Chen, Founder of Foundry OS</p>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-white font-medium mb-4 flex items-center">
            <Calendar size={18} className="mr-2 text-violet-400" />
            What happens next
          </h3>
          
          <div className="space-y-4 relative before:absolute before:left-[19px] before:top-1 before:h-full before:w-[2px] before:bg-gray-700">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-violet-600/20 flex items-center justify-center flex-shrink-0 z-10">
                <span className="text-violet-400 font-medium">1</span>
              </div>
              <div>
                <p className="text-white font-medium">We'll review your request</p>
                <p className="text-sm text-gray-400">Within 24-48 hours</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-violet-600/20 flex items-center justify-center flex-shrink-0 z-10">
                <span className="text-violet-400 font-medium">2</span>
              </div>
              <div>
                <p className="text-white font-medium">You'll receive an email invitation</p>
                <p className="text-sm text-gray-400">With your exclusive access code</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-violet-600/20 flex items-center justify-center flex-shrink-0 z-10">
                <span className="text-violet-400 font-medium">3</span>
              </div>
              <div>
                <p className="text-white font-medium">Start building with Foundry</p>
                <p className="text-sm text-gray-400">And bring your ideas to life</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col space-y-4">
          <div className="flex justify-center space-x-4 mb-2">
            <a href="https://twitter.com/foundryos" className="text-gray-400 hover:text-violet-400 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="https://linkedin.com/company/foundryos" className="text-gray-400 hover:text-violet-400 transition-colors">
              <Linkedin size={20} />
            </a>
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
        </div>
      </CardContent>
    </Card>
  );
};
