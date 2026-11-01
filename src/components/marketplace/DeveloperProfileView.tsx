import React, { useState } from 'react';
import { DeveloperProfile } from '../../types/marketplace';
import { 
  Star, 
  MapPin, 
  CheckCircle2, 
  MessageSquare, 
  Briefcase, 
  ArrowLeft, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  Send,
  Sparkles,
  Layers,
  ChevronRight,
  Quote
} from 'lucide-react';

interface DeveloperProfileViewProps {
  developer: DeveloperProfile;
  onBack: () => void;
  onContact: (developer: DeveloperProfile) => void;
}

export const DeveloperProfileView: React.FC<DeveloperProfileViewProps> = ({
  developer,
  onBack,
  onContact,
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'portfolio' | 'reviews' | 'services'>('about');
  const [selectedPortfolioUrl, setSelectedPortfolioUrl] = useState<string | null>(null);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#07172C] text-slate-300 hover:text-white border border-white/10 text-xs font-semibold transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Developer Directory</span>
      </button>

      {/* Profile Cover & Header Card */}
      <div className="rounded-3xl bg-[#0B1B33]/90 border border-white/[0.08] overflow-hidden shadow-2xl relative">
        
        {/* Cover Photo */}
        <div className="h-48 sm:h-64 w-full relative overflow-hidden bg-gradient-to-r from-[#07172C] to-[#112545]">
          <img
            src={developer.coverUrl || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80'}
            alt="Cover"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B33] via-transparent to-transparent" />
        </div>

        {/* Profile Info Overlay */}
        <div className="px-6 sm:px-10 pb-8 pt-0 relative -mt-16 sm:-mt-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
            <div className="relative shrink-0">
              <img
                src={developer.avatarUrl}
                alt={developer.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-4 border-[#0B1B33] shadow-2xl"
              />
              {developer.isAvailable && (
                <span
                  title="Available now"
                  className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0B1B33]"
                />
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {developer.name}
                </h1>
                {developer.isVerified && (
                  <div className="flex items-center gap-1 text-[11px] font-semibold bg-[#19BDF0]/15 text-[#19BDF0] border border-[#19BDF0]/30 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Talent</span>
                  </div>
                )}
              </div>

              <p className="text-sm sm:text-base font-semibold text-[#19BDF0] mt-1">
                {developer.role}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-300 mt-2">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{developer.location}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 text-amber-400 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{developer.rating}</span>
                  <span className="text-slate-400 font-normal">({developer.reviewCount} reviews)</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 text-emerald-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{developer.responseRate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center justify-center sm:justify-end gap-3 shrink-0">
            <button
              onClick={() => onContact(developer)}
              className="px-6 py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-[#19BDF0] to-[#38BDF8] hover:from-[#38BDF8] hover:to-[#19BDF0] shadow-lg shadow-[#19BDF0]/30 transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-slate-950" />
              <span>Contact Me</span>
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className="px-5 py-3 rounded-xl font-semibold text-sm text-white bg-[#07172C] hover:bg-[#112545] border border-white/10 transition-all flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4 text-[#A78BFA]" />
              <span>View Portfolio</span>
            </button>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="px-6 sm:px-10 border-t border-white/[0.08] flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'about', label: 'About' },
            { id: 'portfolio', label: `Portfolio (${developer.portfolio.length})` },
            { id: 'reviews', label: `Client Reviews (${developer.testimonials.length})` },
            { id: 'services', label: `Services & Pricing (${developer.services.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 px-4 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#19BDF0] text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* Main Content Layout with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Tab Content */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* TAB 1: ABOUT */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              
              {/* Bio & Intro */}
              <div className="p-6 rounded-2xl bg-[#0B1B33]/80 border border-white/[0.08] space-y-4">
                <h3 className="text-lg font-bold text-white">About Me</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {developer.aboutMe}
                </p>
                <div className="pt-2 text-xs text-slate-400">
                  Specialized in local business digitization across Mohali, Chandigarh, and Panchkula borders.
                </div>
              </div>

              {/* Technical Skills */}
              <div className="p-6 rounded-2xl bg-[#0B1B33]/80 border border-white/[0.08] space-y-4">
                <h3 className="text-lg font-bold text-white">Skills & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {developer.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-xl bg-[#07172C] text-sm text-[#19BDF0] border border-[#19BDF0]/20 font-mono font-medium shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Featured Portfolio Carousel / Previews */}
              <div className="p-6 rounded-2xl bg-[#0B1B33]/80 border border-white/[0.08] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Highlighted Work</h3>
                  <button
                    onClick={() => setActiveTab('portfolio')}
                    className="text-xs text-[#19BDF0] hover:underline"
                  >
                    View All Work →
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {developer.portfolio.slice(0, 2).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedPortfolioUrl(item.previewUrl || null)}
                      className="rounded-xl overflow-hidden bg-[#07172C] border border-white/10 hover:border-[#19BDF0]/40 transition-all group cursor-pointer"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/60 text-[10px] text-white font-mono backdrop-blur-sm">
                          {item.category}
                        </div>
                      </div>
                      <div className="p-3.5">
                        <h4 className="text-sm font-bold text-white group-hover:text-[#19BDF0] transition-colors truncate">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: PORTFOLIO */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#0B1B33]/80 border border-white/[0.08]">
                <h3 className="text-lg font-bold text-white mb-2">Portfolio Gallery</h3>
                <p className="text-xs text-slate-300 mb-6">
                  Interactive website examples delivered for businesses in Chandigarh & Mohali.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {developer.portfolio.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl overflow-hidden bg-[#07172C] border border-white/10 hover:border-[#19BDF0]/40 transition-all group flex flex-col justify-between"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#07172C] via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
                          <span className="text-[10px] bg-[#19BDF0]/20 text-[#19BDF0] px-2 py-0.5 rounded-md border border-[#19BDF0]/30 font-semibold backdrop-blur-md">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-base font-bold text-white group-hover:text-[#19BDF0] transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                            {item.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-3">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 font-mono"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                          <span className="text-[11px] text-emerald-400 font-semibold">Live Prototype</span>
                          <button
                            onClick={() => onContact(developer)}
                            className="text-xs font-semibold text-[#19BDF0] hover:underline flex items-center gap-1"
                          >
                            <span>Request Similar Site</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#0B1B33]/80 border border-white/[0.08] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">Client Testimonials</h3>
                    <p className="text-xs text-slate-400">Genuine reviews from verified business owners in Mohali and Chandigarh</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 text-amber-400 text-sm font-bold border border-amber-500/20">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{developer.rating} Average Rating</span>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  {developer.testimonials.map((t) => (
                    <div
                      key={t.id}
                      className="p-4 rounded-xl bg-[#07172C] border border-white/5 space-y-2 relative"
                    >
                      <Quote className="w-6 h-6 text-white/10 absolute right-4 top-4" />
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                        "{t.comment}"
                      </p>
                      <div className="flex items-center justify-between pt-2 text-xs">
                        <div>
                          <span className="font-bold text-white">{t.clientName}</span>
                          <span className="text-slate-400"> • {t.clientBusiness}</span>
                        </div>
                        <span className="text-slate-400 text-[11px]">{t.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES & PRICING */}
          {activeTab === 'services' && (
            <div className="space-y-4">
              {developer.services.map((svc) => (
                <div
                  key={svc.id}
                  className="p-6 rounded-2xl bg-[#0B1B33]/80 border border-white/[0.08] hover:border-[#19BDF0]/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-white">{svc.title}</h4>
                    <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
                      {svc.description}
                    </p>
                    <div className="text-[11px] text-[#A78BFA] font-medium pt-1">
                      Estimated Delivery: {svc.deliveryTime}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs text-slate-400">Starting from</div>
                    <div className="text-2xl font-black text-white">{svc.startingPrice}</div>
                    <button
                      onClick={() => onContact(developer)}
                      className="mt-2 px-4 py-2 rounded-xl bg-[#19BDF0] text-slate-950 font-bold text-xs hover:bg-[#14a7d4] transition-colors"
                    >
                      Order Package
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Right Column (4 cols): Sticky Quick Action Card matching Image 5 */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="rounded-3xl bg-gradient-to-br from-[#0B1B33] via-[#07172C] to-[#112545] border border-[#19BDF0]/30 p-6 shadow-2xl relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-[#19BDF0]/15 flex items-center justify-center text-[#19BDF0] mb-4">
              <Send className="w-5 h-5" />
            </div>

            <h3 className="text-xl font-extrabold text-white tracking-tight">
              Let's Build Something Great Together!
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Have a shop, cafe, or clinic that needs a high-impact website? Send {developer.name.split(' ')[0]} a direct project inquiry.
            </p>

            <div className="my-5 p-3.5 rounded-xl bg-[#050B18]/70 border border-white/5 space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Response Rate:</span>
                <span className="text-white font-medium">{developer.responseRate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Location:</span>
                <span className="text-white font-medium">{developer.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Completed:</span>
                <span className="text-white font-medium">{developer.completedProjects} Projects</span>
              </div>
            </div>

            <button
              onClick={() => onContact(developer)}
              className="w-full py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-[#19BDF0] to-[#38BDF8] hover:from-[#38BDF8] hover:to-[#19BDF0] shadow-lg shadow-[#19BDF0]/25 transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-slate-950" />
              <span>Send Project Inquiry</span>
            </button>
          </div>

          {/* Guarantee Badge */}
          <div className="p-4 rounded-2xl bg-[#07172C]/60 border border-white/5 flex items-start gap-3 text-xs text-slate-300">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">NAVIRA Verified Protection</span>
              Direct communication, milestone payments, and source code ownership.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

