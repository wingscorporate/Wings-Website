import React from 'react';
import { CaseStudy } from '../types';
import { CASE_STUDIES } from '../data/agencyData';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Award,
  DollarSign,
  Sparkles,
  BarChart3,
  ShieldCheck,
  Zap,
  Target,
  ExternalLink,
  Layers
} from 'lucide-react';

interface CaseStudyPageProps {
  study: CaseStudy;
  onBack: () => void;
  onSelectCaseStudy: (study: CaseStudy) => void;
  onOpenContact: (preselectedService?: string) => void;
}

export const CaseStudyPage: React.FC<CaseStudyPageProps> = ({
  study,
  onBack,
  onSelectCaseStudy,
  onOpenContact,
}) => {
  // Find related case studies (excluding current one)
  const relatedStudies = CASE_STUDIES.filter((s) => s.id !== study.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#050816] text-[#F5F5F5] pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Lighting Elements */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#4F7CFF]/15 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#8B5CF6]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#AAB2C8] hover:text-white border border-white/10 transition-all cursor-pointer glow-blue"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Case Studies</span>
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#4F7CFF]/10 text-[#5B8CFF] text-xs font-bold uppercase tracking-wider border border-[#4F7CFF]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Client Case Study</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl bg-[#0A1024] border border-[#4F7CFF]/30 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl space-y-8 glow-blue">
          
          {/* Top Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-semibold uppercase tracking-wider">
              {study.industry}
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#4F7CFF]/20 text-[#5B8CFF] text-xs font-bold uppercase tracking-wider border border-[#4F7CFF]/40 backdrop-blur-md">
              {study.roas} ROAS Benchmark
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
              Revenue: {study.revenue}
            </span>
          </div>

          {/* Title and Client Subtitle */}
          <div className="space-y-4 max-w-4xl">
            <div className="text-xs sm:text-sm text-[#5B8CFF] font-bold tracking-widest uppercase flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>{study.client} • {study.service}</span>
            </div>

            <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15]">
              {study.title}
            </h1>

            <p className="text-base sm:text-lg text-[#AAB2C8] leading-relaxed pt-2">
              {study.summary}
            </p>
          </div>

          {/* Hero Image Showcase */}
          <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden border border-white/10 group">
            <img
              src={study.image}
              alt={study.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1024] via-[#0A1024]/30 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-6 rounded-2xl bg-[#0A1024]/90 backdrop-blur-xl border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] text-[#5B8CFF] font-bold uppercase tracking-wider">Primary Outcome</span>
                <div className="font-display font-bold text-xl sm:text-2xl text-white">
                  {study.keyResult}
                </div>
              </div>

              <button
                onClick={() => onOpenContact(`Case Study Strategy: ${study.client}`)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#4F7CFF] hover:bg-[#5B8CFF] text-white font-display font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Scale Like This Brand</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics Breakdown Grid */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white font-display font-bold text-lg">
            <BarChart3 className="w-5 h-5 text-[#5B8CFF]" />
            <h2>Verified Performance Metrics</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {study.resultsBreakdown.map((metric, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-[#0A1024] border border-white/10 hover:border-[#4F7CFF]/40 transition-all"
              >
                <div className="text-xs text-[#AAB2C8] uppercase font-semibold tracking-wider">
                  {metric.label}
                </div>
                <div className="font-display font-bold text-2xl sm:text-3xl text-[#5B8CFF] mt-2">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategy & Execution Blueprint */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Blueprint Content */}
          <div className="lg:col-span-8 bg-[#0A1024] border border-white/10 rounded-3xl p-6 sm:p-10 space-y-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs text-[#5B8CFF] font-bold uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                <span>EXECUTION ROADMAP</span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                How We Achieved These Results
              </h3>
              <p className="text-xs sm:text-sm text-[#AAB2C8] leading-relaxed">
                Step-by-step breakdown of the growth levers, creative testing, and funnel optimization executed for {study.client}.
              </p>
            </div>

            <div className="space-y-4">
              {study.strategy.map((step, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-4 hover:bg-white/[0.05] transition-all"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#4F7CFF]/20 text-[#5B8CFF] font-display font-bold text-sm shrink-0 border border-[#4F7CFF]/30 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">Execution Phase {idx + 1}</h4>
                    <p className="text-xs sm:text-sm text-[#AAB2C8] leading-relaxed font-normal">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Growth Levers Summary */}
            <div className="p-6 rounded-2xl bg-[#4F7CFF]/10 border border-[#4F7CFF]/20 space-y-3">
              <div className="flex items-center gap-2 text-[#5B8CFF] font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>WINGS Growth Guarantee</span>
              </div>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                Every strategy deployed for {study.client} was backed by real-time media monitoring, creative testing protocols, and conversion engineering. We apply these exact frameworks to all partner brands.
              </p>
            </div>
          </div>

          {/* Sidebar CTA Card */}
          <div className="lg:col-span-4 space-y-6 sticky top-28">
            <div className="bg-gradient-to-b from-[#0A1024] to-[#0D1530] border border-[#4F7CFF]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl glow-blue">
              <div className="p-3 rounded-2xl bg-[#4F7CFF]/20 text-[#5B8CFF] border border-[#4F7CFF]/30 w-fit">
                <Target className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-white">
                  Ready To Scale Your Brand?
                </h3>
                <p className="text-xs text-[#AAB2C8] leading-relaxed">
                  Book a free 30-minute growth audit. Our team will review your ad account and map out an actionable ROI plan.
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-white/10">
                <div className="flex items-center gap-2.5 text-xs text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free Ad Account Audit</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Custom Creative Roadmap</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>No Lock-In Contract</span>
                </div>
              </div>

              <button
                onClick={() => onOpenContact(`Strategy Session: ${study.industry}`)}
                className="w-full py-4 rounded-xl bg-[#4F7CFF] hover:bg-[#5B8CFF] text-white font-display font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Free Strategy Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* More Case Studies Section */}
        <div className="pt-12 border-t border-white/10 space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs text-[#5B8CFF] font-bold uppercase tracking-wider">Explore More Proof</div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                More Success Stories
              </h3>
            </div>

            <button
              onClick={onBack}
              className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-[#5B8CFF] hover:text-white transition-colors cursor-pointer"
            >
              <span>View All Work</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedStudies.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  onSelectCaseStudy(rel);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group relative rounded-2xl overflow-hidden bg-[#0A1024] border border-white/10 hover:border-[#4F7CFF] transition-all p-5 cursor-pointer flex flex-col justify-between hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="relative h-40 w-full rounded-xl overflow-hidden">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 text-white text-[10px] font-semibold uppercase">
                      {rel.industry}
                    </span>
                  </div>

                  <div className="text-[11px] text-[#5B8CFF] font-semibold uppercase">
                    {rel.client}
                  </div>

                  <h4 className="font-display font-bold text-base text-white group-hover:text-[#5B8CFF] transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#5B8CFF]">
                  <span>Read Story</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
