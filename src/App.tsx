import React, { useState, useMemo } from 'react';
import { BusinessRecord, CleaningReport, FilterState, ScoringWeights } from './types/business';
import { VERIFIED_MOHALI_CHANDIGARH_BUSINESSES } from './data/verifiedBusinesses';
import { PERMANENT_STUDY_AREA_CONFIG, ValidCity } from './config/locationConfig';
import { cleanAndValidateDataset } from './utils/cleaner';
import { DEFAULT_WEIGHTS, calculateOpportunityScore } from './utils/scoring';
import { exportToCSV, exportToExcel, exportTop10CSV } from './utils/exporter';

import { Header } from './components/Header';
import { SummaryCards } from './components/SummaryCards';
import { FilterBar } from './components/FilterBar';
import { ChartsSection } from './components/ChartsSection';
import { OpportunityTable } from './components/OpportunityTable';
import { InsightsSection } from './components/InsightsSection';
import { FooterLimitations } from './components/FooterLimitations';

import { BusinessDetailModal } from './components/BusinessDetailModal';
import { AddBusinessModal } from './components/AddBusinessModal';
import { DataCleaningModal } from './components/DataCleaningModal';
import { ConfigScoringModal } from './components/ConfigScoringModal';
import { ImportModal } from './components/ImportModal';
import { PresentationReportModal } from './components/PresentationReportModal';

