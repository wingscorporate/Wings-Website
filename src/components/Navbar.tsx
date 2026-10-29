import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { ActiveTab } from '../types';
import { WingsLogo } from './WingsLogo';

const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893 0-3.18-1.238-6.167-3.488-8.415z"/>
  </svg>
);

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ setActiveTab, onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; tab: ActiveTab; sectionId?: string }[] = [
    { label: 'Home', tab: 'home', sectionId: '' },
    { label: 'Services', tab: 'services', sectionId: 'services-section' },
    { label: 'Results', tab: 'results', sectionId: 'results-section' },
    { label: 'Team', tab: 'about', sectionId: 'team-gallery' },
    { label: 'Articles', tab: 'about', sectionId: 'articles' },
    { label: 'Process', tab: 'work', sectionId: 'process-section' },
    { label: 'Testimonials', tab: 'about', sectionId: 'testimonials-section' },
    { label: 'FAQ', tab: 'careers', sectionId: 'faq-section' },
  ];

  const handleNavClick = (tab: ActiveTab, sectionId?: string, label = 'Home') => {
    setActiveTab(tab);
    setActiveNavItem(label);
    setMobileMenuOpen(false);

    if (sectionId) {
      window.requestAnimationFrame(() => {
        const element = document.getElementById(sectionId);
        if (!element) return;

        const header = document.querySelector('header.fixed');
        const headerOffset = header instanceof HTMLElement ? header.offsetHeight : 0;
        const top = window.scrollY + element.getBoundingClientRect().top - headerOffset - 12;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080808]/85 backdrop-blur-md border-b border-white/10 py-4 shadow-2xl'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo (Left) */}
          <button
            onClick={() => handleNavClick('home')}
            className="group text-left cursor-pointer focus:outline-none"
            aria-label="WINGS Marketing Home"
          >
            <WingsLogo size="md" showText={false} />
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-[#0A1024]/80 backdrop-blur-lg px-4 py-2 rounded-full border border-white/10 shadow-inner">
            {navItems.map((item) => {
              const isActive = activeNavItem === item.label;
              return (
                <button
                  key={item.sectionId || item.label}
                  onClick={() => handleNavClick(item.tab, item.sectionId, item.label)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#4F7CFF]/30 text-white border border-[#4F7CFF]/50 shadow-sm shadow-blue-500/20'
                      : 'text-[#AAB2C8] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Direct WhatsApp Button */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {/* Direct WhatsApp Button */}
            <a
              href="https://wa.me/919230554211?text=Hi%20WINGS%20Marketing%2C%20I%20want%20to%20scale%20my%20D2C%20brand!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 rounded-full border border-emerald-500/30 transition-all cursor-pointer shadow-sm"
              title="Message on WhatsApp"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile/Tablet Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white hover:bg-neutral-800 transition-colors cursor-pointer shrink-0"
            aria-label="Toggle Mobile/Tablet Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile & Tablet Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050816]/98 backdrop-blur-2xl lg:hidden flex flex-col justify-between p-6 sm:p-10 pt-24 animate-in fade-in duration-200 overflow-y-auto">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] tracking-widest uppercase text-[#5B8CFF] font-bold mb-2">
              Navigation Menu
            </span>
            {navItems.map((item) => (
              <button
                key={item.sectionId || item.label}
                onClick={() => handleNavClick(item.tab, item.sectionId, item.label)}
                aria-current={activeNavItem === item.label ? 'location' : undefined}
                className="text-left font-display text-xl sm:text-2xl font-bold text-white hover:text-[#5B8CFF] py-3.5 border-b border-white/5 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-5 h-5 text-neutral-500" />
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-white/10 mt-6">
            {/* Quick Action Contact Cards */}
            <div className="flex flex-col gap-2.5">
              <a
                href="https://wa.me/919230554211?text=Hi%20WINGS%20Marketing%2C%20I%20want%20to%20scale%20my%20D2C%20brand!"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 flex items-center justify-center gap-2 transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold">WhatsApp Chat</span>
              </a>
            </div>

            <div className="space-y-1.5 text-xs text-[#AAB2C8] py-1">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#5B8CFF]" />
                <span>retail@wings-marketing.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#5B8CFF]" />
                <span>+91 92305 54211</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#5B8CFF]" />
                <span>Kolkata, West Bengal, India</span>
              </div>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-4 px-6 rounded-full bg-[#4F7CFF] hover:bg-[#5B8CFF] text-white font-display font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer"
            >
              <span>Book a Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
