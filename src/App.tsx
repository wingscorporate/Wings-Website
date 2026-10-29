import React, { useState } from 'react';
import { ActiveTab, Service, CaseStudy, CareerPosition } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SocialProofSection } from './components/SocialProofSection';
import { ResultsSection } from './components/ResultsSection';
import { PerformanceProofSection } from './components/PerformanceProofSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyWingsSection } from './components/WhyWingsSection';
import { ProcessSection } from './components/ProcessSection';
import { EcommerceEngineSection } from './components/EcommerceEngineSection';
import { CalculatorSection } from './components/CalculatorSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CompanyStorySection } from './components/CompanyStorySection';
import { TeamGallerySection } from './components/TeamGallerySection';
import { ArticlesSection } from './components/ArticlesSection';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { CursorSpotlight } from './components/CursorSpotlight';
import { ContactModal } from './components/ContactModal';
import { StrategyCallModal } from './components/StrategyCallModal';
import { ServiceDetailDrawer } from './components/ServiceDetailDrawer';
import { LegalModal } from './components/LegalModal';
import { CaseStudyPage } from './components/CaseStudyPage';
import { ArrowRight, Phone } from 'lucide-react';

const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893 0-3.18-1.238-6.167-3.488-8.415z"/>
  </svg>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isStrategyCallOpen, setIsStrategyCallOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [contactPreselectedService, setContactPreselectedService] = useState<string | undefined>(undefined);

  // "Book Your Free Strategy Call" now opens the booking form as a popup
  const handleOpenContact = (preselectedSvc?: string) => {
    setSelectedCaseStudy(null);
    setContactPreselectedService(preselectedSvc);
    setIsStrategyCallOpen(true);
  };

  const handleSelectCaseStudy = (study: CaseStudy) => {
    setSelectedCaseStudy(study);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCaseStudies = () => {
    setSelectedCaseStudy(null);
    window.setTimeout(() => {
      const section = document.getElementById('work-section');
      if (!section) return;

      const header = document.querySelector('header.fixed');
      const headerOffset = header instanceof HTMLElement ? header.offsetHeight : 0;
      const top = window.scrollY + section.getBoundingClientRect().top - headerOffset - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    }, 0);
  };

  const handleTabChange = (tab: ActiveTab) => {
    setSelectedCaseStudy(null);
    setActiveTab(tab);
  };

  const handleExploreWork = () => {
    setSelectedCaseStudy(null);
    const element = document.getElementById('work-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-[#F5F5F5] font-sans selection:bg-blue-600/40 selection:text-white relative">

      {/* Desktop Ambient Cursor Spotlight */}
      <CursorSpotlight />

      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenContact={() => handleOpenContact()}
      />

      {/* Main Content View */}
      {selectedCaseStudy ? (
        <CaseStudyPage
          study={selectedCaseStudy}
          onBack={handleBackToCaseStudies}
          onSelectCaseStudy={handleSelectCaseStudy}
          onOpenContact={(svc) => handleOpenContact(svc)}
        />
      ) : (
        <main className="relative">
          {/* 01. Hero Section */}
          <Hero
            onStartProject={() => handleOpenContact('E-Commerce Strategy Call')}
            onExploreWork={handleExploreWork}
          />

          {/* 02. Social Proof & Featured Brands Section */}
          <SocialProofSection />

          {/* 03. Key Performance Results Section */}
          <ResultsSection onOpenContact={() => handleOpenContact('Performance Strategy Call')} />

          {/* 04. Ads Manager & Shopify Account Screenshots */}
          <PerformanceProofSection onOpenContact={() => handleOpenContact('Performance Strategy Call')} />

          {/* 05. Core Services Section */}
          <ServicesSection
            onSelectService={(service) => setSelectedService(service)}
          />

          {/* 06. E-Commerce Growth Engine & Performance Section */}
          <EcommerceEngineSection onOpenContact={() => handleOpenContact('E-Commerce Growth Engine')} />

          {/* 07. Interactive ROAS, CPP, Revenue & Ad Budget Calculator */}
          <CalculatorSection onOpenContact={(svc) => handleOpenContact(svc)} />

          {/* 08. Why Choose Us / Growth Systems Section */}
          <WhyWingsSection />

          {/* 09. 4-Step Methodology / Process */}
          <ProcessSection />

          {/* 10. Case Studies / Featured Work */}
          <CaseStudiesSection
            onSelectCaseStudy={handleSelectCaseStudy}
            onOpenContact={() => handleOpenContact('Case Study Strategy Call')}
          />

          {/* 11. Testimonials / Client Feedback + Client Screenshots */}
          <TestimonialsSection />

          {/* 12. Company Story & Dailyhunt Credibility */}
          <CompanyStorySection />
          {/* 13. Our Team Gallery */}
          <TeamGallerySection />

          {/* 14. Articles by Saujash Maulik */}
          <ArticlesSection />

          {/* 15. Pricing & Engagement Models */}
          <PricingSection onOpenContact={() => handleOpenContact('Engagement Discussion')} />

          {/* 16. FAQ Section */}
          <FaqSection onOpenContact={() => handleOpenContact('FAQ Inquiry')} />

          {/* 17. Final High-Converting Call-to-Action */}
          <FinalCtaSection
            onOpenContact={() => handleOpenContact('Strategy Call Request')}
            onExploreWork={handleExploreWork}
          />
        </main>
      )}

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenContact={() => handleOpenContact()}
        onOpenLegal={(type) => setLegalModalType(type)}
      />

      {/* Sticky Mobile & Tablet Quick CTA Bar */}
      <div className="lg:hidden fixed bottom-3 left-3 sm:left-6 right-3 sm:right-6 z-40 bg-[#0A1024]/95 backdrop-blur-xl border border-[#4F7CFF]/40 p-2.5 sm:p-3 rounded-2xl shadow-2xl flex items-center justify-between gap-2 sm:gap-3 glow-blue">
        <div className="hidden sm:flex flex-col pl-1">
          <span className="text-[10px] text-[#5B8CFF] font-bold uppercase tracking-wider">WINGS Marketing</span>
          <span className="text-xs text-white font-bold">Scale Your D2C Brand</span>
        </div>

        <div className="flex items-center justify-between w-full sm:w-auto gap-1.5 sm:gap-2">
          {/* Direct WhatsApp Message Button */}
          <a
            href="https://wa.me/919230554211?text=Hi%20WINGS%20Marketing%2C%20I%20want%20to%20scale%20my%20D2C%20brand!"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs border border-emerald-400/30 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/30"
            aria-label="Message WINGS Marketing on WhatsApp"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
            <span>WhatsApp</span>
          </a>

          {/* Book Strategy Call Modal Trigger */}
          <button
            onClick={() => handleOpenContact()}
            className="flex-1 sm:flex-none px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#4F7CFF] hover:bg-[#5B8CFF] text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-blue-600/40 cursor-pointer"
          >
            <span>Book Call</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Modals & Drawers */}
      <StrategyCallModal
        isOpen={isStrategyCallOpen}
        onClose={() => setIsStrategyCallOpen(false)}
        preselectedService={contactPreselectedService}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        preselectedService={contactPreselectedService}
      />

      <ServiceDetailDrawer
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOpenContact={(svcTitle) => handleOpenContact(svcTitle)}
      />

      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

    </div>
  );
}
