import React, { useState } from 'react';
import { Calculator, Sparkles, TrendingUp, ArrowRight, DollarSign, Zap } from 'lucide-react';

interface RoasCalculatorProps {
  onOpenContact: () => void;
}

export const RoasCalculator: React.FC<RoasCalculatorProps> = ({ onOpenContact }) => {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(2000000); // 20 Lakhs default
  const [monthlySpend, setMonthlySpend] = useState<number>(400000); // 4 Lakhs default
  const [currentRoas, setCurrentRoas] = useState<number>(2.5);

  // Calculations
  const wingsProjectedRoas = Math.min(Math.max(currentRoas * 1.85, 4.5), 7.2);
  const projectedMonthlyRevenue = monthlySpend * wingsProjectedRoas;
  const netMonthlyRevenueGain = projectedMonthlyRevenue - monthlyRevenue;
  const projectedAnnualRevenueGain = netMonthlyRevenueGain * 12;

  const formatCurrency = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(1)} Lakhs`;
    }
    return `₹${Math.round(val).toLocaleString('en-IN')}`;
  };

  return (
    <section className="py-20 bg-[#050505] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0D0B18] via-[#120E22] to-[#0A0914] border border-purple-500/30 shadow-2xl">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest text-purple-400 uppercase mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>INTERACTIVE ROI ESTIMATOR</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight">
              Calculate Your Brand's Revenue Growth Potential
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-2">
              Adjust your current monthly metrics to see projected revenue gains with WINGS performance optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Controls Left Column */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Slider 1: Monthly Ad Spend */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs text-neutral-300 font-semibold">
                  <span>Current Monthly Ad Spend</span>
                  <span className="text-purple-400 font-mono font-bold text-sm">{formatCurrency(monthlySpend)}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="10000000"
                  step="50000"
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-[10px] text-neutral-500">
                  <span>₹50K</span>
                  <span>₹1 Crore</span>
                </div>
              </div>

              {/* Slider 2: Current Monthly Store Revenue */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs text-neutral-300 font-semibold">
                  <span>Current Monthly Store Revenue</span>
                  <span className="text-purple-400 font-mono font-bold text-sm">{formatCurrency(monthlyRevenue)}</span>
                </div>
                <input
                  type="range"
                  min="200000"
                  max="50000000"
                  step="200000"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-[10px] text-neutral-500">
                  <span>₹2 Lakhs</span>
                  <span>₹5 Crores</span>
                </div>
              </div>

              {/* Slider 3: Current ROAS */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs text-neutral-300 font-semibold">
                  <span>Current Ad Blended ROAS</span>
                  <span className="text-purple-400 font-mono font-bold text-sm">{currentRoas.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.1"
                  value={currentRoas}
                  onChange={(e) => setCurrentRoas(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-[10px] text-neutral-500">
                  <span>1.0x</span>
                  <span>5.0x</span>
                </div>
              </div>

            </div>

            {/* Results Output Right Column */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-neutral-950/90 border border-purple-500/40 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-bold uppercase text-purple-400 tracking-wider">
                  WINGS Projected Target
                </span>
                <span className="text-xs text-emerald-400 font-mono font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                  +{((wingsProjectedRoas / currentRoas - 1) * 100).toFixed(0)}% Efficiency
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-neutral-900/80 border border-white/5">
                  <div className="text-[10px] uppercase text-neutral-400 font-semibold mb-1">Target ROAS</div>
                  <div className="font-display font-extrabold text-2xl text-purple-300">
                    {wingsProjectedRoas.toFixed(2)}x
                  </div>
                  <div className="text-[10px] text-purple-400 font-medium">Engineered Baseline</div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900/80 border border-white/5">
                  <div className="text-[10px] uppercase text-neutral-400 font-semibold mb-1">New Monthly Rev</div>
                  <div className="font-display font-extrabold text-2xl text-emerald-400">
                    {formatCurrency(projectedMonthlyRevenue)}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-medium">Estimated Monthly</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-purple-950/50 border border-purple-700/40 text-center">
                <div className="text-xs text-purple-300 font-semibold uppercase tracking-wider mb-1">
                  Estimated Annual Revenue Gain
                </div>
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                  {formatCurrency(Math.max(projectedAnnualRevenueGain, 0))}
                </div>
                <p className="text-[11px] text-neutral-400 mt-1">
                  Based on historical client portfolio growth averages.
                </p>
              </div>

              <button
                onClick={onOpenContact}
                className="w-full py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-display font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-900/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Claim This Growth Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
