import React from 'react';
import { 
  Lightbulb, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Compass, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { BusinessRecord } from '../types/business';

interface InsightsSectionProps {
  businesses: BusinessRecord[];
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ businesses }) => {
  const total = businesses.length || 1;
  const notFound = businesses.filter((b) => b.websiteStatus === 'Not Found');
  const unclear = businesses.filter((b) => b.websiteStatus === 'Unclear');
  const notFoundPct = ((notFound.length / total) * 100).toFixed(1);

  // Category with highest % of not found
  const catStats: Record<string, { total: number; notFound: number }> = {};
  businesses.forEach((b) => {
    if (!catStats[b.category]) catStats[b.category] = { total: 0, notFound: 0 };
    catStats[b.category].total++;
    if (b.websiteStatus === 'Not Found') catStats[b.category].notFound++;
  });

  let highestGapCategory = 'General';
  let highestGapPct = 0;
  Object.entries(catStats).forEach(([cat, s]) => {
    if (s.total >= 3) {
      const pct = (s.notFound / s.total) * 100;
      if (pct > highestGapPct) {
        highestGapPct = pct;
        highestGapCategory = cat;
      }
    }
  });

  // Count high rating businesses lacking a site
  const highRatedNoWeb = notFound.filter((b) => b.rating >= 4.4 && b.reviewCount >= 30).length;

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 space-y-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-700/50 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-400 border border-amber-500/20 shadow-inner flex items-center justify-center">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              Key Analytical Insights & Strategic Recommendations
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Evidence-based findings derived from active dataset verification</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm">
          Data-Driven Action Plan
        </span>
      </div>

      {/* 3 Core Analytical Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Insight 1: Digital Presence Deficit */}
        <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-rose-500/30 flex flex-col justify-between transition-all duration-300 group hover:shadow-lg hover:shadow-rose-950/20">
          <div>
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2.5">
              <AlertCircle className="w-4 h-4" />
              <span>Digital Gap Metric</span>
            </div>
            <h4 className="text-base font-bold text-slate-100 mb-2 group-hover:text-rose-300 transition-colors">
              {notFoundPct}% Have No Official Website
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Out of {total} researched businesses, <strong className="text-slate-200">{notFound.length}</strong> lack an official standalone website. Many rely exclusively on 3rd-party directory aggregator profiles (Practo, Justdial, Zomato) which charge commissions and lack custom branding.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-700/50 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Unclear cases: {unclear.length}</span>
            <span className="text-rose-400 font-semibold">{notFound.length} prime prospects</span>
          </div>
        </div>

        {/* Insight 2: Vulnerable Sector */}
        <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-amber-500/30 flex flex-col justify-between transition-all duration-300 group hover:shadow-lg hover:shadow-amber-950/20">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2.5">
              <TrendingUp className="w-4 h-4" />
              <span>Highest Opportunity Sector</span>
            </div>
            <h4 className="text-base font-bold text-slate-100 mb-2 group-hover:text-amber-300 transition-colors">
              {highestGapCategory} ({highestGapPct.toFixed(0)}% Gap)
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sector-level analysis shows that <strong className="text-slate-200">{highestGapCategory}</strong> businesses have the lowest rate of independent digital adoption, despite strong footfall and customer referrals.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-700/50 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Locality cluster: High density</span>
            <span className="text-amber-400 font-semibold">Priority target</span>
          </div>
        </div>

        {/* Insight 3: High-Reputation Conversion Opportunity */}
        <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-cyan-500/30 flex flex-col justify-between transition-all duration-300 group hover:shadow-lg hover:shadow-cyan-950/20">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>The Reputation Advantage</span>
            </div>
            <h4 className="text-base font-bold text-slate-100 mb-2 group-hover:text-cyan-300 transition-colors">
              {highRatedNoWeb} High-Rated Unconverted Listings
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              At least <strong className="text-slate-200">{highRatedNoWeb}</strong> businesses maintain exceptional customer satisfaction (≥ 4.4★ and 30+ reviews) without an owned website. They have proven market demand and could immediately monetize organic web traffic.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-700/50 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Rating threshold: ≥ 4.4★</span>
            <span className="text-cyan-400 font-semibold">Ready for rollout</span>
          </div>
        </div>
      </div>

      {/* Practical Actionable Recommendations Roadmap */}
      <div className="pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3.5 flex items-center gap-2">
          <Compass className="w-4 h-4 text-cyan-400" />
          <span>Recommended 4-Step Strategic Roadmap for Local Businesses</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 text-xs hover:border-cyan-500/40 transition-all hover:bg-cyan-500/10">
            <div className="flex items-center gap-2 font-bold text-cyan-300 mb-1.5">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 flex items-center justify-center text-[10px]">1</span>
              <span>Lightweight Web Presence</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Deploy a fast, single-page, mobile-responsive landing page showcasing core services, opening hours, verified physical address, and instant WhatsApp inquiry.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 text-xs hover:border-blue-500/40 transition-all hover:bg-blue-500/10">
            <div className="flex items-center gap-2 font-bold text-blue-300 mb-1.5">
              <span className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 flex items-center justify-center text-[10px]">2</span>
              <span>Google Listing Sync</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Link the new verified URL into the Google Maps profile. Configure Google Maps action buttons: "Menu", "Book an Appointment", or "Request a Quote".
            </p>
          </div>

          <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 text-xs hover:border-indigo-500/40 transition-all hover:bg-indigo-500/10">
            <div className="flex items-center gap-2 font-bold text-indigo-300 mb-1.5">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 flex items-center justify-center text-[10px]">3</span>
              <span>Local SEO Schema</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Implement Schema.org LocalBusiness markup on the website to ensure structured hours, geographic coordinates, and phone consistency across search engines.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-purple-500/20 bg-purple-500/5 text-xs hover:border-purple-500/40 transition-all hover:bg-purple-500/10">
            <div className="flex items-center gap-2 font-bold text-purple-300 mb-1.5">
              <span className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 flex items-center justify-center text-[10px]">4</span>
              <span>Direct Customer Capture</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Reduce dependence on commission-based portals (20-30% food aggregator fees, healthcare lead broker cuts) by offering direct-order incentives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
