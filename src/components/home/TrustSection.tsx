import React from 'react';
import { ShieldCheck, MapPin, Database, CheckCircle2 } from 'lucide-react';

interface TrustSectionProps {
  totalBusinesses?: number;
  chandigarhCount?: number;
  mohaliCount?: number;
  websiteNotFoundCount?: number;
  websiteFoundCount?: number;
}

export const TrustSection: React.FC<TrustSectionProps> = ({
  totalBusinesses = 325,
  chandigarhCount = 166,
  mohaliCount = 159,
  websiteNotFoundCount = 239,
  websiteFoundCount = 68,
}) => {
  const percentageNotFound = ((websiteNotFoundCount / totalBusinesses) * 100).toFixed(1);

  return (
    <section className="relative py-12 border-y border-white/[0.08] bg-[#060F1E]/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Note */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% Genuine Researched Dataset • Verified October 2026</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Data-Driven Marketplace Grounded in Local Market Realities
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Every business record in NAVIRA is source-verified from on-ground Google Maps audits across Mohali and Chandigarh.
          </p>
        </div>

        {/* 4 Key Verified Stat Cards (Exact verified figures: 325 total, 166 CHD, 159 MOH, 239 no website, 68 website found) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Stat 1 */}
          <div className="p-5 rounded-2xl bg-[#09152A]/80 border border-white/[0.08] shadow-lg hover:border-[#19BDF0]/30 transition-all group">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Total Researched</span>
              <Database className="w-4 h-4 text-[#19BDF0] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {totalBusinesses}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
              <span className="text-[#19BDF0] font-semibold">{chandigarhCount}</span> CHD •{' '}
              <span className="text-emerald-400 font-semibold">{mohaliCount}</span> MOH
            </div>
          </div>

          {/* Stat 2 */}
          <div className="p-5 rounded-2xl bg-[#09152A]/80 border border-white/[0.08] shadow-lg hover:border-rose-500/30 transition-all group">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Website Not Found</span>
              <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                {percentageNotFound}%
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-rose-400 tracking-tight">
              {websiteNotFoundCount}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              High-priority clients ready for modern websites
            </div>
          </div>

          {/* Stat 3 */}
          <div className="p-5 rounded-2xl bg-[#09152A]/80 border border-white/[0.08] shadow-lg hover:border-[#19BDF0]/30 transition-all group">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Covered Localities</span>
              <MapPin className="w-4 h-4 text-[#19BDF0] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              25
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Key sectors in Chandigarh & phases in Mohali
            </div>
          </div>

          {/* Stat 4 */}
          <div className="p-5 rounded-2xl bg-[#09152A]/80 border border-white/[0.08] shadow-lg hover:border-emerald-500/30 transition-all group">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Verified Presence</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 tracking-tight">
              {websiteFoundCount}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Active verified official website benchmarks
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
