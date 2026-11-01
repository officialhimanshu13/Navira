import React, { useState } from 'react';
import { BusinessRecord } from '../../types/business';
import { DeveloperProfile } from '../../types/marketplace';
import { 
  X, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  MessageCircle, 
  Calendar, 
  IndianRupee, 
  FileText, 
  ExternalLink,
  Clock,
  MapPin,
  Star,
  Zap
} from 'lucide-react';
import { Toast } from '../Toast';

interface SendProposalModalProps {
  business: BusinessRecord | null;
  developer?: DeveloperProfile | null;
  onClose: () => void;
  onSubmitProposal: (proposalData: any) => void;
}

/**
 * Generate a pre-formatted WhatsApp deep link.
 * Uses the business phone if available, else opens WhatsApp with the message.
 */
function generateWhatsAppLink(phone: string, message: string): string {
  // Strip non-digit characters and handle Indian phone format
  let cleaned = phone.replace(/[^\d+]/g, '');
  if (!cleaned) return '';
  
  // Add India country code if missing
  if (cleaned.startsWith('0')) {
    cleaned = '91' + cleaned.slice(1);
  } else if (!cleaned.startsWith('+') && !cleaned.startsWith('91')) {
    cleaned = '91' + cleaned;
  }
  cleaned = cleaned.replace(/^\+/, '');
  
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${cleaned}?text=${encodedMsg}`;
}

export const SendProposalModal: React.FC<SendProposalModalProps> = ({
  business,
  developer,
  onClose,
  onSubmitProposal,
}) => {
  if (!business) return null;

  const [projectScope, setProjectScope] = useState(
    `Custom business website with mobile-responsive design, SEO optimization, and lead capture form for ${business.businessName}.`
  );
  const [proposedBudget, setProposedBudget] = useState('₹18,000');
  const [estimatedDelivery, setEstimatedDelivery] = useState('8 Days');
  const [pitchSummary, setPitchSummary] = useState(
    `Hi! I noticed ${business.businessName} has a strong ${business.rating}★ rating with ${business.reviewCount} reviews on Google Maps but currently lacks an official website. I'd love to help build a fast, modern web presence that converts your existing Google visibility into direct customer engagement.`
  );
  const [submitted, setSubmitted] = useState(false);
  const [whatsAppLink, setWhatsAppLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmitProposal({
      businessId: business.businessId,
      businessName: business.businessName,
      businessCategory: business.category,
      businessLocality: business.locality,
      businessCity: business.city,
      projectScope,
      proposedBudget,
      estimatedDelivery,
      pitchSummary,
    });
    
    // Generate WhatsApp deep link
    const whatsAppMessage = `Hello! I'm reaching out from NAVIRA.\n\n📋 *Project Proposal for ${business.businessName}*\n\n📍 Location: ${business.locality}, ${business.city}\n💰 Proposed Budget: ${proposedBudget}\n📅 Delivery: ${estimatedDelivery}\n\n📝 Scope:\n${projectScope}\n\n💬 Message:\n${pitchSummary}\n\n🔗 Sent via NAVIRA — Where Businesses Meet Digital Talent`;
    
    if (business.phone) {
      const link = generateWhatsAppLink(business.phone, whatsAppMessage);
      setWhatsAppLink(link);
    }
    
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#0B1B33] border border-white/[0.1] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white z-10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Success State */
          <div className="py-12 px-8 text-center space-y-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              <Clock className="w-3.5 h-3.5" />
              <span>Response SLA: Within 24 Hours</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Success! We will respond within 24 hours
            </h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              Your customized proposal for <strong className="text-white">{business.businessName}</strong> has been logged in your dashboard proposals tracker.
            </p>
            
            {/* WhatsApp CTA */}
            {whatsAppLink && (
              <div className="pt-4 space-y-3">
                <p className="text-xs text-slate-400">Connect instantly via WhatsApp:</p>
                <a
                  href={whatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#25D366] hover:bg-[#20BD5A] shadow-lg shadow-[#25D366]/25 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Open WhatsApp Chat</span>
                  <ExternalLink className="w-4 h-4 opacity-70" />
                </a>
              </div>
            )}

            {!whatsAppLink && (
              <div className="pt-2">
                <p className="text-xs text-slate-500">No phone number available for this business. You can reach out through the NAVIRA messaging system.</p>
              </div>
            )}

            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-white/[0.05] border border-white/10 hover:bg-white/10 transition-all"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-white/[0.08] shrink-0">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/20 to-orange-500/20 border border-rose-500/20 flex items-center justify-center shrink-0">
                  <Send className="w-5 h-5 text-rose-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-white truncate">
                    Send Proposal
                  </h3>
                  <p className="text-xs text-slate-400 truncate">
                    {business.businessName} • {business.locality}, {business.city}
                  </p>
                </div>
              </div>

              {/* Business Quick Info Bar */}
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#19BDF0]/10 text-[#19BDF0] border border-[#19BDF0]/20 font-medium">
                  {business.category}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
                  <Star className="w-3 h-3 fill-current" />
                  {business.rating} ({business.reviewCount} reviews)
                </span>
                {business.websiteStatus === 'Not Found' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 font-semibold">
                    <Zap className="w-3 h-3" />
                    Score: {business.opportunityScore}/10
                  </span>
                )}
              </div>
            </div>

            {/* Form Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <form id="proposal-form" onSubmit={handleSubmit} className="space-y-5 text-sm">
                
                {/* Project Scope */}
                <div>
                  <label className="flex items-center gap-1.5 text-slate-200 font-semibold mb-2 text-xs">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    Project Scope
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={projectScope}
                    onChange={(e) => setProjectScope(e.target.value)}
                    placeholder="Describe what you'll build..."
                    className="w-full px-4 py-3 rounded-xl bg-[#07172C] border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#19BDF0] focus:ring-1 focus:ring-[#19BDF0]/30 leading-relaxed resize-none transition-all"
                  />
                </div>

                {/* Budget + Timeline */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-1.5 text-slate-200 font-semibold mb-2 text-xs">
                      <IndianRupee className="w-3.5 h-3.5 text-slate-400" />
                      Proposed Budget
                    </label>
                    <input
                      type="text"
                      required
                      value={proposedBudget}
                      onChange={(e) => setProposedBudget(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#07172C] border border-white/10 text-white text-sm focus:outline-none focus:border-[#19BDF0] focus:ring-1 focus:ring-[#19BDF0]/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-slate-200 font-semibold mb-2 text-xs">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Timeline
                    </label>
                    <select
                      value={estimatedDelivery}
                      onChange={(e) => setEstimatedDelivery(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#07172C] border border-white/10 text-white text-sm focus:outline-none focus:border-[#19BDF0] focus:ring-1 focus:ring-[#19BDF0]/30 cursor-pointer transition-all"
                    >
                      <option value="3 Days" className="bg-[#0B1B33]">3 Days (Rush)</option>
                      <option value="5 Days" className="bg-[#0B1B33]">5 Days</option>
                      <option value="8 Days" className="bg-[#0B1B33]">8 Days</option>
                      <option value="12 Days" className="bg-[#0B1B33]">12 Days</option>
                      <option value="15 Days" className="bg-[#0B1B33]">15 Days</option>
                      <option value="21 Days" className="bg-[#0B1B33]">21 Days</option>
                      <option value="30 Days" className="bg-[#0B1B33]">30 Days</option>
                    </select>
                  </div>
                </div>

                {/* Custom Pitch */}
                <div>
                  <label className="flex items-center gap-1.5 text-slate-200 font-semibold mb-2 text-xs">
                    <MessageCircle className="w-3.5 h-3.5 text-slate-400" />
                    Your Pitch Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={pitchSummary}
                    onChange={(e) => setPitchSummary(e.target.value)}
                    placeholder="Write a compelling pitch..."
                    className="w-full px-4 py-3 rounded-xl bg-[#07172C] border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#19BDF0] focus:ring-1 focus:ring-[#19BDF0]/30 leading-relaxed resize-none transition-all"
                  />
                </div>

                {/* Info Bar */}
                <div className="p-3 rounded-xl bg-[#07172C]/70 border border-white/5 text-[11px] text-slate-400 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#19BDF0] shrink-0 mt-0.5" />
                  <div>
                    <p>Verified lead from October 2026 Google Maps research.</p>
                    {business.phone && (
                      <p className="mt-1 text-slate-300">
                        After submitting, you can connect instantly via <strong className="text-[#25D366]">WhatsApp</strong>.
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </div>

            {/* Footer Actions (Fixed) */}
            <div className="px-6 py-4 border-t border-white/[0.08] bg-[#0B1B33]/95 backdrop-blur-sm shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="proposal-form"
                  className="flex-1 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>Send Proposal</span>
                  {business.phone && (
                    <>
                      <span className="w-px h-4 bg-white/20" />
                      <MessageCircle className="w-4 h-4 text-white opacity-70" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}

      </div>

      {/* Floating Interactive Toast */}
      <Toast
        show={submitted}
        message="Success! We will respond within 24 hours"
        subtitle={`Proposal dispatched for ${business.businessName}`}
        onClose={() => setSubmitted(false)}
      />
    </div>
  );
};
