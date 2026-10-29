import React, { useEffect, useState } from 'react';
import {
  X,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  TrendingUp,
  Phone,
  Send,
  Building2,
  User,
  Mail,
  Target,
  Wallet,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

const WhatsAppIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893 0-3.18-1.238-6.167-3.488-8.415z" />
  </svg>
);

interface StrategyCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

/**
 * WhatsApp number that receives every strategy-call form submission.
 * Format required by wa.me: country code + number, digits only.
 */
export const WHATSAPP_NUMBER = '919230554211'; // +91 92305 54211
export const WHATSAPP_DISPLAY = '+91 92305 54211';

const getTomorrowString = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
};

const SERVICES = [
  'Performance Marketing (Meta & Google Ads)',
  'D2C E-Commerce Growth Engine',
  'Conversion Rate Optimization (CRO)',
  'High-Converting Ad Creatives & Strategy',
  'Retention & Email/WhatsApp Automation',
  'Shopify Development & CRO'
];

const SPEND = ['Under ₹1L / month', '₹1L - ₹5L / month', '₹5L - ₹20L / month', '₹20L+ / month'];
const TIMES = ['10:00 AM - 12:00 PM', '12:00 PM - 02:00 PM', '02:00 PM - 04:00 PM', '04:00 PM - 07:00 PM'];

