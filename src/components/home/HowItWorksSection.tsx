import React, { useState } from 'react';
import { 
  UserPlus, 
  Search, 
  MessageSquare, 
  Rocket, 
  Store, 
  Code2, 
  CheckCircle2, 
  ArrowRight,
  Shield,
  Laptop
} from 'lucide-react';

interface HowItWorksSectionProps {
  onJoinBusiness: () => void;
  onJoinDeveloper: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onJoinBusiness,
  onJoinDeveloper,
}) => {
  const [activeTab, setActiveTab] = useState<'business' | 'developer'>('business');

  const businessSteps = [
    {
      step: '01',
      title: 'Create Your Business Profile',
      subtitle: 'Free & Instant Setup',
      description: 'Tell us about your shop, clinic, salon, or store. Link your existing Google Maps listing to auto-verify your location and customer reviews.',
      icon: UserPlus,
      tag: '5 Minutes',
      accent: 'from-[#19BDF0] to-[#38BDF8]'
    },
    {
      step: '02',
      title: 'Discover Vetted Developers',
      subtitle: 'Portfolios & Local Experience',
      description: 'Browse verified developers in Mohali and Chandigarh. Filter by skills, industry experience, customer ratings, and previous work samples.',
      icon: Search,
      tag: 'Transparent Profiles',
      accent: 'from-[#38BDF8] to-[#10B981]'
    },
    {
      step: '03',
      title: 'Connect & Review Proposals',
      subtitle: 'Direct Messaging & Quotes',
      description: 'Discuss your goals directly with developers. Compare custom proposals, design mockups, delivery timelines, and transparent pricing with no surprises.',
      icon: MessageSquare,
      tag: 'Zero Commission Fees',
      accent: 'from-[#10B981] to-[#A78BFA]'
    },
    {
      step: '04',
      title: 'Build, Launch & Grow Online',
      subtitle: 'Milestone-Based Delivery',
      description: 'Track progress across clear project milestones. Launch your fast, mobile-friendly website and watch your local walk-ins and inquiries multiply.',
      icon: Rocket,
      tag: 'Verified Outcomes',
      accent: 'from-[#A78BFA] to-[#C084FC]'
    }
  ];

  const developerSteps = [
    {
      step: '01',
      title: 'Create Your Developer Profile',
      subtitle: 'Showcase Your Mastery',
      description: 'Highlight your tech stack (React, Next.js, Webflow, Shopify), link your live portfolios, and set your rates and availability in the Tricity.',
      icon: Code2,
      tag: 'Verified Badge',
      accent: 'from-[#A78BFA] to-[#818CF8]'
    },
    {
      step: '02',
      title: 'Discover High-Potential Leads',
      subtitle: 'Real Tricity Business Data',
      description: 'Access 325 source-verified businesses across Mohali & Chandigarh. Spot 239 highly-rated businesses that currently lack a website.',
      icon: Search,
      tag: '325 Researched Leads',
      accent: 'from-[#818CF8] to-[#19BDF0]'
    },
    {
      step: '03',
      title: 'Send Targeted Web Proposals',
      subtitle: 'Value-First Pitching',
      description: 'Reach out with tailored pitch summaries and feature recommendations (online menu, booking slots, WhatsApp cart) that solve genuine client needs.',
      icon: MessageSquare,
      tag: 'Direct Client Chat',
      accent: 'from-[#19BDF0] to-[#10B981]'
    },
    {
      step: '04',
      title: 'Manage Projects & Get Paid',
      subtitle: 'Milestones & Credibility',
      description: 'Deliver on structured milestones, gather verified local client reviews, build your reputation, and scale your freelance agency.',
      icon: Rocket,
      tag: 'Grow Your Career',
      accent: 'from-[#10B981] to-[#34D399]'
    }
  ];

  const currentSteps = activeTab === 'business' ? businessSteps : developerSteps;

  return (
    <section id="how-it-works" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#19BDF0]/10 border border-[#19BDF0]/20 text-[#19BDF0] text-xs font-semibold mb-3">
            <Laptop className="w-3.5 h-3.5" />
            <span>Simple, Structured & Transparent</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How NAVIRA Works
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            A frictionless platform built for trust, clarity, and successful digital transformations.
          </p>

          {/* Persona Switcher Tabs */}
          <div className="inline-flex p-1 rounded-full bg-[#060F1E] border border-white/10 mt-6 shadow-xl">
            <button
              onClick={() => setActiveTab('business')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'business'
                  ? 'bg-gradient-to-r from-[#19BDF0] to-[#10B981] text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>For Business Owners</span>
            </button>
            <button
              onClick={() => setActiveTab('developer')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'developer'
                  ? 'bg-gradient-to-r from-[#10B981] to-[#19BDF0] text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>For Web Developers</span>
            </button>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentSteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative rounded-2xl bg-[#09152A]/70 border border-white/[0.08] p-6 flex flex-col justify-between hover:border-[#19BDF0]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-black/50 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black bg-gradient-to-r from-slate-500 to-slate-700 bg-clip-text text-transparent group-hover:from-[#19BDF0] group-hover:to-[#10B981] transition-all">
                      {item.step}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-300 border border-white/10">
                      {item.tag}
                    </span>
                  </div>

                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${item.accent} flex items-center justify-center text-slate-950 mb-4 shadow-lg group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6 text-slate-950" />
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#19BDF0] transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs font-medium text-emerald-400 mt-0.5 mb-2.5">
                    {item.subtitle}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
                  <span>Step {idx + 1} of 4</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Prompt */}
        <div className="mt-12 text-center">
          {activeTab === 'business' ? (
            <button
              onClick={onJoinBusiness}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-[#19BDF0] to-[#10B981] hover:shadow-lg hover:shadow-[#19BDF0]/30 transition-all"
            >
              <span>Get Your Business Website Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onJoinDeveloper}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-[#10B981] to-[#19BDF0] hover:shadow-lg hover:shadow-[#10B981]/30 transition-all"
            >
              <span>Join as a Verified Developer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
