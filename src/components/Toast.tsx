import React, { useEffect } from 'react';
import { CheckCircle2, X, Clock, Sparkles } from 'lucide-react';

export interface ToastProps {
  show: boolean;
  message?: string;
  subtitle?: string;
  onClose: () => void;
  durationMs?: number;
}

export const Toast: React.FC<ToastProps> = ({
  show,
  message = 'Success! We will respond within 24 hours',
  subtitle = 'Your request has been logged and assigned to the NAVIRA team.',
  onClose,
  durationMs = 4500,
}) => {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      onClose();
    }, durationMs);
    return () => clearTimeout(timer);
  }, [show, durationMs, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="rounded-2xl bg-[#09152A]/95 border border-emerald-500/40 p-4 shadow-2xl shadow-black/80 backdrop-blur-xl flex items-start gap-3.5 relative overflow-hidden">
        {/* Glow bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-400 to-[#19BDF0]" />
        
        {/* Icon */}
        <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
          <CheckCircle2 className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              Dispatched
            </span>
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <Clock className="w-2.5 h-2.5 text-[#19BDF0]" />
              24h SLA
            </span>
          </div>
          <h4 className="text-sm font-bold text-white tracking-tight leading-snug">
            {message}
          </h4>
          {subtitle && (
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

