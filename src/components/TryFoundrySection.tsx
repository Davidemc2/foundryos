
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, FileUp, Zap, List, DollarSign, Mail } from "lucide-react";

interface TaskItem {
  id: number;
  title: string;
  description: string;
}

const TryFoundrySection = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{
    scope: string;
    tasks: TaskItem[];
    estimate: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);

    // Simulate API response with setTimeout
    setTimeout(() => {
      const mockResult = {
        scope: `Your ${prompt.split(" ").slice(0, 3).join(" ")}... app will feature a responsive design with user authentication, data storage, and a clean interface. We'll implement core functionality first, then add advanced features in subsequent iterations.`,
        tasks: [
          {
            id: 1,
            title: "User Authentication System",
            description: "Login, signup, password reset flows with secure token-based authentication."
          },
          {
            id: 2, 
            title: "Core Functionality Implementation",
            description: "Building the primary features described in your idea, including database integration."
          },
          {
            id: 3,
            title: "Responsive UI Design",
            description: "Creating a modern, mobile-first interface that works across all devices."
          },
          {
            id: 4,
            title: "Testing & QA",
            description: "Comprehensive testing to ensure functionality works as expected."
          }
        ],
        estimate: "$3,200 - $4,800"
      };

      setResult(mockResult);
      setIsGenerating(false);
    }, 1500);
  };

  const handleSendToBuilder = () => {
    alert("Feature coming soon! Your project details would be sent to our team.");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This would handle file uploads in a real implementation
    console.log("File selected:", e.target.files);
  };

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_40%_at_50%_50%,rgba(155,135,245,0.06)_0%,transparent_100%)]" />
      
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="heading-md text-gray-900 mb-2">Try Foundry Instantly</h2>
          <p className="text-gray-600 text-lg">Turn your idea into a scoped build — no signup needed.</p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-lg border-gray-200">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="prompt" className="sr-only">App Idea</Label>
                <Textarea 
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your app idea or what you want to build…"
                  className="min-h-24 w-full text-base border-gray-300 focus:border-violet-500 resize-none"
                />
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FileUp size={16} />
                <Label htmlFor="file-upload" className="cursor-pointer hover:text-violet-600 transition-colors">
                  Attach screenshots or documents (optional)
                </Label>
                <Input 
                  type="file" 
                  id="file-upload" 
                  className="hidden" 
                  onChange={handleFileChange}
                  multiple
                />
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  className="gap-2"
                  disabled={isGenerating || !prompt.trim()}
                >
                  {isGenerating ? (
                    <>Generating<span className="animate-pulse">...</span></>
                  ) : (
                    <>
                      Generate Scope & Estimate
                      <Zap size={16} />
                    </>
                  )}
                </Button>
              </div>
            </form>

            {result && (
              <div className="mt-8 space-y-6 animate-fadeIn">
                <div className="p-5 rounded-lg bg-gray-50 border border-gray-200">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-3 text-gray-800">
                    <span className="text-violet-600 bg-violet-100 p-1 rounded">
                      <Zap size={18} />
                    </span>
                    Project Scope
                  </h3>
                  <p className="text-gray-700">{result.scope}</p>
                </div>
                
                <div className="p-5 rounded-lg bg-gray-50 border border-gray-200">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-3 text-gray-800">
                    <span className="text-violet-600 bg-violet-100 p-1 rounded">
                      <List size={18} />
                    </span>
                    Task Breakdown
                  </h3>
                  <ul className="space-y-3">
                    {result.tasks.map((task) => (
                      <li key={task.id} className="flex gap-2">
                        <span className="text-violet-600 font-medium mt-0.5">•</span>
                        <div>
                          <h4 className="font-medium text-gray-800">{task.title}</h4>
                          <p className="text-sm text-gray-600">{task.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-5 rounded-lg bg-gray-50 border border-gray-200">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-3 text-gray-800">
                    <span className="text-violet-600 bg-violet-100 p-1 rounded">
                      <DollarSign size={18} />
                    </span>
                    Cost Estimate
                  </h3>
                  <p className="text-xl font-bold text-gray-800">{result.estimate}</p>
                  <p className="text-sm text-gray-500 mt-1">Based on estimated development hours and complexity</p>
                </div>
                
                <div className="flex justify-center mt-8">
                  <Button onClick={handleSendToBuilder} className="gap-2 px-6">
                    Send to Builder
                    <Mail size={16} />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TryFoundrySection;
