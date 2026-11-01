import React, { useState } from 'react';
import { DeveloperProfile } from '../../types/marketplace';
import { X, Send, CheckCircle2, Star, MapPin, Sparkles, Clock } from 'lucide-react';
import { Toast } from '../Toast';

interface ContactDeveloperModalProps {
  developer: DeveloperProfile | null;
  onClose: () => void;
  onSubmitInquiry: (developerId: string, inquiry: any) => void;
}

export const ContactDeveloperModal: React.FC<ContactDeveloperModalProps> = ({
  developer,
  onClose,
  onSubmitInquiry,
}) => {
  if (!developer) return null;

  const [businessName, setBusinessName] = useState('');
  const [businessCategory, setBusinessCategory] = useState('Restaurants, Cafes & Bakeries');
  const [locality, setLocality] = useState('Sector 17, Chandigarh');
  const [budget, setBudget] = useState('₹15,000 - ₹25,000');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitInquiry(developer.id, {
      businessName,
      businessCategory,
      locality,
      budget,
      details,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0B1B33] border border-[#19BDF0]/30 shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-3 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              <Clock className="w-3.5 h-3.5" />
              <span>Response SLA: Within 24 Hours</span>
            </div>
            <h3 className="text-xl font-bold text-white">Success! We will respond within 24 hours</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              {developer.name} and the NAVIRA team have received your project details and will follow up promptly.
            </p>
          </div>
        ) : (
          <div>
            {/* Header info */}
            <div className="flex items-center gap-3 pb-5 border-b border-white/[0.08] mb-5">
              <img
                src={developer.avatarUrl}
                alt={developer.name}
                className="w-12 h-12 rounded-xl object-cover border border-[#19BDF0]"
              />
              <div>
                <h3 className="text-lg font-bold text-white">Contact {developer.name}</h3>
                <p className="text-xs text-slate-400">
                  {developer.role} • {developer.location}
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Your Business / Shop Name *
                </label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. The Coffee House, Phase 7 Clinic..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#07172C] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#19BDF0]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={businessCategory}
                    onChange={(e) => setBusinessCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07172C] border border-white/10 text-white focus:outline-none focus:border-[#19BDF0]"
                  >
                    <option value="Restaurants, Cafes & Bakeries">Dining & Cafe</option>
                    <option value="Healthcare & Dental Clinics">Healthcare / Clinic</option>
                    <option value="Salons & Spas">Salon & Spa</option>
                    <option value="Retail & Boutiques">Retail Store</option>
                    <option value="Auto Repair & Service Centres">Auto Services</option>
                    <option value="Fitness Centres & Yoga Studios">Fitness Gym</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Estimated Budget</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07172C] border border-white/10 text-white focus:outline-none focus:border-[#19BDF0]"
                  >
                    <option value="Under ₹15,000">Under ₹15,000</option>
                    <option value="₹15,000 - ₹25,000">₹15,000 - ₹25,000</option>
                    <option value="₹25,000 - ₹40,000">₹25,000 - ₹40,000</option>
                    <option value="₹40,000+">₹40,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Website Requirements & Goals
                </label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Tell the developer what you need (e.g. mobile digital menu, appointment booking, WhatsApp orders)..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#07172C] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#19BDF0]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-[#19BDF0] to-[#38BDF8] hover:from-[#38BDF8] hover:to-[#19BDF0] shadow-lg shadow-[#19BDF0]/25 transition-all flex items-center justify-center gap-2 mt-4"
              >
                <Send className="w-4 h-4 text-slate-950" />
                <span>Send Direct Inquiry</span>
              </button>
            </form>
          </div>
        )}

      </div>

      <Toast
        show={submitted}
        message="Success! We will respond within 24 hours"
        subtitle={`Inquiry delivered to ${developer.name}.`}
        onClose={() => setSubmitted(false)}
      />
    </div>
  );
};

