import React from 'react';
import { ShieldCheck, Target, Palette, MessageSquareCode, Sparkles } from 'lucide-react';

export const WhyNaviraSection: React.FC = () => {
  const features = [
    {
      title: 'Trusted Connections',
      subtitle: 'Zero Anonymous Listings',
      description: 'Every business is verified against live Google Maps records in Mohali & Chandigarh. Every developer profile is vetted for real code quality and portfolio authenticity.',
      icon: ShieldCheck,
      gradient: 'from-[#19BDF0] to-[#38BDF8]',
      borderHover: 'hover:border-[#19BDF0]/40'
    },
    {
      title: 'Discover Real Opportunities',
      subtitle: 'Data-Backed Client Demand',
      description: 'Stop cold emailing empty leads. Access 239 verified local businesses with high Google ratings that have zero websites and actively need digital storefronts.',
      icon: Target,
      gradient: 'from-rose-500 to-orange-500',
      borderHover: 'hover:border-rose-500/40'
    },
    {
      title: 'Professional Portfolios',
      subtitle: 'Interactive Previews & Proof',
      description: 'Inspect live website demos, verified customer testimonials, and clear service packages before committing to a single rupee of budget.',
      icon: Palette,
      gradient: 'from-[#10B981] to-[#34D399]',
      borderHover: 'hover:border-[#10B981]/40'
    },
    {
      title: 'Simple Direct Communication',
      subtitle: 'Structured Milestones & Chat',
      description: 'Connect directly without agency middlemen or inflated markups. Review design iterations, track development progress, and launch smoothly.',
      icon: MessageSquareCode,
      gradient: 'from-[#A78BFA] to-[#818CF8]',
      borderHover: 'hover:border-[#A78BFA]/40'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-[#030712]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#19BDF0]/10 border border-[#19BDF0]/20 text-[#19BDF0] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The NAVIRA Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Businesses & Developers Choose NAVIRA
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Engineered specifically to solve the local website discovery dilemma: small businesses need websites, and talented developers need verified clients.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className={`rounded-2xl bg-[#09152A]/70 border border-white/[0.08] ${feat.borderHover} p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-black/50 group hover:-translate-y-1`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feat.gradient} flex items-center justify-center text-slate-950 mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-slate-950" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#19BDF0] transition-colors">
                    {feat.title}
                  </h3>
                  <div className="text-xs font-semibold text-emerald-400 mt-0.5 mb-3">
                    {feat.subtitle}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
                  <span>Guaranteed Quality</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#19BDF0]" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export const WhySiteSaathiSection = WhyNaviraSection;

