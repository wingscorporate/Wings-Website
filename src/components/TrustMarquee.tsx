import React from 'react';
import { CLIENT_LOGOS } from '../data/agencyData';
import { Layers, Shield, Sparkles, Box, Compass, Hexagon, Circle, Triangle } from 'lucide-react';

export const TrustMarquee: React.FC = () => {
  const marqueeItems = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];

  const logoIcons = [Layers, Shield, Sparkles, Box, Compass, Hexagon, Circle, Triangle];

  return (
    <section className="relative py-14 bg-[#0A1024]/60 border-y border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center space-y-2">
        <span className="text-[10px] font-bold tracking-widest text-[#5B8CFF] uppercase">
          SOCIAL PROOF
        </span>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
          Helping Businesses Turn Traffic Into Revenue
        </h2>
      </div>

      {/* Fade Gradients at Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050816] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050816] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex overflow-hidden select-none">
        <div className="animate-marquee flex items-center gap-6 sm:gap-10 py-2">
          {marqueeItems.map((client, idx) => {
            const IconComponent = logoIcons[idx % logoIcons.length];
            return (
              <div
                key={`${client.name}-${idx}`}
                className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#4F7CFF]/40 hover:bg-white/[0.06] transition-all duration-300 group cursor-default"
              >
                <div className="p-1.5 rounded-lg bg-white/5 text-[#AAB2C8] group-hover:text-[#5B8CFF] transition-colors">
                  <IconComponent className="w-4 h-4" />
                </div>
                <span className="font-display font-semibold text-sm sm:text-base text-[#AAB2C8] group-hover:text-white transition-colors">
                  {client.name}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4F7CFF]/10 text-[#5B8CFF] border border-[#4F7CFF]/20 font-mono font-medium">
                  {client.growth}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
