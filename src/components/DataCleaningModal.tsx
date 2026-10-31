import React from 'react';
import { X, ShieldCheck, CheckCircle2, AlertTriangle, MapPin, Building } from 'lucide-react';
import { CleaningReport } from '../types/business';

interface DataCleaningModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: CleaningReport;
}

export const DataCleaningModal: React.FC<DataCleaningModalProps> = ({
  isOpen,
  onClose,
  report
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-950/80 border-b border-slate-800 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 shadow-inner">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Data Cleaning & Location Audit</h2>
              <p className="text-xs text-slate-400">Integrity verification, geographic boundary checks & deduplication</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs sm:text-sm max-h-[75vh] overflow-y-auto">
          {/* Health Index Card */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Dataset Health Score
              </span>
              <span className="text-3xl font-extrabold text-white mt-1 block">{report.healthScore}%</span>
              <p className="text-xs text-emerald-400 font-medium mt-1">Permanent Study Area Locked & Validated</p>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-emerald-500/80 flex items-center justify-center font-bold text-emerald-400 text-sm bg-slate-900 shadow-inner">
              {report.healthScore}%
            </div>
          </div>

          {/* Location & City Distribution Grid */}
          <div className="border border-slate-700/60 rounded-xl p-4 bg-slate-800/30 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-200 text-xs uppercase tracking-wider mb-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Location Coverage Breakdown (Mohali & Chandigarh)</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-slate-900/60 border border-cyan-500/20 rounded-xl">
                <span className="text-[11px] text-cyan-400 font-semibold block">Chandigarh</span>
                <span className="text-xl font-extrabold text-white mt-1 block">{report.chandigarhCount}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Verified Local Records</span>
              </div>
              <div className="p-3 bg-slate-900/60 border border-cyan-500/20 rounded-xl">
                <span className="text-[11px] text-cyan-400 font-semibold block">Mohali (SAS Nagar)</span>
                <span className="text-xl font-extrabold text-white mt-1 block">{report.mohaliCount}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Verified Local Records</span>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-800/40 border border-slate-700/60 rounded-xl">
              <span className="text-[11px] text-slate-400 block">Total Processed</span>
              <span className="text-lg font-bold text-slate-100 mt-1 block">{report.totalRecords}</span>
            </div>
            <div className="p-3 bg-slate-800/40 border border-slate-700/60 rounded-xl">
              <span className="text-[11px] text-slate-400 block">Active Valid Records</span>
              <span className="text-lg font-bold text-emerald-400 mt-1 block">{report.validRecords}</span>
            </div>
            <div className="p-3 bg-slate-800/40 border border-slate-700/60 rounded-xl">
              <span className="text-[11px] text-slate-400 block">Duplicates Detected</span>
              <span className="text-lg font-bold text-rose-400 mt-1 block">{report.duplicateCount}</span>
            </div>
            <div className="p-3 bg-slate-800/40 border border-slate-700/60 rounded-xl">
              <span className="text-[11px] text-slate-400 block">Categories Standardized</span>
              <span className="text-lg font-bold text-cyan-400 mt-1 block">{report.categoriesStandardized}</span>
            </div>
            <div className="p-3 bg-slate-800/40 border border-slate-700/60 rounded-xl">
              <span className="text-[11px] text-slate-400 block">Missing Phone Numbers</span>
              <span className="text-lg font-bold text-slate-300 mt-1 block">{report.missingFieldCounts.phone}</span>
            </div>
            <div className="p-3 bg-slate-800/40 border border-slate-700/60 rounded-xl">
              <span className="text-[11px] text-slate-400 block">Missing Addresses</span>
              <span className="text-lg font-bold text-slate-300 mt-1 block">{report.missingFieldCounts.address}</span>
            </div>
          </div>

          {/* Disallowed locations blocked log */}
          {report.disallowedLocationsRemoved && report.disallowedLocationsRemoved.length > 0 && (
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-xl">
              <div className="flex items-center gap-1.5 font-bold text-rose-300 text-xs mb-1">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Blocked Out-of-Scope Neighbouring Locations:</span>
              </div>
              <p className="text-[11px] text-rose-400 mb-2">
                Panchkula, Zirakpur, Kharar, Delhi and other neighbouring areas are strictly excluded:
              </p>
              <ul className="list-disc pl-5 text-xs text-rose-300/80 space-y-0.5 max-h-24 overflow-y-auto">
                {report.disallowedLocationsRemoved.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Duplicates log */}
          {report.duplicatesRemoved && report.duplicatesRemoved.length > 0 && (
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-xl">
              <div className="flex items-center gap-1.5 font-bold text-rose-300 text-xs mb-1">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Removed Duplicate Entries:</span>
              </div>
              <ul className="list-disc pl-5 text-xs text-rose-300/80 space-y-0.5">
                {report.duplicatesRemoved.map((dup, idx) => (
                  <li key={idx}>{dup}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Validation standards applied */}
          <div className="border-t border-slate-800 pt-3 space-y-2">
            <h4 className="font-bold text-slate-300 text-xs uppercase tracking-wider">
              Enforced Data Cleaning Protocols:
            </h4>
            <div className="space-y-1.5 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><strong className="text-slate-200">Permanent Location Boundary:</strong> Records validated strictly against Mohali & Chandigarh approved sectors and phases.</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><strong className="text-slate-200">No Delhi Demonstration Bleed:</strong> All 45 old demonstration records are safely archived in <code>archive/</code>.</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><strong className="text-slate-200">8-Sector Standardization:</strong> Restaurants, Healthcare, Auto, Fitness, Salons, Retail, Education, Home Services.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950/80 p-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs rounded-xl shadow-lg shadow-cyan-500/25 transition-colors"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