export const App: React.FC = () => {
  // Primary State - Locked to Mohali & Chandigarh Verified Dataset
  const [businesses, setBusinesses] = useState<BusinessRecord[]>(VERIFIED_MOHALI_CHANDIGARH_BUSINESSES);
  const [studyArea, setStudyArea] = useState(PERMANENT_STUDY_AREA_CONFIG.studyAreaName);
  const [collectionDate, setCollectionDate] = useState('October 2026');
  const [isSampleData, setIsSampleData] = useState(false);
  const [weights, setWeights] = useState<ScoringWeights>(DEFAULT_WEIGHTS);

  // Initial Data Cleaning Audit Report
  const [cleaningReport, setCleaningReport] = useState<CleaningReport>(() => {
    const { report } = cleanAndValidateDataset(VERIFIED_MOHALI_CHANDIGARH_BUSINESSES, DEFAULT_WEIGHTS);
    return report;
  });

  // Filter State
  const [filter, setFilter] = useState<FilterState>({
    searchQuery: '',
    selectedCity: 'All',
    selectedCategory: 'All',
    selectedLocality: 'All',
    selectedStatus: 'All',
    selectedVerificationStatus: 'All',
    minRating: 0,
    minReviews: 0,
    onlyOpportunities: false
  });

  // Modals
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessRecord | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCleaningModalOpen, setIsCleaningModalOpen] = useState(false);
  const [isScoringConfigOpen, setIsScoringConfigOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);

  // Dynamic Categories and Localities
  const categories = useMemo(() => {
    const set = new Set<string>();
    businesses.forEach((b) => set.add(b.category));
    return Array.from(set).sort();
  }, [businesses]);

  const localities = useMemo(() => {
    const set = new Set<string>();
    businesses.forEach((b) => {
      if (filter.selectedCity === 'All' || b.city === filter.selectedCity) {
        set.add(b.locality);
      }
    });
    return Array.from(set).sort();
  }, [businesses, filter.selectedCity]);

  // Recalculate weights changes across all records
  const handleUpdateWeights = (newWeights: ScoringWeights) => {
    setWeights(newWeights);
    const updated = businesses.map((b) => {
      const { score, breakdown, recommendation } = calculateOpportunityScore(b, newWeights);
      return {
        ...b,
        opportunityScore: score,
        scoreBreakdown: breakdown,
        recommendation
      };
    });
    setBusinesses(updated);
  };

  // Filtered dataset
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((b) => {
      // Search
      if (filter.searchQuery.trim()) {
        const query = filter.searchQuery.toLowerCase();
        const matchesName = b.businessName.toLowerCase().includes(query);
        const matchesCat = b.category.toLowerCase().includes(query);
        const matchesLoc = b.locality.toLowerCase().includes(query);
        const matchesAddr = b.address.toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesLoc && !matchesAddr) return false;
      }

      // City filter
      if (filter.selectedCity !== 'All' && b.city !== filter.selectedCity) {
        return false;
      }

      // Locality
      if (filter.selectedLocality !== 'All' && b.locality !== filter.selectedLocality) {
        return false;
      }

      // Category
      if (filter.selectedCategory !== 'All' && b.category !== filter.selectedCategory) {
        return false;
      }

      // Website Status
      if (filter.selectedStatus !== 'All' && b.websiteStatus !== filter.selectedStatus) {
        return false;
      }

      // Verification Status
      if (filter.selectedVerificationStatus !== 'All' && b.recordVerificationStatus !== filter.selectedVerificationStatus) {
        return false;
      }

      // Rating
      if (filter.minRating > 0 && b.rating < filter.minRating) {
        return false;
      }

      // Reviews
      if (filter.minReviews > 0 && b.reviewCount < filter.minReviews) {
        return false;
      }

      // Opportunities only
      if (filter.onlyOpportunities && b.opportunityScore < 7) {
        return false;
      }

      return true;
    });
  }, [businesses, filter]);

  // Update a single business record (e.g. from Detail Modal)
  const handleUpdateBusiness = (updated: BusinessRecord) => {
    setBusinesses((prev) => prev.map((b) => (b.businessId === updated.businessId ? updated : b)));
    // If the modal was open for it, update the state
    setSelectedBusiness(updated);
  };

  // Add a new business
  const handleAddBusiness = (newRecord: BusinessRecord) => {
    const updatedList = [newRecord, ...businesses];
    const { cleanedRecords, report } = cleanAndValidateDataset(updatedList, weights);
    setBusinesses(cleanedRecords);
    setCleaningReport(report);
  };

  // Import dataset
  const handleImport = (rawRecords: Partial<BusinessRecord>[], mode: 'replace' | 'append') => {
    const combined = mode === 'replace' ? rawRecords : [...businesses, ...rawRecords];
    const { cleanedRecords, report } = cleanAndValidateDataset(combined, weights);
    setBusinesses(cleanedRecords);
    setCleaningReport(report);
  };

  // Reset to verified baseline dataset
  const handleResetToBaseline = () => {
    setBusinesses(VERIFIED_MOHALI_CHANDIGARH_BUSINESSES);
    const { report } = cleanAndValidateDataset(VERIFIED_MOHALI_CHANDIGARH_BUSINESSES, DEFAULT_WEIGHTS);
    setCleaningReport(report);
    setWeights(DEFAULT_WEIGHTS);
    setIsSampleData(false);
    setStudyArea(PERMANENT_STUDY_AREA_CONFIG.studyAreaName);
    setFilter({
      searchQuery: '',
      selectedCity: 'All',
      selectedCategory: 'All',
      selectedLocality: 'All',
      selectedStatus: 'All',
      selectedVerificationStatus: 'All',
      minRating: 0,
      minReviews: 0,
      onlyOpportunities: false
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans">
      {/* Top Navigation & App Header */}
      <Header
        studyArea={studyArea}
        collectionDate={collectionDate}
        isSampleData={isSampleData}
        totalRecords={businesses.length}
        report={cleaningReport}
        onOpenImport={() => setIsImportModalOpen(true)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenCleaningReport={() => setIsCleaningModalOpen(true)}
        onOpenScoringConfig={() => setIsScoringConfigOpen(true)}
        onOpenPresentation={() => setIsPresentationOpen(true)}
        onResetToSample={handleResetToBaseline}
        onExportCSV={() => exportToCSV(businesses)}
        onExportExcel={() => exportToExcel(businesses, cleaningReport)}
        onExportTop10={() => exportTop10CSV(businesses)}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
        {/* 1. Summary Cards */}
        <section aria-label="Dataset Summary Cards">
          <SummaryCards
            businesses={filteredBusinesses}
            selectedStatus={filter.selectedStatus}
            onSelectStatusFilter={(status) => setFilter({ ...filter, selectedStatus: status })}
          />
        </section>

        {/* 2. Filter Bar */}
        <section aria-label="Interactive Filters">
          <FilterBar
            filter={filter}
            onChange={(updated) => setFilter({ ...filter, ...updated })}
            onReset={() =>
              setFilter({
                searchQuery: '',
                selectedCity: 'All',
                selectedCategory: 'All',
                selectedLocality: 'All',
                selectedStatus: 'All',
                selectedVerificationStatus: 'All',
                minRating: 0,
                minReviews: 0,
                onlyOpportunities: false
              })
            }
            categories={categories}
            localities={localities}
            totalFiltered={filteredBusinesses.length}
            totalAll={businesses.length}
          />
        </section>

        {/* 3. Charts Section */}
        <section aria-label="Data Visualizations">
          <ChartsSection businesses={filteredBusinesses} />
        </section>

        {/* 4. Priority Opportunity Ranking Table & Full Dataset */}
        <section aria-label="Opportunity Ranking & Directory">
          <OpportunityTable
            businesses={filteredBusinesses}
            onSelectBusiness={(b) => setSelectedBusiness(b)}
            onEditBusiness={(b) => setSelectedBusiness(b)}
          />
        </section>

        {/* 5. Key Insights & Strategic Recommendations */}
        <section aria-label="Analytical Insights & Action Plan">
          <InsightsSection businesses={filteredBusinesses} />
        </section>

        {/* 6. Footer: Data Sources, Definitions, and Limitations */}
        <FooterLimitations collectionDate={collectionDate} studyArea={studyArea} />
      </main>

      {/* Modals */}
      <BusinessDetailModal
        business={selectedBusiness}
        onClose={() => setSelectedBusiness(null)}
        onUpdate={handleUpdateBusiness}
      />

      <AddBusinessModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddBusiness}
        existingCount={businesses.length}
      />

      <DataCleaningModal
        isOpen={isCleaningModalOpen}
        onClose={() => setIsCleaningModalOpen(false)}
        report={cleaningReport}
      />

      <ConfigScoringModal
        isOpen={isScoringConfigOpen}
        onClose={() => setIsScoringConfigOpen(false)}
        weights={weights}
        onSave={handleUpdateWeights}
      />

      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImport}
      />

      <PresentationReportModal
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
        businesses={businesses}
        studyArea={studyArea}
        collectionDate={collectionDate}
      />
    </div>
  );
};
