import React, { useState, useMemo } from 'react';
import { BusinessRecord, WebsiteStatus } from '../../types/business';
import { 
  Search, 
  MapPin, 
  Star, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Store, 
  SlidersHorizontal,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Building2,
  PhoneCall,
  Filter,
  ChevronDown,
  MessageSquare,
  Zap,
  Users,
  ArrowUpDown
} from 'lucide-react';

interface FindBusinessesPageProps {
  businesses: BusinessRecord[];
  onSelectBusiness: (business: BusinessRecord) => void;
  onSendProposal: (business: BusinessRecord) => void;
  categories: string[];
  localities: string[];
  selectedCategoryInitial?: string;
}

export const FindBusinessesPage: React.FC<FindBusinessesPageProps> = ({
  businesses,
  onSelectBusiness,
  onSendProposal,
  categories,
  localities,
  selectedCategoryInitial = 'All',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<'All' | 'Chandigarh' | 'Mohali'>('All');
  const [selectedLocality, setSelectedLocality] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState(selectedCategoryInitial);
  const [selectedStatus, setSelectedStatus] = useState<'All' | WebsiteStatus>('All');
  const [onlyHighOpportunity, setOnlyHighOpportunity] = useState(true);
  const [minRating, setMinRating] = useState<number>(0);
  const [minReviewCount, setMinReviewCount] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'score' | 'rating' | 'reviews'>('score');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(true);
  const itemsPerPage = 12;

  // Filter dynamic localities based on city
  const filteredLocalities = useMemo(() => {
    const set = new Set<string>();
    businesses.forEach((b) => {
      if (selectedCity === 'All' || b.city === selectedCity) {
        set.add(b.locality);
      }
    });
    return Array.from(set).sort();
  }, [businesses, selectedCity]);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (selectedCity !== 'All') count++;
    if (selectedLocality !== 'All') count++;
    if (selectedCategory !== 'All') count++;
    if (selectedStatus !== 'All') count++;
    if (onlyHighOpportunity) count++;
    if (minRating > 0) count++;
    if (minReviewCount > 0) count++;
    return count;
  }, [searchQuery, selectedCity, selectedLocality, selectedCategory, selectedStatus, onlyHighOpportunity, minRating, minReviewCount]);

  // Main filter logic preserving all 325 verified records
  const filteredBusinesses = useMemo(() => {
    return businesses
      .filter((b) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = b.businessName.toLowerCase().includes(q);
          const matchLoc = b.locality.toLowerCase().includes(q);
          const matchCat = b.category.toLowerCase().includes(q);
          const matchAddr = b.address.toLowerCase().includes(q);
          if (!matchName && !matchLoc && !matchCat && !matchAddr) return false;
        }

        if (selectedCity !== 'All' && b.city !== selectedCity) return false;
        if (selectedLocality !== 'All' && b.locality !== selectedLocality) return false;
        if (selectedCategory !== 'All' && b.category !== selectedCategory) return false;
        if (selectedStatus !== 'All' && b.websiteStatus !== selectedStatus) return false;
        if (minRating > 0 && b.rating < minRating) return false;
        if (minReviewCount > 0 && b.reviewCount < minReviewCount) return false;
        if (onlyHighOpportunity && b.opportunityScore < 7) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'score') return b.opportunityScore - a.opportunityScore;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
        return 0;
      });
  }, [
    businesses,
    searchQuery,
    selectedCity,
    selectedLocality,
    selectedCategory,
    selectedStatus,
    minRating,
    minReviewCount,
    onlyHighOpportunity,
    sortBy,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage) || 1;
  const paginatedBusinesses = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBusinesses.slice(start, start + itemsPerPage);
  }, [filteredBusinesses, currentPage]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCity('All');
    setSelectedLocality('All');
    setSelectedCategory('All');
    setSelectedStatus('All');
    setOnlyHighOpportunity(false);
    setMinRating(0);
    setMinReviewCount(0);
    setSortBy('score');
    setCurrentPage(1);
  };

  // Quick stat counts
  const stats = useMemo(() => {
    const noWebsite = businesses.filter((b) => b.websiteStatus === 'Not Found').length;
    const highOpp = businesses.filter((b) => b.opportunityScore >= 7).length;
    return { noWebsite, highOpp };
  }, [businesses]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      
      {/* Hero Header */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#07172C] via-[#0B1B33] to-[#091827] border border-white/[0.08] p-8 sm:p-10 overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-gradient-to-bl from-rose-500/8 via-[#19BDF0]/6 to-transparent blur-3xl pointer-events-none rounded-full" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>{stats.noWebsite} Businesses Without Websites • {stats.highOpp} High-Priority Leads</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2">
            Business Website {' '}
            <span className="bg-gradient-to-r from-[#19BDF0] to-rose-400 bg-clip-text text-transparent">
              Opportunities
            </span>
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
            Verified businesses in Mohali and Chandigarh with strong Google reputations that need a professional web presence.
          </p>

          {/* Search bar */}
          <div className="mt-6 relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name, category, or locality..."
              className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-[#050B18] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#19BDF0] focus:ring-1 focus:ring-[#19BDF0]/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-1 rounded-md hover:bg-white/10 transition-all"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="rounded-xl bg-[#0B1B33]/60 border border-white/[0.06] overflow-hidden">
        
        {/* Filter Toggle Header */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex items-center justify-between px-5 py-3.5 text-xs font-medium text-slate-300 hover:bg-white/[0.02] transition-all"
        >
          <span className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-[#19BDF0]" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#19BDF0] text-slate-950 font-bold text-[10px] flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </span>
          <span className="flex items-center gap-4">
            <span className="text-slate-400">
              <strong className="text-white font-semibold">{filteredBusinesses.length}</strong> results
            </span>
            <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
          </span>
        </button>

        {/* Filter Controls */}
        {showFilters && (
          <div className="px-5 pb-4 pt-1 border-t border-white/[0.06] space-y-3">
            
            <div className="flex flex-wrap items-center gap-3">
              
              {/* City Tabs */}
              <div className="flex items-center gap-0.5 bg-[#07172C] p-0.5 rounded-lg border border-white/5 text-xs font-medium">
                {(['All', 'Chandigarh', 'Mohali'] as const).map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setSelectedLocality('All');
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-md transition-all ${
                      selectedCity === city
                        ? 'bg-[#19BDF0] text-slate-950 font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>

              {/* Locality */}
              <select
                value={selectedLocality}
                onChange={(e) => { setSelectedLocality(e.target.value); setCurrentPage(1); }}
                className="bg-[#07172C] text-white text-xs px-3 py-2 rounded-lg border border-white/5 focus:outline-none focus:border-[#19BDF0] cursor-pointer max-w-[160px]"
              >
                <option value="All" className="bg-[#0B1B33]">All Localities</option>
                {filteredLocalities.map((loc) => (
                  <option key={loc} value={loc} className="bg-[#0B1B33]">{loc}</option>
                ))}
              </select>

              {/* Category */}
              <select
                value={selectedCategory}
                onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                className="bg-[#07172C] text-white text-xs px-3 py-2 rounded-lg border border-white/5 focus:outline-none focus:border-[#19BDF0] cursor-pointer max-w-[170px]"
              >
                <option value="All" className="bg-[#0B1B33]">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-[#0B1B33]">{c}</option>
                ))}
              </select>

              {/* Website Status */}
              <select
                value={selectedStatus}
                onChange={(e) => { setSelectedStatus(e.target.value as any); setCurrentPage(1); }}
                className="bg-[#07172C] text-white text-xs px-3 py-2 rounded-lg border border-white/5 focus:outline-none focus:border-[#19BDF0] cursor-pointer"
              >
                <option value="All" className="bg-[#0B1B33]">All Statuses</option>
                <option value="Not Found" className="bg-[#0B1B33]">No Website</option>
                <option value="Found" className="bg-[#0B1B33]">Has Website</option>
                <option value="Unclear" className="bg-[#0B1B33]">Unclear</option>
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-3">

              {/* Min Rating */}
              <div className="flex items-center gap-2 bg-[#07172C] px-3 py-2 rounded-lg border border-white/5 text-xs">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                <span className="text-slate-400">Min rating:</span>
                <select
                  value={minRating}
                  onChange={(e) => { setMinRating(Number(e.target.value)); setCurrentPage(1); }}
                  className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
                >
                  <option value={0} className="bg-[#0B1B33]">Any</option>
                  <option value={3.0} className="bg-[#0B1B33]">3.0+</option>
                  <option value={3.5} className="bg-[#0B1B33]">3.5+</option>
                  <option value={4.0} className="bg-[#0B1B33]">4.0+</option>
                  <option value={4.2} className="bg-[#0B1B33]">4.2+</option>
                  <option value={4.5} className="bg-[#0B1B33]">4.5+</option>
                </select>
              </div>

              {/* Min Reviews */}
              <div className="flex items-center gap-2 bg-[#07172C] px-3 py-2 rounded-lg border border-white/5 text-xs">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-400">Min reviews:</span>
                <select
                  value={minReviewCount}
                  onChange={(e) => { setMinReviewCount(Number(e.target.value)); setCurrentPage(1); }}
                  className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
                >
                  <option value={0} className="bg-[#0B1B33]">Any</option>
                  <option value={5} className="bg-[#0B1B33]">5+</option>
                  <option value={10} className="bg-[#0B1B33]">10+</option>
                  <option value={25} className="bg-[#0B1B33]">25+</option>
                  <option value={50} className="bg-[#0B1B33]">50+</option>
                  <option value={100} className="bg-[#0B1B33]">100+</option>
                </select>
              </div>

              {/* High Priority Toggle */}
              <button
                onClick={() => { setOnlyHighOpportunity(!onlyHighOpportunity); setCurrentPage(1); }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  onlyHighOpportunity
                    ? 'bg-rose-500/15 border-rose-500/25 text-rose-300'
                    : 'bg-[#07172C] border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Score ≥ 7</span>
              </button>

              {/* Sort */}
              <div className="flex items-center gap-2 bg-[#07172C] px-3 py-2 rounded-lg border border-white/5 text-xs ml-auto">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
                >
                  <option value="score" className="bg-[#0B1B33]">Opportunity Score</option>
                  <option value="rating" className="bg-[#0B1B33]">Rating</option>
                  <option value="reviews" className="bg-[#0B1B33]">Review Count</option>
                </select>
              </div>

              {/* Reset */}
              {activeFilterCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 px-2 py-1 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset all</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Grid of Business Opportunity Cards */}
      {paginatedBusinesses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginatedBusinesses.map((b) => (
            <div
              key={b.businessId}
              className="group rounded-2xl bg-[#0B1B33]/80 border border-white/[0.06] hover:border-[#19BDF0]/30 transition-all duration-300 p-5 flex flex-col justify-between hover:shadow-xl hover:shadow-[#19BDF0]/[0.04]"
            >
              <div>
                {/* Top Badge Row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-medium text-[#19BDF0] bg-[#19BDF0]/8 border border-[#19BDF0]/15 px-2 py-0.5 rounded-md truncate">
                    {b.category}
                  </span>
                  
                  {b.websiteStatus === 'Not Found' ? (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-500/10 border border-rose-500/15 text-rose-400 text-[11px] font-bold shrink-0">
                      <Zap className="w-3 h-3" />
                      <span>{b.opportunityScore}/10</span>
                    </div>
                  ) : b.websiteStatus === 'Found' ? (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/15 text-emerald-400 text-[11px] font-semibold shrink-0">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Website</span>
                    </div>
                  ) : (
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/15 text-amber-400 text-[11px] font-semibold shrink-0">
                      Unclear
                    </span>
                  )}
                </div>

                {/* Business Name */}
                <h3 className="font-bold text-white text-base group-hover:text-[#19BDF0] transition-colors line-clamp-1 mb-1.5">
                  {b.businessName}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="font-medium text-slate-300">{b.locality}</span>
                  <span className="text-slate-600">•</span>
                  <span>{b.city}</span>
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-3 p-2.5 rounded-lg bg-[#07172C] border border-white/[0.04] mb-3">
                  <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{b.rating.toFixed(1)}</span>
                  </div>
                  <div className="h-3.5 w-px bg-white/10" />
                  <div className="text-xs text-slate-400">
                    <span className="font-semibold text-slate-200">{b.reviewCount}</span> reviews
                  </div>
                </div>

                {/* Notes */}
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                  {b.verificationNotes}
                </p>

                {/* Recommendation */}
                <div className="text-[11px] text-slate-400 bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.04] line-clamp-2 mb-3">
                  <span className="text-[#19BDF0] font-semibold">Suggestion: </span>
                  {b.recommendation}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/[0.06]">
                <button
                  onClick={() => onSelectBusiness(b)}
                  className="py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-medium border border-white/[0.06] transition-all flex items-center justify-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Details</span>
                </button>
                <button
                  onClick={() => onSendProposal(b)}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-rose-500/15"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Proposal</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 rounded-2xl bg-[#0B1B33]/40 border border-white/[0.06]">
          <Store className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No Businesses Match</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
            Try adjusting your filters or expanding the search criteria.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-xl bg-[#19BDF0] text-slate-950 text-xs font-bold hover:bg-[#14a7d4] transition-all"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
          <span className="text-xs text-slate-400">
            Page {currentPage} of {totalPages} • {filteredBusinesses.length} results
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg bg-[#07172C] border border-white/[0.06] text-xs text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:text-white transition-all"
            >
              Prev
            </button>
            {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 7) {
                pageNum = i + 1;
              } else if (currentPage <= 4) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 3) {
                pageNum = totalPages - 6 + i;
              } else {
                pageNum = currentPage - 3 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                    currentPage === pageNum
                      ? 'bg-[#19BDF0] text-slate-950'
                      : 'bg-[#07172C] text-slate-400 hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg bg-[#07172C] border border-white/[0.06] text-xs text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:text-white transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
