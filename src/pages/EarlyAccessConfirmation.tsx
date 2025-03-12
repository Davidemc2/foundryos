
import { useEffect } from "react";
import { Check, Lock, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const EarlyAccessConfirmation = () => {
  useEffect(() => {
    document.title = "Early Access Confirmation - Foundry OS";
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl animate-fadeIn">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Confirmation Column */}
          <div className="bg-background/50 p-8 rounded-2xl border border-violet-500/20 backdrop-blur-sm animate-slideUp">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Check className="w-6 h-6 text-emerald-500" />
              </div>
              <h2 className="text-3xl font-bold text-white">You're In.</h2>
            </div>
            <p className="text-lg text-muted-foreground">
              You've joined Foundry OS early access. We'll notify you as soon as we launch.
            </p>
          </div>

          {/* Upgrade Column */}
          <div className="glass-card bg-violet-900/20 p-8 rounded-2xl border border-violet-500/20 backdrop-blur-sm animate-slideUp animation-delay-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center">
                <Lock className="w-6 h-6 text-violet-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">Secure Founder Pricing</h2>
            </div>
            <p className="text-lg text-muted-foreground mb-2">
              Founders get unlimited monthly usage for just $50/month. No charge today — this reserves your access.
            </p>
            <p className="text-sm text-violet-400 mb-8">
              Limited to the first 1,000 users.
            </p>
            
            <a 
              href="https://yourcompany.typeform.com/pledge-support" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-glow w-full px-6 py-4 rounded-xl bg-violet-700 text-white font-bold 
                hover:bg-violet-600 transition-all flex items-center justify-center gap-2 
                shadow-lg hover:shadow-violet-500/40 transform hover:-translate-y-1 mb-6"
            >
              Secure My Spot
              <Lock size={18} />
            </a>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Shield size={16} className="text-emerald-400" />
              <p>100% secure. You'll be contacted before any billing occurs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarlyAccessConfirmation;
