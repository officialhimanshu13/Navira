import React, { useState } from 'react';
import { 
  Star, 
  ExternalLink, 
  Sparkles, 
  Search, 
  ArrowUpDown, 
  Edit3, 
  Globe, 
  AlertCircle, 
  HelpCircle,
  Award,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';
import { BusinessRecord } from '../types/business';
import { rankBusinesses } from '../utils/scoring';

interface OpportunityTableProps {
  businesses: BusinessRecord[];
  onSelectBusiness: (business: BusinessRecord) => void;
  onEditBusiness: (business: BusinessRecord) => void;
}

export const OpportunityTable: React.FC<OpportunityTableProps> = ({
  businesses,
  onSelectBusiness,
  onEditBusiness
}) => {
  const [viewMode, setViewMode] = useState<'top10' | 'all'>('top10');
  const [sortField, setSortField] = useState<'opportunityScore' | 'rating' | 'reviewCount' | 'businessName'>('opportunityScore');
  const [sortAsc, setSortAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredReasonId, setHoveredReasonId] = useState<string | null>(null);

  const pageSize = 10;

  // Sorting
  const sorted = [...businesses].sort((a, b) => {
    let comparison = 0;
    if (sortField === 'opportunityScore') comparison = b.opportunityScore - a.opportunityScore;
    else if (sortField === 'rating') comparison = b.rating - a.rating;
    else if (sortField === 'reviewCount') comparison = b.reviewCount - a.reviewCount;
    else if (sortField === 'businessName') comparison = a.businessName.localeCompare(b.businessName);
    return sortAsc ? -comparison : comparison;
  });

  const displayList = viewMode === 'top10' 
    ? rankBusinesses(businesses).slice(0, 10)
    : sorted;

  const totalPages = Math.ceil(displayList.length / pageSize) || 1;
  const paginatedItems = viewMode === 'top10' 
    ? displayList 
    : displayList.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const getStatusBadge = (status: BusinessRecord['websiteStatus']) => {
    switch (status) {
      case 'Found':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
            <Globe className="w-3 h-3" /> Found
          </span>
        );
      case 'Not Found':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/25">
            <AlertCircle className="w-3 h-3" /> Not Found
          </span>
        );
      case 'Unclear':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/25">
            <HelpCircle className="w-3 h-3" /> Unclear
          </span>
        );
    }
  };

  const getScoreBadge = (score: number) => {
    let colorClass = 'bg-slate-700/60 text-slate-400 border-slate-600/40';
    if (score >= 8) colorClass = 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold';
    else if (score >= 6) colorClass = 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-semibold';
    else if (score >= 4) colorClass = 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';

    return (
      <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-xs border ${colorClass}`}>
        {score} / 10
      </span>
    );
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
      {/* Table Header and Tab Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-700/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-800/30">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-100">
              {viewMode === 'top10' ? 'Top 10 Priority Follow-Up Opportunities' : 'Researched Businesses Dataset'}
            </h3>
            {viewMode === 'top10' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/25">
                <Award className="w-3 h-3" /> Ranked by 10-pt Rubric
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {viewMode === 'top10'
              ? 'Ranked candidate businesses that lack official websites and have high potential for digital growth'
              : `Showing ${businesses.length} total active records in current filtered view`}
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 text-xs">
            <button
              onClick={() => {
                setViewMode('top10');
                setCurrentPage(1);
              }}
              id="tab-top10"
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                viewMode === 'top10'
                  ? 'bg-slate-700 text-slate-100 shadow-sm font-semibold'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Top 10 Opportunities</span>
            </button>

            <button
              onClick={() => {
                setViewMode('all');
                setCurrentPage(1);
              }}
              id="tab-all-records"
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                viewMode === 'all'
                  ? 'bg-slate-700 text-slate-100 shadow-sm font-semibold'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              All Records ({businesses.length})
            </button>
          </div>
        </div>
      </div>

      {/* Table Component */}
      {paginatedItems.length === 0 ? (
        <div className="p-12 text-center text-slate-500">
          <Search className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-400">No businesses match the active filter criteria</p>
          <p className="text-xs text-slate-600 mt-1">Try resetting filters or adjusting search terms.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/80 sticky top-0 border-b border-slate-700/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th 
                  className="py-3 px-4 cursor-pointer hover:text-slate-200"
                  onClick={() => handleSort('businessName')}
                >
                  <div className="flex items-center gap-1">
                    <span>Business Name</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Locality</th>
                <th 
                  className="py-3 px-3 cursor-pointer hover:text-slate-200"
                  onClick={() => handleSort('rating')}
                >
                  <div className="flex items-center gap-1">
                    <span>Rating & Reviews</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th className="py-3 px-3">Website Status</th>
                <th 
                  className="py-3 px-3 cursor-pointer hover:text-slate-200 text-center"
                  onClick={() => handleSort('opportunityScore')}
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>Opportunity Score</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th className="py-3 px-4">Evaluation Rationale & Next Step</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50 text-xs">
              {paginatedItems.map((b, idx) => {
                const rankNum = viewMode === 'top10' ? idx + 1 : (currentPage - 1) * pageSize + idx + 1;
                const isTop10Rank = rankNum <= 10;

                return (
                  <tr 
                    key={b.businessId}
                    className={`hover:bg-slate-700/30 transition-colors group ${idx % 2 === 0 ? 'bg-slate-900/40' : 'bg-slate-800/20'}`}
                  >
                    {/* Rank / Number */}
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                        isTop10Rank && viewMode === 'top10'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'text-slate-500 bg-slate-800/60'
                      }`}>
                        {rankNum}
                      </span>
                    </td>

                    {/* Business Name */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">
                        {b.businessName}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                        <span className="font-mono text-[10px] text-slate-600">{b.businessId}</span>
                        {b.phone && <span>• {b.phone}</span>}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-3">
                      <span className="inline-block px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 font-medium text-[11px] border border-slate-700/50">
                        {b.category}
                      </span>
                    </td>

                    {/* Locality & City */}
                    <td className="py-3 px-3 text-slate-400">
                      <div className="font-semibold text-slate-200">{b.locality}</div>
                      <div className="text-[10px] text-cyan-500 font-medium flex items-center gap-1">
                        <span>{b.city}</span>
                        {b.recordVerificationStatus === 'Verified Real Business' && (
                          <span className="text-[9px] px-1 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">Verified</span>
                        )}
                      </div>
                    </td>

                    {/* Rating & Reviews */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-medium text-slate-300">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>{b.rating.toFixed(1)}</span>
                        <span className="text-slate-500 text-[11px]">({b.reviewCount} revs)</span>
                      </div>
                    </td>

                    {/* Website Status */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      {getStatusBadge(b.websiteStatus)}
                    </td>

                    {/* Opportunity Score */}
                    <td className="py-3 px-3 text-center whitespace-nowrap relative">
                      <div 
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredReasonId(b.businessId)}
                        onMouseLeave={() => setHoveredReasonId(null)}
                      >
                        {getScoreBadge(b.opportunityScore)}
                        <span className="block text-[10px] text-slate-500 hover:text-slate-400 underline decoration-dotted mt-0.5">
                          View breakdown
                        </span>
                      </div>

                      {/* Tooltip for score breakdown */}
                      {hoveredReasonId === b.businessId && (
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-slate-900 text-white rounded-lg shadow-xl text-left z-30 pointer-events-none text-[11px] border border-slate-700">
                          <p className="font-bold border-b border-slate-700 pb-1 mb-1 text-cyan-400">
                            Scoring Rubric (Total: {b.opportunityScore}/10)
                          </p>
                          <ul className="space-y-1 text-slate-300">
                            {b.scoreBreakdown.reasons.map((r, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <span className="text-emerald-400">✓</span> {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </td>

                    {/* Recommendation / Reason */}
                    <td className="py-3 px-4 max-w-xs">
                      <p className="text-xs text-slate-400 line-clamp-2" title={b.recommendation}>
                        {b.recommendation}
                      </p>
                      {b.verificationNotes && (
                        <p className="text-[10px] text-slate-600 italic line-clamp-1 mt-0.5" title={b.verificationNotes}>
                          Audit note: {b.verificationNotes}
                        </p>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Google Search Verification Helper Button */}
                        <a
                          href={`https://www.google.com/search?q=${encodeURIComponent(`"${b.businessName}" ${b.locality} ${b.city} official website`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 rounded transition-colors"
                          title="Run official Google search check for this business in Mohali/Chandigarh"
                        >
                          <Search className="w-3.5 h-3.5" />
                        </a>

                        {/* Google Maps link */}
                        <a
                          href={b.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded transition-colors"
                          title="Open Google Maps listing"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        {/* View Full Detail Modal */}
                        <button
                          onClick={() => onSelectBusiness(b)}
                          className="p-1.5 text-slate-500 hover:text-slate-200 hover:bg-slate-700/60 rounded transition-colors"
                          title="View complete business audit card"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Quick Edit */}
                        <button
                          onClick={() => onEditBusiness(b)}
                          className="p-1.5 text-slate-500 hover:text-amber-400 hover:bg-amber-500/10 rounded transition-colors"
                          title="Edit verification status or details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination controls (for All view) */}
      {viewMode === 'all' && totalPages > 1 && (
        <div className="p-4 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-500">
          <span>
            Page {currentPage} of {totalPages} ({businesses.length} records)
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded border border-slate-700/60 disabled:opacity-40 hover:bg-slate-700/60 text-slate-400"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-medium text-slate-300">{currentPage}</span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded border border-slate-700/60 disabled:opacity-40 hover:bg-slate-700/60 text-slate-400"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
