import React from 'react';
import { BarChart3, Target, RefreshCw, MessageSquare, ArrowRight, Zap, CheckCircle2, TrendingUp, Layers } from 'lucide-react';

export const WhyWingsSection: React.FC = () => {
  const points = [
    {
      title: 'Data-Driven Decisions',
      description: 'Every important decision is supported by performance data.',
      icon: BarChart3
    },
    {
      title: 'Conversion-Focused Strategy',
      description: 'We focus on improving the journey from click to customer.',
      icon: Target
    },
    {
      title: 'Continuous Optimization',
      description: 'Campaigns are constantly tested, monitored, and improved.',
      icon: RefreshCw
    },
    {
      title: 'Transparent Communication',
      description: 'You always understand what is happening and why.',
      icon: MessageSquare
    }
  ];

  const growthStages = [
    { step: '01', name: 'Traffic', desc: 'Targeted Media Acquisition', color: 'from-[#5B8CFF] to-blue-600' },
    { step: '02', name: 'Funnel', desc: 'High-Converting Landing Pages', color: 'from-indigo-500 to-purple-600' },
    { step: '03', name: 'Conversion', desc: 'Optimized Checkout & CRO', color: 'from-purple-600 to-pink-600' },
    { step: '04', name: 'Revenue', desc: 'Maximized AOV & Retention', color: 'from-[#8B5CF6] to-emerald-500' },
    { step: '05', name: 'Scale', desc: 'Exponential Profit Expansion', color: 'from-emerald-400 to-[#5B8CFF]' }
  ];

  return (
    <section id="about-section" className="py-24 bg-[#050816] relative overflow-hidden border-t border-white/10">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#4F7CFF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Content & 4 Points */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F7CFF]/10 text-[#5B8CFF] text-xs font-bold tracking-widest uppercase border border-[#4F7CFF]/20">
                <span>WHY WINGS MARKETING</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-[1.12]">
                We Don't Just Run Ads. <br />
                <span className="bg-gradient-to-r from-[#5B8CFF] via-indigo-300 to-[#8B5CF6] bg-clip-text text-transparent">
                  We Build Growth Systems.
                </span>
              </h2>
              <p className="text-[#AAB2C8] text-base leading-relaxed">
                Successful marketing requires more than launching campaigns. We focus on the complete customer journey — from attention and acquisition to conversion and optimization.
              </p>
            </div>

            {/* 4 Key Points Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {points.map((pt, idx) => {
                const IconComp = pt.icon;
                return (
                  <div key={idx} className="p-5 rounded-2xl bg-[#0A1024]/70 border border-white/10 hover:border-[#4F7CFF]/40 transition-colors space-y-2">
                    <div className="p-2.5 rounded-xl bg-[#4F7CFF]/10 text-[#5B8CFF] w-fit">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-base text-white">{pt.title}</h3>
                    <p className="text-xs text-[#AAB2C8] leading-relaxed">{pt.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Connected Growth System Visualization */}
          <div className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0A1024] border border-white/10 shadow-2xl relative space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#5B8CFF]" />
                  <h3 className="font-display font-bold text-lg text-white">Connected Growth Engine Flow</h3>
                </div>
                <span className="text-xs font-mono text-[#5B8CFF]">WINGS Architecture</span>
              </div>

              {/* Connected Flow Steps */}
              <div className="space-y-4 relative">
                
                {/* Connecting glowing line behind */}
                <div className="absolute top-6 bottom-6 left-6 w-0.5 bg-gradient-to-b from-[#4F7CFF] via-[#8B5CF6] to-emerald-400 opacity-60 pointer-events-none" />

                {growthStages.map((stg, idx) => (
                  <div
                    key={idx}
                    className="relative flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#4F7CFF]/40 transition-all duration-300 group z-10"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stg.color} flex items-center justify-center text-white font-display font-bold text-xs shadow-lg group-hover:scale-110 transition-transform shrink-0`}>
                        {stg.step}
                      </div>
                      <div>
                        <div className="font-display font-bold text-base text-white group-hover:text-[#5B8CFF] transition-colors flex items-center gap-2">
                          <span>{stg.name}</span>
                          {idx < growthStages.length - 1 && (
                            <span className="text-xs text-[#AAB2C8] font-normal hidden sm:inline">→ Next Step</span>
                          )}
                        </div>
                        <div className="text-xs text-[#AAB2C8]">{stg.desc}</div>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Optimized</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-[#4F7CFF]/10 border border-[#4F7CFF]/20 flex items-center justify-between text-xs text-[#5B8CFF] font-semibold">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#5B8CFF]" />
                  <span>Real-Time Feedback Loop & Campaign Scaling</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
