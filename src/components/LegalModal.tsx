import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0A1024] border border-[#4F7CFF]/40 p-5 sm:p-10 shadow-2xl my-8 space-y-6 glow-blue">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-[#AAB2C8] hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pr-10">
          <div className="p-3 rounded-xl bg-[#4F7CFF]/20 text-[#5B8CFF] border border-[#4F7CFF]/30">
            {isPrivacy ? <ShieldCheck className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="font-display font-bold text-2xl text-white">
              {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
            </h3>
            <span className="text-xs text-[#AAB2C8] font-mono">
              WINGS Marketing and Finance • Effective 2026
            </span>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#AAB2C8] leading-relaxed max-h-96 overflow-y-auto pr-2 scrollbar-thin">
          {isPrivacy ? (
            <>
              <p>
                <strong className="text-white">1. Data Collection & Usage:</strong> WINGS Marketing and Finance collects information such as Name, Email, Phone Number, Website, and business details through our website and contact forms. This information is used for consultations, service delivery, communication, and marketing strategy purposes.
              </p>
              <p>
                <strong className="text-white">2. Data Privacy & Third-Party Services:</strong> We may use analytics tools, tracking pixels, server-side Conversion API (CAPI), and other third-party platforms to optimize campaigns. We do not sell client data to unauthorized third parties.
              </p>
              <p>
                <strong className="text-white">3. Confidentiality:</strong> Store metrics, campaign performance, business information, and proprietary sales data shared with WINGS Marketing and Finance are treated as confidential and used only for providing agreed services.
              </p>
              <p>
                <strong className="text-white">4. Data Security:</strong> We take reasonable measures to protect collected information. However, no online system can guarantee absolute security.
              </p>
              <p>
                <strong className="text-white">5. Policy Updates:</strong> WINGS Marketing and Finance may update this Privacy Policy when required. Continued use of our services indicates acceptance of the updated policy.
              </p>
              <p>
                <strong className="text-white">By using our website or services, you agree to this Privacy Policy.</strong>
              </p>
            </>
          ) : (
            <>
              <p>
                <strong className="text-white">1. Advertising & Third-Party Costs:</strong> Ad spend, platform fees, software, hosting, and other third-party costs are non-refundable. WINGS Marketing and Finance is not responsible for third-party errors, account restrictions, policy changes, or platform issues.
              </p>
              <p>
                <strong className="text-white">2. Client Responsibility:</strong> Clients are responsible for product quality, inventory, pricing, fulfilment, customer service, and providing accurate information and timely approvals.
              </p>
              <p>
                <strong className="text-white">3. Limitation of Liability:</strong> WINGS Marketing and Finance shall not be liable for business losses, loss of revenue, profits, advertising losses, or results beyond our direct control.
              </p>
              <p>
                <strong className="text-white">4. Intellectual Property:</strong> WINGS Marketing and Finance retains ownership of its proprietary strategies, frameworks, systems, software architectures, and methodologies unless otherwise agreed in writing.
              </p>
              <p>
                <strong className="text-white">5. Jurisdiction:</strong> These terms are governed by applicable Indian laws. WINGS Marketing and Finance operates from Kolkata, West Bengal, India.
              </p>
              <p>
                <strong className="text-white">6. No Sales Guarantee:</strong> WINGS Marketing and Finance does not guarantee sales, revenue, profit, ROAS, leads, or any specific business results. Performance may vary based on product, pricing, market demand, competition, inventory, and other external factors.
              </p>
              <p>
                <strong className="text-white">7. No Refund Policy:</strong> All payments made for WINGS Marketing and Finance services are non-refundable once work, strategy, setup, or service has commenced. Refunds will not be provided due to low sales, poor campaign performance, or changes in business plans.
              </p>
              <p>
                <strong className="text-white">By making a payment or using our services, you agree to these Terms & Conditions.</strong>
              </p>
            </>
          )}
        </div>

        <div className="pt-4 border-t border-white/10 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#4F7CFF] hover:bg-[#5B8CFF] text-white font-semibold text-xs cursor-pointer transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
};
