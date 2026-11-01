import React, { useState, useMemo, useEffect } from 'react';
import { BusinessRecord, CleaningReport, FilterState, ScoringWeights } from './types/business';
import { DeveloperProfile, MarketplaceProject, Conversation, BusinessProposal } from './types/marketplace';
import { FaqSubmission } from './types/faq';
import { VERIFIED_MOHALI_CHANDIGARH_BUSINESSES } from './data/verifiedBusinesses';
import { PERMANENT_STUDY_AREA_CONFIG, ValidCity } from './config/locationConfig';
import { cleanAndValidateDataset } from './utils/cleaner';
import { DEFAULT_WEIGHTS, calculateOpportunityScore } from './utils/scoring';
import { exportToCSV, exportToExcel, exportTop10CSV } from './utils/exporter';
import { isAdminAuthenticated, logoutAdmin } from './utils/auth';

import { 
  FEATURED_DEVELOPERS, 
  INITIAL_PROJECTS, 
  INITIAL_CONVERSATIONS, 
  INITIAL_PROPOSALS 
} from './data/marketplaceData';

// NAVIRA Top Navigation & Core Components
import { NaviraNavbar } from './components/NaviraNavbar';
import { HomePage } from './components/home/HomePage';
import { HowItWorksSection } from './components/home/HowItWorksSection';
import { FinalCtaSection } from './components/home/FinalCtaSection';
import { NaviraFooter } from './components/home/NaviraFooter';
import { FindDevelopersPage } from './components/marketplace/FindDevelopersPage';
import { FindBusinessesPage } from './components/marketplace/FindBusinessesPage';
import { DeveloperProfileView } from './components/marketplace/DeveloperProfileView';
import { BusinessProfileView } from './components/marketplace/BusinessProfileView';
import { NaviraDashboard } from './components/dashboard/NaviraDashboard';
import { ProjectsView } from './components/projects/ProjectsView';
import { MessagingView } from './components/messaging/MessagingView';
import { FaqSection } from './components/faq/FaqSection';

// Modals
import { ContactDeveloperModal } from './components/modals/ContactDeveloperModal';
import { SendProposalModal } from './components/modals/SendProposalModal';
import { GetStartedModal } from './components/modals/GetStartedModal';
import { NaviraShowcaseModal } from './components/modals/NaviraShowcaseModal';
import { AdminLoginModal } from './components/modals/AdminLoginModal';
import { Toast } from './components/Toast';

// Existing Google Maps Business Analysis Engine Components (100% Preserved)
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

// Initial FAQ Submissions
const INITIAL_FAQ_SUBMISSIONS: FaqSubmission[] = [
  {
    id: 'sub-1',
    name: 'Harpreet Singh',
    email: 'harpreet.bakery@gmail.com',
    subject: 'Online Ordering for Sector 35 Bakery',
    question: 'We want to add a direct UPI and WhatsApp ordering menu to our Google listing. Which developer handles restaurant portals?',
    submittedAt: 'Today at 10:15 AM',
    status: 'New',
  },
  {
    id: 'sub-2',
    name: 'Dr. Meenakshi Verma',
    email: 'dr.meenakshi@vermadental.in',
    subject: 'Dental Clinic Appointment Scheduler in Phase 7',
    question: 'Can NAVIRA developers integrate with our local patient SMS system?',
    submittedAt: 'Yesterday at 4:30 PM',
    status: 'Answered',
    adminNotes: 'Assigned to Arjun Mehta for follow-up quote.',
  }
];

