import React from 'react';
import { NaviraLogo } from '../NaviraLogo';
import { MapPin, Mail, Phone, Shield, ArrowUpRight } from 'lucide-react';

interface NaviraFooterProps {
  onNavigate: (view: string) => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export const NaviraFooter: React.FC<NaviraFooterProps> = ({
  onNavigate,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#02050D] text-slate-300 text-xs relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/4 w-96 h-40 bg-[#19BDF0]/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-40 bg-[#10B981]/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand Info & About */}
          <div className="lg:col-span-2 space-y-4">
            <NaviraLogo size="lg" />
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm mt-3 font-normal">
              <strong>Your Vision. Our Innovation. Your Future.</strong>
              <br />
              NAVIRA is an enterprise-grade digital marketplace connecting verified local businesses, restaurants, clinics, and shops with top-tier website developers across Mohali and Chandigarh.
            </p>

            {/* Official Contact Details matching CHANGE 2 */}
            <div className="pt-2 text-xs text-slate-300 space-y-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#19BDF0] shrink-0 mt-0.5" />
                <span className="font-medium text-slate-200">
                  Chandigarh Mohali, Punjab - 160055
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#10B981] shrink-0" />
                <a
                  href="mailto:navirabusiness01@gmail.com"
                  target="_top"
                  rel="noopener noreferrer"
                  aria-label="Email NAVIRA directly at navirabusiness01@gmail.com"
                  className="font-medium text-slate-200 hover:text-[#19BDF0] underline transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>navirabusiness01@gmail.com</span>
                  <ArrowUpRight className="w-3 h-3 text-[#19BDF0]" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: For Businesses */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              For Businesses
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button onClick={() => onNavigate('developers')} className="hover:text-[#19BDF0] transition-colors">
                  Find a Developer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="hover:text-[#19BDF0] transition-colors">
                  How It Works for Shops
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-[#19BDF0] transition-colors">
                  Business Owner Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('analytics')} className="hover:text-[#19BDF0] transition-colors">
                  Google Maps Audit Engine
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-[#19BDF0] transition-colors">
                  Project Milestones
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: For Developers */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              For Developers
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button onClick={() => onNavigate('businesses')} className="hover:text-[#19BDF0] transition-colors">
                  Discover Business Leads (325)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-[#19BDF0] transition-colors">
                  Developer Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('messages')} className="hover:text-[#19BDF0] transition-colors">
                  Client Direct Messaging
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('analytics')} className="hover:text-[#19BDF0] transition-colors">
                  Tricity Opportunity Analysis
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('developers')} className="hover:text-[#19BDF0] transition-colors">
                  Join Verified Talent Pool
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust, Support & FAQ */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Trust & Support
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-[#19BDF0] transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-[#19BDF0] transition-colors">
                  Ask NAVIRA (Confidential Inquiry)
                </button>
              </li>
              <li>
                <span className="text-slate-300 hover:text-white cursor-pointer">
                  Privacy Policy & Merchant Security
                </span>
              </li>
              <li>
                <span className="text-slate-300 hover:text-white cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#060F1E] text-[10px] text-emerald-400 border border-emerald-500/20">
                  <Shield className="w-3 h-3" />
                  <span>ISO-aligned Data Protection</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="mt-12 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 <strong className="text-white">NAVIRA</strong>. All rights reserved. Your Vision. Our Innovation. Your Future.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Chandigarh Mohali, Punjab - 160055</span>
            <span>•</span>
            <a 
              href="mailto:navirabusiness01@gmail.com" 
              target="_top"
              rel="noopener noreferrer"
              aria-label="Email NAVIRA"
              className="text-slate-300 hover:text-[#19BDF0] underline transition-colors cursor-pointer"
            >
              navirabusiness01@gmail.com
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export const SiteSaathiFooter = NaviraFooter;

