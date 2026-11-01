import React, { useState, useEffect, useRef } from 'react';
import { NaviraLogo } from './NaviraLogo';
import { 
  Users, 
  Store, 
  Briefcase, 
  MessageSquare, 
  BarChart3, 
  HelpCircle, 
  Menu, 
  X, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Lock,
  Unlock,
  LogOut,
  Settings,
  ChevronDown,
  LayoutDashboard,
  Search,
  Globe,
  Zap,
  Info,
  FolderKanban
} from 'lucide-react';

interface NaviraNavbarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  currentRole: 'business' | 'developer';
  onRoleChange: (role: 'business' | 'developer') => void;
  unreadMessagesCount?: number;
  activeProjectsCount?: number;
  onOpenGetStarted: () => void;
  isAdmin?: boolean;
  onOpenAdminLogin?: () => void;
  onLogoutAdmin?: () => void;
}

export const NaviraNavbar: React.FC<NaviraNavbarProps> = ({
  activeView,
  onNavigate,
  currentRole,
  onRoleChange,
  unreadMessagesCount = 0,
  activeProjectsCount = 0,
  onOpenGetStarted,
  isAdmin = false,
  onOpenAdminLogin,
  onLogoutAdmin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Primary navigation links (center)
  const primaryNavLinks = [
    { id: 'home', label: 'Home' },
    { id: 'developers', label: 'Marketplace' },
    { id: 'businesses', label: 'Opportunities', badge: '325' },
    { id: 'how-it-works', label: 'About' },
  ];

  // Secondary links for dropdown / mobile
  const secondaryNavLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban, count: activeProjectsCount },
    { id: 'messages', label: 'Messages', icon: MessageSquare, count: unreadMessagesCount },
    { id: 'analytics', label: 'Data Hub', icon: BarChart3, highlight: true },
    { id: 'faq', label: 'Help & FAQ', icon: HelpCircle },
  ];

  const handleNavClick = (view: string) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#02050D]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/50'
          : 'bg-[#030712]/60 backdrop-blur-md border-b border-white/[0.04]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[68px]">
          
          {/* Left: Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0"
          >
            <NaviraLogo size="md" />
          </button>

          {/* Center: Primary Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {primaryNavLinks.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-semibold bg-[#19BDF0]/15 text-[#19BDF0] px-1.5 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                  )}
                  {/* Active underline indicator */}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-[#19BDF0] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Auth State & Actions */}
          <div className="hidden lg:flex items-center gap-2.5">

            {isAdmin ? (
              /* Logged-in state: Avatar dropdown */
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/[0.05] transition-all group"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#19BDF0] to-[#10B981] flex items-center justify-center text-slate-950 font-bold text-xs shadow-md ring-2 ring-[#19BDF0]/20">
                    H
                  </div>
                  <div className="text-left hidden xl:block">
                    <p className="text-xs font-semibold text-white leading-tight">Himanshu</p>
                    <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-2.5 h-2.5" />
                      Admin
                    </p>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-[#0B1B33] border border-white/[0.1] shadow-2xl shadow-black/60 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                    
                    {/* User header */}
                    <div className="px-4 py-3 border-b border-white/[0.08]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#19BDF0] to-[#10B981] flex items-center justify-center text-slate-950 font-bold text-sm">
                          H
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">Himanshu</p>
                          <p className="text-[11px] text-slate-400">Administrator</p>
                        </div>
                      </div>
                    </div>

                    {/* Role switcher */}
                    <div className="px-3 py-2.5 border-b border-white/[0.08]">
                      <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider mb-2">Viewing as</p>
                      <div className="flex items-center bg-[#060F1E] p-0.5 rounded-lg border border-white/[0.06]">
                        <button
                          onClick={() => onRoleChange('business')}
                          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                            currentRole === 'business'
                              ? 'bg-[#19BDF0] text-slate-950 font-bold shadow-sm'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          <Store className="w-3 h-3" />
                          <span>Business</span>
                        </button>
                        <button
                          onClick={() => onRoleChange('developer')}
                          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                            currentRole === 'developer'
                              ? 'bg-[#10B981] text-slate-950 font-bold shadow-sm'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          <Users className="w-3 h-3" />
                          <span>Developer</span>
                        </button>
                      </div>
                    </div>

                    {/* Navigation shortcuts */}
                    <div className="py-1.5">
                      {secondaryNavLinks.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeView === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleNavClick(item.id)}
                            className={`w-full flex items-center justify-between px-4 py-2 text-xs font-medium transition-all ${
                              isActive
                                ? 'text-[#19BDF0] bg-[#19BDF0]/[0.06]'
                                : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'
                            }`}
                          >
                            <span className="flex items-center gap-2.5">
                              <Icon className="w-3.5 h-3.5 text-slate-400" />
                              <span>{item.label}</span>
                            </span>
                            <span className="flex items-center gap-1.5">
                              {item.count !== undefined && item.count > 0 && (
                                <span className="w-4.5 h-4.5 min-w-[18px] px-1 rounded-full bg-[#19BDF0] text-slate-950 font-bold text-[9px] flex items-center justify-center">
                                  {item.count}
                                </span>
                              )}
                              {item.highlight && (
                                <span className="flex h-1.5 w-1.5 relative">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#10B981]"></span>
                                </span>
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Sign out */}
                    <div className="border-t border-white/[0.08] p-2">
                      <button
                        onClick={() => {
                          onLogoutAdmin?.();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-all"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Logged-out state: Sign In + Get Started */
              <>
                <button
                  onClick={onOpenAdminLogin}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.05] transition-all"
                >
                  Sign In
                </button>

                <button
                  onClick={onOpenGetStarted}
                  className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-[#19BDF0] to-[#10B981] hover:from-[#14a7d4] hover:to-[#059669] transition-all duration-300 shadow-lg shadow-[#19BDF0]/20 hover:shadow-[#19BDF0]/40"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </>
            )}
          </div>

          {/* Mobile: Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            {isAdmin && (
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#19BDF0] to-[#10B981] flex items-center justify-center text-slate-950 font-bold text-[10px] shadow-md">
                H
              </div>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-[#060F1E] border border-white/10 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#060F1E]/95 backdrop-blur-xl border-b border-white/10 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          
          {/* Primary Links */}
          <div className="space-y-1">
            {primaryNavLinks.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#19BDF0]/10 text-[#19BDF0] border border-[#19BDF0]/20'
                      : 'text-slate-300 hover:bg-white/[0.06]'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-semibold bg-[#19BDF0]/15 text-[#19BDF0] px-1.5 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="h-px bg-white/[0.08]" />

          {/* Secondary Links */}
          <div className="grid grid-cols-2 gap-2">
            {secondaryNavLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-all ${
                    isActive
                      ? 'bg-[#19BDF0]/15 text-[#19BDF0] border border-[#19BDF0]/25'
                      : 'bg-white/[0.03] text-slate-300 hover:bg-white/[0.08]'
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">{item.label}</span>
                  {item.count !== undefined && item.count > 0 && (
                    <span className="w-4 h-4 rounded-full bg-[#19BDF0] text-slate-950 font-bold text-[9px] flex items-center justify-center ml-auto shrink-0">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="h-px bg-white/[0.08]" />

          {/* Role Switcher */}
          {isAdmin && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#02050D] border border-white/10">
              <span className="text-xs text-slate-400 font-medium">Viewing as:</span>
              <div className="flex gap-1">
                <button
                  onClick={() => onRoleChange('business')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    currentRole === 'business' ? 'bg-[#19BDF0] text-slate-950 font-bold' : 'text-slate-400'
                  }`}
                >
                  Business
                </button>
                <button
                  onClick={() => onRoleChange('developer')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    currentRole === 'developer' ? 'bg-[#10B981] text-slate-950 font-bold' : 'text-slate-400'
                  }`}
                >
                  Developer
                </button>
              </div>
            </div>
          )}

          {/* Auth Actions */}
          {isAdmin ? (
            <button
              onClick={() => {
                onLogoutAdmin?.();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAdminLogin?.();
                }}
                className="py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-white/[0.05] border border-white/10 flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5 text-[#19BDF0]" />
                <span>Sign In</span>
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenGetStarted();
                }}
                className="py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-[#19BDF0] to-[#10B981] flex items-center justify-center gap-2 shadow-lg shadow-[#19BDF0]/20"
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                <span>Get Started</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export const SiteSaathiNavbar = NaviraNavbar;
