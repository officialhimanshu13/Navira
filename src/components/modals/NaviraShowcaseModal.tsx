import React, { useState } from 'react';
import { X, Play, Clock, Sparkles, CheckCircle2, ShieldCheck, Store, Users, BarChart3, ArrowRight } from 'lucide-react';
import { NaviraLogo } from '../NaviraLogo';
import { NAVIRA_SHOWCASE_CONFIG } from '../../config/showcaseConfig';

interface NaviraShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreMarketplace: () => void;
}

export const NaviraShowcaseModal: React.FC<NaviraShowcaseModalProps> = ({
  isOpen,
  onClose,
  onExploreMarketplace,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'intelligence' | 'matching'>('overview');
  const config = NAVIRA_SHOWCASE_CONFIG;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#09152A] border border-[#19BDF0]/30 shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] flex flex-col justify-between">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <NaviraLogo size="sm" />
            <span className="text-[10px] font-semibold text-[#19BDF0] bg-[#19BDF0]/10 border border-[#19BDF0]/20 px-2.5 py-0.5 rounded-full">
              Platform Walkthrough
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {config.title}
          </h2>
          <p className="text-xs text-slate-400 mt-1 mb-5">
            Connecting local businesses with skilled developers through verified market intelligence in Mohali & Chandigarh.
          </p>

          {/* Video or Cinematic Official Demonstration Placeholder Frame */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-[#030712] border border-white/10 group mb-6 shadow-2xl">
            {config.videoUrl ? (
              <iframe
                src={config.videoUrl}
                title="NAVIRA Official Demonstration"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-6 select-none">
                {/* Background image preview */}
                <img
                  src={config.previewImageUrl}
                  alt="NAVIRA Project Showcase"
                  className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09152A] via-[#09152A]/60 to-[#030712]/80" />

                {/* Central Play Badge */}
                <div className="relative z-10 space-y-3">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#19BDF0]/20 via-[#10B981]/20 to-[#A78BFA]/20 border-2 border-[#19BDF0]/60 flex items-center justify-center mx-auto shadow-2xl shadow-[#19BDF0]/30 transform group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-[#19BDF0] fill-[#19BDF0]/30 ml-1" />
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-white">
                      NAVIRA Platform & Project Showcase
                    </h3>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#19BDF0]/15 border border-[#19BDF0]/30 text-[#19BDF0] text-xs font-semibold mt-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{config.subtitle}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300 max-w-sm mx-auto leading-relaxed">
                    The official platform overview and live case studies video will be streamed here upon general public release.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 3 Pillar Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-xs">
            <div className="p-3.5 rounded-xl bg-[#060F1E] border border-white/5 space-y-1">
              <div className="flex items-center gap-1.5 text-[#19BDF0] font-bold">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>325 Verified Leads</span>
              </div>
              <p className="text-[11px] text-slate-400">
                100% on-ground Google Maps research in Chandigarh & Mohali.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#060F1E] border border-white/5 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Users className="w-3.5 h-3.5" />
                <span>Vetted Talent Pool</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Direct matching with verified regional developers and designers.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#060F1E] border border-white/5 space-y-1">
              <div className="flex items-center gap-1.5 text-[#A78BFA] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Milestone Security</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Transparent stage approvals and zero hidden broker markups.
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            onClose();
            onExploreMarketplace();
          }}
          className="w-full py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-[#19BDF0] to-[#10B981] hover:from-[#14a7d4] hover:to-[#059669] shadow-lg shadow-[#19BDF0]/20 transition-all flex items-center justify-center gap-2"
        >
          <span>Explore NAVIRA Marketplace Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};

// Aliased export for backwards compatibility
export const DemoVideoModal = NaviraShowcaseModal;

