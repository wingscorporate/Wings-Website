import React, { useState, useId } from 'react';
import { Calculator, DollarSign, TrendingUp, Target, ShoppingBag, ArrowRight, RefreshCw, BarChart3, ShieldCheck, Percent } from 'lucide-react';

interface CalculatorSectionProps {
  onOpenContact: (preselectedService?: string) => void;
}

export const CalculatorSection: React.FC<CalculatorSectionProps> = ({ onOpenContact }) => {
  // Inputs state
  const [adBudget, setAdBudget] = useState<number>(100000); // e.g. 1,00,000 / $100,000
  const [targetRoas, setTargetRoas] = useState<number>(4.2); // 4.2x ROAS
  const [aov, setAov] = useState<number>(2200); // ₹2,200 / $2,200 Average Order Value
  const [currencySymbol, setCurrencySymbol] = useState<string>('₹');
  const [cogsPercent, setCogsPercent] = useState<number>(35); // 35% COGS / Product Cost

  const adBudgetId = useId();
  const targetRoasId = useId();
  const aovId = useId();
  const cogsPercentId = useId();

  // Calculations
  const projectedRevenue = adBudget * targetRoas;
  const targetCpp = aov / targetRoas; // Cost Per Purchase = AOV / ROAS
  const estimatedOrders = Math.round(projectedRevenue / (aov || 1));
  const estimatedCogs = projectedRevenue * (cogsPercent / 100);
  const netProfit = projectedRevenue - adBudget - estimatedCogs;
  const netMarginPercent = projectedRevenue > 0 ? ((netProfit / projectedRevenue) * 100).toFixed(1) : '0';

  const formatCurrency = (val: number) => {
    return `${currencySymbol}${Math.round(val).toLocaleString('en-IN')}`;
  };

  const handlePresetRoas = (roasVal: number) => {
    setTargetRoas(roasVal);
  };

  return (
    <section id="roas-calculator" className="relative py-16 sm:py-24 bg-[#050816] border-y border-white/10 overflow-hidden select-none">
      {/* Background Decorative Ambient Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#4F7CFF]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-2.5 max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#4F7CFF]/10 border border-[#4F7CFF]/20 text-[#5B8CFF] text-[10px] font-bold tracking-widest uppercase shadow-sm">
            <Calculator className="w-3 h-3" />
            <span>Interactive Performance Simulator</span>
          </div>

          <h2 className="font-display font-black text-xl sm:text-3xl lg:text-4xl text-white tracking-tight">
            E-Commerce Growth & <span className="bg-gradient-to-r from-[#5B8CFF] via-[#70A1FF] to-[#A855F7] bg-clip-text text-transparent">ROAS Calculator</span>
          </h2>

          <p className="text-[#AAB2C8] text-xs sm:text-sm leading-relaxed">
            Project your store’s scale potential. Adjust your monthly ad budget, target ROAS, and Average Order Value (AOV) to calculate target CPP, total revenue, and net profit margins.
          </p>

          {/* Currency Toggle */}
          <div className="pt-1 flex items-center justify-center gap-2">
            <span className="text-[11px] text-[#AAB2C8] font-medium">Select Currency:</span>
            <div className="inline-flex rounded-lg bg-white/5 p-0.5 border border-white/10">
              <button
                type="button"
                onClick={() => setCurrencySymbol('₹')}
                className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold transition-all ${
                  currencySymbol === '₹' ? 'bg-[#4F7CFF] text-white shadow-md' : 'text-[#AAB2C8] hover:text-white'
                }`}
              >
                ₹ INR
              </button>
              <button
                type="button"
                onClick={() => setCurrencySymbol('$')}
                className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold transition-all ${
                  currencySymbol === '$' ? 'bg-[#4F7CFF] text-white shadow-md' : 'text-[#AAB2C8] hover:text-white'
                }`}
              >
                $ USD
              </button>
            </div>
          </div>
        </div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* LEFT: Inputs & Control Panel (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0A1024]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-display font-bold text-sm sm:text-base text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-[#5B8CFF]" />
                <span>Campaign Parameters</span>
              </h3>
              <button
                type="button"
                onClick={() => {
                  setAdBudget(100000);
                  setTargetRoas(4.2);
                  setAov(2200);
                  setCogsPercent(35);
                }}
                className="text-[11px] text-[#AAB2C8] hover:text-white flex items-center gap-1 transition-colors"
                title="Reset Defaults"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* 1. Monthly Ad Budget Slider & Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor={adBudgetId} className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-[#5B8CFF]" />
                  <span>Monthly Ad Budget ({currencySymbol})</span>
                </label>
                <span className="font-display font-extrabold text-xs sm:text-sm text-[#5B8CFF]">
                  {formatCurrency(adBudget)}
                </span>
              </div>
              <input
                id={adBudgetId}
                type="range"
                min={10000}
                max={10000000}
                step={25000}
                value={adBudget}
                onChange={(e) => setAdBudget(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#4F7CFF]"
              />
              <div className="flex justify-between text-[9.5px] text-[#AAB2C8] font-mono">
                <span>{formatCurrency(10000)}</span>
                <span>{formatCurrency(5000000)}</span>
                <span>{formatCurrency(10000000)}</span>
              </div>
            </div>

            {/* 2. Target ROAS Slider & Preset Pills */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor={targetRoasId} className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>Target ROAS (Multiplier)</span>
                </label>
                <span className="font-display font-extrabold text-xs sm:text-sm text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded border border-[#22C55E]/20">
                  {targetRoas.toFixed(1)}x ROAS
                </span>
              </div>
              <input
                id={targetRoasId}
                type="range"
                min={1.0}
                max={50.0}
                step={0.1}
                value={targetRoas}
                onChange={(e) => setTargetRoas(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#22C55E]"
              />
              
              {/* ROAS Quick Presets */}
              <div className="pt-0.5 flex items-center gap-1.5 flex-wrap">
                <span className="text-[9.5px] text-[#AAB2C8]">Quick Select:</span>
                {[3.0, 5.0, 10.0, 25.0, 50.0].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handlePresetRoas(val)}
                    className={`px-2 py-0.5 rounded text-[9.5px] font-bold transition-all ${
                      targetRoas === val
                        ? 'bg-[#22C55E] text-slate-950 font-extrabold'
                        : 'bg-white/5 text-[#AAB2C8] hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {val}x
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Average Order Value (AOV) Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor={aovId} className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#A855F7]" />
                  <span>Average Order Value (AOV)</span>
                </label>
                <span className="font-display font-extrabold text-xs sm:text-sm text-[#A855F7]">
                  {formatCurrency(aov)}
                </span>
              </div>
              <input
                id={aovId}
                type="range"
                min={500}
                max={200000}
                step={500}
                value={aov}
                onChange={(e) => setAov(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#A855F7]"
              />
              <div className="flex justify-between text-[9.5px] text-[#AAB2C8] font-mono">
                <span>{formatCurrency(500)}</span>
                <span>{formatCurrency(100000)}</span>
                <span>{formatCurrency(200000)}</span>
              </div>
            </div>

            {/* 4. Product COGS Margin % */}
            <div className="space-y-1.5 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between">
                <label htmlFor={cogsPercentId} className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Est. Product COGS / Shipping %</span>
                </label>
                <span className="font-display font-bold text-xs text-[#F59E0B]">
                  {cogsPercent}%
                </span>
              </div>
              <input
                id={cogsPercentId}
                type="range"
                min={10}
                max={70}
                step={5}
                value={cogsPercent}
                onChange={(e) => setCogsPercent(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#F59E0B]"
              />
            </div>
          </div>

          {/* RIGHT: Output Dashboard & Projection Cards (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Top Highlight Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Card 1: Projected Monthly Revenue */}
              <div className="bg-gradient-to-br from-[#0A1024] to-[#0F1738] border border-[#5B8CFF]/30 hover:border-[#5B8CFF]/60 rounded-xl p-4 sm:p-4.5 shadow-xl transition-all relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#5B8CFF]/10 rounded-full blur-xl group-hover:bg-[#5B8CFF]/20 transition-all pointer-events-none" />
                <div className="text-[10px] sm:text-[11px] text-[#AAB2C8] font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>Projected Revenue</span>
                  <BarChart3 className="w-3.5 h-3.5 text-[#5B8CFF]" />
                </div>
                <div className="font-display font-black text-lg sm:text-xl lg:text-2xl xl:text-3xl text-white tracking-tight break-all">
                  {formatCurrency(projectedRevenue)}
                </div>
                <div className="mt-1.5 text-[10px] sm:text-[10.5px] text-[#5B8CFF] font-medium flex items-center gap-1">
                  <span>Generated from {formatCurrency(adBudget)} Ad Spend</span>
                </div>
              </div>

              {/* Card 2: Cost Per Purchase (CPP / CPA) */}
              <div className="bg-gradient-to-br from-[#0A1024] to-[#131138] border border-[#A855F7]/30 hover:border-[#A855F7]/60 rounded-xl p-4 sm:p-4.5 shadow-xl transition-all relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#A855F7]/10 rounded-full blur-xl group-hover:bg-[#A855F7]/20 transition-all pointer-events-none" />
                <div className="text-[10px] sm:text-[11px] text-[#AAB2C8] font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>Target CPP (Cost/Purchase)</span>
                  <Target className="w-3.5 h-3.5 text-[#A855F7]" />
                </div>
                <div className="font-display font-black text-lg sm:text-xl lg:text-2xl xl:text-3xl text-white tracking-tight break-all">
                  {formatCurrency(targetCpp)}
                </div>
                <div className="mt-1.5 text-[10px] sm:text-[10.5px] text-[#A855F7] font-medium flex items-center gap-1">
                  <span>Max allowable CPA to hit {targetRoas.toFixed(1)}x ROAS</span>
                </div>
              </div>
            </div>

            {/* Secondary Metrics & Profit Breakdown Container */}
            <div className="bg-[#0A1024]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4">
              <h4 className="font-display font-bold text-xs sm:text-sm text-white border-b border-white/10 pb-2.5 flex items-center justify-between">
                <span>Unit Economics & Revenue Breakdown</span>
                <span className="text-[10px] text-[#22C55E] font-extrabold bg-[#22C55E]/10 px-2 py-0.5 rounded-full border border-[#22C55E]/20">
                  Est. {netMarginPercent}% Net Margin
                </span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {/* Orders */}
                <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-0.5">
                  <div className="text-[10px] text-[#AAB2C8] font-medium">Estimated Orders</div>
                  <div className="font-display font-bold text-sm sm:text-base text-white">
                    {estimatedOrders.toLocaleString('en-IN')} <span className="text-[10px] font-normal text-[#AAB2C8]">orders</span>
                  </div>
                </div>

                {/* Net Profit */}
                <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-0.5">
                  <div className="text-[10px] text-[#AAB2C8] font-medium">Estimated Net Profit</div>
                  <div className={`font-display font-bold text-sm sm:text-base ${netProfit >= 0 ? 'text-[#22C55E]' : 'text-red-400'}`}>
                    {formatCurrency(netProfit)}
                  </div>
                </div>

                {/* Product COGS */}
                <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-0.5 col-span-2 sm:col-span-1">
                  <div className="text-[10px] text-[#AAB2C8] font-medium">Est. COGS Cost</div>
                  <div className="font-display font-bold text-sm sm:text-base text-[#F59E0B]">
                    {formatCurrency(estimatedCogs)}
                  </div>
                </div>
              </div>

              {/* Visual Proportion Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[10px] text-[#AAB2C8] font-medium">
                  <span>Revenue Structure Breakdown</span>
                  <span>100% Total Revenue</span>
                </div>
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden flex border border-white/10">
                  <div
                    style={{ width: `${Math.min(100, (adBudget / projectedRevenue) * 100)}%` }}
                    className="bg-[#4F7CFF] h-full transition-all duration-500"
                    title={`Ad Spend: ${formatCurrency(adBudget)}`}
                  />
                  <div
                    style={{ width: `${Math.min(100 - (adBudget / projectedRevenue) * 100, (estimatedCogs / projectedRevenue) * 100)}%` }}
                    className="bg-[#F59E0B] h-full transition-all duration-500"
                    title={`COGS: ${formatCurrency(estimatedCogs)}`}
                  />
                  <div
                    style={{ width: `${Math.max(0, (netProfit / projectedRevenue) * 100)}%` }}
                    className="bg-[#22C55E] h-full transition-all duration-500"
                    title={`Net Profit: ${formatCurrency(netProfit)}`}
                  />
                </div>
                <div className="flex items-center gap-3.5 text-[9.5px] text-[#AAB2C8] font-medium pt-0.5 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#4F7CFF]" />
                    <span>Ad Spend ({((adBudget / projectedRevenue) * 100).toFixed(0)}%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                    <span>COGS ({cogsPercent}%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                    <span>Net Profit ({netMarginPercent}%)</span>
                  </div>
                </div>
              </div>

              {/* Bottom Conversion Assured Note & CTA */}
              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-[11px] text-[#AAB2C8]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                  <span>WINGS Performance Assured: Scale profitably without burning ad budget.</span>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenContact(`ROAS Simulator - Target ${targetRoas.toFixed(1)}x ROAS (${formatCurrency(adBudget)} budget)`)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#3B66F5] hover:from-[#5B8CFF] hover:to-[#4F7CFF] text-white font-display font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all cursor-pointer group shrink-0"
                >
                  <span>Scale To This ROAS</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
