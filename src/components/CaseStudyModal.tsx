import React from 'react';
import { CaseStudy } from '../types';
import { X, ArrowRight, CheckCircle2, TrendingUp, Award, DollarSign } from 'lucide-react';

interface CaseStudyModalProps {
  study: CaseStudy | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ study, onClose, onOpenContact }) => {
  if (!study) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#0A1024] border border-[#4F7CFF]/40 p-5 sm:p-10 shadow-2xl my-8 space-y-6 glow-blue">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-[#AAB2C8] hover:text-white transition-colors cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative h-48 sm:h-64 w-full rounded-2xl overflow-hidden">
          <img src={study.image} alt={study.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1024] via-transparent to-transparent" />
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-black/80 text-white text-[10px] font-bold uppercase tracking-wider border border-white/10">
              {study.industry}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#4F7CFF]/20 text-[#5B8CFF] text-[10px] font-bold uppercase tracking-wider border border-[#4F7CFF]/30 backdrop-blur-md">
              {study.roas} ROAS
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="space-y-2">
          <div className="text-xs text-[#5B8CFF] font-semibold tracking-wider uppercase">
            {study.client} • {study.service}
          </div>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
            {study.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#AAB2C8] leading-relaxed">
            {study.summary}
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {study.resultsBreakdown.map((res, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="text-[10px] text-[#AAB2C8] uppercase font-semibold">{res.label}</div>
              <div className="font-display font-bold text-sm sm:text-base text-[#5B8CFF] mt-0.5">{res.value}</div>
            </div>
          ))}
        </div>

        {/* Strategy Execution Points */}
        <div className="space-y-3 pt-2">
          <h4 className="font-display font-bold text-xs sm:text-sm text-white uppercase tracking-wider">
            Strategy & Execution Blueprint
          </h4>
          <div className="space-y-2">
            {study.strategy.map((st, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#5B8CFF] shrink-0 mt-0.5" />
                <span className="text-xs text-[#AAB2C8] font-medium leading-relaxed">{st}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <button
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="w-full py-4 rounded-full bg-[#4F7CFF] hover:bg-[#5B8CFF] text-white font-display font-bold text-xs uppercase tracking-wider shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Apply This Strategy To My Brand →</span>
          </button>
        </div>

      </div>
    </div>
  );
};
