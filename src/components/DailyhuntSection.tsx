import React from 'react';
import { DAILYHUNT_FEATURE } from '../data/agencyData';
import { Newspaper, ExternalLink, ArrowUpRight, Quote } from 'lucide-react';

export const DailyhuntSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#050816] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Minimal Credibility Container with Background Image */}
        <div className="relative rounded-3xl bg-[#0A1024] border border-[#4F7CFF]/30 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl">
          {/* Background Image Overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img
              src="https://instagram.fccu2-2.fna.fbcdn.net/v/t51.2885-19/447387667_1863147904148754_1014227800874085732_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fccu2-2.fna.fbcdn.net&_nc_cat=106&_nc_oc=Q6cZ2gHssIcEbTFW8xlSuyENO2SNS3Fk56Eep501WPpoc_4jimydePYYWu9MMk4at17Gd_5tNi6LKGhQv_7YC07sP9hH&_nc_ohc=cxWM2EvnlywQ7kNvwEpKVUf&_nc_gid=Xsv7yItAuX0X7QkDzRa9jw&edm=APoiHPcBAAAA&ccb=7-5&oh=00_AQHGQHbozd4aBaa9FI8AH9P2WguVr_r6zZqpWY4gRf8lmg&oe=6A7E4F45&_nc_sid=22de04"
              alt="Dailyhunt Article Background"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
              className="w-full h-full object-cover object-center opacity-30 filter contrast-125 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070B1E]/95 via-[#0A1024]/85 to-[#070B1E]/90" />
          </div>

          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4F7CFF]/15 rounded-full blur-[140px] pointer-events-none z-0" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 sm:gap-10 relative z-10">
            
            <div className="space-y-6 max-w-3xl">
              {/* Publication Header */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="px-2.5 py-1 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30 font-display font-black text-xs tracking-wider">
                  DAILYHUNT
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#5B8CFF]">
                  {DAILYHUNT_FEATURE.tagline}
                </span>
              </div>

              {/* Headline */}
              <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
                "{DAILYHUNT_FEATURE.title}"
              </h3>

              {/* Excerpt */}
              <p className="text-[#AAB2C8] text-sm sm:text-base leading-relaxed">
                {DAILYHUNT_FEATURE.excerpt}
              </p>

              {/* Quote Block */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                <Quote className="w-5 h-5 text-[#5B8CFF] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm text-white italic font-medium leading-relaxed">
                    {DAILYHUNT_FEATURE.quote}
                  </p>
                  <p className="text-[11px] text-[#5B8CFF] font-semibold mt-1.5">
                    — {DAILYHUNT_FEATURE.founderName}, Founder & CEO, WINGS Marketing
                  </p>
                </div>
              </div>
            </div>

            {/* Read Story Action Column */}
            <div className="flex flex-col items-start lg:items-end justify-center shrink-0 space-y-4">
              <a
                href={DAILYHUNT_FEATURE.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#4F7CFF] hover:bg-[#5B8CFF] text-white font-display font-bold text-xs uppercase tracking-wider shadow-xl shadow-blue-600/30 transition-all cursor-pointer"
              >
                <span>Read Story on Dailyhunt</span>
                <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <span className="text-[11px] text-[#AAB2C8] font-mono">
                {DAILYHUNT_FEATURE.date} • Verified National Coverage
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
