import React, { useState } from 'react';
import { Search, Hammer, Rocket, TrendingUp, CheckCircle2 } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Understand',
      description: 'We analyze your business, product, audience, current performance, and growth opportunities.',
      icon: Search,
      highlight: 'Audit & Analysis'
    },
    {
      num: '02',
      title: 'Build',
      description: 'We create the required marketing foundation, including campaigns, funnels, tracking, and creative strategy.',
      icon: Hammer,
      highlight: 'Foundation Setup'
    },
    {
      num: '03',
      title: 'Launch',
      description: 'We launch strategically structured campaigns designed for testing and collecting meaningful performance data.',
      icon: Rocket,
      highlight: 'Strategic Launch'
    },
    {
      num: '04',
      title: 'Optimize & Scale',
      description: 'We continuously optimize campaigns, improve performance, and scale what is working.',
      icon: TrendingUp,
      highlight: 'Continuous Scale'
    }
  ];

  return (
    <section id="process-section" className="py-24 bg-[#050816] relative overflow-hidden border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4F7CFF]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F7CFF]/10 text-[#5B8CFF] text-xs font-bold tracking-widest uppercase border border-[#4F7CFF]/20">
            <span>HOW WE WORK</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            A Simple Process Built For Growth
          </h2>
          <p className="text-[#AAB2C8] text-sm sm:text-base">
            A structured, repeatable methodology designed to take your brand from initial testing to predictable market scaling.
          </p>
        </div>

        {/* Process Timeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-12 left-20 right-20 h-0.5 bg-gradient-to-r from-[#4F7CFF] via-[#8B5CF6] to-[#5B8CFF] opacity-30 z-0 pointer-events-none" />

          {steps.map((step) => {
            const IconComp = step.icon;
            return (
              <div
                key={step.num}
                className="relative z-10 p-8 rounded-3xl bg-[#0A1024] border border-white/10 hover:border-[#4F7CFF]/40 transition-all duration-300 space-y-4 group hover:-translate-y-2 glow-blue"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-display font-black text-xl text-[#5B8CFF] group-hover:bg-[#4F7CFF] group-hover:text-white transition-colors">
                    {step.num}
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#4F7CFF]/10 text-[#5B8CFF]">
                    <IconComp className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase text-[#5B8CFF] tracking-wider">
                    {step.highlight}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-white mt-1 mb-2 group-hover:text-[#5B8CFF] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#AAB2C8] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Structured Milestone</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
