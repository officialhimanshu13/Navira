import React from 'react';
import { 
  Building2, 
  Calendar, 
  MapPin, 
  Upload, 
  Plus, 
  Sparkles, 
  FileSpreadsheet, 
  Sliders, 
  Printer, 
  RotateCcw,
  ShieldCheck,
  Archive
} from 'lucide-react';
import { CleaningReport } from '../types/business';

interface HeaderProps {
  studyArea: string;
  collectionDate: string;
  isSampleData: boolean;
  totalRecords: number;
  report: CleaningReport;
  onOpenImport: () => void;
  onOpenAddModal: () => void;
  onOpenCleaningReport: () => void;
  onOpenScoringConfig: () => void;
  onOpenPresentation: () => void;
  onResetToSample: () => void;
  onExportCSV: () => void;
  onExportExcel: () => void;
  onExportTop10: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  studyArea,
  collectionDate,
  isSampleData,
  totalRecords,
  report,
  onOpenImport,
  onOpenAddModal,
  onOpenCleaningReport,
  onOpenScoringConfig,
  onOpenPresentation,
  onResetToSample,
  onExportCSV,
  onExportExcel,
  onExportTop10
}) => {
  const [exportOpen, setExportOpen] = React.useState(false);

  return (
    <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 text-white sticky top-0 z-30" style={{boxShadow: '0 1px 0 0 rgba(148,163,184,0.08), 0 4px 24px 0 rgba(0,0,0,0.4)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Top bar with title and action buttons */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20 shadow-inner flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  Google Maps Business Analysis
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  <Sparkles className="w-3 h-3" /> Mohali & Chandigarh
                </span>
                {!isSampleData ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck className="w-3 h-3" /> Genuine Verified Dataset ({totalRecords} records: CHD {report.chandigarhCount} | MOH {report.mohaliCount})
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Archive className="w-3 h-3" /> Demonstration Data Active
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Local Business Digital Presence Audit, Official Website Verification & Opportunity Ranking
              </p>
            </div>
          </div>

          {/* Action Button Bar */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onOpenImport}
              id="import-btn"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60 hover:border-slate-600 rounded-lg transition-all shadow-sm"
              title="Import CSV or Excel files"
            >
              <Upload className="w-3.5 h-3.5 text-cyan-400" />
              <span>Import Data</span>
            </button>

            <button
              onClick={onOpenAddModal}
              id="add-business-btn"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg transition-all shadow-lg shadow-cyan-500/25"
              title="Add a single business listing manually"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Business</span>
            </button>

            <button
              onClick={onOpenCleaningReport}
              id="cleaning-report-btn"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60 hover:border-emerald-500/30 rounded-lg transition-all shadow-sm"
              title="View data cleaning, location audit and health metrics"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Audit: {report.healthScore}%</span>
            </button>

            <button
              onClick={onOpenScoringConfig}
              id="config-scoring-btn"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60 rounded-lg transition-all shadow-sm"
              title="Configure opportunity scoring criteria"
            >
              <Sliders className="w-3.5 h-3.5 text-slate-400" />
              <span>Scoring Rules</span>
            </button>

            {/* Export Dropdown */}
            <div className="relative">
              <button
                onClick={() => setExportOpen(!exportOpen)}
                id="export-dropdown-btn"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60 rounded-lg transition-all shadow-sm"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" />
                <span>Export</span>
                <span className="text-[10px] text-slate-500">▼</span>
              </button>

              {exportOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 rounded-xl shadow-2xl shadow-black/50 bg-slate-800/95 backdrop-blur-xl border border-slate-700/60 py-1.5 z-50 text-xs"
                  onClick={() => setExportOpen(false)}
                >
                  <button
                    onClick={onExportExcel}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-700/60 text-slate-200 flex items-center justify-between transition-colors"
                  >
                    <span>Cleaned Dataset (.xlsx)</span>
                    <span className="text-[10px] font-mono text-cyan-400">Excel</span>
                  </button>
                  <button
                    onClick={onExportCSV}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-700/60 text-slate-200 flex items-center justify-between transition-colors"
                  >
                    <span>Cleaned Dataset (.csv)</span>
                    <span className="text-[10px] font-mono text-cyan-400">CSV</span>
                  </button>
                  <button
                    onClick={onExportTop10}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-700/60 text-slate-200 flex items-center justify-between border-t border-slate-700/50 transition-colors"
                  >
                    <span>Top 10 Opportunities (.csv)</span>
                    <span className="text-[10px] font-mono text-amber-400">Shortlist</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={onOpenPresentation}
              id="presentation-btn"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 hover:border-indigo-500/50 rounded-lg transition-all shadow-sm"
              title="Open presentation-ready summary report with print/PDF support"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Report / Slides</span>
            </button>

            <button
              onClick={onResetToSample}
              id="reset-sample-btn"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 rounded-lg transition-all"
              title="Reload the 325-record verified Mohali & Chandigarh dataset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reload Baseline</span>
            </button>
          </div>
        </div>

        {/* Sub-bar with permanent study area, collection date, and scope description */}
        <div className="mt-3 pt-3 border-t border-slate-700/40 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="text-slate-400 font-medium">Locked Study Area:</span>
              <span className="text-slate-200 font-semibold">{studyArea}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="text-slate-400 font-medium">Audit Period:</span>
              <span className="text-slate-300">{collectionDate}</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-500 hidden lg:block">
            Scope Rule: <span className="text-emerald-400 font-medium">Chandigarh & Mohali</span> Only | Neighbouring areas (Panchkula, Zirakpur, Kharar, Delhi) strictly excluded.
          </div>
        </div>
      </div>
    </header>
  );
};
