import React, { useState, useMemo } from 'react';
import { DeveloperProfile } from '../../types/marketplace';
import { 
  Search, 
  MapPin, 
  Star, 
  CheckCircle2, 
  Filter, 
  LayoutGrid, 
  List, 
  MessageSquare, 
  Briefcase, 
  SlidersHorizontal,
  ExternalLink,
  Code2,
  Sparkles,
  RefreshCw,
  ChevronDown,
  ArrowUpDown,
  Users,
  IndianRupee,
  Clock
} from 'lucide-react';

interface FindDevelopersPageProps {
  developers: DeveloperProfile[];
  onViewProfile: (developer: DeveloperProfile) => void;
  onContactDeveloper: (developer: DeveloperProfile) => void;
  onOpenGetStarted: () => void;
}

export const FindDevelopersPage: React.FC<FindDevelopersPageProps> = ({
  developers,
  onViewProfile,
  onContactDeveloper,
  onOpenGetStarted,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<'All' | 'Chandigarh' | 'Mohali'>('All');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [minRating, setMinRating] = useState<number>(0);
  const [minExperience, setMinExperience] = useState<number>(0);
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'projects'>('rating');
  const [showFilters, setShowFilters] = useState(true);

  // Extract all unique skills
  const allSkills = useMemo(() => {
    const set = new Set<string>();
    developers.forEach((d) => d.skills.forEach((s) => set.add(s)));
    return Array.from(set).sort();
  }, [developers]);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (selectedCity !== 'All') count++;
    if (selectedSkill !== 'All') count++;
    if (minRating > 0) count++;
    if (minExperience > 0) count++;
    if (onlyAvailable) count++;
    return count;
  }, [searchQuery, selectedCity, selectedSkill, minRating, minExperience, onlyAvailable]);

  // Filter & sort
  const filteredDevelopers = useMemo(() => {
    return developers
      .filter((dev) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = dev.name.toLowerCase().includes(q);
          const matchRole = dev.role.toLowerCase().includes(q);
          const matchSkills = dev.skills.some((s) => s.toLowerCase().includes(q));
          const matchLoc = dev.location.toLowerCase().includes(q);
          if (!matchName && !matchRole && !matchSkills && !matchLoc) return false;
        }

        if (selectedCity !== 'All' && dev.city !== selectedCity) return false;
        if (selectedSkill !== 'All' && !dev.skills.includes(selectedSkill)) return false;
        if (minRating > 0 && dev.rating < minRating) return false;
        if (minExperience > 0 && dev.experienceYears < minExperience) return false;
        if (onlyAvailable && !dev.isAvailable) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
        if (sortBy === 'projects') return b.completedProjects - a.completedProjects;
        return 0;
      });
  }, [developers, searchQuery, selectedCity, selectedSkill, minRating, minExperience, onlyAvailable, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCity('All');
    setSelectedSkill('All');
    setMinRating(0);
    setMinExperience(0);
    setOnlyAvailable(false);
    setSortBy('rating');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      
      {/* Hero Header */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#0B1B33] via-[#07172C] to-[#091827] border border-white/[0.08] p-8 sm:p-10 overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-gradient-to-bl from-[#19BDF0]/8 via-[#A78BFA]/6 to-transparent blur-3xl pointer-events-none rounded-full" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#19BDF0]/10 border border-[#19BDF0]/20 text-[#19BDF0] text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Vetted Tricity Talent</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2">
            Find Your{' '}
            <span className="bg-gradient-to-r from-[#19BDF0] to-[#A78BFA] bg-clip-text text-transparent">
              Developer
            </span>
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
            Professional website developers in Mohali and Chandigarh ready to bring your business online.
          </p>

          {/* Search Bar */}
          <div className="mt-6 relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, skills, or location..."
              className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-[#050B18] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#19BDF0] focus:ring-1 focus:ring-[#19BDF0]/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
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
        
        {/* Filter Toggle */}
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
              <strong className="text-white font-semibold">{filteredDevelopers.length}</strong> developers
            </span>
            <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
          </span>
        </button>

        {showFilters && (
          <div className="px-5 pb-4 pt-1 border-t border-white/[0.06] space-y-3">
            <div className="flex flex-wrap items-center gap-3">

              {/* City */}
              <div className="flex items-center gap-0.5 bg-[#07172C] p-0.5 rounded-lg border border-white/5 text-xs font-medium">
                {(['All', 'Chandigarh', 'Mohali'] as const).map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
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

              {/* Skill */}
              <div className="flex items-center gap-2 bg-[#07172C] px-3 py-2 rounded-lg border border-white/5 text-xs">
                <Code2 className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
                >
                  <option value="All" className="bg-[#0B1B33]">All Skills</option>
                  {allSkills.map((s) => (
                    <option key={s} value={s} className="bg-[#0B1B33]">{s}</option>
                  ))}
                </select>
              </div>

              {/* Min Rating */}
              <button
                onClick={() => setMinRating(minRating === 4.8 ? 0 : 4.8)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                  minRating >= 4.8
                    ? 'bg-amber-500/15 border-amber-500/25 text-amber-300'
                    : 'bg-[#07172C] border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                <span>Top Rated (4.8+)</span>
              </button>

              {/* Min Experience */}
              <div className="flex items-center gap-2 bg-[#07172C] px-3 py-2 rounded-lg border border-white/5 text-xs">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-400">Experience:</span>
                <select
                  value={minExperience}
                  onChange={(e) => setMinExperience(Number(e.target.value))}
                  className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
                >
                  <option value={0} className="bg-[#0B1B33]">Any</option>
                  <option value={2} className="bg-[#0B1B33]">2+ yrs</option>
                  <option value={3} className="bg-[#0B1B33]">3+ yrs</option>
                  <option value={4} className="bg-[#0B1B33]">4+ yrs</option>
                  <option value={5} className="bg-[#0B1B33]">5+ yrs</option>
                </select>
              </div>

              {/* Available Toggle */}
              <button
                onClick={() => setOnlyAvailable(!onlyAvailable)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                  onlyAvailable
                    ? 'bg-emerald-500/15 border-emerald-500/25 text-emerald-300'
                    : 'bg-[#07172C] border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${onlyAvailable ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                <span>Available Now</span>
              </button>

              {/* Sort */}
              <div className="flex items-center gap-2 bg-[#07172C] px-3 py-2 rounded-lg border border-white/5 text-xs ml-auto">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
                >
                  <option value="rating" className="bg-[#0B1B33]">Rating</option>
                  <option value="experience" className="bg-[#0B1B33]">Experience</option>
                  <option value="projects" className="bg-[#0B1B33]">Projects</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-0.5 bg-[#07172C] p-0.5 rounded-lg border border-white/5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'} transition-all`}
                  title="Grid view"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'} transition-all`}
                  title="List view"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Reset */}
              {activeFilterCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 px-2 py-1 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Developer Cards */}
      {filteredDevelopers.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
              : 'space-y-4'
          }
        >
          {filteredDevelopers.map((dev) => (
            <div
              key={dev.id}
              className={`group rounded-2xl bg-[#0B1B33]/80 border border-white/[0.06] hover:border-[#19BDF0]/30 transition-all duration-300 p-5 flex ${
                viewMode === 'grid' ? 'flex-col justify-between' : 'flex-col sm:flex-row items-center justify-between gap-6'
              } hover:shadow-xl hover:shadow-[#19BDF0]/[0.04]`}
            >
              <div className={viewMode === 'list' ? 'flex-1' : ''}>
                
                {/* Avatar & Name */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={dev.avatarUrl}
                        alt={dev.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white/[0.08] group-hover:border-[#19BDF0]/40 transition-colors"
                      />
                      {dev.isAvailable && (
                        <span
                          title="Available for projects"
                          className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0B1B33]"
                        />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-white text-sm group-hover:text-[#19BDF0] transition-colors">
                          {dev.name}
                        </h3>
                        {dev.isVerified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#19BDF0] shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-400 font-medium">{dev.role}</p>
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-0.5">
                        <MapPin className="w-2.5 h-2.5" />
                        <span>{dev.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-amber-500/10 border border-amber-500/15 text-amber-400 text-xs font-bold shrink-0">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{dev.rating}</span>
                    <span className="text-[10px] text-slate-500 font-normal">({dev.reviewCount})</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-2">
                  {dev.bio}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {dev.skills.slice(0, 6).map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-[#07172C] text-slate-300 border border-white/[0.04] font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                  {dev.skills.length > 6 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#07172C] text-slate-500 border border-white/[0.04]">
                      +{dev.skills.length - 6}
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 py-2 px-2.5 rounded-lg bg-[#07172C]/70 border border-white/[0.04] text-xs text-slate-400 mb-3">
                  <div>
                    <span className="text-[9px] text-slate-500 block uppercase tracking-wider">Exp</span>
                    <span className="font-semibold text-white text-xs">{dev.experienceYears} yrs</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 block uppercase tracking-wider">Done</span>
                    <span className="font-semibold text-white text-xs">{dev.completedProjects}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 block uppercase tracking-wider">From</span>
                    <span className="font-semibold text-[#19BDF0] text-xs">{dev.services[0]?.startingPrice || dev.hourlyRate}</span>
                  </div>
                </div>

                {/* Portfolio Preview */}
                {viewMode === 'grid' && dev.portfolio[0] && (
                  <div
                    onClick={() => onViewProfile(dev)}
                    className="relative rounded-xl overflow-hidden border border-white/[0.06] aspect-[16/9] mb-3 group/p cursor-pointer"
                  >
                    <img
                      src={dev.portfolio[0].imageUrl}
                      alt={dev.portfolio[0].title}
                      className="w-full h-full object-cover group-hover/p:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex items-end p-2.5">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[11px] font-medium text-white truncate">
                          {dev.portfolio[0].title}
                        </span>
                        <ExternalLink className="w-3 h-3 text-[#19BDF0] shrink-0 ml-1" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div
                className={`grid gap-2 pt-2 border-t border-white/[0.06] ${
                  viewMode === 'grid' ? 'grid-cols-2' : 'grid-cols-2 sm:w-60 shrink-0'
                }`}
              >
                <button
                  onClick={() => onViewProfile(dev)}
                  className="py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-medium border border-white/[0.06] transition-all flex items-center justify-center gap-1.5"
                >
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => onContactDeveloper(dev)}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#19BDF0] to-[#38BDF8] hover:from-[#38BDF8] hover:to-[#19BDF0] text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#19BDF0]/15"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-slate-950" />
                  <span>Contact</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 rounded-2xl bg-[#0B1B33]/40 border border-white/[0.06]">
          <Code2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No Developers Found</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
            No developers match your current filters. Try adjusting your criteria.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-xl bg-[#19BDF0] text-slate-950 text-xs font-bold hover:bg-[#14a7d4] transition-all"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
};
