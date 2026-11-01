import React from 'react';
import { HeroSection } from './HeroSection';
import { TrustSection } from './TrustSection';
import { HowItWorksSection } from './HowItWorksSection';
import { CategoryShowcaseSection } from './CategoryShowcaseSection';
import { FeaturedDevelopersSection } from './FeaturedDevelopersSection';
import { BusinessOpportunitiesSection } from './BusinessOpportunitiesSection';
import { WhyNaviraSection } from './WhyNaviraSection';
import { FaqSection } from '../faq/FaqSection';
import { FinalCtaSection } from './FinalCtaSection';
import { NaviraFooter } from './NaviraFooter';

import { DeveloperProfile } from '../../types/marketplace';
import { BusinessRecord } from '../../types/business';
import { FaqSubmission } from '../../types/faq';

interface HomePageProps {
  onNavigate: (view: string) => void;
  developers: DeveloperProfile[];
  businesses: BusinessRecord[];
  onViewDeveloperProfile: (developer: DeveloperProfile) => void;
  onContactDeveloper: (developer: DeveloperProfile) => void;
  onSelectBusiness: (business: BusinessRecord) => void;
  onSendProposal: (business: BusinessRecord) => void;
  onSelectCategoryFilter: (category: string) => void;
  onOpenGetStarted: () => void;
  onWatchDemo: () => void;
  onFaqSubmit: (submission: Omit<FaqSubmission, 'id' | 'submittedAt' | 'status'>) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  developers,
  businesses,
  onViewDeveloperProfile,
  onContactDeveloper,
  onSelectBusiness,
  onSendProposal,
  onSelectCategoryFilter,
  onOpenGetStarted,
  onWatchDemo,
  onFaqSubmit,
}) => {
  const chandigarhCount = businesses.filter((b) => b.city === 'Chandigarh').length;
  const mohaliCount = businesses.filter((b) => b.city === 'Mohali').length;
  const notFoundCount = businesses.filter((b) => b.websiteStatus === 'Not Found').length;
  const foundCount = businesses.filter((b) => b.websiteStatus === 'Found').length;

  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero with Slogan & Digital City Scene */}
      <HeroSection
        onFindDeveloper={() => onNavigate('developers')}
        onFindBusiness={() => onNavigate('businesses')}
        onExploreMarketplace={() => onNavigate('developers')}
        onWatchDemo={onWatchDemo}
        totalBusinesses={businesses.length}
        totalOpportunities={notFoundCount}
      />

      {/* 2. Trust Section (Genuine Verified Statistics) */}
      <TrustSection
        totalBusinesses={businesses.length}
        chandigarhCount={chandigarhCount}
        mohaliCount={mohaliCount}
        websiteNotFoundCount={notFoundCount}
        websiteFoundCount={foundCount}
      />

      {/* 3. How It Works (Dual Journey) */}
      <HowItWorksSection
        onJoinBusiness={onOpenGetStarted}
        onJoinDeveloper={onOpenGetStarted}
      />

      {/* 4. Explore Categories */}
      <CategoryShowcaseSection
        onSelectCategory={(catQuery) => {
          onSelectCategoryFilter(catQuery);
          onNavigate('businesses');
        }}
      />

      {/* 5. Featured Developers */}
      <FeaturedDevelopersSection
        developers={developers}
        onViewProfile={onViewDeveloperProfile}
        onContactDeveloper={onContactDeveloper}
        onViewAllDevelopers={() => onNavigate('developers')}
      />

      {/* 6. Real Business Opportunities (Directly connected to 325 verified records) */}
      <BusinessOpportunitiesSection
        businesses={businesses}
        onSelectBusiness={onSelectBusiness}
        onSendProposal={onSendProposal}
        onExploreAllBusinesses={() => onNavigate('businesses')}
      />

      {/* 7. Why NAVIRA */}
      <WhyNaviraSection />

      {/* 8. Frequently Asked Questions & "Ask NAVIRA" Submission (CHANGE 11) */}
      <FaqSection onFaqSubmit={onFaqSubmit} />

      {/* 9. Final CTA */}
      <FinalCtaSection
        onJoinBusiness={onOpenGetStarted}
        onJoinDeveloper={onOpenGetStarted}
      />

      {/* 10. Footer with Official Contact Details (CHANGE 2) */}
      <NaviraFooter onNavigate={onNavigate} />
    </div>
  );
};
