import React from 'react';
import { Store, Code2, Sparkles, ArrowRight } from 'lucide-react';

interface FinalCtaSectionProps {
  onJoinBusiness: () => void;
  onJoinDeveloper: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onJoinBusiness,
  onJoinDeveloper,
}) => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060F1E]/60 to-[#02050D]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#19BDF0]/15 via-[#10B981]/15 to-transparent blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="rounded-3xl bg-gradient-to-b from-[#09152A] to-[#060F1E] border border-[#19BDF0]/30 p-8 sm:p-14 shadow-2xl shadow-black/80 relative overflow-hidden">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#19BDF0]/15 border border-[#19BDF0]/30 text-[#19BDF0] text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#19BDF0]" />
            <span>Launch Your Digital Presence Today</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Your Next Big Opportunity <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#19BDF0] via-[#38BDF8] to-[#10B981] bg-clip-text text-transparent">
              Starts Here.
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Whether you are a local shop owner needing your first modern website, or a talented developer looking for high-value clients in Mohali & Chandigarh — NAVIRA is your platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onJoinBusiness}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-[#19BDF0] to-[#10B981] hover:from-[#14a7d4] hover:to-[#059669] shadow-xl shadow-[#19BDF0]/20 hover:shadow-[#19BDF0]/40 transition-all transform hover:-translate-y-0.5"
            >
              <Store className="w-4 h-4 text-slate-950" />
              <span>Join as a Business</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              onClick={onJoinDeveloper}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-bold text-sm text-white bg-[#060F1E] hover:bg-[#0F2140] border border-white/15 hover:border-[#10B981]/50 shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <Code2 className="w-4 h-4 text-[#10B981]" />
              <span>Join as a Developer</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Guarantee Badges */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span>✓ Zero hidden upfront commissions</span>
            <span>✓ Verified local identities only</span>
            <span>✓ Direct WhatsApp & chat connection</span>
          </div>

        </div>

      </div>
    </section>
  );
};
