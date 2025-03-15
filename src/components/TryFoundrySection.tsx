
import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Paperclip, Plus, X } from "lucide-react";

const TryFoundrySection = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };
  
  const handleRemoveFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  }, []);
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim() && !uploadedFile) return;
    
    // Show thinking animation
    setIsThinking(true);
    
    // Redirect after a brief delay to simulate thinking
    setTimeout(() => {
      // Navigate to build page with prompt and file info
      navigate("/build", { 
        state: { 
          initialPrompt: prompt,
          hasAttachment: !!uploadedFile 
        } 
      });
    }, 1500);
  };
  
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-900 to-gray-950" />
      
      {/* Animated background effects */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_40%_at_50%_50%,rgba(155,135,245,0.12)_0%,transparent_100%)]" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>
      
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl md:text-4xl font-bold mb-3">Have an idea? Foundry can build it.</h2>
          <p className="text-muted-foreground">Start typing or upload your idea — no signup needed.</p>
        </div>
        
        <div className="max-w-2xl mx-auto transform hover:scale-[1.01] transition-all duration-300">
          <div className="relative group">
            {/* Glow Effect Border - only on focus */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-violet-400 rounded-xl blur-sm opacity-0 transition-opacity duration-300 group-focus-within:opacity-75"></div>
            
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl shadow-xl p-5 border border-gray-800">
              <form 
                onSubmit={handleSubmit} 
                className="relative"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xl">⚒️</span>
                  <span className="text-sm text-gray-400">Foundry AI</span>
                </div>
                
                <div className="relative">
                  <Input
                    ref={inputRef}
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="I want to build an app that helps creators..."
                    className="pr-24 py-6 text-base bg-gray-800/50 border-gray-700 focus-visible:ring-violet-500 focus-visible:border-violet-500 transition-shadow duration-300"
                    disabled={isThinking}
                  />
                  
                  <div className="absolute right-16 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-violet-400 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isThinking}
                      title="Attach a file"
                    >
                      <Paperclip size={16} />
                    </button>
                    
                    <button
                      type="button"
                      className="text-gray-400 hover:text-violet-400 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isThinking}
                      title="Upload your idea"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                    disabled={isThinking}
                  />
                  
                  <Button 
                    type="submit"
                    className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-violet-600 hover:bg-violet-700 transition-all ${isThinking ? 'opacity-70' : ''}`}
                    disabled={isThinking}
                  >
                    {isThinking ? (
                      <span className="px-2">
                        <span className="inline-flex space-x-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce animation-delay-200"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce animation-delay-400"></span>
                        </span>
                      </span>
                    ) : (
                      <>
                        Let's Build It <ArrowRight size={16} />
                      </>
                    )}
                  </Button>
                </div>
                
                {/* File upload preview */}
                {uploadedFile && (
                  <div className="mt-3 p-2 bg-gray-800/60 rounded-md flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Paperclip size={14} className="text-violet-400" />
                      <span className="text-sm text-gray-300 truncate max-w-[250px]">
                        {uploadedFile.name}
                      </span>
                    </div>
                    <button 
                      type="button" 
                      onClick={handleRemoveFile} 
                      className="text-gray-400 hover:text-gray-200"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
          
          {/* Loading indicator for transition */}
          {isThinking && (
            <div className="mt-4 text-center text-sm text-violet-400 animate-pulse">
              🛠️ Loading your build workspace...
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TryFoundrySection;
