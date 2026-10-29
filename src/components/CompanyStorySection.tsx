import React from 'react';
import { TIMELINE_MILESTONES } from '../data/agencyData';
import { MapPin, Sparkles, Building2, Globe, Flame } from 'lucide-react';

export const CompanyStorySection: React.FC = () => {
  return (
    <section id="story-section" className="py-24 bg-[#050816] relative overflow-hidden border-t border-white/10">
      {/* Background Lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#4F7CFF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16 sm:mb-20">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F7CFF]/10 text-[#5B8CFF] text-xs font-bold tracking-widest uppercase border border-[#4F7CFF]/20">
              <Flame className="w-3.5 h-3.5 text-[#5B8CFF]" />
              <span>OUR STORY</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1]">
              Started Small. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B8CFF] via-indigo-300 to-[#8B5CF6]">
                Built to Go Big.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-6 space-y-4 text-[#AAB2C8] text-sm sm:text-base leading-relaxed">
            <p>
              WINGS Marketing was founded in Kolkata, West Bengal with a single uncompromising mission: to give ambitious e-commerce brands and D2C enterprises the technical and performance media edge needed to dominate their categories.
            </p>
            <p>
              We discarded traditional agency fluff — replacing long-winded deck presentations with real-time conversion engineering, server-side attribution, and aggressive, profitable ad spend scaling.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs font-semibold text-[#5B8CFF]">
              <MapPin className="w-4 h-4 text-[#5B8CFF] shrink-0" />
              <span>Headquartered in Kolkata, West Bengal, India • Scaling Brands Nationally</span>
            </div>
          </div>
        </div>

        {/* Timeline 2021 -> TODAY */}
        <div className="relative pt-4 sm:pt-8">
          {/* Vertical Connecting Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#4F7CFF] via-indigo-600 to-transparent -translate-x-1/2 opacity-30" />

          <div className="space-y-8 sm:space-y-12">
            {TIMELINE_MILESTONES.map((milestone, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={milestone.year}
                  className={`relative flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Box */}
                  <div className="w-full md:w-[45%] p-5 sm:p-8 rounded-2xl bg-[#0A1024]/70 border border-white/10 hover:border-[#4F7CFF]/40 transition-all duration-300">
                    <div className="inline-block px-3 py-1 rounded-full bg-[#4F7CFF]/20 text-[#5B8CFF] text-xs font-bold border border-[#4F7CFF]/30 mb-3">
                      {milestone.year}
                    </div>

                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-1">
                      {milestone.title}
                    </h3>

                    <div className="text-xs text-[#5B8CFF] font-semibold mb-3">
                      {milestone.subtitle}
                    </div>

                    <p className="text-xs sm:text-sm text-[#AAB2C8] leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>

                  {/* Center Node Badge */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#4F7CFF] border-4 border-[#050816] items-center justify-center text-white text-xs font-bold shadow-lg shadow-blue-900/50">
                    <Sparkles className="w-4 h-4" />
                  </div>

                  {/* Empty Spacer Column for layout symmetry */}
                  <div className="hidden md:block w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
