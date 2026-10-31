import React from 'react';
import { Building, Globe, AlertCircle, HelpCircle, Star, MessageSquare } from 'lucide-react';
import { BusinessRecord } from '../types/business';

interface SummaryCardsProps {
  businesses: BusinessRecord[];
  onSelectStatusFilter?: (status: 'All' | 'Found' | 'Not Found' | 'Unclear') => void;
  selectedStatus?: string;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  businesses,
  onSelectStatusFilter,
  selectedStatus = 'All'
}) => {
  const total = businesses.length;
  const found = businesses.filter((b) => b.websiteStatus === 'Found');
  const notFound = businesses.filter((b) => b.websiteStatus === 'Not Found');
  const unclear = businesses.filter((b) => b.websiteStatus === 'Unclear');

  const foundPct = total > 0 ? ((found.length / total) * 100).toFixed(1) : '0.0';
  const notFoundPct = total > 0 ? ((notFound.length / total) * 100).toFixed(1) : '0.0';
  const unclearPct = total > 0 ? ((unclear.length / total) * 100).toFixed(1) : '0.0';

  // Average ratings and reviews comparison
  const avgRatingAll = total > 0 ? (businesses.reduce((acc, b) => acc + b.rating, 0) / total).toFixed(1) : '0.0';
  
  const avgRatingNoWeb = notFound.length > 0 
    ? (notFound.reduce((acc, b) => acc + b.rating, 0) / notFound.length).toFixed(1) 
    : '0.0';
  
  const avgReviewsNoWeb = notFound.length > 0
    ? Math.round(notFound.reduce((acc, b) => acc + b.reviewCount, 0) / notFound.length)
    : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Businesses Card */}
      <div 
        onClick={() => onSelectStatusFilter && onSelectStatusFilter('All')}
        className={`relative bg-slate-900/60 backdrop-blur-sm rounded-2xl p-5 border transition-all duration-300 cursor-pointer overflow-hidden group ${
          selectedStatus === 'All' 
            ? 'border-cyan-500/50 shadow-lg shadow-cyan-500/10' 
            : 'border-slate-700/50 hover:border-slate-600/70 hover:shadow-lg hover:shadow-slate-900/50'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Total Researched
          </span>
          <div className="p-2 bg-slate-800/80 rounded-xl text-cyan-400 border border-slate-700/50">
            <Building className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-4xl font-extrabold text-slate-100 tracking-tight tabular-nums">{total}</span>
          <span className="text-xs text-slate-500 font-medium">businesses</span>
        </div>
        <div className="mt-3 pt-3 text-xs text-slate-500 flex items-center justify-between border-t border-slate-700/40">
          <span>CHD: <strong className="text-slate-300">{businesses.filter(b => b.city === 'Chandigarh').length}</strong> | MOH: <strong className="text-slate-300">{businesses.filter(b => b.city === 'Mohali').length}</strong></span>
          <span className="text-cyan-400 font-semibold">{avgRatingAll}★ Avg</span>
        </div>
      </div>

      {/* Website Found Card */}
      <div 
        onClick={() => onSelectStatusFilter && onSelectStatusFilter('Found')}
        className={`relative bg-slate-900/60 backdrop-blur-sm rounded-2xl p-5 border transition-all duration-300 cursor-pointer overflow-hidden group ${
          selectedStatus === 'Found' 
            ? 'border-emerald-500/50 shadow-lg shadow-emerald-500/10' 
            : 'border-slate-700/50 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-900/20'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-widest">
            Website Found
          </span>
          <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
            <Globe className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-4xl font-extrabold text-emerald-400 tracking-tight tabular-nums">{found.length}</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
            {foundPct}%
          </span>
        </div>
        <div className="mt-3 pt-3 text-xs flex items-center justify-between border-t border-slate-700/40">
          <span className="text-slate-500">Official site verified</span>
          <span className="text-emerald-400 font-medium">Active presence</span>
        </div>
      </div>

      {/* Website Not Found Card */}
      <div 
        onClick={() => onSelectStatusFilter && onSelectStatusFilter('Not Found')}
        className={`relative bg-slate-900/60 backdrop-blur-sm rounded-2xl p-5 border transition-all duration-300 cursor-pointer overflow-hidden group ${
          selectedStatus === 'Not Found' 
            ? 'border-rose-500/50 shadow-lg shadow-rose-500/10' 
            : 'border-slate-700/50 hover:border-rose-500/30 hover:shadow-lg hover:shadow-rose-900/20'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-rose-500/80 uppercase tracking-widest">
            Website Not Found
          </span>
          <div className="p-2 bg-rose-500/10 rounded-xl text-rose-400 border border-rose-500/20">
            <AlertCircle className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-4xl font-extrabold text-rose-400 tracking-tight tabular-nums">{notFound.length}</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/25">
            {notFoundPct}%
          </span>
        </div>
        <div className="mt-3 pt-3 text-xs flex items-center justify-between border-t border-slate-700/40">
          <span className="flex items-center gap-1 text-rose-400 font-medium">
            Avg: <Star className="w-3 h-3 text-amber-400 fill-amber-400 inline" /> {avgRatingNoWeb}
          </span>
          <span className="flex items-center gap-1 text-slate-500">
            <MessageSquare className="w-3 h-3 inline" /> {avgReviewsNoWeb} revs avg
          </span>
        </div>
      </div>

      {/* Unclear Status Card */}
      <div 
        onClick={() => onSelectStatusFilter && onSelectStatusFilter('Unclear')}
        className={`relative bg-slate-900/60 backdrop-blur-sm rounded-2xl p-5 border transition-all duration-300 cursor-pointer overflow-hidden group ${
          selectedStatus === 'Unclear' 
            ? 'border-amber-500/50 shadow-lg shadow-amber-500/10' 
            : 'border-slate-700/50 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-900/20'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-amber-500/80 uppercase tracking-widest">
            Unclear Status
          </span>
          <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400 border border-amber-500/20">
            <HelpCircle className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-4xl font-extrabold text-amber-400 tracking-tight tabular-nums">{unclear.length}</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/25">
            {unclearPct}%
          </span>
        </div>
        <div className="mt-3 pt-3 text-xs flex items-center justify-between border-t border-slate-700/40">
          <span className="text-slate-500">Ambiguous or directory-only</span>
          <span className="text-amber-400 font-medium">Needs audit</span>
        </div>
      </div>
    </div>
  );
};
