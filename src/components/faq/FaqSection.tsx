import React, { useState } from 'react';
import { FaqItem, FaqSubmission } from '../../types/faq';
import { 
  HelpCircle, 
  ChevronDown, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle,
  Clock
} from 'lucide-react';
import { Toast } from '../Toast';

interface FaqSectionProps {
  onFaqSubmit: (submission: Omit<FaqSubmission, 'id' | 'submittedAt' | 'status'>) => void;
}

export const DEFAULT_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What is NAVIRA and how does it connect businesses with developers?',
    answer: 'NAVIRA is a specialized technology marketplace and market intelligence platform for Mohali and Chandigarh. We audit local business digital presence on Google Maps, identify businesses that need websites, and match them directly with vetted local web engineers.'
  },
  {
    id: 'faq-2',
    category: 'For Businesses',
    question: 'I own a shop or clinic in Chandigarh/Mohali. How do I get a website built?',
    answer: 'Simply browse our verified developer directory, compare portfolios, and send a direct project inquiry. You can review custom proposals with clear milestone pricing and launch within 7–14 business days.'
  },
  {
    id: 'faq-3',
    category: 'For Developers',
    question: 'How do developers find verified clients on NAVIRA?',
    answer: 'NAVIRA provides access to 325 source-verified business listings across 25 localities in Mohali and Chandigarh. Developers can see businesses with high customer ratings that lack websites and pitch targeted web solutions directly.'
  },
  {
    id: 'faq-4',
    category: 'Market Intelligence',
    question: 'Where does the 325-business dataset come from?',
    answer: 'All 325 records were compiled through on-ground research and systematic Google Maps audits conducted across 14 municipal sectors in Chandigarh and 11 phases/sectors in Mohali (SAS Nagar). 100% genuine data, zero synthetic records.'
  },
  {
    id: 'faq-5',
    category: 'For Businesses',
    question: 'How does milestone-based payment work?',
    answer: 'Projects are structured in clear phases (Discovery, Wireframes, Frontend Development, Domain Setup). Payments are released only when you inspect and approve each milestone.'
  }
];

export const FaqSection: React.FC<FaqSectionProps> = ({ onFaqSubmit }) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [question, setQuestion] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !email.trim() || !subject.trim() || !question.trim()) {
      setErrorMsg('Please complete all fields before submitting.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }

    onFaqSubmit({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      question: question.trim()
    });

    setSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setQuestion('');

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section id="faq" className="py-20 relative bg-[#030712]/70 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#19BDF0]/10 border border-[#19BDF0]/20 text-[#19BDF0] text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions & Support</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ask NAVIRA
          </h2>
          <p className="text-slate-300 text-sm mt-2">
            Everything you need to know about navigating the Tricity business-developer marketplace.
          </p>
        </div>

        {/* 2 Column Layout: Left Accordion, Right Submission Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column (7 cols): FAQ Accordion */}
          <div className="lg:col-span-7 space-y-3">
            {DEFAULT_FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-[#09152A]/80 border border-white/[0.08] hover:border-[#19BDF0]/30 transition-all overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-semibold text-[#19BDF0] bg-[#19BDF0]/10 border border-[#19BDF0]/20 px-2 py-0.5 rounded-full shrink-0">
                        {faq.category}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#19BDF0]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/[0.04]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column (5 cols): "Ask NAVIRA" Form */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-gradient-to-br from-[#09152A] to-[#060F1E] border border-[#19BDF0]/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#19BDF0]/15 flex items-center justify-center text-[#19BDF0]">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-white">Have a Specific Question?</h3>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Send a confidential inquiry directly to the NAVIRA team. We respond within 24 business hours.
              </p>

              {submitted ? (
                <div className="py-8 text-center space-y-3 animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-400">
                    Success! We will respond within 24 hours
                  </h4>
                  <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
                    Thank you. Your inquiry has been delivered directly to the NAVIRA team and logged in our secure inbox.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-3 px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors"
                  >
                    Send Another Question
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs">
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 flex items-center gap-2 text-[11px]">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#19BDF0]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. ramesh@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#19BDF0]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Subject *</label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Inquiring about Cafe website timeline"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#19BDF0]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Your Question *</label>
                    <textarea
                      rows={3}
                      required
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Describe what you would like to know..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#19BDF0] leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-[#19BDF0] to-[#10B981] hover:from-[#14a7d4] hover:to-[#059669] shadow-lg shadow-[#19BDF0]/20 transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit to NAVIRA Team</span>
                  </button>

                  <div className="pt-2 text-[10px] text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Confidential inquiry • Never published publicly</span>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* Interactive Toast Notification */}
      <Toast
        show={submitted}
        message="Success! We will respond within 24 hours"
        subtitle="Your question has been logged in the NAVIRA administration console."
        onClose={() => setSubmitted(false)}
      />
    </section>
  );
};

