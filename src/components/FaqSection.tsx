import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

interface FaqSectionProps {
  onOpenContact: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenContact }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What types of businesses do you work with?',
      answer: 'We specialize in scaling product-based e-commerce brands, D2C storefronts, retail chains expanding online, and high-ticket service businesses looking for predictable customer acquisition.'
    },
    {
      question: 'How quickly can we see results?',
      answer: 'Campaign setup, tracking audits, and initial creative testing typically take 5-7 business days. Initial performance data and conversions usually begin within 48-72 hours of campaign launch, with full optimization and scale taking shape in weeks 2 to 4.'
    },
    {
      question: 'Do you handle creative ad production?',
      answer: 'Yes! Creative is the #1 lever in modern performance advertising. We script, design, and produce high-converting direct-response video hooks, user-generated content (UGC), carousel ads, and high-AOV promotional assets.'
    },
    {
      question: 'How do you track campaign performance?',
      answer: 'We deploy first-party server-side tracking (Meta CAPI & Google GA4) combined with live performance dashboards. You get complete transparency on key metrics like ROAS, CAC, conversion rate, and net revenue.'
    },
    {
      question: 'What budget is required to start?',
      answer: 'While ad spend requirements vary by market and product price point, we typically recommend a minimum starting ad budget that allows for statistically meaningful creative and audience testing.'
    },
    {
      question: 'How is WINGS different from traditional marketing agencies?',
      answer: 'Unlike traditional agencies that focus on vanity metrics like impressions or followers, WINGS is built purely around revenue performance, conversion engineering, and profit-driven business scale.'
    }
  ];

  return (
    <section id="faq-section" className="py-24 bg-[#050816] relative overflow-hidden border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4F7CFF]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F7CFF]/10 text-[#5B8CFF] text-xs font-bold tracking-widest uppercase border border-[#4F7CFF]/20">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQ</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-[#AAB2C8] text-sm sm:text-base">
            Everything you need to know about working with WINGS Marketing.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                  isOpen
                    ? 'bg-[#0A1024] border-[#4F7CFF]/50 shadow-xl shadow-blue-900/20'
                    : 'bg-[#0A1024]/60 border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-display font-bold text-base sm:text-lg text-white">
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-full transition-transform duration-300 shrink-0 ${
                    isOpen ? 'bg-[#4F7CFF] text-white rotate-180' : 'bg-white/5 text-[#AAB2C8]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-[#AAB2C8] leading-relaxed border-t border-white/5 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="p-8 rounded-3xl bg-[#0A1024] border border-white/10 text-center space-y-4">
          <h3 className="font-display font-bold text-xl text-white">Have A Specific Question About Your Brand?</h3>
          <p className="text-xs text-[#AAB2C8] max-w-md mx-auto">
            Our growth team is available to review your current performance and provide tailored answers.
          </p>
          <button
            onClick={onOpenContact}
            className="px-6 py-3 rounded-full bg-[#4F7CFF] hover:bg-[#5B8CFF] text-white font-display font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            Speak With Our Growth Team
          </button>
        </div>

      </div>
    </section>
  );
};
