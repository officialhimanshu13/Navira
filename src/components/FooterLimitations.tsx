import React from 'react';
import { ShieldCheck, AlertTriangle, FileText, Calendar } from 'lucide-react';

interface FooterLimitationsProps {
  collectionDate: string;
  studyArea: string;
}

export const FooterLimitations: React.FC<FooterLimitationsProps> = ({ collectionDate, studyArea }) => {
  return (
    <footer className="mt-8 border border-slate-700/50 bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-4 text-xs text-slate-400">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Verification Definition */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-200">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <FileText className="w-4 h-4" />
            </div>
            <span>Definition of 'Website Not Found'</span>
          </div>
          <p className="leading-relaxed text-slate-400">
            A missing website link on a Google Maps listing does <strong className="text-slate-200">not</strong> automatically mean no website exists. Every entry classified as <em className="text-rose-400 font-medium">'Not Found'</em> has undergone targeted search engine queries using the business title and locality. Entries with ambiguous directory profiles or inactive pages are classified as <em className="text-amber-400 font-medium">'Unclear'</em>.
          </p>
        </div>

        {/* Methodology & Limitations */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-200">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <span>Scope & Analytical Limitations</span>
          </div>
          <p className="leading-relaxed text-slate-400">
            Ratings and review counts reflect public sentiment at the time of observation (<span className="text-slate-300 font-medium">{collectionDate}</span>) and may fluctuate. The opportunity score is an academic screening tool for digital prioritization, not a commercial guarantee of revenue growth. Results represent the studied sample in <span className="text-slate-300 font-medium">{studyArea}</span>.
          </p>
        </div>

        {/* Ethical Standards & Compliance */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-200">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span>Ethics & Compliance Notice</span>
          </div>
          <p className="leading-relaxed text-slate-400">
            This project uses solely publicly visible business listings in compliance with platform terms and applicable guidelines. No personal login credentials, private contact details, or prohibited high-volume automated scrapers were used.
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
        <p>
          Google Maps Business Analysis — Local Digital Presence & Decision Framework
        </p>
        <p className="flex items-center gap-1.5 text-slate-400">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span>Last Audited: <span className="text-slate-300 font-medium">{collectionDate}</span></span>
        </p>
      </div>
    </footer>
  );
};
