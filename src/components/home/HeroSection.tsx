import React from 'react';
import { DigitalCityCanvas } from './DigitalCityCanvas';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Code2, 
  Store, 
  TrendingUp, 
  ShieldCheck, 
  Star, 
  Globe2, 
  CheckCircle2,
  Users,
  Compass
} from 'lucide-react';

interface HeroSectionProps {
  onFindDeveloper: () => void;
  onFindBusiness: () => void;
  onExploreMarketplace: () => void;
  onWatchDemo: () => void;
  totalBusinesses?: number;
  totalOpportunities?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onFindDeveloper,
  onFindBusiness,
  onExploreMarketplace,
  onWatchDemo,
  totalBusinesses = 325,
  totalOpportunities = 239,
}) => {
  return (
    <section className="relative pt-6 pb-20 overflow-hidden bg-gradient-to-b from-[#02050D] via-[#030712] to-[#050B18]">
      
      {/* Background Interactive Digital-City Canvas (CHANGE 4) */}
      <DigitalCityCanvas />

      {/* Atmospheric Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#19BDF0]/12 via-[#10B981]/8 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -top-10 right-10 w-96 h-96 bg-[#A78BFA]/8 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Slogan, Description & CTAs (CHANGE 3) */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#19BDF0]/15 via-[#10B981]/15 to-[#818CF8]/15 border border-[#19BDF0]/30 text-[#19BDF0] text-xs font-semibold shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#19BDF0] animate-pulse" />
              <span>NAVIRA • Intelligence & Developer Marketplace</span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span className="hidden sm:inline-block text-slate-300 font-normal">Chandigarh & Mohali</span>
            </div>

            {/* Official Slogan Headline (CHANGE 3) */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Your Vision. <br />
              <span className="bg-gradient-to-r from-[#19BDF0] via-[#38BDF8] to-[#10B981] bg-clip-text text-transparent">
                Our Innovation.
              </span> <br />
              Your Future.
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Connecting local businesses with skilled website developers and providing verified market intelligence across Mohali and Chandigarh.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onFindDeveloper}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-[#19BDF0] to-[#10B981] hover:from-[#14a7d4] hover:to-[#059669] transition-all duration-300 shadow-xl shadow-[#19BDF0]/20 hover:shadow-[#19BDF0]/40 transform hover:-translate-y-0.5"
              >
                <Store className="w-4 h-4 text-slate-950" />
                <span>Find a Developer</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={onFindBusiness}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-[#09152A]/80 hover:bg-[#0F2140] border border-white/10 hover:border-[#19BDF0]/40 transition-all duration-300 shadow-lg hover:shadow-black/50"
              >
                <Code2 className="w-4 h-4 text-[#19BDF0]" />
                <span>I'm a Developer</span>
              </button>

              <button
                onClick={onWatchDemo}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-medium text-xs text-slate-300 hover:text-white hover:bg-white/[0.05] transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-[#19BDF0]/20 flex items-center justify-center text-[#19BDF0]">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch Showcase</span>
              </button>
            </div>

            {/* Verified Statistics Strip */}
            <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                    alt="Developer"
                    className="w-7 h-7 rounded-full border-2 border-[#030712] object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80"
                    alt="Developer"
                    className="w-7 h-7 rounded-full border-2 border-[#030712] object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80"
                    alt="Developer"
                    className="w-7 h-7 rounded-full border-2 border-[#030712] object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold text-white">4.9/5</span>
                  </div>
                  <span className="text-[11px] text-slate-400">Vetted Talent</span>
                </div>
              </div>

              <div className="h-6 w-px bg-white/10 hidden sm:block" />

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#19BDF0]/15 flex items-center justify-center text-[#19BDF0]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">{totalBusinesses} Verified Businesses</div>
                  <span className="text-[11px] text-slate-400">166 CHD • 159 MOH</span>
                </div>
              </div>

              <div className="h-6 w-px bg-white/10 hidden sm:block" />

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">{totalOpportunities} Active Opportunities</div>
                  <span className="text-[11px] text-emerald-400">73.5% need websites</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase (Architectural Depth & Live Preview) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Glowing Backdrop Ring */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#19BDF0]/20 via-[#10B981]/15 to-transparent blur-2xl rounded-full transform scale-90" />

            <div className="relative w-full max-w-lg mx-auto">
              
              {/* Laptop & Storefront Visual Preview Frame */}
              <div className="relative rounded-2xl bg-[#09152A]/90 border border-white/15 p-2.5 shadow-2xl shadow-black/80 backdrop-blur-xl overflow-hidden group">
                
                {/* Browser Top Bar */}
                <div className="flex items-center justify-between px-3 py-2 bg-[#060F1E] rounded-xl border border-white/5 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#030712] border border-white/5 text-[11px] text-slate-300 font-mono">
                    <Globe2 className="w-3 h-3 text-[#19BDF0]" />
                    <span>navira.in/preview/thecoffeehouse</span>
                  </div>
                  <div className="w-4" />
                </div>

                {/* Inner Preview Content: Business Storefront + Modern Website Mockup */}
                <div className="relative rounded-lg overflow-hidden bg-slate-900 border border-white/5 aspect-[16/10]">
                  <img
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80"
                    alt="The Coffee House Chandigarh Mockup"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060F1E] via-[#060F1E]/40 to-transparent" />

                  {/* On-screen Website Hero Mockup UI */}
                  <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-[#060F1E]/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">Live Web Preview</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">The Coffee House & Bakery</h4>
                      <p className="text-[11px] text-slate-300">Sector 17, Chandigarh • 4.6★ (2.5k reviews)</p>
                    </div>
                    <button 
                      onClick={onExploreMarketplace}
                      className="px-3 py-1.5 rounded-lg bg-[#19BDF0] hover:bg-[#14a7d4] text-slate-950 font-bold text-[11px] shrink-0 shadow-md"
                    >
                      View Live Site
                    </button>
                  </div>
                </div>

              </div>

              {/* Floating Holographic Element 1: Developer Assigned */}
              <div className="absolute -top-6 -right-6 sm:-right-8 p-3 rounded-xl bg-[#09152A]/95 border border-[#19BDF0]/30 shadow-2xl backdrop-blur-md flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Arjun Mehta"
                  className="w-10 h-10 rounded-full border border-[#19BDF0] object-cover"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-white">Arjun Mehta</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#19BDF0]" />
                  </div>
                  <p className="text-[10px] text-slate-300">Full Stack Web Dev • 4.9★</p>
                  <span className="inline-block text-[9px] text-[#19BDF0] font-medium bg-[#19BDF0]/10 px-1.5 rounded">
                    Matched via NAVIRA
                  </span>
                </div>
              </div>

              {/* Floating Holographic Element 2: Verified Result */}
              <div className="absolute -bottom-6 -left-6 sm:-left-8 p-3.5 rounded-xl bg-[#09152A]/95 border border-[#10B981]/30 shadow-2xl backdrop-blur-md flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#10B981]/15 flex items-center justify-center text-emerald-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">+140% Online Footfall</div>
                  <p className="text-[10px] text-slate-300">Local SEO & Fast Mobile Menu</p>
                  <div className="flex items-center gap-1 text-[9px] text-emerald-400 font-semibold mt-0.5">
                    <span>Verified Result</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
