import React, { useState, useMemo } from 'react';
import { BusinessRecord } from '../../types/business';
import { 
  Star, 
  MapPin, 
  Store, 
  AlertCircle, 
  ArrowRight, 
  Send, 
  Search, 
  Filter, 
  RefreshCw, 
  Users, 
  Building2,
  ChevronDown,
  Zap,
  CheckCircle2
} from 'lucide-react';

interface BusinessOpportunitiesSectionProps {
  businesses: BusinessRecord[];
  onSelectBusiness: (business: BusinessRecord) => void;
  onSendProposal: (business: BusinessRecord) => void;
  onExploreAllBusinesses: () => void;
}

export const BusinessOpportunitiesSection: React.FC<BusinessOpportunitiesSectionProps> = ({
  businesses,
  onSelectBusiness,
  onSendProposal,
  onExploreAllBusinesses,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<'All' | 'Chandigarh' | 'Mohali'>('All');
  const [selectedLocality, setSelectedLocality] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minReviews, setMinReviews] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);

  // Distinct localities
  const localities = useMemo(() => {
    const set = new Set<string>();
    businesses.forEach((b) => {
      if (selectedCity === 'All' || b.city === selectedCity) {
        set.add(b.locality);
      }
    });
    return Array.from(set).sort();
  }, [businesses, selectedCity]);

  // Distinct categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    businesses.forEach((b) => set.add(b.category));
    return Array.from(set).sort();
  }, [businesses]);

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (selectedCity !== 'All') count++;
    if (selectedLocality !== 'All') count++;
    if (selectedCategory !== 'All') count++;
    if (minReviews > 0) count++;
    return count;
  }, [searchQuery, selectedCity, selectedLocality, selectedCategory, minReviews]);

  // Filtered list
  const filtered = useMemo(() => {
    return businesses
      .filter((b) => {
        // Only target businesses needing websites for opportunities section
        if (b.websiteStatus === 'Found') return false;

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = b.businessName.toLowerCase().includes(q);
          const matchLoc = b.locality.toLowerCase().includes(q);
          const matchCat = b.category.toLowerCase().includes(q);
          if (!matchName && !matchLoc && !matchCat) return false;
        }

        if (selectedCity !== 'All' && b.city !== selectedCity) return false;
        if (selectedLocality !== 'All' && b.locality !== selectedLocality) return false;
        if (selectedCategory !== 'All' && b.category !== selectedCategory) return false;
        if (minReviews > 0 && b.reviewCount < minReviews) return false;

        return true;
      })
      .sort((a, b) => b.opportunityScore - a.opportunityScore);
  }, [businesses, searchQuery, selectedCity, selectedLocality, selectedCategory, minReviews]);

  const displayedBusinesses = filtered.slice(0, 6);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCity('All');
    setSelectedLocality('All');
    setSelectedCategory('All');
    setMinReviews(0);
  };

  return (
    <section className="py-20 relative bg-[#07172C]/40 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold mb-2">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Real Client Demand • Verified Tricity SMBs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Active Business Website Opportunities
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Source-verified local businesses in Mohali and Chandigarh with outstanding Google reputations but zero official websites.
            </p>
          </div>
          <button
            onClick={onExploreAllBusinesses}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#19BDF0] hover:text-[#7DD3FC] transition-colors"
          >
            <span>Browse All {businesses.filter(b => b.websiteStatus !== 'Found').length} Opportunities</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Real-time Search and Multi-Filter Bar */}
        <div className="rounded-2xl bg-[#09152A]/90 border border-white/[0.08] p-4 backdrop-blur-md space-y-3">
          
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by business name (e.g. Peddlers, Gopal Sweets) or locality..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#19BDF0] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                showFilters || activeFilterCount > 0
                  ? 'bg-[#19BDF0]/15 border-[#19BDF0]/30 text-[#19BDF0]'
                  : 'bg-white/[0.05] border-white/10 text-slate-300 hover:text-white'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#19BDF0] text-slate-950 font-bold text-[9px] flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Collapsible Filter Options */}
          {showFilters && (
            <div className="pt-3 border-t border-white/[0.06] flex flex-wrap items-center gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
              
              {/* City Pill Switcher */}
              <div className="flex items-center bg-[#030712] p-1 rounded-xl border border-white/5 text-xs">
                <span className="text-slate-400 px-2">City:</span>
                {(['All', 'Chandigarh', 'Mohali'] as const).map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setSelectedLocality('All');
                    }}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      selectedCity === city
                        ? 'bg-[#19BDF0] text-slate-950 font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>

              {/* Locality Dropdown */}
              <div className="flex items-center gap-1.5 bg-[#030712] px-3 py-1.5 rounded-xl border border-white/5 text-xs">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={selectedLocality}
                  onChange={(e) => setSelectedLocality(e.target.value)}
                  className="bg-transparent text-white focus:outline-none cursor-pointer max-w-[150px]"
                >
                  <option value="All" className="bg-[#0B1B33]">All Localities</option>
                  {localities.map((loc) => (
                    <option key={loc} value={loc} className="bg-[#0B1B33]">{loc}</option>
                  ))}
                </select>
              </div>

              {/* Category Dropdown */}
              <div className="flex items-center gap-1.5 bg-[#030712] px-3 py-1.5 rounded-xl border border-white/5 text-xs">
                <Store className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent text-white focus:outline-none cursor-pointer max-w-[160px]"
                >
                  <option value="All" className="bg-[#0B1B33]">All Categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-[#0B1B33]">{c}</option>
                  ))}
                </select>
              </div>

              {/* Minimum Review Count Dropdown */}
              <div className="flex items-center gap-1.5 bg-[#030712] px-3 py-1.5 rounded-xl border border-white/5 text-xs">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-400">Min Reviews:</span>
                <select
                  value={minReviews}
                  onChange={(e) => setMinReviews(Number(e.target.value))}
                  className="bg-transparent text-white focus:outline-none cursor-pointer"
                >
                  <option value={0} className="bg-[#0B1B33]">Any</option>
                  <option value={10} className="bg-[#0B1B33]">10+ Reviews</option>
                  <option value={30} className="bg-[#0B1B33]">30+ Reviews</option>
                  <option value={50} className="bg-[#0B1B33]">50+ Reviews</option>
                  <option value={100} className="bg-[#0B1B33]">100+ Reviews</option>
                </select>
              </div>

              {/* Reset Button */}
              {activeFilterCount > 0 && (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 px-2 py-1 transition-colors ml-auto"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          )}

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1">
            <span>
              Showing <strong className="text-white font-semibold">{displayedBusinesses.length}</strong> of <strong className="text-white">{filtered.length}</strong> matching website opportunities
            </span>
            <span>Sorted by Opportunity Score (Highest First)</span>
          </div>
        </div>

        {/* 6 High Priority Opportunity Cards or Empty State */}
        {displayedBusinesses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedBusinesses.map((b) => (
              <div
                key={b.businessId}
                className="rounded-2xl bg-[#0B1B33]/85 border border-white/[0.08] hover:border-rose-500/40 transition-all duration-300 p-6 flex flex-col justify-between hover:shadow-2xl hover:shadow-black/60 group"
              >
                <div>
                  {/* Header: Category & Opportunity Score Pill */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-semibold text-[#19BDF0] bg-[#19BDF0]/10 border border-[#19BDF0]/20 px-2.5 py-0.5 rounded-full truncate">
                      {b.category}
                    </span>
                    <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold shrink-0">
                      <Zap className="w-3 h-3" />
                      <span>Score: {b.opportunityScore}/10</span>
                    </div>
                  </div>

                  {/* Business Name */}
                  <h3 className="font-bold text-white text-lg group-hover:text-[#19BDF0] transition-colors line-clamp-1 mb-1">
                    {b.businessName}
                  </h3>

                  {/* Location & City Tag */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-medium text-slate-200">{b.locality}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">{b.city}</span>
                  </div>

                  {/* Rating & Review Reputation */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#07172C] border border-white/5 mb-4">
                    <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{b.rating.toFixed(1)}</span>
                    </div>
                    <div className="h-4 w-px bg-white/10" />
                    <div className="text-xs text-slate-300">
                      <span className="font-semibold text-white">{b.reviewCount}</span> verified Google reviews
                    </div>
                  </div>

                  {/* Website Status & Opportunity Summary */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-rose-300 font-medium">
                      <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                      <span>No Official Website • High Digital Need</span>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {b.verificationNotes}
                    </p>
                  </div>

                  {/* Recommended Solution Pill */}
                  <div className="text-[11px] text-slate-300 bg-white/[0.03] p-2.5 rounded-lg border border-white/5 font-mono mb-4">
                    <span className="text-[#19BDF0] font-semibold">Recommended: </span>
                    {b.recommendation}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/[0.08]">
                  <button
                    onClick={() => onSelectBusiness(b)}
                    className="py-2 px-3 rounded-xl bg-white/[0.05] hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>View Details</span>
                  </button>
                  <button
                    onClick={() => onSendProposal(b)}
                    className="py-2 px-3 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-rose-500/20"
                  >
                    <Send className="w-3.5 h-3.5 text-white" />
                    <span>Send Proposal</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 rounded-3xl bg-[#09152A]/50 border border-white/10">
            <Store className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No Opportunities Match Your Filters</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-5">
              We couldn't find any business website opportunities matching this combination of locality, category, and review threshold.
            </p>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-[#19BDF0] text-slate-950 text-xs font-bold hover:bg-[#14a7d4] transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
