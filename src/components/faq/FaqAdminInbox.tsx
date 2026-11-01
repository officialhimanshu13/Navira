import React, { useState } from 'react';
import { FaqSubmission } from '../../types/faq';
import { 
  Search, 
  Mail, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Archive, 
  MessageSquare,
  Lock
} from 'lucide-react';

interface FaqAdminInboxProps {
  submissions: FaqSubmission[];
  onUpdateStatus: (id: string, status: 'New' | 'Answered' | 'Archived') => void;
  onDeleteSubmission: (id: string) => void;
  isAdmin: boolean;
  onPromptLogin: () => void;
}

export const FaqAdminInbox: React.FC<FaqAdminInboxProps> = ({
  submissions,
  onUpdateStatus,
  onDeleteSubmission,
  isAdmin,
  onPromptLogin,
}) => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'New' | 'Answered' | 'Archived'>('All');

  if (!isAdmin) {
    return (
      <div className="p-8 rounded-3xl bg-[#09152A]/80 border border-white/10 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
          <Lock className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-white">Confidential FAQ Inbox Protected</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Visitor questions and email inquiries are restricted to authorized administrators.
        </p>
        <button
          onClick={onPromptLogin}
          className="px-4 py-2 rounded-xl bg-[#19BDF0] text-slate-950 font-bold text-xs shadow-md"
        >
          Sign in as Administrator
        </button>
      </div>
    );
  }

  const filtered = submissions.filter((s) => {
    if (filterStatus !== 'All' && s.status !== filterStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.subject.toLowerCase().includes(q) ||
        s.question.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="p-6 rounded-3xl bg-[#09152A]/90 border border-white/[0.08] shadow-2xl space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#19BDF0]" />
            <h3 className="text-lg font-bold text-white">Private FAQ Inquiries Inbox</h3>
            <span className="text-[10px] font-semibold bg-[#19BDF0]/10 text-[#19BDF0] px-2 py-0.5 rounded-full border border-[#19BDF0]/20">
              Admin Only
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Confidential visitor questions submitted via "Ask NAVIRA".
          </p>
        </div>

        {/* Filter & Search */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search inquiries..."
              className="pl-8 pr-3 py-1.5 rounded-xl bg-[#030712] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#19BDF0]"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl bg-[#030712] border border-white/10 text-xs text-white focus:outline-none focus:border-[#19BDF0]"
          >
            <option value="All">All Inquiries</option>
            <option value="New">New</option>
            <option value="Answered">Answered</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Submissions List */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-[#060F1E] border border-white/5 space-y-3 hover:border-white/15 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{item.subject}</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                        item.status === 'New'
                          ? 'bg-rose-500/15 text-rose-300 border border-rose-500/20'
                          : item.status === 'Answered'
                          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20'
                          : 'bg-white/5 text-slate-400'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                    <span>From: <strong className="text-slate-200">{item.name}</strong></span>
                    <span>•</span>
                    <a
                      href={`mailto:${item.email}?subject=Re: ${encodeURIComponent(item.subject)}`}
                      className="text-[#19BDF0] hover:underline flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3" />
                      <span>{item.email}</span>
                    </a>
                    <span>•</span>
                    <span>{item.submittedAt}</span>
                  </div>
                </div>

                {/* Status action buttons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {item.status !== 'Answered' && (
                    <button
                      onClick={() => onUpdateStatus(item.id, 'Answered')}
                      title="Mark as Answered"
                      className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-xs"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}
                  {item.status !== 'Archived' && (
                    <button
                      onClick={() => onUpdateStatus(item.id, 'Archived')}
                      title="Archive"
                      className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white text-xs"
                    >
                      <Archive className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => onDeleteSubmission(item.id)}
                    title="Delete Permanently"
                    className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Question Body */}
              <p className="text-xs text-slate-300 bg-[#030712] p-3 rounded-xl border border-white/5 leading-relaxed">
                "{item.question}"
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-xs text-slate-500">
          No inquiries found matching current filter.
        </div>
      )}

    </div>
  );
};

