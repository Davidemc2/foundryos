
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Calendar, Twitter, Linkedin, Share2 } from "lucide-react";

interface ThankYouCardProps {
  onBackToHome: () => void;
}

export const ThankYouCard: React.FC<ThankYouCardProps> = ({ onBackToHome }) => {
  return (
    <Card className="max-w-2xl w-full shadow-xl border-violet-500/20 bg-gradient-to-b from-gray-900 to-gray-950 text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-violet-600"></div>
      <CardContent className="p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-violet-600 to-violet-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-500/20 animate-bounce-subtle">
            <CheckCircle size={48} className="text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">You're In!</h2>
          <p className="text-gray-300 text-lg mb-6 max-w-lg mx-auto">You're on the list for early access to Foundry OS. We'll notify you as soon as your spot is ready.</p>
          
          <div className="w-full bg-gray-800/80 h-3 rounded-full mb-6 overflow-hidden p-0.5">
            <div className="bg-gradient-to-r from-violet-500 to-purple-600 h-full w-[30%] rounded-full animate-pulse-slow"></div>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-sm md:text-base text-violet-300 mb-8">
            <span className="inline-block w-2.5 h-2.5 bg-violet-500 rounded-full"></span>
            <span>30% of spots filled</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 rounded-lg p-6 mb-8 border border-gray-700/50 shadow-inner">
          <div className="flex flex-col md:flex-row items-start gap-5">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-violet-100 flex-shrink-0 overflow-hidden border-2 border-violet-300 shadow-md mx-auto md:mx-0">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="David Edwards" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-gray-200 italic mb-4 text-base md:text-lg leading-relaxed">
                "Thank you for joining our early access program! We're building Foundry with visionaries like you in mind. 
                I'm personally excited to share our progress with you and can't wait to see what you'll build with our platform."
              </p>
              <p className="text-sm md:text-base text-violet-300 font-medium">David Edwards, Founder of Foundry OS</p>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-white font-medium mb-4 flex items-center text-lg">
            <Calendar size={20} className="mr-2 text-violet-400" />
            What happens next
          </h3>
          
          <div className="space-y-5 relative before:absolute before:left-[19px] before:top-1 before:h-[calc(100%-10px)] before:w-[2px] before:bg-gradient-to-b before:from-violet-500 before:to-violet-800/30">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-violet-600/30 flex items-center justify-center flex-shrink-0 z-10 border border-violet-500/30 shadow-sm">
                <span className="text-violet-300 font-semibold">1</span>
              </div>
              <div>
                <p className="text-white font-medium">We'll review your request</p>
                <p className="text-sm text-gray-400">Within 24-48 hours</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-violet-600/30 flex items-center justify-center flex-shrink-0 z-10 border border-violet-500/30 shadow-sm">
                <span className="text-violet-300 font-semibold">2</span>
              </div>
              <div>
                <p className="text-white font-medium">You'll receive an email invitation</p>
                <p className="text-sm text-gray-400">With your exclusive access code</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-violet-600/30 flex items-center justify-center flex-shrink-0 z-10 border border-violet-500/30 shadow-sm">
                <span className="text-violet-300 font-semibold">3</span>
              </div>
              <div>
                <p className="text-white font-medium">Start building with Foundry</p>
                <p className="text-sm text-gray-400">And bring your ideas to life</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col space-y-4">
          <div className="flex justify-center space-x-6 mb-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-violet-400 hover:bg-violet-500/10 transition-colors rounded-full w-10 h-10"
              onClick={() => {
                window.open("https://twitter.com/intent/tweet?text=I just joined the Foundry OS early access list! Can't wait to start building. %23FoundryOS", "_blank");
              }}
            >
              <Twitter size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-violet-400 hover:bg-violet-500/10 transition-colors rounded-full w-10 h-10"
              onClick={() => {
                window.open("https://linkedin.com/company/foundryos", "_blank");
              }}
            >
              <Linkedin size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-violet-400 hover:bg-violet-500/10 transition-colors rounded-full w-10 h-10"
              onClick={() => {
                navigator.clipboard.writeText("Check out Foundry OS - the platform for building powerful AI applications: https://foundryos.com");
                alert("Link copied to clipboard!");
              }}
            >
              <Share2 size={20} />
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full gap-2 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition-all mt-2"
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
