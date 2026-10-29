import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface FinalCtaSectionProps {
  onOpenContact: () => void;
  onExploreWork: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenContact, onExploreWork }) => {
  return (
    <section className="py-28 bg-[#050816] relative overflow-hidden border-t border-white/10">
      {/* Background ambient lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4F7CFF]/15 rounded-full blur-[180px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-[#8B5CF6]/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        {/* Glow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1024] border border-[#4F7CFF]/30 text-[#5B8CFF] text-xs font-semibold tracking-wider uppercase shadow-xl backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-[#5B8CFF]" />
          <span>TAKE THE NEXT STEP IN YOUR GROWTH</span>
        </div>

        {/* Main Heading */}
        <h2 className="font-display font-bold text-4xl sm:text-6xl text-white tracking-tight leading-[1.08] max-w-4xl mx-auto">
          Ready To Scale Your Brand With{' '}
          <span className="bg-gradient-to-r from-[#5B8CFF] via-indigo-300 to-[#8B5CF6] bg-clip-text text-transparent">
            Performance Marketing?
          </span>
        </h2>

        {/* Subheading */}
        <p className="text-base sm:text-lg text-[#AAB2C8] max-w-2xl mx-auto leading-relaxed">
          Book a strategy call to discover how WINGS Marketing can help you acquire customers, build high-converting funnels, and scale revenue predictably.
        </p>

        {/* Highlight points */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-white">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#5B8CFF]" />
            <span>Complimentary Store & Media Audit</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#5B8CFF]" />
            <span>Tailored 90-Day Revenue Blueprint</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#5B8CFF]" />
            <span>No Long-Term Lock-in Contracts</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenContact}
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-10 py-5 text-sm font-semibold tracking-wide text-white bg-[#4F7CFF] hover:bg-[#5B8CFF] rounded-full transition-all duration-300 shadow-xl shadow-blue-600/30 glow-blue hover:scale-[1.03] cursor-pointer"
          >
            <span>Book a Free Strategy Call</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreWork}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 text-sm font-semibold tracking-wide text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/15 hover:border-white/30 transition-all duration-300 backdrop-blur-md cursor-pointer"
          >
            <span>Explore Case Studies</span>
          </button>
        </div>

      </div>
    </section>
  );
};
