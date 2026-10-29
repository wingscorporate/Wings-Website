import React from 'react';
import { Mail, Phone, MapPin, Instagram, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { ActiveTab } from '../types';
import { WingsLogo } from './WingsLogo';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenContact: () => void;
  onOpenLegal: (type: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenContact, onOpenLegal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030303] text-[#F5F5F5] pt-20 sm:pt-24 pb-28 lg:pb-16 border-t border-white/10 relative overflow-hidden">
      
      {/* Footer Ambient Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-purple-900/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <WingsLogo size="lg" />
            </div>

            <p className="font-display font-medium text-lg text-neutral-300 max-w-sm">
              "Digital growth for ambitious businesses."
            </p>

            <p className="text-xs text-neutral-400 max-w-md leading-relaxed">
              Performance-driven marketing, e-commerce growth, branding and digital experiences designed to turn ambitious businesses into market leaders.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/wingsmarketinginsight/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white hover:border-purple-500 hover:bg-purple-900/40 transition-all cursor-pointer"
                aria-label="WINGS Instagram (@wingsmarketinginsight)"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Col */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs font-bold uppercase text-purple-400 tracking-widest mb-4">
              Navigation
            </div>
            <ul className="space-y-3 text-sm text-neutral-300 font-medium">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('about');
                    document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  Who We Are
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('services');
                    document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  What We Do (Services)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('work');
                    document.getElementById('work-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  Our Work (Case Studies)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('careers');
                    document.getElementById('careers-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-purple-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Careers</span>
                  <span className="text-[9px] px-1.5 py-0.2 bg-purple-900 text-purple-200 rounded">Hiring</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  Get in Touch
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs font-bold uppercase text-purple-400 tracking-widest mb-4">
              Get In Touch
            </div>

            <div className="space-y-3 text-sm text-neutral-300">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <a href="mailto:retail@wings-marketing.com" className="hover:text-purple-300 transition-colors">
                  retail@wings-marketing.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-1" />
                <span>Kolkata, West Bengal, India</span>
              </div>
            </div>

            <div className="pt-4 space-y-2 text-xs text-neutral-400">
              <button
                onClick={() => onOpenLegal('privacy')}
                className="hover:text-white transition-colors cursor-pointer block"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => onOpenLegal('terms')}
                className="hover:text-white transition-colors cursor-pointer block"
              >
                Terms & Conditions
              </button>
            </div>
          </div>

        </div>

        {/* Large Footer Brand Statement */}
        <div className="pt-12 pb-10 text-center border-b border-white/5">
          <p className="font-display font-bold text-xl sm:text-3xl text-white">
            Let's build something extraordinary.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center relative gap-4 text-xs text-neutral-400 text-center">
          <div className="sm:mx-auto font-medium">
            © 2026 WINGS Marketing. All Rights Reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="sm:absolute sm:right-0 hover:text-purple-300 transition-colors cursor-pointer flex items-center gap-1 font-semibold"
          >
            <span>Back to top</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