export const App: React.FC = () => {
  // Navigation & View State
  const [activeView, setActiveView] = useState<string>('home');
  const [currentRole, setCurrentRole] = useState<'business' | 'developer'>('business');

  // Authentication State (CHANGE 7)
  const [isAdmin, setIsAdmin] = useState<boolean>(() => isAdminAuthenticated());
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  // Primary State - Locked to Mohali & Chandigarh Verified Dataset
  const [businesses, setBusinesses] = useState<BusinessRecord[]>(VERIFIED_MOHALI_CHANDIGARH_BUSINESSES);
  const [studyArea, setStudyArea] = useState(PERMANENT_STUDY_AREA_CONFIG.studyAreaName);
  const [collectionDate, setCollectionDate] = useState('October 2026');
  const [isSampleData, setIsSampleData] = useState(false);
  const [weights, setWeights] = useState<ScoringWeights>(DEFAULT_WEIGHTS);

  // Marketplace Datasets State (with localStorage persistence for projects & FAQ submissions)
  const [developers, setDevelopers] = useState<DeveloperProfile[]>(FEATURED_DEVELOPERS);

  // Projects State with LocalStorage persistence (CHANGE 8)
  const [projects, setProjects] = useState<MarketplaceProject[]>(() => {
    try {
      const saved = localStorage.getItem('navira_marketplace_projects');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Fallback
    }
    return INITIAL_PROJECTS;
  });

  // FAQ Submissions State with LocalStorage persistence (CHANGE 11)
  const [faqSubmissions, setFaqSubmissions] = useState<FaqSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('navira_faq_submissions');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Fallback
    }
    return INITIAL_FAQ_SUBMISSIONS;
  });

  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [proposals, setProposals] = useState<BusinessProposal[]>(() => {
    try {
      const saved = localStorage.getItem('navira_marketplace_proposals');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Fallback
    }
    return INITIAL_PROPOSALS;
  });

  // Selected entities for deep profile views
  const [selectedDeveloper, setSelectedDeveloper] = useState<DeveloperProfile | null>(null);
  const [selectedBusinessProfile, setSelectedBusinessProfile] = useState<BusinessRecord | null>(null);

  // Modals state
  const [contactingDeveloper, setContactingDeveloper] = useState<DeveloperProfile | null>(null);
  const [pitchingBusiness, setPitchingBusiness] = useState<BusinessRecord | null>(null);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [isShowcaseOpen, setIsShowcaseOpen] = useState(false);

  // Global Interactive Success Toast
  const [globalToast, setGlobalToast] = useState<{
    show: boolean;
    message: string;
    subtitle?: string;
  }>({ show: false, message: '' });

  // Existing Analysis Modals
  const [selectedBusinessForEdit, setSelectedBusinessForEdit] = useState<BusinessRecord | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCleaningModalOpen, setIsCleaningModalOpen] = useState(false);
  const [isScoringConfigOpen, setIsScoringConfigOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);

  // Initial Data Cleaning Audit Report
  const [cleaningReport, setCleaningReport] = useState<CleaningReport>(() => {
    const { report } = cleanAndValidateDataset(VERIFIED_MOHALI_CHANDIGARH_BUSINESSES, DEFAULT_WEIGHTS);
    return report;
  });

  // Filter State for Analysis Engine
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

  // Update projects and persist to localStorage (CHANGE 8)
  const handleUpdateProjects = (updatedList: MarketplaceProject[]) => {
    setProjects(updatedList);
    try {
      localStorage.setItem('navira_marketplace_projects', JSON.stringify(updatedList));
    } catch (e) {
      console.error('Failed to persist projects to localStorage', e);
    }
  };

  // Submit new FAQ Question (CHANGE 11)
  const handleFaqSubmit = (submissionData: Omit<FaqSubmission, 'id' | 'submittedAt' | 'status'>) => {
    const newSubmission: FaqSubmission = {
      id: `faq-sub-${Date.now()}`,
      ...submissionData,
      submittedAt: 'Just now',
      status: 'New'
    };
    const updated = [newSubmission, ...faqSubmissions];
    setFaqSubmissions(updated);
    try {
      localStorage.setItem('navira_faq_submissions', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to persist FAQ submission', e);
    }

    // Trigger interactive success notification
    setGlobalToast({
      show: true,
      message: 'Success! We will respond within 24 hours',
      subtitle: `Your question "${submissionData.subject}" has been delivered to the NAVIRA team.`
    });
  };

  // Update FAQ Status in Admin Panel
  const handleUpdateFaqStatus = (id: string, status: 'New' | 'Answered' | 'Archived') => {
    const updated = faqSubmissions.map((f) => (f.id === id ? { ...f, status } : f));
    setFaqSubmissions(updated);
    try {
      localStorage.setItem('navira_faq_submissions', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Delete FAQ Submission in Admin Panel
  const handleDeleteFaq = (id: string) => {
    const updated = faqSubmissions.filter((f) => f.id !== id);
    setFaqSubmissions(updated);
    try {
      localStorage.setItem('navira_faq_submissions', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Admin Logout Handler
  const handleLogoutAdmin = () => {
    logoutAdmin();
    setIsAdmin(false);
  };

  // Filtered dataset for Analysis Engine
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((b) => {
      if (filter.searchQuery.trim()) {
        const query = filter.searchQuery.toLowerCase();
        const matchesName = b.businessName.toLowerCase().includes(query);
        const matchesCat = b.category.toLowerCase().includes(query);
        const matchesLoc = b.locality.toLowerCase().includes(query);
        const matchesAddr = b.address.toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesLoc && !matchesAddr) return false;
      }
      if (filter.selectedCity !== 'All' && b.city !== filter.selectedCity) return false;
      if (filter.selectedLocality !== 'All' && b.locality !== filter.selectedLocality) return false;
      if (filter.selectedCategory !== 'All' && b.category !== filter.selectedCategory) return false;
      if (filter.selectedStatus !== 'All' && b.websiteStatus !== filter.selectedStatus) return false;
      if (filter.selectedVerificationStatus !== 'All' && b.recordVerificationStatus !== filter.selectedVerificationStatus) return false;
      if (filter.minRating > 0 && b.rating < filter.minRating) return false;
      if (filter.minReviews > 0 && b.reviewCount < filter.minReviews) return false;
      if (filter.onlyOpportunities && b.opportunityScore < 7) return false;
      return true;
    });
  }, [businesses, filter]);

  // Update a single business record
  const handleUpdateBusiness = (updated: BusinessRecord) => {
    setBusinesses((prev) => prev.map((b) => (b.businessId === updated.businessId ? updated : b)));
    setSelectedBusinessForEdit(updated);
    if (selectedBusinessProfile?.businessId === updated.businessId) {
      setSelectedBusinessProfile(updated);
    }
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

  // Reset to baseline dataset
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

  // Chat message sending handler
  const handleSendMessage = (conversationId: string, text: string) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'user',
      senderName: currentRole === 'business' ? 'Himanshu (Business)' : 'Himanshu (Developer)',
      senderRole: (currentRole === 'business' ? 'client' : 'developer') as 'client' | 'developer',
      text,
      timestamp: 'Just now'
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            lastMessage: text,
            timestamp: 'Just now',
            messages: [...c.messages, newMessage]
          };
        }
        return c;
      })
    );
  };

  // Submit client inquiry to developer
  const handleSubmitInquiry = (developerId: string, inquiryData: any) => {
    const dev = developers.find((d) => d.id === developerId);
    if (!dev) return;

    const newProject: MarketplaceProject = {
      id: `proj-${Date.now()}`,
      title: `${inquiryData.businessName} — Custom Website Development`,
      businessName: inquiryData.businessName,
      businessCategory: inquiryData.businessCategory,
      businessCity: inquiryData.locality.includes('Mohali') ? 'Mohali' : 'Chandigarh',
      businessLocality: inquiryData.locality,
      clientName: 'Himanshu (Owner)',
      developerId: dev.id,
      developerName: dev.name,
      developerAvatar: dev.avatarUrl,
      status: 'Planning',
      progressPercentage: 15,
      budget: inquiryData.budget,
      deadline: '14 Days',
      lastUpdate: 'Just now',
      milestones: [
        { id: `m-${Date.now()}-1`, title: 'Discovery & Requirement Brief', completed: true, dueDate: 'Day 2' },
        { id: `m-${Date.now()}-2`, title: 'Design Mockup & Brand Review', completed: false, dueDate: 'Day 5' },
        { id: `m-${Date.now()}-3`, title: 'Frontend Coding & Mobile Optimization', completed: false, dueDate: 'Day 10' },
        { id: `m-${Date.now()}-4`, title: 'Domain Setup & Go-Live Launch', completed: false, dueDate: 'Day 14' },
      ]
    };

    const updatedProjects = [newProject, ...projects];
    handleUpdateProjects(updatedProjects);

    // Also add to conversations
    const newConv: Conversation = {
      id: `conv-${Date.now()}`,
      participantId: dev.id,
      participantName: dev.name,
      participantRole: dev.role,
      participantAvatar: dev.avatarUrl,
      businessOrTitle: `${inquiryData.businessName} Website`,
      lastMessage: inquiryData.details || 'Sent new project inquiry.',
      timestamp: 'Just now',
      unreadCount: 0,
      isOnline: true,
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderId: 'user',
          senderName: 'Himanshu',
          senderRole: 'client',
          text: `Hi ${dev.name}! I am interested in building a website for ${inquiryData.businessName}. Estimated budget: ${inquiryData.budget}. Details: ${inquiryData.details || 'Standard business package.'}`,
          timestamp: 'Just now'
        }
      ]
    };

    setConversations((prev) => [newConv, ...prev]);
  };

  // Submit proposal to business
  const handleSubmitProposal = (proposalData: any) => {
    const newProposal: BusinessProposal = {
      id: `prop-${Date.now()}`,
      businessId: proposalData.businessId,
      businessName: proposalData.businessName,
      businessCategory: proposalData.businessCategory,
      businessLocality: proposalData.businessLocality,
      businessCity: proposalData.businessCity,
      developerId: 'dev-1',
      developerName: 'Arjun Mehta',
      developerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      proposedBudget: proposalData.proposedBudget,
      estimatedDelivery: proposalData.estimatedDelivery,
      pitchSummary: proposalData.pitchSummary,
      projectScope: proposalData.projectScope,
      featuresOffered: ['Mobile-first design', 'Google Reviews integration', 'WhatsApp direct booking'],
      status: 'Sent',
      sentDate: 'Today'
    };

    const updated = [newProposal, ...proposals];
    setProposals(updated);
    try {
      localStorage.setItem('navira_marketplace_proposals', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to persist proposal to localStorage', e);
    }

    // Trigger interactive success notification
    setGlobalToast({
      show: true,
      message: 'Success! We will respond within 24 hours',
      subtitle: `Your proposal for ${proposalData.businessName} has been recorded.`
    });
  };

  const unreadCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <div className="min-h-screen bg-[#02050D] text-slate-100 flex flex-col font-sans selection:bg-[#19BDF0]/30 selection:text-cyan-200">
      
      {/* 1. Global NAVIRA Top Navigation Bar */}
      <NaviraNavbar
        activeView={activeView}
        onNavigate={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        unreadMessagesCount={unreadCount}
        activeProjectsCount={projects.length}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
        isAdmin={isAdmin}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onLogoutAdmin={handleLogoutAdmin}
      />

      {/* 2. Main View Switcher */}
      <main className="flex-1 w-full">
        {/* VIEW A: HOMEPAGE */}
        {activeView === 'home' && (
          <HomePage
            onNavigate={(view) => {
              setActiveView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            developers={developers}
            businesses={businesses}
            onViewDeveloperProfile={(dev) => {
              setSelectedDeveloper(dev);
              setActiveView('developer-profile');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onContactDeveloper={(dev) => setContactingDeveloper(dev)}
            onSelectBusiness={(b) => {
              setSelectedBusinessProfile(b);
              setActiveView('business-profile');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSendProposal={(b) => setPitchingBusiness(b)}
            onSelectCategoryFilter={(cat) => {
              setFilter((prev) => ({ ...prev, selectedCategory: cat }));
            }}
            onOpenGetStarted={() => setIsGetStartedOpen(true)}
            onWatchDemo={() => setIsShowcaseOpen(true)}
            onFaqSubmit={handleFaqSubmit}
          />
        )}

        {/* VIEW B: FIND DEVELOPERS MARKETPLACE */}
        {activeView === 'developers' && (
          <div>
            <FindDevelopersPage
              developers={developers}
              onViewProfile={(dev) => {
                setSelectedDeveloper(dev);
                setActiveView('developer-profile');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onContactDeveloper={(dev) => setContactingDeveloper(dev)}
              onOpenGetStarted={() => setIsGetStartedOpen(true)}
            />
            <NaviraFooter onNavigate={setActiveView} />
          </div>
        )}

        {/* VIEW C: FIND BUSINESSES (325 REAL LEADS) */}
        {activeView === 'businesses' && (
          <div>
            <FindBusinessesPage
              businesses={businesses}
              onSelectBusiness={(b) => {
                setSelectedBusinessProfile(b);
                setActiveView('business-profile');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSendProposal={(b) => setPitchingBusiness(b)}
              categories={categories}
              localities={localities}
              selectedCategoryInitial={filter.selectedCategory}
            />
            <NaviraFooter onNavigate={setActiveView} />
          </div>
        )}

        {/* VIEW D: DEVELOPER PROFILE PAGE */}
        {activeView === 'developer-profile' && selectedDeveloper && (
          <div>
            <DeveloperProfileView
              developer={selectedDeveloper}
              onBack={() => setActiveView('developers')}
              onContact={(dev) => setContactingDeveloper(dev)}
            />
            <NaviraFooter onNavigate={setActiveView} />
          </div>
        )}

        {/* VIEW E: BUSINESS PROFILE PAGE */}
        {activeView === 'business-profile' && selectedBusinessProfile && (
          <div>
            <BusinessProfileView
              business={selectedBusinessProfile}
              onBack={() => setActiveView('businesses')}
              onSendProposal={(b) => setPitchingBusiness(b)}
              onFindDevelopersForBusiness={() => setActiveView('developers')}
              isAdmin={isAdmin}
            />
            <NaviraFooter onNavigate={setActiveView} />
          </div>
        )}

        {/* VIEW F: DASHBOARD (Business Owner & Developer) */}
        {activeView === 'dashboard' && (
          <div>
            <NaviraDashboard
              currentRole={currentRole}
              onRoleChange={setCurrentRole}
              businesses={businesses}
              developers={developers}
              projects={projects}
              proposals={proposals}
              faqSubmissions={faqSubmissions}
              onUpdateFaqStatus={handleUpdateFaqStatus}
              onDeleteFaq={handleDeleteFaq}
              onNavigate={(v) => {
                setActiveView(v);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectBusiness={(b) => {
                setSelectedBusinessProfile(b);
                setActiveView('business-profile');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onViewDeveloper={(dev) => {
                setSelectedDeveloper(dev);
                setActiveView('developer-profile');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenAddBusiness={() => setIsAddModalOpen(true)}
              isAdmin={isAdmin}
              onPromptAdminLogin={() => setIsAdminLoginOpen(true)}
            />
            <NaviraFooter onNavigate={setActiveView} />
          </div>
        )}

        {/* VIEW G: PROJECTS BOARD */}
        {activeView === 'projects' && (
          <div>
            <ProjectsView
              projects={projects}
              onOpenChat={() => setActiveView('messages')}
              onNavigateToDevelopers={() => setActiveView('developers')}
              onUpdateProjects={handleUpdateProjects}
              isAdmin={isAdmin}
              onPromptLogin={() => setIsAdminLoginOpen(true)}
            />
            <NaviraFooter onNavigate={setActiveView} />
          </div>
        )}

        {/* VIEW H: MESSAGING INTERFACE */}
        {activeView === 'messages' && (
          <div>
            <MessagingView
              conversations={conversations}
              onSendMessage={handleSendMessage}
            />
            <NaviraFooter onNavigate={setActiveView} />
          </div>
        )}

        {/* VIEW I: DEDICATED FAQ PAGE (CHANGE 11) */}
        {activeView === 'faq' && (
          <div>
            <div className="pt-6">
              <FaqSection onFaqSubmit={handleFaqSubmit} />
            </div>
            <NaviraFooter onNavigate={setActiveView} />
          </div>
        )}

        {/* VIEW J: HOW IT WORKS DEDICATED */}
        {activeView === 'how-it-works' && (
          <div>
            <div className="pt-10">
              <HowItWorksSection
                onJoinBusiness={() => setIsGetStartedOpen(true)}
                onJoinDeveloper={() => setIsGetStartedOpen(true)}
              />
            </div>
            <FinalCtaSection
              onJoinBusiness={() => setIsGetStartedOpen(true)}
              onJoinDeveloper={() => setIsGetStartedOpen(true)}
            />
            <NaviraFooter onNavigate={setActiveView} />
          </div>
        )}

        {/* VIEW K: FULL GOOGLE MAPS BUSINESS ANALYSIS & EXPORT ENGINE (100% PRESERVED) */}
        {activeView === 'analytics' && (
          <div className="space-y-8">
            {/* Analysis Header */}
            <Header
              studyArea={studyArea}
              collectionDate={collectionDate}
              isSampleData={isSampleData}
              totalRecords={businesses.length}
              report={cleaningReport}
              onOpenImport={() => {
                if (!isAdmin) {
                  setIsAdminLoginOpen(true);
                  return;
                }
                setIsImportModalOpen(true);
              }}
              onOpenAddModal={() => setIsAddModalOpen(true)}
              onOpenCleaningReport={() => setIsCleaningModalOpen(true)}
              onOpenScoringConfig={() => {
                if (!isAdmin) {
                  setIsAdminLoginOpen(true);
                  return;
                }
                setIsScoringConfigOpen(true);
              }}
              onOpenPresentation={() => setIsPresentationOpen(true)}
              onResetToSample={handleResetToBaseline}
              onExportCSV={() => {
                if (!isAdmin) {
                  setIsAdminLoginOpen(true);
                  return;
                }
                exportToCSV(businesses);
              }}
              onExportExcel={() => {
                if (!isAdmin) {
                  setIsAdminLoginOpen(true);
                  return;
                }
                exportToExcel(businesses, cleaningReport);
              }}
              onExportTop10={() => exportTop10CSV(businesses)}
            />

            {/* Analysis Dashboard Body */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
              {/* Summary Cards */}
              <section aria-label="Dataset Summary Cards">
                <SummaryCards
                  businesses={filteredBusinesses}
                  selectedStatus={filter.selectedStatus}
                  onSelectStatusFilter={(status) => setFilter({ ...filter, selectedStatus: status })}
                />
              </section>

              {/* Filter Bar */}
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

              {/* Charts Section */}
              <section aria-label="Data Visualizations">
                <ChartsSection businesses={filteredBusinesses} />
              </section>

              {/* Opportunity Ranking Table */}
              <section aria-label="Opportunity Ranking & Directory">
                <OpportunityTable
                  businesses={filteredBusinesses}
                  onSelectBusiness={(b) => setSelectedBusinessForEdit(b)}
                  onEditBusiness={(b) => setSelectedBusinessForEdit(b)}
                />
              </section>

              {/* Analytical Insights & Recommendations */}
              <section aria-label="Analytical Insights & Action Plan">
                <InsightsSection businesses={filteredBusinesses} />
              </section>

              {/* Footer Limitations */}
              <FooterLimitations collectionDate={collectionDate} studyArea={studyArea} />
            </div>
            <NaviraFooter onNavigate={setActiveView} />
          </div>
        )}
      </main>

      {/* Global Modals */}
      <ContactDeveloperModal
        developer={contactingDeveloper}
        onClose={() => setContactingDeveloper(null)}
        onSubmitInquiry={handleSubmitInquiry}
      />

      <SendProposalModal
        business={pitchingBusiness}
        onClose={() => setPitchingBusiness(null)}
        onSubmitProposal={handleSubmitProposal}
      />

      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
        onSelectRole={(role) => {
          setCurrentRole(role);
          setActiveView('dashboard');
        }}
      />

      <NaviraShowcaseModal
        isOpen={isShowcaseOpen}
        onClose={() => setIsShowcaseOpen(false)}
        onExploreMarketplace={() => setActiveView('developers')}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={() => setIsAdmin(true)}
      />

      {/* Existing Audit & Edit Modals Preserved */}
      <BusinessDetailModal
        business={selectedBusinessForEdit}
        onClose={() => setSelectedBusinessForEdit(null)}
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

      {/* Global Interactive Notification Toast */}
      <Toast
        show={globalToast.show}
        message={globalToast.message}
        subtitle={globalToast.subtitle}
        onClose={() => setGlobalToast((prev) => ({ ...prev, show: false }))}
      />

    </div>
  );
};
