import React, { useState } from 'react';
import { SERVICES } from '../data/agencyData';
import { Service } from '../types';
import { ShoppingBag, TrendingUp, Users, Code, Share2, Layers, ArrowRight, Check, Sparkles, Filter, Layout, Target, BarChart2 } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (service: Service) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp': return <TrendingUp className="w-6 h-6" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6" />;
      case 'Filter': return <Filter className="w-6 h-6" />;
      case 'Layout': return <Layout className="w-6 h-6" />;
      case 'Target': return <Target className="w-6 h-6" />;
      case 'BarChart2': return <BarChart2 className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <section id="services-section" className="py-24 bg-[#050816] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#4F7CFF]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F7CFF]/10 text-[#5B8CFF] text-xs font-bold tracking-widest uppercase border border-[#4F7CFF]/20">
            <span>WHAT WE DO</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-[1.1]">
            Everything You Need To Scale Online
          </h2>
          <p className="text-[#AAB2C8] text-base sm:text-lg">
            Integrated growth solutions engineered to capture market share, maximize customer acquisition, and scale revenue predictably.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const isHovered = hoveredId === service.id;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSelectService(service)}
                className={`group relative p-8 rounded-3xl transition-all duration-300 cursor-pointer border flex flex-col justify-between overflow-hidden bg-[#0A1024]/60 ${
                  isHovered
                    ? 'border-[#4F7CFF] bg-[#0A1024] -translate-y-2 shadow-2xl shadow-blue-900/40 glow-blue'
                    : 'border-white/10 hover:border-[#4F7CFF]/40'
                }`}
              >
                {/* Glow highlight */}
                <div
                  className={`absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#4F7CFF]/20 blur-3xl transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                <div>
                  {/* Top Header Row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3.5 rounded-2xl transition-all duration-300 ${
                      isHovered ? 'bg-[#4F7CFF] text-white shadow-lg shadow-blue-600/30' : 'bg-white/5 text-[#5B8CFF]'
                    }`}>
                      {getIcon(service.icon)}
                    </div>
                    <span className="font-display text-xs font-bold tracking-widest text-[#AAB2C8] group-hover:text-[#5B8CFF] transition-colors">
                      {service.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-2xl text-white mb-3 group-hover:text-[#5B8CFF] transition-colors">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm text-[#AAB2C8] leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Deliverables preview */}
                  <div className="space-y-2 mb-6 pt-2 border-t border-white/5">
                    {service.deliverables.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#AAB2C8]">
                        <Check className="w-3.5 h-3.5 text-[#5B8CFF] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow Footer */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#AAB2C8] group-hover:text-white">
                  <span>Explore Service</span>
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#4F7CFF] flex items-center justify-center transition-all group-hover:translate-x-1">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
