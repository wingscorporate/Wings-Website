import React, { useState } from 'react';
import { TrendingUp, ShoppingCart, DollarSign, Award, ArrowRight, CheckCircle2, Zap, BarChart3, Target, Activity } from 'lucide-react';

interface EcommerceEngineSectionProps {
  onOpenContact: () => void;
}

export const EcommerceEngineSection: React.FC<EcommerceEngineSectionProps> = ({ onOpenContact }) => {
  const [activeTab, setActiveTab] = useState<'performance' | 'flow'>('performance');

  const performanceMetrics = [
    { label: 'ROAS', value: '8.4x', change: '+32% vs industry avg', detail: 'Blended return on media spend across Meta & Google' },
    { label: 'CTR', value: '3.8%', change: 'High hook rate', detail: 'Direct-response ad creative engagement benchmark' },
    { label: 'Conversion Rate', value: '4.8%', change: '+2.1% store boost', detail: 'Sub-second checkout & CRO store optimization' },
    { label: 'Cost Per Purchase', value: 'Optimized', change: 'Predictable CAC', detail: 'Algorithmic bid management and audience tuning' }
  ];

  const growthEngineFlow = [
    { name: 'Creative Strategy', desc: 'Direct-Response Ad Angles & Video Hooks' },
    { name: 'Targeted Traffic', desc: 'High-Intent Meta & Google Media Buying' },
    { name: 'High-Converting Funnel', desc: 'Sub-Second Store & Custom Landing Pages' },
    { name: 'Customer Acquisition', desc: 'Frictionless Guest & UPI Checkout' },
    { name: 'Optimization', desc: 'Daily Pixel & CAPI Performance Tuning' },
    { name: 'Scale', desc: 'Predictable Budget & Revenue Expansion' }
  ];

  return (
    <section className="py-24 bg-[#050816] relative overflow-hidden border-t border-white/10">
      {/* Background radial glowing ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#4F7CFF]/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F7CFF]/10 text-[#5B8CFF] text-xs font-bold tracking-widest uppercase border border-[#4F7CFF]/20">
            <Zap className="w-3.5 h-3.5" />
            <span>PERFORMANCE & GROWTH ENGINE</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            Ready To Build A Better Growth Engine?
          </h2>

          <p className="text-[#AAB2C8] text-sm sm:text-base leading-relaxed">
            Whether you're launching a product or looking to improve an existing e-commerce business, we'll help you build a stronger marketing foundation.
          </p>
        </div>

        {/* Dashboard / Growth Flow Container */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0A1024] border border-white/10 shadow-2xl space-y-10">
          
          {/* Performance Metrics Header */}
          <div className="space-y-2 border-b border-white/10 pb-6">
            <div className="text-xs font-bold uppercase tracking-widest text-[#5B8CFF]">
              PERFORMANCE IS EVERYTHING
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Marketing Without Data Is Just Guesswork.
            </h3>
            <p className="text-sm text-[#AAB2C8]">
              We track the numbers that matter so decisions are based on actual performance, not assumptions.
            </p>
          </div>

          {/* 4 Performance Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceMetrics.map((m, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#4F7CFF]/40 transition-colors space-y-2">
                <div className="text-xs font-bold uppercase text-[#AAB2C8]">{m.label}</div>
                <div className="font-display font-bold text-3xl text-[#5B8CFF]">{m.value}</div>
                <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{m.change}</span>
                </div>
                <p className="text-[11px] text-[#AAB2C8] pt-1">{m.detail}</p>
              </div>
            ))}
          </div>

          {/* Animated Performance Chart Graphic */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
            <div className="flex items-center justify-between text-xs text-[#AAB2C8]">
              <span className="font-bold text-white">Multi-Channel Attribution & Campaign Scale Curve</span>
              <span className="font-mono text-[#5B8CFF]">Real-Time Data Feed</span>
            </div>

            <div className="h-36 w-full relative flex items-end">
              <svg className="w-full h-full overflow-hidden" viewBox="0 0 500 100">
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F7CFF" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 90 Q 100 80, 180 50 T 350 25 T 490 5 L 490 100 L 0 100 Z"
                  fill="url(#blueGradient)"
                />
                <path
                  d="M 0 90 Q 100 80, 180 50 T 350 25 T 490 5"
                  fill="none"
                  stroke="#4F7CFF"
                  strokeWidth="3"
                />
                <circle cx="180" cy="50" r="4" fill="#4F7CFF" />
                <circle cx="350" cy="25" r="4" fill="#8B5CF6" />
                <circle cx="490" cy="5" r="5" fill="#6EE7B7" />
              </svg>
            </div>

            <div className="text-center text-[11px] text-[#AAB2C8] italic pt-2">
              Results vary depending on product, market, offer, budget, customer behavior, and other factors.
            </div>
          </div>

          {/* Growth Flow Nodes */}
          <div className="pt-6 border-t border-white/10 space-y-6">
            <div className="text-xs font-bold uppercase tracking-widest text-[#5B8CFF]">
              GROWTH SYSTEM FLOW
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 relative">
              {growthEngineFlow.map((flow, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#4F7CFF]/40 text-center space-y-1.5 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-[#4F7CFF]/20 text-[#5B8CFF] text-[10px] font-bold flex items-center justify-center mx-auto">
                    {idx + 1}
                  </div>
                  <div className="font-display font-bold text-xs text-white">{flow.name}</div>
                  <div className="text-[10px] text-[#AAB2C8] leading-snug">{flow.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Banner inside container */}
          <div className="pt-4 flex justify-center">
            <button
              onClick={onOpenContact}
              className="px-8 py-4 rounded-full bg-[#4F7CFF] hover:bg-[#5B8CFF] text-white font-display font-bold text-xs uppercase tracking-wider shadow-xl shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Build My Brand Growth Engine</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
