import React from 'react';
import { ArrowRight, ArrowUpRight, Sparkles, Zap } from 'lucide-react';

interface CtaSectionProps {
  onOpenContact: () => void;
  onExploreWork: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenContact, onExploreWork }) => {
  return (
    <section className="relative py-32 bg-[#050505] overflow-hidden border-t border-white/10">
      {/* Dramatic Full-Width Background Purple Glowing Radial Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-purple-600/20 rounded-full blur-[180px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[150px] pointer-events-none" />

      {/* Grid Noise Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 space-y-8">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-semibold uppercase tracking-widest shadow-xl backdrop-blur-md">
          <Zap className="w-3.5 h-3.5 text-purple-400" />
          <span>START YOUR REVENUE TRANSFORMATION</span>
        </div>

        {/* Main Headline */}
        <h2 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[1.05]">
          Ready To Make <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-500 font-extrabold">
            Your Brand Fly?
          </span>
        </h2>

        {/* Supporting Copy */}
        <p className="text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          Let's build something that creates attention, generates demand and drives measurable growth.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5">
          <button
            onClick={onOpenContact}
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-9 py-4 text-xs font-bold tracking-wider text-white uppercase bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 rounded-full shadow-2xl shadow-purple-900/60 hover:shadow-purple-600/80 hover:scale-[1.02] transition-all cursor-pointer"
          >
            <span>Let's Talk</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreWork}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 text-xs font-bold tracking-wider text-neutral-200 uppercase bg-neutral-900/90 hover:bg-neutral-800 rounded-full border border-white/20 hover:border-white/40 transition-all backdrop-blur-md cursor-pointer"
          >
            <span>View Our Work</span>
            <ArrowUpRight className="w-4 h-4 text-purple-400" />
          </button>
        </div>

      </div>
    </section>
  );
};
