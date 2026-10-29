import React from 'react';
import { Check, Sparkles, ArrowRight, Zap, ShieldCheck } from 'lucide-react';

interface PricingSectionProps {
  onOpenContact: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenContact }) => {
  const models = [
    {
      id: 'full-service',
      title: 'Full-Service Performance Marketing',
      badge: 'POPULAR CHOICE',
      description: 'End-to-end management of paid ads, funnels, and creative strategy.',
      features: [
        'Complete Meta & Google Ads Media Buying',
        'Direct-Response Creative Strategy & Testing',
        'Landing Page & Funnel Conversion Engineering',
        'First-Party Pixel & CAPI Attribution Tracking',
        'Weekly Strategy Syncs & Real-Time Dashboard'
      ],
      isFeatured: false,
      cta: 'Discuss Partnership'
    },
    {
      id: 'growth-partner',
      title: 'Performance Growth Partner',
      badge: 'RECOMMENDED FOR SCALE',
      description: 'Revenue-share or ROAS-based model designed for scaling brands.',
      features: [
        'Everything in Full-Service Performance',
        'Shared Risk & Outcome-Aligned Revenue Incentive',
        'Dedicated E-Commerce CRO & Checkout Speed Lead',
        'Full Retargeting & Omnichannel Automation',
        'Custom High-AOV Offer Architecture',
        'Priority Daily Campaign Optimization'
      ],
      isFeatured: true,
      cta: 'Book a Strategy Call'
    },
    {
      id: 'advisory',
      title: 'Strategic Marketing Advisory',
      badge: 'CONSULTING',
      description: 'High-level strategy, funnel audits, and growth consulting for in-house teams.',
      features: [
        'Comprehensive Media & Funnel Performance Audit',
        'Monthly Strategic Growth & Budget Roadmap',
        'In-House Media Buyer & Creative Training',
        'Attribution & Pixel Infrastructure Verification',
        'Direct Founder/Leadership Access'
      ],
      isFeatured: false,
      cta: 'Request Funnel Audit'
    }
  ];

  return (
    <section id="pricing-section" className="py-24 bg-[#050816] relative overflow-hidden border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#4F7CFF]/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F7CFF]/10 text-[#5B8CFF] text-xs font-bold tracking-widest uppercase border border-[#4F7CFF]/20">
            <Zap className="w-3.5 h-3.5" />
            <span>PRICING & ENGAGEMENT</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            Flexible Engagement Models Built For Growth
          </h2>

          <p className="text-[#AAB2C8] text-sm sm:text-base">
            Transparent, performance-aligned options tailored to your stage of growth and business goals.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {models.map((m) => (
            <div
              key={m.id}
              className={`rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between relative overflow-hidden border ${
                m.isFeatured
                  ? 'bg-[#0A1024] border-[#4F7CFF] shadow-2xl shadow-blue-900/40 glow-blue lg:-translate-y-2'
                  : 'bg-[#0A1024]/60 border-white/10 hover:border-[#4F7CFF]/40'
              }`}
            >
              {/* Highlight top banner for featured */}
              {m.isFeatured && (
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4F7CFF] via-[#8B5CF6] to-[#5B8CFF]" />
              )}

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                    m.isFeatured
                      ? 'bg-[#4F7CFF] text-white border-blue-400/40 shadow-lg shadow-blue-600/30'
                      : 'bg-white/5 text-[#5B8CFF] border-white/10'
                  }`}>
                    {m.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-bold text-2xl text-white mb-2">
                    {m.title}
                  </h3>
                  <p className="text-xs text-[#AAB2C8] leading-relaxed">
                    {m.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="text-[11px] font-bold uppercase text-[#5B8CFF] tracking-wider">
                    What's Included
                  </div>
                  {m.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-white">
                      <Check className="w-4 h-4 text-[#5B8CFF] shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <button
                  onClick={onOpenContact}
                  className={`w-full py-4 rounded-full font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    m.isFeatured
                      ? 'bg-[#4F7CFF] hover:bg-[#5B8CFF] text-white shadow-xl shadow-blue-600/30 glow-blue hover:scale-[1.02]'
                      : 'bg-white/10 hover:bg-white/15 text-white border border-white/15'
                  }`}
                >
                  <span>{m.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Risk-free Assured line */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 max-w-3xl mx-auto text-center flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-[#AAB2C8]">
          <ShieldCheck className="w-5 h-5 text-[#5B8CFF] shrink-0" />
          <span>All partnerships begin with a complimentary growth audit & customized 90-day strategy roadmap.</span>
        </div>

      </div>
    </section>
  );
};
