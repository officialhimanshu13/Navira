import React from 'react';
import { Search, RotateCcw, Sparkles } from 'lucide-react';
import { FilterState, WebsiteStatus, RecordVerificationStatus } from '../types/business';
import { ValidCity } from '../config/locationConfig';

interface FilterBarProps {
  filter: FilterState;
  onChange: (updated: Partial<FilterState>) => void;
  onReset: () => void;
  categories: string[];
  localities: string[];
  totalFiltered: number;
  totalAll: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  onChange,
  onReset,
  categories,
  localities,
  totalFiltered,
  totalAll
}) => {
  const isFiltered =
    filter.searchQuery.trim() !== '' ||
    filter.selectedCity !== 'All' ||
    filter.selectedCategory !== 'All' ||
    filter.selectedLocality !== 'All' ||
    filter.selectedStatus !== 'All' ||
    filter.selectedVerificationStatus !== 'All' ||
    filter.minRating > 0 ||
    filter.minReviews > 0 ||
    filter.onlyOpportunities;

  return (
    <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-4">
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        {/* Search input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            id="search-input"
            value={filter.searchQuery}
            onChange={(e) => onChange({ searchQuery: e.target.value })}
            placeholder="Search businesses, localities, categories..."
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-800/60 border border-slate-700/60 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
          />
          {filter.searchQuery && (
            <button
              onClick={() => onChange({ searchQuery: '' })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs px-1.5 py-0.5 rounded bg-slate-700/60 transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* Primary Filters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5 items-center">
          {/* City Filter */}
          <div>
            <select
              id="city-filter"
              value={filter.selectedCity}
              onChange={(e) => onChange({ selectedCity: e.target.value as 'All' | ValidCity, selectedLocality: 'All' })}
              className="w-full text-xs py-2.5 px-2.5 bg-slate-800/60 border border-slate-700/60 rounded-xl text-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all cursor-pointer"
            >
              <option value="All">All Cities (CHD & MOH)</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Mohali">Mohali (SAS Nagar)</option>
            </select>
          </div>

          {/* Locality Dropdown */}
          <div>
            <select
              id="locality-filter"
              value={filter.selectedLocality}
              onChange={(e) => onChange({ selectedLocality: e.target.value })}
              className="w-full text-xs py-2.5 px-2.5 bg-slate-800/60 border border-slate-700/60 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all cursor-pointer"
            >
              <option value="All">All Localities ({localities.length})</option>
              {localities.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Category Dropdown */}
          <div>
            <select
              id="category-filter"
              value={filter.selectedCategory}
              onChange={(e) => onChange({ selectedCategory: e.target.value })}
              className="w-full text-xs py-2.5 px-2.5 bg-slate-800/60 border border-slate-700/60 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all cursor-pointer"
            >
              <option value="All">All Categories ({categories.length})</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Website Status Dropdown */}
          <div>
            <select
              id="status-filter"
              value={filter.selectedStatus}
              onChange={(e) => onChange({ selectedStatus: e.target.value as 'All' | WebsiteStatus })}
              className="w-full text-xs py-2.5 px-2.5 bg-slate-800/60 border border-slate-700/60 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Not Found">Not Found (Opportunity)</option>
              <option value="Found">Website Found</option>
              <option value="Unclear">Status Unclear</option>
            </select>
          </div>

          {/* Record Verification Status */}
          <div>
            <select
              id="verification-filter"
              value={filter.selectedVerificationStatus}
              onChange={(e) => onChange({ selectedVerificationStatus: e.target.value as 'All' | RecordVerificationStatus })}
              className="w-full text-xs py-2.5 px-2.5 bg-slate-800/60 border border-slate-700/60 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all cursor-pointer"
            >
              <option value="All">All Records</option>
              <option value="Verified Real Business">Verified Real</option>
              <option value="Unverified">Unverified Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Second filter row */}
      <div className="mt-3 pt-3 border-t border-slate-700/40 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Quick toggle for high-priority opportunities */}
          <button
            onClick={() => onChange({ onlyOpportunities: !filter.onlyOpportunities })}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filter.onlyOpportunities
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-inner shadow-amber-500/10'
                : 'bg-slate-800/60 hover:bg-slate-700/60 text-slate-400 hover:text-slate-200 border border-slate-700/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>High Priority Follow-ups (Score ≥ 7)</span>
          </button>

          {/* Quick city pills */}
          <div className="flex items-center gap-1 bg-slate-800/60 p-0.5 rounded-xl border border-slate-700/50">
            {(['All', 'Chandigarh', 'Mohali'] as const).map((city) => (
              <button
                key={city}
                onClick={() => onChange({ selectedCity: city as any, selectedLocality: 'All' })}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  filter.selectedCity === city
                    ? 'bg-slate-700 text-slate-100 shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          {/* Quick status pills */}
          <div className="flex items-center gap-1 bg-slate-800/60 p-0.5 rounded-xl border border-slate-700/50">
            {(['All', 'Not Found', 'Found', 'Unclear'] as const).map((st) => (
              <button
                key={st}
                onClick={() => onChange({ selectedStatus: st })}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  filter.selectedStatus === st
                    ? 'bg-slate-700 text-slate-100 shadow-sm'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-slate-500">
            <span>Min Rating:</span>
            <select
              value={filter.minRating}
              onChange={(e) => onChange({ minRating: parseFloat(e.target.value) })}
              className="text-xs py-1 px-2 bg-slate-800/60 border border-slate-700/60 rounded-lg text-slate-300 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
            >
              <option value="0">Any</option>
              <option value="4.0">≥ 4.0★</option>
              <option value="4.5">≥ 4.5★</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-slate-500">
            <span>Min reviews:</span>
            <select
              value={filter.minReviews}
              onChange={(e) => onChange({ minReviews: parseInt(e.target.value, 10) })}
              className="text-xs py-1 px-2 bg-slate-800/60 border border-slate-700/60 rounded-lg text-slate-300 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
            >
              <option value="0">Any</option>
              <option value="30">30+ reviews</option>
              <option value="50">50+ reviews</option>
              <option value="100">100+ reviews</option>
            </select>
          </div>
        </div>

        {/* Filter results & Reset */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">
            Showing <strong className="text-slate-200">{totalFiltered}</strong> of {totalAll} businesses
          </span>
          {isFiltered && (
            <button
              onClick={onReset}
              id="reset-filters-btn"
              className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-medium px-2 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 transition-all"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
