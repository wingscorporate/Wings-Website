import React from 'react';

interface Brand {
  id: string;
  name: string;
  category: string;
  logoDisplay: React.ReactNode;
}

export const SocialProofSection: React.FC = () => {
  const featuredBrands: Brand[] = [
    {
      id: 'jewelmyne',
      name: 'JewelMyne',
      category: 'Luxury Fine Jewelry',
      logoDisplay: (
        <svg viewBox="0 0 150 36" className="h-9 sm:h-11 w-auto fill-current" xmlns="http://www.w3.org/2000/svg">
          {/* Faceted Gemstone Emblem */}
          <g className="text-white/80 group-hover:text-white transition-colors">
            <polygon points="12,6 18,6 21,12 9,12" />
            <polygon points="9,12 21,12 15,24" />
            <polygon points="6,12 9,12 15,24 3,12" fillOpacity="0.7" />
            <polygon points="21,12 24,12 27,12 15,24" fillOpacity="0.7" />
          </g>
          {/* Wordmark */}
          <text x="34" y="23" className="font-display font-black text-[15px] tracking-wider fill-white">
            JewelMyne
          </text>
        </svg>
      )
    },
    {
      id: 'design-machine',
      name: 'Design Machine',
      category: "Women's Clothing & Apparel",
      logoDisplay: (
        <svg viewBox="0 0 160 36" className="h-9 sm:h-11 w-auto fill-current" xmlns="http://www.w3.org/2000/svg">
          {/* Fashion Silhouette */}
          <g className="text-white/80 group-hover:text-white transition-colors">
            <path d="M 12 5 C 12 3 10 2 8 3 C 6 4 8 7 12 7 L 18 10 L 2 10 L 8 7 C 12 7 13 4 12 5 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 4 11 C 7 16 9 22 5 25 L 15 25 C 11 22 13 16 16 11 Z" fill="currentColor" opacity="0.85" />
          </g>
          {/* Wordmark */}
          <text x="24" y="18" className="font-display font-black text-[13px] tracking-widest fill-white uppercase">
            DESIGN
          </text>
          <text x="24" y="28" className="font-sans font-bold text-[8px] tracking-[0.25em] fill-white/70 uppercase">
            MACHINE
          </text>
        </svg>
      )
    },
    {
      id: 'intense-focus',
      name: 'Intense Focus',
      category: 'Eyewear & Sunglasses',
      logoDisplay: (
        <svg viewBox="0 0 160 36" className="h-9 sm:h-11 w-auto fill-current" xmlns="http://www.w3.org/2000/svg">
          {/* Glasses Frame Emblem */}
          <g className="text-white/80 group-hover:text-white transition-colors">
            <rect x="2" y="9" width="13" height="12" rx="3.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <rect x="19" y="9" width="13" height="12" rx="3.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <line x1="15" y1="13" x2="19" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="8.5" cy="15" r="2.2" fill="currentColor" opacity="0.75" />
            <circle cx="25.5" cy="15" r="2.2" fill="currentColor" opacity="0.75" />
          </g>
          {/* Wordmark */}
          <text x="38" y="18" className="font-display font-black text-[13px] tracking-widest fill-white uppercase">
            INTENSE
          </text>
          <text x="38" y="28" className="font-sans font-bold text-[8px] tracking-[0.25em] fill-white/70 uppercase">
            FOCUS
          </text>
        </svg>
      )
    },
    {
      id: 'uffco',
      name: 'UFFCO',
      category: 'Luxury Perfumes & Fragrances',
      logoDisplay: (
        <svg viewBox="0 0 130 36" className="h-9 sm:h-11 w-auto fill-current" xmlns="http://www.w3.org/2000/svg">
          {/* Perfume Bottle Emblem */}
          <g className="text-white/80 group-hover:text-white transition-colors">
            <rect x="11" y="4" width="6" height="3" rx="1" fill="currentColor" />
            <rect x="9" y="7" width="10" height="2" rx="1" fill="currentColor" opacity="0.8" />
            <path d="M 6 9 L 22 9 L 24 26 C 24 27.5 22.5 28.5 21 28.5 L 7 28.5 C 5.5 28.5 4 27.5 4 26 Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <rect x="9" y="15" width="10" height="8" rx="1" fill="currentColor" opacity="0.3" />
          </g>
          {/* Wordmark */}
          <text x="32" y="23" className="font-display font-black text-[18px] tracking-widest fill-white uppercase">
            UFFCO
          </text>
        </svg>
      )
    },
    {
      id: 'feint-official',
      name: 'Feint Official',
      category: 'Streetwear & Clothing',
      logoDisplay: (
        <svg viewBox="0 0 160 36" className="h-9 sm:h-11 w-auto fill-current" xmlns="http://www.w3.org/2000/svg">
          {/* Streetwear F Blade Crest */}
          <g className="text-white/80 group-hover:text-white transition-colors">
            <path d="M 5 6 L 22 6 L 18 12 L 10 12 L 8 16 L 16 16 L 12 21 L 7 21 L 4 28 L 0 28 Z" fill="currentColor" />
          </g>
          {/* Wordmark */}
          <text x="28" y="18" className="font-display font-black text-[13px] tracking-[0.18em] fill-white uppercase">
            FEINT
          </text>
          <text x="28" y="28" className="font-sans font-bold text-[8px] tracking-[0.3em] fill-white/70 uppercase">
            OFFICIAL
          </text>
        </svg>
      )
    },
    {
      id: 'irvya',
      name: 'Irvya',
      category: 'Stone & Crystal Jewellery',
      logoDisplay: (
        <svg viewBox="0 0 130 36" className="h-9 sm:h-11 w-auto fill-current" xmlns="http://www.w3.org/2000/svg">
          {/* Crystal Star Emblem */}
          <g className="text-white/80 group-hover:text-white transition-colors">
            <polygon points="12,4 16,11 23,14 16,17 12,24 8,17 1,14 8,11" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="14" r="2.5" fill="currentColor" />
          </g>
          {/* Wordmark */}
          <text x="30" y="23" className="font-serif font-bold text-[18px] tracking-wide fill-white italic">
            Irvya
          </text>
        </svg>
      )
    },
    {
      id: '360-love',
      name: '360 Love',
      category: 'Ayurvedic Plant-Based Supplements',
      logoDisplay: (
        <svg viewBox="0 0 160 36" className="h-9 sm:h-11 w-auto fill-current" xmlns="http://www.w3.org/2000/svg">
          {/* Ayurvedic Leaf & Circle Emblem */}
          <g className="text-white/80 group-hover:text-white transition-colors">
            <circle cx="14" cy="18" r="11" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M 14 10 C 19 13 19 21 14 26 C 9 21 9 13 14 10 Z" fill="currentColor" opacity="0.85" />
          </g>
          {/* Wordmark */}
          <text x="32" y="22" className="font-display font-black text-[15px] tracking-wider fill-white uppercase">
            360°<tspan className="fill-white">LOVE</tspan>
          </text>
        </svg>
      )
    }
  ];

  return (
    <section className="relative py-6 sm:py-8 bg-[#070B1E]/95 border-y border-white/10 overflow-hidden select-none">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute inset-0 bg-radial from-white/[0.02] via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Compact Section Header */}
        <div className="text-center space-y-1 max-w-2xl mx-auto mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 text-[#AAB2C8] text-[9.5px] font-bold tracking-widest uppercase border border-white/10 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>SOCIAL PROOF</span>
          </div>

          <h2 className="font-display font-bold text-lg sm:text-xl lg:text-2xl text-white tracking-tight">
            Helping D2C Brands Turn Traffic Into Revenue
          </h2>

          <p className="text-[#AAB2C8] text-[11px] leading-relaxed max-w-xl mx-auto">
            Trusted performance marketing partner for leading clothing, jewellery, eyewear, supplements & fragrance brands.
          </p>
        </div>

        {/* Marquee Brands Container - Clean Background-Free Stream */}
        <div 
          className="relative w-full overflow-hidden py-3"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
          }}
        >
          {/* Edge Gradient Mask Overlays for smooth side fades */}
          <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#070B1E] via-[#070B1E]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#070B1E] via-[#070B1E]/80 to-transparent z-10 pointer-events-none" />

          {/* Marquee Track: Clean logos flowing without boxes/backgrounds */}
          <div className="flex animate-marquee gap-6 sm:gap-10 w-max items-center">
            {[...featuredBrands, ...featuredBrands].map((brand, idx) => (
              <div
                key={`${brand.id}-${idx}`}
                className="group relative cursor-default shrink-0 px-2 sm:px-3.5 py-2 flex items-center justify-center transition-all duration-300"
              >
                {/* Centered Clean Brand Logo with Hover Scale */}
                <div className="relative z-10 flex items-center justify-center opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.08)]">
                  {brand.logoDisplay}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
