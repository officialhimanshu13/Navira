import React from 'react';

interface NaviraLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const NaviraLogo: React.FC<NaviraLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const sizeMap = {
    sm: { icon: 'w-7 h-7', text: 'text-lg', badge: 'text-[9px] px-1.5 py-0.5' },
    md: { icon: 'w-9 h-9', text: 'text-xl', badge: 'text-[10px] px-2 py-0.5' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl', badge: 'text-xs px-2.5 py-1' },
    xl: { icon: 'w-16 h-16', text: 'text-3xl', badge: 'text-xs px-3 py-1' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Geometric NAVIRA Emblem */}
      <div className={`relative ${currentSize.icon} flex items-center justify-center shrink-0`}>
        {/* Subtle obsidian & cyan ambient glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#19BDF0] via-[#10B981] to-[#818CF8] opacity-35 blur-md rounded-xl" />

        {/* Precision Geometric SVG Emblem */}
        <svg
          viewBox="0 0 100 100"
          className="relative w-full h-full drop-shadow-lg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="navira-grad-left" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#19BDF0" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <linearGradient id="navira-grad-center" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
            <linearGradient id="navira-grad-right" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
            <radialGradient id="navira-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#19BDF0" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background faceted dark plate */}
          <polygon
            points="50,6 92,26 92,74 50,94 8,74 8,26"
            fill="#08101E"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="2"
          />

          {/* Left Vertical Pillar */}
          <polygon
            points="24,24 38,24 38,76 24,76"
            fill="url(#navira-grad-left)"
          />

          {/* Geometric Diagonal Ribbon */}
          <polygon
            points="38,24 52,24 76,76 62,76"
            fill="url(#navira-grad-center)"
            opacity="0.95"
          />

          {/* Right Vertical Pillar */}
          <polygon
            points="62,24 76,24 76,76 62,76"
            fill="url(#navira-grad-right)"
          />

          {/* Apex Highlighting Beacon */}
          <circle cx="50" cy="50" r="5" fill="url(#navira-glow)" />
          <circle cx="50" cy="50" r="2.5" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex items-center gap-2 tracking-tight">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className={`${currentSize.text} font-black text-white tracking-wider`}>
                NAVIRA
              </span>
              <span className="hidden sm:inline-flex items-center rounded-full bg-[#19BDF0]/10 text-[#19BDF0] border border-[#19BDF0]/25 font-semibold uppercase text-[9px] px-1.5 py-0.5">
                Marketplace
              </span>
            </div>
            <span className="text-[9px] tracking-widest uppercase font-medium text-slate-400 mt-0.5">
              Intelligence & Dev Hub
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// Aliased export for backwards compatibility
export const SiteSaathiLogo = NaviraLogo;

