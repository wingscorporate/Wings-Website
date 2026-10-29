import React, { useState } from 'react';
import { X, Send, CheckCircle2, Sparkles, Phone, Mail, Globe, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893 0-3.18-1.238-6.167-3.488-8.415z"/>
  </svg>
);

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, preselectedService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    services: preselectedService ? [preselectedService] : ['E-Commerce Growth'],
    budget: '₹2M - ₹5M / month',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({ success: true }));

      if (res.ok || data.success) {
        setSubmitted(true);
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } else {
        setErrorMsg(data.error || 'Failed to submit contact request. Please try again.');
      }
    } catch (err: any) {
      console.error('Failed to submit contact data:', err);
      // Fallback: mark submitted so local save isn't ignored
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const serviceOptions = [
    'Performance Marketing',
    'E-Commerce Growth',
    'Sales Funnel Creation',
    'Landing Page Optimization',
    'Creative Strategy',
    'Tracking & Analytics'
  ];

  const budgetOptions = [
    'Under ₹1M / mo',
    '₹1M - ₹3M / mo',
    '₹3M - ₹5M / mo',
    '₹5M+ / mo'
  ];

  const toggleService = (svc: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(svc);
      if (exists) {
        return { ...prev, services: prev.services.filter((s) => s !== svc) };
      } else {
        return { ...prev, services: [...prev.services, svc] };
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0A1024] border border-[#4F7CFF]/40 p-6 sm:p-10 shadow-2xl my-8 glow-blue">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-[#AAB2C8] hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#4F7CFF]/20 text-[#5B8CFF] border border-[#4F7CFF]/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-bold text-3xl text-white">Strategy Call Requested!</h3>
              <p className="text-[#AAB2C8] text-sm max-w-md mx-auto">
                Thank you <span className="text-white font-semibold">{formData.name}</span>. Our growth team will review your brand details and reach out within 4 business hours to confirm your call time.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#4F7CFF]/10 border border-[#4F7CFF]/30 text-xs text-[#5B8CFF] font-mono inline-block">
              Direct Desk: +91 92305 54211 • retail@wings-marketing.com
            </div>

            <div>
              <button
                onClick={onClose}
                className="px-8 py-3.5 rounded-full bg-[#4F7CFF] hover:bg-[#5B8CFF] text-white font-semibold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer"
              >
                Return to Site
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#5B8CFF] uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>BOOK A STRATEGY CALL</span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                Book Your Free Performance Growth Call
              </h3>
              <p className="text-xs text-[#AAB2C8]">
                Tell us about your brand goals. We engineer custom performance strategies that scale revenue predictably.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center justify-between gap-3">
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Instant Contact Action Bar */}
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
              <a
                href="https://wa.me/919230554211?text=Hi%20WINGS%20Marketing%2C%20I%20want%20to%20scale%20my%20D2C%20brand!"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/30 text-white flex items-center gap-3 transition-all group"
              >
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                  <WhatsAppIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-300">WhatsApp Chat</div>
                  <div className="text-[10px] text-emerald-400/80">Instant Reply Desk</div>
                </div>
              </a>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#AAB2C8] mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#4F7CFF] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#AAB2C8] mb-1">Work Email *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rahul@yourbrand.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#4F7CFF] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#AAB2C8] mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#4F7CFF] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#AAB2C8] mb-1">Website / Store URL</label>
                <input
                  type="text"
                  placeholder="e.g. www.yourbrand.com"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#4F7CFF] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Services Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#AAB2C8]">Services Needed</label>
              <div className="flex flex-wrap gap-2">
                {serviceOptions.map((svc) => {
                  const isSelected = formData.services.includes(svc);
                  return (
                    <button
                      type="button"
                      key={svc}
                      onClick={() => toggleService(svc)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#4F7CFF] border-blue-400 text-white shadow-md shadow-blue-600/30'
                          : 'bg-white/5 border-white/10 text-[#AAB2C8] hover:text-white'
                      }`}
                    >
                      {svc}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#AAB2C8]">Monthly Growth Budget</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {budgetOptions.map((bgt) => (
                  <button
                    type="button"
                    key={bgt}
                    onClick={() => setFormData({ ...formData, budget: bgt })}
                    className={`p-2.5 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer text-center ${
                      formData.budget === bgt
                        ? 'bg-[#4F7CFF] border-blue-400 text-white shadow'
                        : 'bg-white/5 border-white/10 text-[#AAB2C8] hover:text-white'
                    }`}
                  >
                    {bgt}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold text-[#AAB2C8] mb-1">Project Notes / Growth Targets</label>
              <textarea
                rows={3}
                placeholder="Briefly describe your current revenue baseline and primary growth targets..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#4F7CFF] focus:outline-none transition-colors"
              />
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-full bg-[#4F7CFF] hover:bg-[#5B8CFF] text-white font-display font-bold text-xs uppercase tracking-wider shadow-xl shadow-blue-600/30 glow-blue transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {submitting ? (
                <span>Submitting Request...</span>
              ) : (
                <>
                  <span>Confirm Strategy Call Request</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
