import React from 'react';
import { ArrowRight, ArrowUpRight, Sparkles, TrendingUp, ShieldCheck, Zap, BarChart3, ArrowUpRight as ArrowUp, DollarSign, Activity, CheckCircle2, Phone } from 'lucide-react';

const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893 0-3.18-1.238-6.167-3.488-8.415z"/>
  </svg>
);

interface HeroProps {
  onStartProject: () => void;
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject, onExploreWork }) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden bg-[#050816]">
      {/* Background Animated Ambient Lights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#4F7CFF]/15 rounded-full blur-[150px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#8B5CF6]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-blue-900/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-3 h-3 rounded-full bg-blue-400/60 animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full bg-purple-400/40 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-blue-300/50 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Main small label */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1024] border border-[#4F7CFF]/30 text-[#5B8CFF] text-[11px] sm:text-xs font-semibold tracking-wider uppercase shadow-lg backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>PERFORMANCE MARKETING THAT DRIVES REAL GROWTH</span>
            </div>

            {/* Main headline */}
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white leading-[1.08]">
              Scale Your E-Commerce Brand With Marketing That{' '}
              <span className="bg-gradient-to-r from-[#5B8CFF] via-indigo-300 to-[#8B5CF6] bg-clip-text text-transparent font-extrabold">
                Actually Performs.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-[#AAB2C8] font-normal leading-relaxed max-w-2xl">
              We help ambitious brands scale profitably through high-converting funnels, performance marketing, creative strategy, and data-driven optimization.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={onStartProject}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-semibold tracking-wide text-white bg-[#4F7CFF] hover:bg-[#5B8CFF] rounded-full transition-all duration-300 shadow-xl shadow-blue-600/30 glow-blue hover:scale-[1.02] cursor-pointer shrink-0"
              >
                <span>Book Free Strategy Call</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreWork}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold tracking-wide text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/15 hover:border-white/30 transition-all duration-300 backdrop-blur-md cursor-pointer shrink-0"
              >
                <span>Explore Featured Work</span>
              </button>
            </div>

            {/* Trust line */}
            <div className="pt-4 flex items-center gap-3 text-xs text-[#AAB2C8]">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 border border-[#050816] flex items-center justify-center text-[10px] font-bold text-white">AM</div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 border border-[#050816] flex items-center justify-center text-[10px] font-bold text-white">RS</div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-600 border border-[#050816] flex items-center justify-center text-[10px] font-bold text-white">AK</div>
              </div>
              <span>Trusted by growing brands and ambitious entrepreneurs</span>
            </div>
          </div>

          {/* Right Column - Premium Marketing Analytics Dashboard */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            {/* Glow backing */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#4F7CFF]/20 to-[#8B5CF6]/20 rounded-3xl blur-2xl pointer-events-none" />

            {/* Main Dashboard Card */}
            <div className="relative rounded-3xl bg-[#0A1024]/80 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
              
              {/* Header bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#4F7CFF]/20 text-[#5B8CFF]">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-white">Wings Growth Engine v2.4</h3>
                    <p className="text-[10px] text-[#AAB2C8]">Active Campaign: D2C Festive Scaling — Advantage+ ASC</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live
                </span>
              </div>

              {/* Grid Metrics */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Metric 1 */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1 relative overflow-hidden group hover:border-[#4F7CFF]/40 transition-colors">
                  <span className="text-[10px] uppercase font-bold text-[#AAB2C8] block truncate">Total Sales Generated</span>
                  <div className="font-display font-bold text-lg sm:text-xl md:text-2xl text-white tracking-tight break-all">₹60,84,550</div>
                  <div className="text-[10.5px] text-emerald-400 font-semibold flex items-center gap-1 pt-1">
                    <TrendingUp className="w-3 h-3 shrink-0" />
                    <span className="truncate">+340% vs prior campaign</span>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1 relative overflow-hidden group hover:border-[#8B5CF6]/40 transition-colors">
                  <span className="text-[10px] uppercase font-bold text-[#AAB2C8]">Campaign ROAS</span>
                  <div className="font-display font-bold text-2xl text-[#8B5CF6]">5.82x</div>
                  <div className="text-[11px] text-purple-300 font-semibold flex items-center gap-1 pt-1">
                    <Zap className="w-3 h-3" />
                    <span>Target: 3.5x Achieved</span>
                  </div>
                </div>

              </div>

              {/* Analytics Chart Visualization */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#AAB2C8]">
                  <span>Ad Spend: <strong className="text-white">₹5.82L</strong></span>
                  <span className="font-bold text-white">4,210 Orders • 9,500+ Purchases</span>
                </div>

                {/* Simulated Bar Graph */}
                <div className="h-24 flex items-end justify-between gap-2 pt-2">
                  {[35, 48, 42, 65, 58, 82, 95, 88, 100].map((h, idx) => (
                    <div key={idx} className="w-full bg-white/5 rounded-t-sm relative group h-full flex items-end">
                      <div
                        className="w-full bg-gradient-to-t from-[#4F7CFF] to-[#8B5CF6] rounded-t-sm transition-all duration-500 group-hover:brightness-125"
                        style={{ height: `${h}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating UI Badges */}
              <div className="pt-2 flex items-center justify-between text-xs text-[#AAB2C8] border-t border-white/5">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5B8CFF]" />
                  <span>Meta Ads & Shopify Synced</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-purple-400" />
                  <span>₹45.90 CPL B2B & High Intent</span>
                </div>
              </div>

            </div>

            {/* Floating Card 1 */}
            <div className="absolute -bottom-6 -left-6 p-4 rounded-2xl bg-[#0A1024] border border-[#4F7CFF]/40 shadow-2xl backdrop-blur-xl animate-float hidden sm:flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-[#AAB2C8]">Single Campaign Scale</div>
                <div className="font-display font-bold text-sm text-white">₹60.8L+ Sales in 22 Days</div>
              </div>
            </div>

            {/* Floating Card 2 */}
            <div className="absolute -top-6 -right-6 p-3.5 rounded-2xl bg-[#0A1024] border border-[#8B5CF6]/40 shadow-2xl backdrop-blur-xl animate-float hidden sm:flex items-center gap-3" style={{ animationDelay: '3s' }}>
              <div className="p-2 rounded-xl bg-[#8B5CF6]/20 text-purple-300">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-[#AAB2C8]">System Status</div>
                <div className="font-display font-bold text-xs text-white">100K+ Customers Reached</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
