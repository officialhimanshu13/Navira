import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Building2, 
  Sparkles, 
  Award, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle, 
  AlertTriangle, 
  Lightbulb, 
  MapPin, 
  Calendar 
} from 'lucide-react';
import { BusinessRecord } from '../types/business';
import { rankBusinesses } from '../utils/scoring';

interface PresentationReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  businesses: BusinessRecord[];
  studyArea: string;
  collectionDate: string;
}

export const PresentationReportModal: React.FC<PresentationReportModalProps> = ({
  isOpen,
  onClose,
  businesses,
  studyArea,
  collectionDate
}) => {
  if (!isOpen) return null;

  const [activeSlide, setActiveSlide] = useState(0);

  const total = businesses.length || 1;
  const notFound = businesses.filter((b) => b.websiteStatus === 'Not Found');
  const found = businesses.filter((b) => b.websiteStatus === 'Found');
  const unclear = businesses.filter((b) => b.websiteStatus === 'Unclear');

  const top10 = rankBusinesses(businesses).slice(0, 10);

  const handlePrint = () => {
    window.print();
  };

  const downloadReportMarkdown = () => {
    const reportText = `# Google Maps Business Analysis — Project Insights & Recommendations
**Study Area:** ${studyArea}  
**Data Collection Date:** ${collectionDate}  
**Total Researched Businesses:** ${total}  

---

## 1. Executive Summary & Objective
- **Problem Statement:** Local businesses with established physical customer volume often lack an official website, relying only on maps or 3rd-party directory aggregator profiles.
- **Project Objective:** Collect structured Google Maps listings, verify official website presence with search audit, score improvement potential using a 10-point rubric, and provide actionable recommendations.

---

## 2. Quantitative Summary
- **Total Businesses Researched:** ${total}
- **Website Found:** ${found.length} (${((found.length / total) * 100).toFixed(1)}%)
- **Website Not Found (Opportunities):** ${notFound.length} (${((notFound.length / total) * 100).toFixed(1)}%)
- **Unclear / Ambiguous Status:** ${unclear.length} (${((unclear.length / total) * 100).toFixed(1)}%)

---

## 3. Top-10 Ranked Priority Opportunities
${top10.map((b, i) => `${i + 1}. **${b.businessName}** (${b.category}, ${b.locality}, ${b.city})
   - Score: ${b.opportunityScore}/10 | Rating: ${b.rating}★ (${b.reviewCount} reviews)
   - Status: ${b.websiteStatus}
   - Rationale: ${b.scoreBreakdown.reasons.join('; ')}
   - Recommendation: ${b.recommendation}
`).join('\n')}

---

## 4. Strategic Recommendations
1. **Lightweight Mobile-Friendly Site:** Deploy 1-page site highlighting core offerings, opening hours, verified physical location, and WhatsApp inquiry.
2. **Synchronize Google Maps Profile:** Configure direct action buttons ('Menu', 'Book Appointment', 'Request Quote') linked to owned web assets.
3. **Local SEO Markup:** Implement Schema.org LocalBusiness metadata for consistent search engine visibility.

---

## 5. Limitations & Assumptions
- Missing website link on Google Maps does not automatically prove absence; all 'Not Found' entries underwent dedicated search verification.
- Opportunity scores represent research screening priorities, not commercial guarantees of revenue.
`;

    const blob = new Blob([reportText], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Google_Maps_Business_Analysis_Presentation_Report.md';
    link.click();
  };

  const slides = [
    {
      title: 'Executive Summary & Task Objective',
      subtitle: 'Week 3 Data Analysis Project — Google Maps Local Business Ecosystem',
      content: (
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-800/50 border border-slate-700/60 rounded-xl space-y-2">
            <h4 className="font-bold text-slate-100 text-sm">Problem Statement & Purpose</h4>
            <p className="text-slate-300 leading-relaxed">
              Many local businesses in prime commercial areas rely solely on walk-ins, phone calls, or 3rd-party aggregators (Zomato, Practo, Justdial) without having an official standalone website. This limits consumer trust, diminishes search visibility against national chains, and increases dependency on high commission rates.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-slate-800/40 border border-slate-700/60 rounded-xl">
              <span className="text-[11px] text-slate-400 block">Researched</span>
              <span className="text-2xl font-extrabold text-slate-100 mt-1 block">{total}</span>
              <span className="text-[10px] text-slate-500 block">Listings</span>
            </div>
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <span className="text-[11px] text-emerald-400 block font-medium">Website Found</span>
              <span className="text-2xl font-extrabold text-emerald-400 mt-1 block">{found.length}</span>
              <span className="text-[10px] text-emerald-500 block">{((found.length / total) * 100).toFixed(1)}%</span>
            </div>
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl">
              <span className="text-[11px] text-rose-400 block font-medium">No Website Found</span>
              <span className="text-2xl font-extrabold text-rose-400 mt-1 block">{notFound.length}</span>
              <span className="text-[10px] text-rose-500 block">{((notFound.length / total) * 100).toFixed(1)}%</span>
            </div>
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <span className="text-[11px] text-amber-400 block font-medium">Unclear Cases</span>
              <span className="text-2xl font-extrabold text-amber-400 mt-1 block">{unclear.length}</span>
              <span className="text-[10px] text-amber-500 block">{((unclear.length / total) * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Methodology, Study Area & Verification Process',
      subtitle: 'Rigorous 7-step data workflow ensuring high data integrity',
      content: (
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 bg-slate-800/50 border border-slate-700/60 rounded-xl">
              <span className="font-bold text-slate-200 block mb-1">Study Area & Categories</span>
              <p className="text-slate-400 text-xs">
                <strong className="text-slate-300">Area:</strong> {studyArea}
              </p>
              <p className="text-slate-400 text-xs mt-1">
                <strong className="text-slate-300">Sectors:</strong> Cafés, Hair Salons & Spas, Dental/Health Clinics, Auto Care, Boutiques, Fitness Studios.
              </p>
            </div>
            <div className="p-3.5 bg-slate-800/50 border border-slate-700/60 rounded-xl">
              <span className="font-bold text-slate-200 block mb-1">Verification Standard</span>
              <p className="text-slate-400 text-xs">
                A missing website field on Google Maps is treated as a lead for inquiry, not conclusive proof. A secondary search query was performed for every listing before classification.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-800/30 border border-slate-700/60 rounded-xl space-y-2">
            <h5 className="font-bold text-slate-200 text-xs uppercase tracking-wider">Quality Assurance & Data Cleaning Checklist</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
              <p className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Canonical deduplication by title & phone</p>
              <p className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Category taxonomy standardization</p>
              <p className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Missing value audit (Phone & Address)</p>
              <p className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Verified official URLs via Google searches</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: '10-Point Opportunity Rubric & Top-10 Shortlist',
      subtitle: 'Objective criteria for prioritizing high-potential local businesses',
      content: (
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-800/50 border border-slate-700/60 rounded-xl">
            <h5 className="font-bold text-slate-200 text-xs mb-1.5">Scoring Model Factor Breakdown (Max 10 Points)</h5>
            <div className="grid grid-cols-5 gap-1.5 text-center text-[10px]">
              <div className="p-1.5 bg-slate-900 border border-slate-700 rounded-lg">
                <span className="block text-slate-400">No Website</span>
                <span className="font-bold text-cyan-400">+3 pts</span>
              </div>
              <div className="p-1.5 bg-slate-900 border border-slate-700 rounded-lg">
                <span className="block text-slate-400">Rating ≥4.2★</span>
                <span className="font-bold text-cyan-400">+2 pts</span>
              </div>
              <div className="p-1.5 bg-slate-900 border border-slate-700 rounded-lg">
                <span className="block text-slate-400">Reviews ≥40</span>
                <span className="font-bold text-cyan-400">+2 pts</span>
              </div>
              <div className="p-1.5 bg-slate-900 border border-slate-700 rounded-lg">
                <span className="block text-slate-400">Complete Info</span>
                <span className="font-bold text-cyan-400">+1 pt</span>
              </div>
              <div className="p-1.5 bg-slate-900 border border-slate-700 rounded-lg">
                <span className="block text-slate-400">Digital Gap</span>
                <span className="font-bold text-cyan-400">+2 pts</span>
              </div>
            </div>
          </div>

          <div className="border border-slate-700/60 rounded-xl overflow-hidden">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-slate-800/80 text-slate-400 font-semibold">
                <tr>
                  <th className="p-2 w-8 text-center">#</th>
                  <th className="p-2">Business Name</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Locality</th>
                  <th className="p-2">Rating & Revs</th>
                  <th className="p-2 text-center">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40">
                {top10.slice(0, 5).map((b, idx) => (
                  <tr key={b.businessId} className="hover:bg-slate-800/40">
                    <td className="p-2 text-center font-bold text-slate-400">{idx + 1}</td>
                    <td className="p-2 font-medium text-slate-200">{b.businessName}</td>
                    <td className="p-2 text-slate-400">{b.category}</td>
                    <td className="p-2 text-slate-400">{b.locality}</td>
                    <td className="p-2 text-slate-300">{b.rating}★ ({b.reviewCount})</td>
                    <td className="p-2 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                        {b.opportunityScore}/10
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-slate-500 italic text-right">Showing top 5 of 10 prioritized candidate businesses.</p>
        </div>
      )
    },
    {
      title: 'Actionable Roadmap & Strategic Recommendations',
      subtitle: 'Practical 4-phase rollout plan for local digital conversion',
      content: (
        <div className="space-y-3 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-cyan-500/20 bg-cyan-500/5">
              <span className="font-bold text-cyan-300 block mb-1">Phase 1: Lightweight Web Landing</span>
              <p className="text-slate-400 text-xs">
                Deploy single-page responsive mobile landing page showing services, verified location, operating hours, and direct WhatsApp / call trigger.
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-blue-500/20 bg-blue-500/5">
              <span className="font-bold text-blue-300 block mb-1">Phase 2: Google Maps Sync</span>
              <p className="text-slate-400 text-xs">
                Attach verified website URL to Google Business Profile; set up action buttons for "Book Appointment", "Menu", or "Contact".
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-indigo-500/20 bg-indigo-500/5">
              <span className="font-bold text-indigo-300 block mb-1">Phase 3: Schema & Structured Data</span>
              <p className="text-slate-400 text-xs">
                Implement Schema.org LocalBusiness markup to establish clear signals for search algorithms and boost organic rank above directory listings.
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-purple-500/20 bg-purple-500/5">
              <span className="font-bold text-purple-300 block mb-1">Phase 4: Commission Reduction</span>
              <p className="text-slate-400 text-xs">
                Incentivize customers to book or order directly via owned website to save 15-30% aggregator commission cuts.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Assumptions, Limitations & Compliance Notes',
      subtitle: 'Academic framing, data boundaries, and ethical considerations',
      content: (
        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-4 bg-slate-800/50 border border-slate-700/60 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Analytical Assumptions & Scope Limitations</span>
            </div>
            <ul className="list-disc pl-5 text-xs text-slate-300 space-y-1 leading-relaxed">
              <li>Ratings and reviews reflect public Google Maps snapshots at the collection date ({collectionDate}).</li>
              <li>A missing website field on Google Maps is not absolute proof of non-existence; secondary verification searches were applied.</li>
              <li>Scoring rubrics are decision-support frameworks for digital gap analysis, not commercial performance guarantees.</li>
              <li>All records are derived solely from publicly accessible business listing data.</li>
            </ul>
          </div>

          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300">
            <span className="font-bold block mb-1">Compliance & Ethical Conduct</span>
            <p className="leading-relaxed text-slate-300">
              This analysis complies with platform usage guidelines. No personal credentials, private data, or invasive scrapers were employed.
            </p>
          </div>
        </div>
      )
    }
  ];

  const currentSlide = slides[activeSlide];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-slate-950/80 border-b border-slate-800 p-4 sm:p-5 flex items-center justify-between no-print">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20 shadow-inner">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Executive Presentation & Insights Report</h2>
              <p className="text-xs text-slate-400">Presentation Deck (PPT/PDF Format) • Slide {activeSlide + 1} of {slides.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl transition-colors shadow-lg shadow-cyan-500/25"
              title="Print or Save to PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={downloadReportMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl transition-colors"
              title="Download Markdown summary"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Markdown</span>
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Canvas */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400">SLIDE 0{activeSlide + 1}</span>
              <span className="text-xs text-slate-500">{studyArea}</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">{currentSlide.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{currentSlide.subtitle}</p>
          </div>

          <div className="py-2">
            {currentSlide.content}
          </div>
        </div>

        {/* Footer Slide Navigation */}
        <div className="bg-slate-950/80 p-4 border-t border-slate-800 flex items-center justify-between no-print">
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeSlide === i ? 'bg-cyan-400 w-6' : 'bg-slate-700 hover:bg-slate-600'
                }`}
                title={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSlide((prev) => Math.max(0, prev - 1))}
              disabled={activeSlide === 0}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-slate-700 rounded-xl disabled:opacity-40 text-slate-300 hover:bg-slate-800"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <button
              onClick={() => setActiveSlide((prev) => Math.min(slides.length - 1, prev + 1))}
              disabled={activeSlide === slides.length - 1}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl disabled:opacity-40 shadow-lg shadow-cyan-500/25"
            >
              <span>Next Slide</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
