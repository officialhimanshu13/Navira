import React, { useState, useMemo } from 'react';
import { DeveloperProfile } from '../../types/marketplace';
import { 
  Star, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Briefcase, 
  Search, 
  Filter, 
  RefreshCw, 
  Code2, 
  ChevronDown 
} from 'lucide-react';

interface FeaturedDevelopersSectionProps {
  developers: DeveloperProfile[];
  onViewProfile: (developer: DeveloperProfile) => void;
  onContactDeveloper: (developer: DeveloperProfile) => void;
  onViewAllDevelopers: () => void;
}

export const FeaturedDevelopersSection: React.FC<FeaturedDevelopersSectionProps> = ({
  developers,
  onViewProfile,
  onContactDeveloper,
  onViewAllDevelopers,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<'All' | 'Chandigarh' | 'Mohali'>('All');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [minRating, setMinRating] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);

  // Extract skills
  const allSkills = useMemo(() => {
    const set = new Set<string>();
    developers.forEach((d) => d.skills.forEach((s) => set.add(s)));
    return Array.from(set).sort();
  }, [developers]);

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (selectedCity !== 'All') count++;
    if (selectedSkill !== 'All') count++;
    if (minRating > 0) count++;
    return count;
  }, [searchQuery, selectedCity, selectedSkill, minRating]);

  // Filtered developers
  const filtered = useMemo(() => {
    return developers.filter((dev) => {
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

      return true;
    });
  }, [developers, searchQuery, selectedCity, selectedSkill, minRating]);

  const displayedDevelopers = filtered.slice(0, 3);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCity('All');
    setSelectedSkill('All');
    setMinRating(0);
  };

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A78BFA]/10 border border-[#A78BFA]/20 text-[#A78BFA] text-xs font-semibold mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Vetted Talent Pool</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Web Developers
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Meet top-rated website engineers and UI/UX designers specialized in local business websites across Mohali & Chandigarh.
            </p>
          </div>
          <button
            onClick={onViewAllDevelopers}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#19BDF0] hover:text-[#7DD3FC] transition-colors"
          >
            <span>Explore All Developers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Real-time Search & Filter Bar */}
        <div className="rounded-2xl bg-[#09152A]/90 border border-white/[0.08] p-4 backdrop-blur-md space-y-3">
          
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search developers by name, role, or tech stack (e.g. React, Next.js, Webflow)..."
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
                    onClick={() => setSelectedCity(city)}
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

              {/* Skill Dropdown */}
              <div className="flex items-center gap-1.5 bg-[#030712] px-3 py-1.5 rounded-xl border border-white/5 text-xs">
                <Code2 className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="bg-transparent text-white focus:outline-none cursor-pointer"
                >
                  <option value="All" className="bg-[#0B1B33]">All Skills</option>
                  {allSkills.map((s) => (
                    <option key={s} value={s} className="bg-[#0B1B33]">{s}</option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <button
                onClick={() => setMinRating(minRating === 4.8 ? 0 : 4.8)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  minRating >= 4.8
                    ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                    : 'bg-[#030712] border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                <span>4.8+ Rating</span>
              </button>

              {/* Reset */}
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
              Showing <strong className="text-white font-semibold">{displayedDevelopers.length}</strong> of <strong className="text-white">{filtered.length}</strong> vetted developers
            </span>
            <span>All talent based in Mohali & Chandigarh</span>
          </div>
        </div>

        {/* 3 Featured Developer Cards Grid or Empty State */}
        {displayedDevelopers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedDevelopers.map((dev) => (
              <div
                key={dev.id}
                className="rounded-2xl bg-[#0B1B33]/80 border border-white/[0.08] hover:border-[#19BDF0]/40 transition-all duration-300 p-6 flex flex-col justify-between hover:shadow-2xl hover:shadow-black/60 group"
              >
                <div>
                  {/* Top Avatar & Badges */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={dev.avatarUrl}
                          alt={dev.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-[#19BDF0]/30 group-hover:border-[#19BDF0] transition-colors"
                        />
                        {dev.isAvailable && (
                          <span
                            title="Available for projects"
                            className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0B1B33]"
                          />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-white text-base group-hover:text-[#19BDF0] transition-colors">
                            {dev.name}
                          </h3>
                          {dev.isVerified && (
                            <CheckCircle2 className="w-4 h-4 text-[#19BDF0] shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-slate-300 font-medium">{dev.role}</p>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{dev.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Rating Pill */}
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold shrink-0">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{dev.rating}</span>
                      <span className="text-[10px] text-slate-400 font-normal">({dev.reviewCount})</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                    {dev.bio}
                  </p>

                  {/* Skills Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {dev.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-[#07172C] text-slate-300 border border-white/5 font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                    {dev.skills.length > 4 && (
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#07172C] text-slate-400 border border-white/5 font-mono">
                        +{dev.skills.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Experience & Rate Stats */}
                  <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-[#07172C]/70 border border-white/5 text-xs text-slate-300 mb-4">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Experience</span>
                      <span className="font-semibold text-white">{dev.experienceYears} Years</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Projects</span>
                      <span className="font-semibold text-white">{dev.completedProjects} Done</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Starts at</span>
                      <span className="font-semibold text-[#19BDF0]">{dev.services[0]?.startingPrice || dev.hourlyRate}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.08]">
                  <button
                    onClick={() => onViewProfile(dev)}
                    className="py-2 px-3 rounded-xl bg-white/[0.05] hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>View Profile</span>
                  </button>
                  <button
                    onClick={() => onContactDeveloper(dev)}
                    className="py-2 px-3 rounded-xl bg-gradient-to-r from-[#19BDF0] to-[#38BDF8] hover:from-[#38BDF8] hover:to-[#19BDF0] text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#19BDF0]/20"
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
          <div className="text-center py-16 px-4 rounded-3xl bg-[#09152A]/50 border border-white/10">
            <Code2 className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No Developers Match Your Filters</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-5">
              We couldn't find any developers matching this combination of skills, city, and rating threshold.
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
