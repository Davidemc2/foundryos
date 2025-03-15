
import { Search, ListCheck, PackageCheck } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Scopes your startup idea instantly",
    description: "No more blank pages or planning chaos"
  },
  {
    icon: ListCheck,
    title: "Auto-generates build tasks",
    description: "Skip the dev team — Foundry handles it for you"
  },
  {
    icon: PackageCheck,
    title: "Delivers a working MVP fast",
    description: "Use Lovable.dev to turn your idea into product — no code, no waiting"
  }
];

const WhatFoundryDoes = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gray-950">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(139,92,246,0.1)_0%,transparent_100%)]" />
      
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            What Foundry OS Does for You
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="opacity-0 animate-fadeIn"
              style={{ animationDelay: `${index * 200}ms`, animationFillMode: 'forwards' }}
            >
              <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800/50 hover:border-violet-500/50 transition-all duration-300 h-full group">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={24} />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatFoundryDoes;
