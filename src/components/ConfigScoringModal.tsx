import React, { useState } from 'react';
import { X, Sliders, CheckCircle, RotateCcw, Info } from 'lucide-react';
import { ScoringWeights } from '../types/business';
import { DEFAULT_WEIGHTS } from '../utils/scoring';

interface ConfigScoringModalProps {
  isOpen: boolean;
  onClose: () => void;
  weights: ScoringWeights;
  onSave: (updatedWeights: ScoringWeights) => void;
}

export const ConfigScoringModal: React.FC<ConfigScoringModalProps> = ({
  isOpen,
  onClose,
  weights,
  onSave
}) => {
  if (!isOpen) return null;

  const [formWeights, setFormWeights] = useState<ScoringWeights>({ ...weights });

  const handleReset = () => {
    setFormWeights({ ...DEFAULT_WEIGHTS });
  };

  const handleSave = () => {
    onSave(formWeights);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-950/80 border-b border-slate-800 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20 shadow-inner">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Configure Opportunity Scoring Rubric</h2>
              <p className="text-xs text-slate-400">10-Point Model Weightings & Rating/Review Thresholds</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
          <div className="p-3.5 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-start gap-2.5 text-xs text-cyan-300">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p>
              Changes applied here will immediately recalculate opportunity scores and re-rank the Top-10 list across all active business records.
            </p>
          </div>

          {/* Factor 1: Website Verification Points */}
          <div className="border border-slate-700/60 rounded-xl p-4 space-y-3 bg-slate-800/40">
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider flex items-center justify-between">
              <span>Factor 1: Official Website Status (0–3 Points)</span>
              <span className="text-cyan-400 font-semibold">Max: 3 pts</span>
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Points for "Website Not Found"
                </label>
                <input
                  type="number"
                  min="0"
                  max="3"
                  value={formWeights.notFoundPoints}
                  onChange={(e) => setFormWeights({ ...formWeights, notFoundPoints: parseInt(e.target.value, 10) || 0 })}
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 font-medium focus:ring-2 focus:ring-cyan-500/30"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Points for "Unclear Status"
                </label>
                <input
                  type="number"
                  min="0"
                  max="2"
                  value={formWeights.unclearPoints}
                  onChange={(e) => setFormWeights({ ...formWeights, unclearPoints: parseInt(e.target.value, 10) || 0 })}
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 font-medium focus:ring-2 focus:ring-cyan-500/30"
                />
              </div>
            </div>
          </div>

          {/* Factor 2: Public Rating Thresholds */}
          <div className="border border-slate-700/60 rounded-xl p-4 space-y-3 bg-slate-800/40">
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider flex items-center justify-between">
              <span>Factor 2: Public Rating Thresholds (0–2 Points)</span>
              <span className="text-cyan-400 font-semibold">Max: 2 pts</span>
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  High Rating Cutoff (Stars for +2 pts)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="3.0"
                  max="5.0"
                  value={formWeights.highRatingMin}
                  onChange={(e) => setFormWeights({ ...formWeights, highRatingMin: parseFloat(e.target.value) || 4.2 })}
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 font-medium focus:ring-2 focus:ring-cyan-500/30"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Mid Rating Cutoff (Stars for +1 pt)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="2.0"
                  max="4.5"
                  value={formWeights.midRatingMin}
                  onChange={(e) => setFormWeights({ ...formWeights, midRatingMin: parseFloat(e.target.value) || 3.8 })}
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 font-medium focus:ring-2 focus:ring-cyan-500/30"
                />
              </div>
            </div>
          </div>

          {/* Factor 3: Review Count Thresholds */}
          <div className="border border-slate-700/60 rounded-xl p-4 space-y-3 bg-slate-800/40">
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider flex items-center justify-between">
              <span>Factor 3: Review Activity Cutoffs (0–2 Points)</span>
              <span className="text-cyan-400 font-semibold">Max: 2 pts</span>
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  High Review Count (for +2 pts)
                </label>
                <input
                  type="number"
                  min="10"
                  value={formWeights.highReviewsMin}
                  onChange={(e) => setFormWeights({ ...formWeights, highReviewsMin: parseInt(e.target.value, 10) || 40 })}
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 font-medium focus:ring-2 focus:ring-cyan-500/30"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Moderate Review Count (for +1 pt)
                </label>
                <input
                  type="number"
                  min="5"
                  value={formWeights.midReviewsMin}
                  onChange={(e) => setFormWeights({ ...formWeights, midReviewsMin: parseInt(e.target.value, 10) || 15 })}
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 font-medium focus:ring-2 focus:ring-cyan-500/30"
                />
              </div>
            </div>
          </div>

          {/* Factor 4 & 5 summary */}
          <div className="border border-slate-700/60 rounded-xl p-4 bg-slate-800/30 text-xs text-slate-400 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-300">Factor 4: Complete Listing Baseline:</span>
              <span className="font-bold text-cyan-400">1 pt (Phone + Address + Category)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-300">Factor 5: Digital Growth Potential:</span>
              <span className="font-bold text-cyan-400">0–2 pts (High demand vs missing site)</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950/80 p-4 border-t border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl shadow-lg shadow-cyan-500/25 transition-colors"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Apply Scoring Rules</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