export const StrategyCallModal: React.FC<StrategyCallModalProps> = ({ isOpen, onClose, preselectedService }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    brandName: '',
    monthlySpend: SPEND[1],
    service: SERVICES[0],
    preferredDate: getTomorrowString(),
    preferredTime: TIMES[1],
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  // Keep the popup in sync with the CTA that opened it
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setSubmitError(null);
      if (preselectedService) {
        setFormData((prev) => ({ ...prev, service: preselectedService }));
      }
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, preselectedService]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // Build the WhatsApp message from the filled form
    const waMessage = [
      '*NEW STRATEGY CALL REQUEST*',
      '',
      `*Name:* ${formData.fullName}`,
      `*Work Email:* ${formData.email}`,
      `*Phone / WhatsApp:* ${formData.phone}`,
      `*Brand / Store:* ${formData.brandName}`,
      `*Monthly Ad Spend:* ${formData.monthlySpend}`,
      `*Service Needed:* ${formData.service}`,
      `*Preferred Date:* ${formData.preferredDate || 'Earliest available'}`,
      `*Time Window:* ${formData.preferredTime}`,
      formData.notes ? `*Notes:* ${formData.notes}` : '',
      '',
      'Sent from wings-marketing.com'
    ]
      .filter(Boolean)
      .join('\n');

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

    // 1) Open WhatsApp with the pre-filled details (must be done first, while
    //    still inside the user's click/submit gesture so it isn't blocked).
    //    Note: `noopener` makes window.open() return null even on success, so we
    //    don't use its return value to decide whether it was blocked.
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setWhatsappUrl(waUrl);

    // 2) Also record the lead on the server (non-blocking for the user)
    try {
      const response = await fetch('/api/strategy-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'strategy-call-popup', whatsappSent: true })
      });
      const result = await response.json().catch(() => ({ success: true }));
      if (!response.ok && !result.success) {
        setSubmitError('WhatsApp is open — please press Send there to confirm your request.');
      }
    } catch (err) {
      // The WhatsApp window is the primary path, so a logging failure is non-fatal.
      console.warn('Could not record strategy-call lead on server:', err);
    }

    setIsSubmitted(true);
    setIsSubmitting(false);
    confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } });
  };

  const inputClass =
    'w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#4F7CFF] text-white text-xs placeholder:text-[#AAB2C8]/60 focus:outline-none transition-colors';
  const selectClass =
    'w-full px-3.5 py-2.5 rounded-xl bg-[#0F1732] border border-white/10 focus:border-[#4F7CFF] text-white text-xs focus:outline-none transition-colors';
  const labelClass = 'text-[11px] font-semibold text-white/90 flex items-center gap-1.5 mb-1';

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start sm:items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Book your free strategy call"
    >
      <div
        className="relative w-full max-w-4xl my-4 sm:my-8 rounded-3xl bg-[#0A1024] border border-[#4F7CFF]/40 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Glow */}
        <div className="absolute -top-24 left-1/3 w-[420px] h-[220px] bg-[#4F7CFF]/25 rounded-full blur-[110px] pointer-events-none" />

        {/* ---- Cross section: close bar ---- */}
        <div className="relative z-20 flex items-center justify-between gap-2 px-4 sm:px-5 py-2.5 border-b border-white/10 bg-[#070C1D]">
          <div className="flex items-center gap-1.5 text-[9.5px] font-bold uppercase tracking-widest text-[#5B8CFF]">
            <Sparkles className="w-3 h-3" />
            <span>Free Strategy Call</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-semibold text-[#AAB2C8] hover:text-white hover:bg-red-500/20 hover:border-red-500/40 transition-colors cursor-pointer"
            aria-label="Close strategy call popup"
          >
            <span>Close</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="relative p-8 sm:p-12 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#5B8CFF] uppercase tracking-widest">DETAILS SENT</span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">Your Request Is On Its Way!</h3>
              <p className="text-xs text-[#AAB2C8] max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{formData.fullName || 'there'}</strong>. Your details for{' '}
                <strong className="text-white">{formData.brandName || 'your brand'}</strong> were opened in WhatsApp — just press{' '}
                <strong className="text-emerald-400">Send</strong> there and our growth team will reply within 4 business hours.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left space-y-1.5 text-[11px] text-[#AAB2C8] max-w-md mx-auto">
              <div><strong className="text-white">Service:</strong> {formData.service}</div>
              <div><strong className="text-white">Ad Spend:</strong> {formData.monthlySpend}</div>
              <div><strong className="text-white">Preferred Date:</strong> {formData.preferredDate || 'Earliest available'}</div>
              <div><strong className="text-white">Time Window:</strong> {formData.preferredTime}</div>
              <div><strong className="text-white">Phone:</strong> {formData.phone || 'To be confirmed'}</div>
            </div>

            {submitError && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] max-w-md mx-auto">
                {submitError}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={whatsappUrl || `https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <WhatsAppIcon className="w-4 h-4" /> Open WhatsApp Again
              </a>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#4F7CFF] hover:bg-[#5B8CFF] text-white font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Back To Site
              </button>
            </div>
          </div>
        ) : (
          <div className="relative grid grid-cols-1 lg:grid-cols-12">
            {/* Left: form */}
            <div className="lg:col-span-7 p-5 sm:p-8 space-y-4">
              <div className="space-y-1.5 pr-8">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#4F7CFF]/10 text-[#5B8CFF] text-[9.5px] font-bold tracking-widest uppercase border border-[#4F7CFF]/20">
                  <Sparkles className="w-3 h-3" />
                  <span>FREE 30-MINUTE GROWTH AUDIT</span>
                </div>
                <h2 className="font-display font-bold text-xl sm:text-2xl text-white leading-tight">
                  Book Your Free Strategy Call
                </h2>
                <p className="text-[11px] text-[#AAB2C8] leading-relaxed">
                  Tell us about your brand. Our senior strategists review your account before the call and prepare a custom growth roadmap.
                </p>
              </div>

              {submitError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-[11px]">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}><User className="w-3 h-3 text-[#5B8CFF]" /> Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}><Mail className="w-3 h-3 text-[#5B8CFF]" /> Work Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rahul@yourbrand.com"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}><Phone className="w-3 h-3 text-[#5B8CFF]" /> Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}><Building2 className="w-3 h-3 text-[#5B8CFF]" /> Brand / Store URL *</label>
                    <input
                      type="text"
                      required
                      value={formData.brandName}
                      onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                      placeholder="e.g. MyBrand.com"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}><Wallet className="w-3 h-3 text-[#5B8CFF]" /> Monthly Ad Spend</label>
                    <select
                      value={formData.monthlySpend}
                      onChange={(e) => setFormData({ ...formData, monthlySpend: e.target.value })}
                      className={selectClass}
                    >
                      {SPEND.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}><Target className="w-3 h-3 text-[#5B8CFF]" /> Primary Service</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className={selectClass}
                    >
                      {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}><Calendar className="w-3 h-3 text-[#5B8CFF]" /> Preferred Date</label>
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}><Clock className="w-3 h-3 text-[#5B8CFF]" /> Time Window</label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className={selectClass}
                    >
                      {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Anything specific we should audit? (Optional)</label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Current ROAS, monthly revenue, target sales goal..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-[#4F7CFF] hover:bg-[#5B8CFF] text-white font-display font-bold text-[11px] uppercase tracking-wider shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Securing Strategy Slot...</span>
                  ) : (
                    <>
                      <span>Confirm Free Strategy Call</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-center text-[#AAB2C8]">
                  🔒 100% confidential. No spam, no obligation, no credit card.
                </p>
              </form>
            </div>

            {/* Right: proof panel */}
            <div className="lg:col-span-5 bg-[#070C1D] border-t lg:border-t-0 lg:border-l border-white/10 p-5 sm:p-7 space-y-4">
              <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5B8CFF]" /> What happens on the call?
              </h3>

              <ul className="space-y-3">
                {[
                  ['Live Account & Funnel Audit', 'We review ad spend efficiency, CAC, creative performance and conversion drop-offs.'],
                  ['Custom Scaling Blueprint', 'You get a step-by-step roadmap to scale revenue with stable ROAS.'],
                  ['Zero Hard Sell Guarantee', 'If we are not a mutual fit, you keep the entire audit for free.']
                ].map(([title, desc], i) => (
                  <li key={title} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#4F7CFF]/20 text-[#5B8CFF] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div className="text-[10.5px] text-[#AAB2C8] leading-relaxed">
                      <strong className="text-white block">{title}</strong>
                      {desc}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0F1732] to-[#0A1024] border border-[#4F7CFF]/25 space-y-2">
                <div className="font-display font-bold text-sm text-white flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" /> "₹60.8L sales in 22 days"
                </div>
                <p className="text-[10px] text-[#AAB2C8] leading-relaxed">
                  5.82x blended ROAS for a D2C apparel brand. Consistent 4.5x – 6.2x across apparel, beauty, eyewear and supplement portfolios.
                </p>
              </div>

              <a
                href="https://wa.me/919230554211?text=Hi%20WINGS%20Marketing%2C%20I%20want%20to%20book%20a%20free%20strategy%20call!"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold transition-all"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" /> Prefer WhatsApp? Message us
                <ArrowRight className="w-3 h-3" />
              </a>
              <p className="text-[9.5px] text-center text-[#AAB2C8] font-mono">{WHATSAPP_DISPLAY}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
