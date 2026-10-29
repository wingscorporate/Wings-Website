import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, TrendingUp, ChevronRight, Award, Info, Zap, Target, Users, RefreshCw, ShoppingBag } from 'lucide-react';

interface ResultsSectionProps {
  onOpenContact: () => void;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ onOpenContact }) => {
  const [selectedStat, setSelectedStat] = useState<string | null>(null);

  const stats = [
    {
      id: 'purchases',
      number: '9,500+',
      title: 'Website Purchases Generated',
      description: 'Single Campaign Scale',
      icon: ShoppingBag,
      highlight: 'Single Campaign',
      detail: 'Aggressive scale campaign for client stores achieving 9,500+ verified customer purchases through Meta & Google Ads.'
    },
    {
      id: 'sales22d',
      number: '₹60.8L+',
      title: 'Sales Generated in 22 Days',
      description: '5.8x Average ROAS',
      icon: TrendingUp,
      highlight: '22-Day Scale',
      detail: 'Generated ₹60,84,550 in sales in 22 days with a 5.82x ROAS for ethnic fashion and D2C apparel brands.'
    },
    {
      id: 'sales15d',
      number: '₹24L+',
      title: 'Sales Generated in 15 Days',
      description: 'High-Growth Scaling',
      icon: Target,
      highlight: '15-Day Scale',
      detail: 'Generated ₹24,75,626 in sales in 15 days with 6.14x ROAS targeting premium Metro buyers.'
    },
    {
      id: 'flash',
      number: '1,600+',
      title: 'Orders in a Single Day',
      description: 'Flash Festive Blast',
      icon: Zap,
      highlight: '24-Hour Peak',
      detail: 'Achieved 1,637 orders in a single 24-hour festive launch event driving ₹18,45,000 in revenue.'
    },
    {
      id: 'cpl',
      number: '₹45.90',
      title: 'Low CPL Achieved',
      description: 'Qualified B2B & High-Intent Leads',
      icon: Users,
      highlight: 'High Intent',
      detail: 'High-intent lead generation funnels producing qualified commercial & B2B enquiries at ₹45.90 per lead.'
    }
  ];

  const activeStatObj = stats.find((s) => s.id === selectedStat);

  return (
    <section id="results-section" className="py-24 bg-[#050816] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#4F7CFF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F7CFF]/10 text-[#5B8CFF] text-xs font-bold tracking-widest uppercase border border-[#4F7CFF]/20">
            <Award className="w-3.5 h-3.5" />
            <span>MEASURABLE IMPACT</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            Numbers Speak Louder Than Promises.
          </h2>

          <p className="text-[#AAB2C8] text-sm sm:text-base leading-relaxed">
            Real campaign metrics, verified purchase conversions and predictable ROAS generated for client brands.
          </p>
        </div>

        {/* 5 Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((stat) => {
            const IconComp = stat.icon;
            const isSelected = selectedStat === stat.id;
            return (
              <div
                key={stat.id}
                onClick={() => setSelectedStat(isSelected ? null : stat.id)}
                className={`group relative p-5 sm:p-6 lg:p-4.5 xl:p-6 rounded-3xl transition-all duration-300 cursor-pointer overflow-hidden border ${
                  isSelected
                    ? 'bg-[#0A1024] border-[#4F7CFF] shadow-xl shadow-blue-900/30 glow-blue'
                    : 'bg-[#0A1024]/60 border-white/10 hover:border-[#4F7CFF]/40 hover:bg-[#0A1024]/90'
                }`}
              >
                {/* Accent glow on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#4F7CFF]/20 to-[#8B5CF6]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="mb-4 sm:mb-5">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-2xl bg-white/5 text-[#5B8CFF] group-hover:bg-[#4F7CFF] group-hover:text-white transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>
                </div>

                {/* Large Number - Fits comfortably without overflowing */}
                <div className="font-display font-extrabold text-xl sm:text-2xl lg:text-xl xl:text-2xl text-white tracking-tight mb-1.5 group-hover:text-[#5B8CFF] transition-colors break-words">
                  {stat.number}
                </div>

                <h3 className="font-display font-bold text-lg text-white mb-2">
                  {stat.title}
                </h3>

                <p className="text-xs text-[#AAB2C8] leading-relaxed">
                  {stat.description}
                </p>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#5B8CFF] group-hover:text-white">
                  <span>View Details</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Stat Detail Box */}
        {activeStatObj && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0A1024] border border-[#4F7CFF]/40 shadow-2xl animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold text-[#5B8CFF] uppercase tracking-widest">
                  Strategic Deep-Dive
                </span>
                <h4 className="font-display font-bold text-2xl text-white mt-1 mb-2">
                  {activeStatObj.title} — {activeStatObj.number}
                </h4>
                <p className="text-sm text-[#AAB2C8] max-w-2xl leading-relaxed">
                  {activeStatObj.detail}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={onOpenContact}
                  className="px-6 py-3 rounded-full bg-[#4F7CFF] hover:bg-[#5B8CFF] text-white font-semibold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                >
                  Book Strategy Call
                </button>
                <button
                  onClick={() => setSelectedStat(null)}
                  className="px-4 py-3 rounded-full bg-white/10 text-[#AAB2C8] hover:text-white text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Real Performance Landmark Callout Banner */}
        <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-[#0A1024] via-[#0F1732] to-[#0A1024] border border-[#4F7CFF]/30 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#4F7CFF]/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F7CFF]/20 text-[#5B8CFF] text-xs font-medium border border-[#4F7CFF]/30">
                <Sparkles className="w-3.5 h-3.5 text-[#5B8CFF]" />
                <span>Verified Campaign Results</span>
              </div>
              <h3 className="font-display font-bold text-lg sm:text-2xl lg:text-3xl text-white break-words">
                ₹60,84,550 Generated in 22 Days • 5.82x ROAS
              </h3>
              <p className="text-sm text-[#AAB2C8] max-w-2xl leading-relaxed">
                Data sourced directly from client Meta Ads Manager & Shopify dashboards.
              </p>
              <p className="text-xs text-[#AAB2C8]/70 italic">
                Disclaimer: Results vary by client, market conditions, campaign budget and specific product offering.
              </p>
            </div>

            <button
              onClick={onOpenContact}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#4F7CFF] text-white hover:bg-[#5B8CFF] font-display font-bold text-xs uppercase tracking-wider shadow-xl shadow-blue-600/30 transition-all shrink-0 cursor-pointer"
            >
              <span>Get Your Revenue Plan</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
