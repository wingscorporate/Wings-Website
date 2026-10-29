import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/agencyData';
import { CaseStudy } from '../types';
import { ArrowUpRight, Award, TrendingUp, Sparkles, Filter, ArrowRight } from 'lucide-react';

interface CaseStudiesSectionProps {
  onSelectCaseStudy: (study: CaseStudy) => void;
  onOpenContact: () => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onSelectCaseStudy, onOpenContact }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filterCategories = [
    { id: 'all', label: 'All Niches' },
    { id: 'clothing', label: 'Clothing & Apparel' },
    { id: 'jewellery', label: 'Jewellery' },
    { id: 'skincare', label: 'Skincare & Beauty' },
    { id: 'digital', label: 'Digital Products' },
    { id: 'eyewear', label: 'Eyewear' },
    { id: 'supplements', label: 'Supplements' },
  ];

  const getDisplayStudies = (): CaseStudy[] => {
    if (activeFilter === 'all') {
      // Return exactly 3 case studies from 3 DIFFERENT niches
      const clothingStudy = CASE_STUDIES.find((s) => s.niche === 'clothing') || CASE_STUDIES[0];
      const jewelleryStudy = CASE_STUDIES.find((s) => s.niche === 'jewellery') || CASE_STUDIES[1];
      const skincareStudy = CASE_STUDIES.find((s) => s.niche === 'skincare') || CASE_STUDIES[2];
      return [clothingStudy, jewelleryStudy, skincareStudy];
    }

    // For a specific niche, filter and feature the 3 case studies/brands of that niche
    const nicheStudies = CASE_STUDIES.filter(
      (s) =>
        s.niche === activeFilter ||
        s.industry.toLowerCase().includes(activeFilter.toLowerCase())
    );
    return nicheStudies.slice(0, 3);
  };

  const filteredStudies = getDisplayStudies();

  return (
    <section id="work-section" className="py-24 bg-[#050816] relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#4F7CFF]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F7CFF]/10 text-[#5B8CFF] text-xs font-bold tracking-widest uppercase border border-[#4F7CFF]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PROVEN CASE STUDIES</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            Featured Case Studies
          </h2>

          <p className="text-[#AAB2C8] text-sm sm:text-base">
            Real performance results across clothing, jewellery, digital products, skincare, eyewear, and supplements.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {filterCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === cat.id
                  ? 'bg-[#4F7CFF] text-white shadow-lg shadow-blue-600/30 glow-blue'
                  : 'bg-white/5 text-[#AAB2C8] hover:text-white border border-white/10 hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              onClick={() => onSelectCaseStudy(study)}
              className="group relative rounded-3xl overflow-hidden bg-[#0A1024]/70 border border-white/10 hover:border-[#4F7CFF] transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-2 glow-blue"
            >
              {/* Image Container */}
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1024] via-[#0A1024]/30 to-transparent" />

                {/* Industry Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white text-[10px] font-semibold uppercase tracking-wider">
                    {study.industry}
                  </span>
                </div>

                {/* Key Result Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0A1024]/90 backdrop-blur-md border border-[#4F7CFF]/40 p-3 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-[#5B8CFF] font-bold uppercase">Key Metric</div>
                    <div className="font-display font-bold text-base text-white">
                      {study.keyResult}
                    </div>
                  </div>
                  <div className="p-2 rounded-full bg-[#4F7CFF] text-white">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-xs text-[#5B8CFF] font-semibold uppercase tracking-wider">
                    {study.client} • {study.service}
                  </div>

                  <h3 className="font-display font-bold text-xl text-white group-hover:text-[#5B8CFF] transition-colors">
                    {study.title}
                  </h3>

                  <p className="text-xs text-[#AAB2C8] leading-relaxed line-clamp-3">
                    {study.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#5B8CFF] group-hover:text-white">
                  <span>View Case Study</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Callout */}
        <div className="flex justify-center">
          <button
            onClick={onOpenContact}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/15 hover:border-[#4F7CFF] text-white font-display font-semibold text-xs uppercase tracking-wider hover:bg-[#4F7CFF]/20 transition-all cursor-pointer"
          >
            <span>Book Strategy Call to Discuss Your Growth</span>
            <ArrowRight className="w-4 h-4 text-[#5B8CFF] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
