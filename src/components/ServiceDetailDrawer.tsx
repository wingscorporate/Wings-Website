import React from 'react';
import { Service } from '../types';
import { X, CheckCircle2, ArrowRight, Zap, Award } from 'lucide-react';

interface ServiceDetailDrawerProps {
  service: Service | null;
  onClose: () => void;
  onOpenContact: (serviceTitle?: string) => void;
}

export const ServiceDetailDrawer: React.FC<ServiceDetailDrawerProps> = ({ service, onClose, onOpenContact }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0A1024] border border-[#4F7CFF]/40 p-5 sm:p-10 shadow-2xl my-8 space-y-6 glow-blue">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-[#AAB2C8] hover:text-white transition-colors cursor-pointer"
          aria-label="Close drawer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-3 pr-10">
          <div className="flex items-center gap-2 text-xs font-bold text-[#5B8CFF] tracking-widest uppercase">
            <span>SERVICE {service.number}</span>
            <span>•</span>
            <span>WINGS CAPABILITY</span>
          </div>

          <h3 className="font-display font-bold text-2xl sm:text-4xl text-white">
            {service.title}
          </h3>

          <div className="inline-block px-3 py-1 rounded-full bg-[#4F7CFF]/20 text-[#5B8CFF] text-xs font-bold border border-[#4F7CFF]/30">
            {service.metricsHighlight}
          </div>
        </div>

        {/* Long Description */}
        <p className="text-[#AAB2C8] text-sm sm:text-base leading-relaxed">
          {service.longDescription}
        </p>

        {/* Deliverables checklist */}
        <div className="space-y-3 pt-2">
          <h4 className="font-display font-bold text-xs sm:text-sm text-white uppercase tracking-wider">
            Key Deliverables & Execution Specs
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.deliverables.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#5B8CFF] shrink-0 mt-0.5" />
                <span className="text-xs text-[#AAB2C8] font-medium leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => {
              onClose();
              onOpenContact(service.title);
            }}
            className="w-full py-4 rounded-full bg-[#4F7CFF] hover:bg-[#5B8CFF] text-white font-display font-bold text-xs uppercase tracking-wider shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Request {service.title} Audit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
