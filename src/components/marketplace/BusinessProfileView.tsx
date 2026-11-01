import React from 'react';
import { BusinessRecord } from '../../types/business';
import { BusinessMapView } from '../map/BusinessMapView';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Globe2, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  Rocket, 
  ExternalLink,
  Store,
  Map
} from 'lucide-react';

interface BusinessProfileViewProps {
  business: BusinessRecord;
  onBack: () => void;
  onSendProposal: (business: BusinessRecord) => void;
  onFindDevelopersForBusiness: (business: BusinessRecord) => void;
  isAdmin?: boolean;
}

export const BusinessProfileView: React.FC<BusinessProfileViewProps> = ({
  business,
  onBack,
  onSendProposal,
  onFindDevelopersForBusiness,
  isAdmin = false,
}) => {
  const getCoverImage = () => {
    const cat = business.category.toLowerCase();
    if (cat.includes('cafe') || cat.includes('restaurant') || cat.includes('bakery')) {
      return 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80';
    }
    if (cat.includes('salon') || cat.includes('spa')) {
      return 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80';
    }
    if (cat.includes('dental') || cat.includes('health') || cat.includes('clinic')) {
      return 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80';
    }
    if (cat.includes('retail') || cat.includes('boutique') || cat.includes('saree')) {
      return 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80';
    }
    if (cat.includes('gym') || cat.includes('fitness') || cat.includes('yoga')) {
      return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80';
    }
    if (cat.includes('auto') || cat.includes('car') || cat.includes('repair')) {
      return 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80';
    }
    return 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80';
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#060F1E] text-slate-300 hover:text-white border border-white/10 text-xs font-semibold transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Business Directory</span>
      </button>

      {/* Hero Cover Card */}
      <div className="rounded-3xl bg-[#09152A]/90 border border-white/[0.08] overflow-hidden shadow-2xl relative">
        
        {/* Cover Photo */}
        <div className="h-56 sm:h-72 w-full relative overflow-hidden bg-slate-900">
          <img
            src={getCoverImage()}
            alt={business.businessName}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09152A] via-[#09152A]/30 to-transparent" />
        </div>

        {/* Info Header */}
        <div className="px-6 sm:px-10 pb-8 pt-0 relative -mt-16 sm:-mt-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-[#09152A] to-[#0F2140] border-4 border-[#09152A] flex items-center justify-center text-white shadow-2xl shrink-0">
              <Store className="w-12 h-12 text-[#19BDF0]" />
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {business.businessName}
                </h1>
                <div className="flex items-center gap-1 text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Google Business</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-300 mt-2">
                <span className="text-[#19BDF0] font-semibold">{business.category}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{business.locality}, {business.city}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 text-amber-400 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{business.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">({business.reviewCount} Google reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center justify-center sm:justify-end gap-3 shrink-0">
            <button
              onClick={() => onSendProposal(business)}
              className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 shadow-lg shadow-rose-500/30 transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4 text-white" />
              <span>Send Website Pitch</span>
            </button>
            <a
              href={business.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-xl font-semibold text-xs text-slate-300 hover:text-white bg-[#060F1E] hover:bg-[#0F2140] border border-white/10 transition-all flex items-center gap-1.5"
            >
              <ExternalLink className="w-4 h-4 text-[#19BDF0]" />
              <span>Google Maps</span>
            </a>
          </div>

        </div>

      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Business Details, Digital Audit & Geospatial Maps */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Card 1: Digital Presence Audit */}
          <div className="p-6 rounded-2xl bg-[#09152A]/80 border border-white/[0.08] space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-[#19BDF0]" />
              <span>Digital Presence & Website Status</span>
            </h3>

            <div className="p-4 rounded-xl bg-[#060F1E] border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Current Status</span>
                <span className={`text-base font-bold ${
                  business.websiteStatus === 'Not Found'
                    ? 'text-rose-400'
                    : business.websiteStatus === 'Found'
                    ? 'text-emerald-400'
                    : 'text-amber-400'
                }`}>
                  {business.websiteStatus === 'Not Found' ? 'No Official Website Listed' : business.websiteStatus === 'Found' ? 'Active Website Verified' : 'Ambiguous / Unclear Presence'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Opportunity Score</span>
                <span className="text-xl font-black text-rose-400">{business.opportunityScore}/10</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {business.verificationNotes}
            </p>

            {business.websiteUrl && (
              <div className="pt-2 flex items-center gap-2 text-xs text-[#19BDF0]">
                <span>Registered URL: </span>
                <a
                  href={business.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline flex items-center gap-1"
                >
                  {business.websiteUrl}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

          {/* Card 2: Interactive Geospatial Map (CHANGE 10: Street, Satellite, Density) */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2 px-1">
              <Map className="w-4 h-4 text-[#19BDF0]" />
              <span>Geographic Location & Territory Density</span>
            </h3>
            <BusinessMapView business={business} />
          </div>

          {/* Card 3: Strategic Recommendation */}
          <div className="p-6 rounded-2xl bg-[#09152A]/80 border border-white/[0.08] space-y-3">
            <h3 className="text-lg font-bold text-white">Recommended Digital Solution</h3>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-sm text-slate-200 font-mono">
              {business.recommendation}
            </div>
            <p className="text-xs text-slate-400">
              Based on the 10-point scoring algorithm combining missing website status (+3), high customer ratings (+2), review volume (+2), and operational completeness.
            </p>
          </div>

          {/* Card 4: Business Information & Verification Attributes */}
          <div className="p-6 rounded-2xl bg-[#09152A]/80 border border-white/[0.08] space-y-4">
            <h3 className="text-lg font-bold text-white">Verified Location & Contact Record</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-[#060F1E] border border-white/5">
                <span className="text-slate-400 block mb-1">Full Physical Address</span>
                <span className="text-white font-medium">{business.address}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#060F1E] border border-white/5">
                <span className="text-slate-400 block mb-1">Locality & Sector</span>
                <span className="text-white font-medium">{business.locality}, {business.city}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#060F1E] border border-white/5">
                <span className="text-slate-400 block mb-1">Phone Contact</span>
                <span className="text-white font-medium">{business.phone || 'Available on Google Maps listing'}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#060F1E] border border-white/5">
                <span className="text-slate-400 block mb-1">Collection & Audit Date</span>
                <span className="text-white font-medium">{business.collectionDate} (Baseline Audit)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Quick Action Card */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="rounded-3xl bg-gradient-to-br from-[#09152A] via-[#060F1E] to-[#0F2140] border border-rose-500/30 p-6 shadow-2xl relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-rose-500/15 flex items-center justify-center text-rose-400 mb-4">
              <Rocket className="w-5 h-5" />
            </div>

            <h3 className="text-xl font-extrabold text-white tracking-tight">
              Need a Website?
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Connect with top-rated web developers in Mohali and Chandigarh ready to build a high-speed website for {business.businessName}.
            </p>

            <div className="my-5 p-3.5 rounded-xl bg-[#030712]/70 border border-white/5 space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Target Launch:</span>
                <span className="text-white font-medium">7–12 Business Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Typical Package:</span>
                <span className="text-[#19BDF0] font-semibold">₹15,000 – ₹25,000</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => onSendProposal(business)}
                className="w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-white" />
                <span>Send Proposal / Pitch</span>
              </button>

              <button
                onClick={() => onFindDevelopersForBusiness(business)}
                className="w-full py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-[#19BDF0] to-[#38BDF8] hover:from-[#38BDF8] hover:to-[#19BDF0] shadow-lg shadow-[#19BDF0]/25 transition-all flex items-center justify-center gap-2"
              >
                <Rocket className="w-4 h-4 text-slate-950" />
                <span>Find Matching Developers</span>
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#060F1E]/60 border border-white/5 flex items-start gap-3 text-xs text-slate-300">
            <CheckCircle2 className="w-5 h-5 text-[#19BDF0] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">NAVIRA Pitch Guidelines</span>
              Keep proposals concise and focused on high conversion features like mobile menus, appointment booking, or local SEO.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
