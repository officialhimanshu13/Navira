import React, { useState } from 'react';
import { 
  X, 
  Building, 
  MapPin, 
  Phone, 
  Globe, 
  Star, 
  ExternalLink, 
  Search, 
  CheckCircle, 
  AlertCircle, 
  HelpCircle,
  Award,
  Save
} from 'lucide-react';
import { BusinessRecord, WebsiteStatus } from '../types/business';
import { calculateOpportunityScore } from '../utils/scoring';

interface BusinessDetailModalProps {
  business: BusinessRecord | null;
  onClose: () => void;
  onUpdate: (updated: BusinessRecord) => void;
}

export const BusinessDetailModal: React.FC<BusinessDetailModalProps> = ({
  business,
  onClose,
  onUpdate
}) => {
  if (!business) return null;

  const [status, setStatus] = useState<WebsiteStatus>(business.websiteStatus);
  const [websiteUrl, setWebsiteUrl] = useState(business.websiteUrl);
  const [notes, setNotes] = useState(business.verificationNotes);
  const [phone, setPhone] = useState(business.phone);
  const [address, setAddress] = useState(business.address);

  const handleSave = () => {
    const updatedCandidate = {
      ...business,
      websiteStatus: status,
      websiteUrl: status === 'Found' ? websiteUrl : '',
      verificationNotes: notes,
      phone,
      address
    };

    const { score, breakdown, recommendation } = calculateOpportunityScore(updatedCandidate);

    onUpdate({
      ...updatedCandidate,
      opportunityScore: score,
      scoreBreakdown: breakdown,
      recommendation
    });

    onClose();
  };

  const getStatusBadge = (st: WebsiteStatus) => {
    switch (st) {
      case 'Found':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">Website Found</span>;
      case 'Not Found':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/25">Website Not Found</span>;
      case 'Unclear':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/25">Unclear Status</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-950/80 border-b border-slate-800 p-5 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20 shadow-inner">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-slate-400 bg-slate-800/80 border border-slate-700/60 px-2 py-0.5 rounded">
                  {business.businessId}
                </span>
                <span className="text-xs text-cyan-400 font-medium">
                  {business.category}
                </span>
              </div>
              <h2 className="text-xl font-bold mt-1 text-white">{business.businessName}</h2>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" /> {business.locality}, {business.city}
                </span>
                <span className="flex items-center gap-1 font-semibold text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {business.rating} ({business.reviewCount} reviews)
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {business.recordVerificationStatus}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
          {/* Opportunity Scoring Breakdown Banner */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-slate-200">10-Point Opportunity Rubric Evaluation</span>
              </div>
              <span className="text-sm font-extrabold px-3 py-1 rounded-lg bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20">
                Score: {business.opportunityScore} / 10
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs mb-3">
              <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-700/40">
                <span className="block text-[10px] text-slate-400">Website Status</span>
                <span className="font-bold text-slate-200">+{business.scoreBreakdown.noWebsitePoints} pts</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-700/40">
                <span className="block text-[10px] text-slate-400">Public Rating</span>
                <span className="font-bold text-slate-200">+{business.scoreBreakdown.ratingPoints} pts</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-700/40">
                <span className="block text-[10px] text-slate-400">Review Count</span>
                <span className="font-bold text-slate-200">+{business.scoreBreakdown.reviewCountPoints} pts</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-700/40">
                <span className="block text-[10px] text-slate-400">Completeness</span>
                <span className="font-bold text-slate-200">+{business.scoreBreakdown.completenessPoints} pt</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-700/40 col-span-2 sm:col-span-1">
                <span className="block text-[10px] text-slate-400">Digital Gap</span>
                <span className="font-bold text-slate-200">+{business.scoreBreakdown.improvementPoints} pts</span>
              </div>
            </div>

            <div className="space-y-1.5 text-slate-300 text-xs">
              {business.scoreBreakdown.reasons.map((r, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Recommendation */}
          <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-slate-200">
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
              Customized Recommendation
            </span>
            <p className="text-xs leading-relaxed text-slate-300 font-medium">{business.recommendation}</p>
          </div>

          {/* Verification Audit & Status Editor */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider">
              Website Verification Audit & Listing Details
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Website Status Classification
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as WebsiteStatus)}
                  className="w-full text-xs p-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-200 font-medium focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50"
                >
                  <option value="Not Found" className="bg-slate-800 text-slate-200">Not Found (No official site found after search)</option>
                  <option value="Found" className="bg-slate-800 text-slate-200">Found (Official domain confirmed)</option>
                  <option value="Unclear" className="bg-slate-800 text-slate-200">Unclear (Ambiguous directory/social page)</option>
                </select>
              </div>

              {status === 'Found' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Official Website URL
                  </label>
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full text-xs p-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-200 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Verification Audit Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Describe how the website was checked..."
                className="w-full text-xs p-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-200 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Public Phone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-200 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-200 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50"
                />
              </div>
            </div>
          </div>

          {/* Quick Verification Actions */}
          <div className="flex items-center gap-3 pt-3 border-t border-slate-800 flex-wrap">
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(`"${business.businessName}" ${business.locality} ${business.city} official website`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors border border-slate-700"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span>Verify on Google Search</span>
            </a>

            <a
              href={business.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors border border-slate-700"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              <span>Open Google Maps Listing</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950/80 p-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Collected: {business.collectionDate}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl transition-colors shadow-lg shadow-cyan-500/25"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Recalculate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
