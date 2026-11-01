import React, { useState } from 'react';
import { X, Store, Users, Sparkles, ArrowRight } from 'lucide-react';
import { NaviraLogo } from '../NaviraLogo';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (role: 'business' | 'developer') => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({
  isOpen,
  onClose,
  onSelectRole,
}) => {
  if (!isOpen) return null;

  const [selectedRole, setSelectedRole] = useState<'business' | 'developer'>('business');
  const [name, setName] = useState('Himanshu');
  const [email, setEmail] = useState('himanshu@navira.in');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectRole(selectedRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#09152A] border border-[#19BDF0]/30 shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <NaviraLogo size="lg" className="justify-center mb-3" />
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Join NAVIRA Marketplace
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Where businesses meet top digital website talent in Mohali & Chandigarh.
          </p>
        </div>

        {/* Persona Select Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div
            onClick={() => setSelectedRole('business')}
            className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
              selectedRole === 'business'
                ? 'bg-[#060F1E] border-[#19BDF0] shadow-lg shadow-[#19BDF0]/15'
                : 'bg-[#060F1E]/40 border-white/5 hover:border-white/20'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-[#19BDF0]/15 flex items-center justify-center text-[#19BDF0] mb-3">
              <Store className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">I'm a Business Owner</h3>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
              I need a website for my shop, clinic, restaurant or store.
            </p>
          </div>

          <div
            onClick={() => setSelectedRole('developer')}
            className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
              selectedRole === 'developer'
                ? 'bg-[#060F1E] border-[#10B981] shadow-lg shadow-[#10B981]/15'
                : 'bg-[#060F1E]/40 border-white/5 hover:border-white/20'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-[#10B981]/15 flex items-center justify-center text-[#10B981] mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">I'm a Developer</h3>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
              I build websites and want to discover verified business clients.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white focus:outline-none focus:border-[#19BDF0]"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Email / Phone</label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white focus:outline-none focus:border-[#19BDF0]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-[#19BDF0] to-[#10B981] hover:from-[#14a7d4] hover:to-[#059669] shadow-lg shadow-[#19BDF0]/25 transition-all flex items-center justify-center gap-2 mt-4"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Enter NAVIRA as {selectedRole === 'business' ? 'Business Owner' : 'Developer'}</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </form>

      </div>
    </div>
  );
};
