import React, { useState } from 'react';
import { X, Plus, AlertCircle } from 'lucide-react';
import { BusinessRecord, WebsiteStatus } from '../types/business';
import { calculateOpportunityScore } from '../utils/scoring';
import { standardizeCategory } from '../utils/cleaner';
import { PERMANENT_STUDY_AREA_CONFIG, validateLocation, ValidCity } from '../config/locationConfig';

interface AddBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newBusiness: BusinessRecord) => void;
  existingCount: number;
}

export const AddBusinessModal: React.FC<AddBusinessModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  existingCount
}) => {
  if (!isOpen) return null;

  const [businessName, setBusinessName] = useState('');
  const [city, setCity] = useState<ValidCity>('Chandigarh');
  const [category, setCategory] = useState('Restaurants, Cafes & Bakeries');
  const [locality, setLocality] = useState('Sector 35');
  const [address, setAddress] = useState('SCO 10, Sector 35-C, Chandigarh');
  const [phone, setPhone] = useState('+91 172 260 1234');
  const [rating, setRating] = useState('4.5');
  const [reviewCount, setReviewCount] = useState('55');
  const [websiteStatus, setWebsiteStatus] = useState<WebsiteStatus>('Not Found');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [verificationNotes, setVerificationNotes] = useState('Verified via Google search and local directory audit; no dedicated official website located.');
  const [error, setError] = useState('');

  // Localities for selected city
  const cityLocalities = PERMANENT_STUDY_AREA_CONFIG.localities.filter((l) => l.city === city);

  // Live score preview
  const numRating = parseFloat(rating) || 0;
  const numReviews = parseInt(reviewCount, 10) || 0;
  const liveCalc = calculateOpportunityScore({
    businessName: businessName || 'Preview Business',
    category,
    locality,
    address,
    phone,
    rating: numRating,
    reviewCount: numReviews,
    websiteStatus
  });

  const handleCityChange = (newCity: ValidCity) => {
    setCity(newCity);
    const firstLoc = PERMANENT_STUDY_AREA_CONFIG.localities.find((l) => l.city === newCity);
    if (firstLoc) {
      setLocality(firstLoc.name);
      setAddress(`SCO 12, ${firstLoc.name}, ${newCity}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) {
      setError('Business name is required.');
      return;
    }

    // Geographic boundary check
    const locAudit = validateLocation(locality, city, address);
    if (!locAudit.isValid) {
      setError(`Location restriction: ${locAudit.error || 'Location not in study area'}`);
      return;
    }

    const newId = `MOH-CHD-${String(existingCount + 1).padStart(4, '0')}`;
    const cleanCat = standardizeCategory(category).standardized;
    const finalCity: ValidCity = locAudit.normalizedCity === 'Unknown' ? city : locAudit.normalizedCity;

    const recordCandidate: BusinessRecord = {
      businessId: newId,
      businessName: businessName.trim(),
      category: cleanCat,
      address: address.trim(),
      locality: locAudit.normalizedLocality,
      city: finalCity,
      phone: phone.trim(),
      rating: Math.max(0, Math.min(5, numRating)),
      reviewCount: Math.max(0, numReviews),
      websiteStatus,
      websiteUrl: websiteStatus === 'Found' ? websiteUrl.trim() : '',
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${businessName} ${locality} ${city}`)}`,
      opportunityScore: 0,
      scoreBreakdown: {
        noWebsitePoints: 0,
        ratingPoints: 0,
        reviewCountPoints: 0,
        completenessPoints: 0,
        improvementPoints: 0,
        totalScore: 0,
        reasons: []
      },
      recommendation: '',
      collectionDate: 'October 2026',
      lastVerificationDate: '2026-10-31',
      verificationNotes: verificationNotes.trim(),
      recordVerificationStatus: 'Verified Real Business'
    };

    const { score, breakdown, recommendation } = calculateOpportunityScore(recordCandidate);
    recordCandidate.opportunityScore = score;
    recordCandidate.scoreBreakdown = breakdown;
    recordCandidate.recommendation = recommendation;

    onAdd(recordCandidate);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-950/80 border-b border-slate-800 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20 shadow-inner">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Add Business Listing</h2>
              <p className="text-xs text-slate-400">Add a verified business listing in Mohali or Chandigarh</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Live Score Preview Card */}
          <div className="p-3.5 bg-slate-800/60 border border-slate-700/60 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
                Calculated Opportunity Score
              </span>
              <span className="text-xs text-slate-400">
                {websiteStatus === 'Not Found' ? 'High follow-up prospect' : 'Standard profile'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xl font-extrabold text-cyan-400">{liveCalc.score} / 10</span>
              <span className="block text-[10px] text-slate-500 font-medium">10-Point Model</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-300 mb-1">
                Business Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => {
                  setBusinessName(e.target.value);
                  setError('');
                }}
                placeholder="e.g. Amigos Artisanal Cafe"
                className="w-full p-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50"
              />
            </div>

            {/* City Selection */}
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                City <span className="text-rose-400">*</span>
              </label>
              <select
                value={city}
                onChange={(e) => handleCityChange(e.target.value as ValidCity)}
                className="w-full p-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-200 font-semibold focus:ring-2 focus:ring-cyan-500/30"
              >
                <option value="Chandigarh">Chandigarh</option>
                <option value="Mohali">Mohali (SAS Nagar)</option>
              </select>
            </div>

            {/* Locality Selection (from approved list) */}
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Locality <span className="text-rose-400">*</span>
              </label>
              <select
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full p-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-200 focus:ring-2 focus:ring-cyan-500/30"
              >
                {cityLocalities.map((loc) => (
                  <option key={loc.id} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-300 mb-1">Primary Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-200 focus:ring-2 focus:ring-cyan-500/30"
              >
                <option value="Restaurants, Cafes & Bakeries">Restaurants, Cafes & Bakeries</option>
                <option value="Healthcare & Dental Clinics">Healthcare & Dental Clinics</option>
                <option value="Auto Repair & Service Centres">Auto Repair & Service Centres</option>
                <option value="Fitness Centres & Yoga Studios">Fitness Centres & Yoga Studios</option>
                <option value="Salons & Spas">Salons & Spas</option>
                <option value="Retail & Boutiques">Retail & Boutiques</option>
                <option value="Education & Coaching Institutes">Education & Coaching Institutes</option>
                <option value="Home & Professional Services">Home & Professional Services</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-300 mb-1">Full Street Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. SCO 44, Phase 3B2, SAS Nagar, Mohali"
                className="w-full p-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Public Rating (0.0 - 5.0)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full p-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-200 focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Review Count</label>
              <input
                type="number"
                min="0"
                value={reviewCount}
                onChange={(e) => setReviewCount(e.target.value)}
                className="w-full p-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-200 focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Public Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 172 260 1234"
                className="w-full p-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Website Verification Status</label>
              <select
                value={websiteStatus}
                onChange={(e) => setWebsiteStatus(e.target.value as WebsiteStatus)}
                className="w-full p-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-200 font-medium focus:ring-2 focus:ring-cyan-500/30"
              >
                <option value="Not Found">Not Found (No website located)</option>
                <option value="Found">Found (Official domain verified)</option>
                <option value="Unclear">Unclear (Ambiguous directory/social)</option>
              </select>
            </div>

            {websiteStatus === 'Found' && (
              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-300 mb-1">Official Website URL</label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full p-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-cyan-500/30"
                />
              </div>
            )}

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-300 mb-1">Verification Audit Notes</label>
              <textarea
                value={verificationNotes}
                onChange={(e) => setVerificationNotes(e.target.value)}
                rows={2}
                className="w-full p-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl shadow-lg shadow-cyan-500/25 transition-colors"
            >
              Add to Dataset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
