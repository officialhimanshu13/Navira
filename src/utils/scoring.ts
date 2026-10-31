import { BusinessRecord, ScoreBreakdown, ScoringWeights, WebsiteStatus } from '../types/business';

export const DEFAULT_WEIGHTS: ScoringWeights = {
  notFoundPoints: 3,
  unclearPoints: 1,
  foundPoints: 0,
  highRatingMin: 4.2,
  highRatingPoints: 2,
  midRatingMin: 3.8,
  midRatingPoints: 1,
  highReviewsMin: 40,
  highReviewsPoints: 2,
  midReviewsMin: 15,
  midReviewsPoints: 1,
  completenessPoints: 1,
  improvementMaxPoints: 2
};

export function calculateOpportunityScore(
  record: {
    category: string;
    websiteStatus: WebsiteStatus;
    rating: number;
    reviewCount: number;
    phone: string;
    address: string;
    businessName: string;
    locality?: string;
    businessId?: string;
  },
  weights: ScoringWeights = DEFAULT_WEIGHTS
): { score: number; breakdown: ScoreBreakdown; recommendation: string } {
  const reasons: string[] = [];

  // Factor 1: Website Verification Status (0–3 pts)
  let noWebsitePoints = 0;
  if (record.websiteStatus === 'Not Found') {
    noWebsitePoints = weights.notFoundPoints;
    reasons.push(`+${noWebsitePoints} No official website found`);
  } else if (record.websiteStatus === 'Unclear') {
    noWebsitePoints = weights.unclearPoints;
    reasons.push(`+${noWebsitePoints} Website status unclear / unverified presence`);
  } else {
    noWebsitePoints = weights.foundPoints;
  }

  // Factor 2: Public Rating (0–2 pts)
  let ratingPoints = 0;
  if (record.rating >= weights.highRatingMin) {
    ratingPoints = weights.highRatingPoints;
    reasons.push(`+${ratingPoints} High customer satisfaction (${record.rating.toFixed(1)}★)`);
  } else if (record.rating >= weights.midRatingMin) {
    ratingPoints = weights.midRatingPoints;
    reasons.push(`+${ratingPoints} Moderate rating (${record.rating.toFixed(1)}★)`);
  }

  // Factor 3: Review Count (0–2 pts)
  let reviewCountPoints = 0;
  if (record.reviewCount >= weights.highReviewsMin) {
    reviewCountPoints = weights.highReviewsPoints;
    reasons.push(`+${reviewCountPoints} Active customer base (${record.reviewCount} reviews)`);
  } else if (record.reviewCount >= weights.midReviewsMin) {
    reviewCountPoints = weights.midReviewsPoints;
    reasons.push(`+${reviewCountPoints} Moderate review volume (${record.reviewCount} reviews)`);
  }

  // Factor 4: Information Completeness (0–1 pt)
  let completenessPoints = 0;
  const hasPhone = Boolean(record.phone && record.phone.trim().length >= 6);
  const hasAddress = Boolean(record.address && record.address.trim().length >= 5);
  const hasName = Boolean(record.businessName && record.businessName.trim().length > 1);

  if (hasPhone && hasAddress && hasName) {
    completenessPoints = weights.completenessPoints;
    reasons.push(`+${completenessPoints} Complete baseline listing details`);
  }

  // Factor 5: Clear Improvement Opportunity (0–2 pts)
  // Award points based on evidence of high commercial potential lacking digital conversion funnel
  let improvementPoints = 0;
  if (record.websiteStatus === 'Not Found') {
    if (record.reviewCount >= 30 || record.rating >= 4.0) {
      improvementPoints = 2;
      reasons.push(`+${improvementPoints} High footfall & reputation ready for direct web capture`);
    } else {
      improvementPoints = 1;
      reasons.push(`+${improvementPoints} Potential for basic web presence and local visibility`);
    }
  } else if (record.websiteStatus === 'Unclear') {
    improvementPoints = 1;
    reasons.push(`+${improvementPoints} Unclear digital presence warrants website verification`);
  }

  const totalScore = Math.min(
    10,
    noWebsitePoints + ratingPoints + reviewCountPoints + completenessPoints + improvementPoints
  );

  // Generate contextual, realistic recommendation based on category & status
  let recommendation = '';
  const cat = record.category.toLowerCase();

  if (record.websiteStatus === 'Found') {
    recommendation = 'Maintain official website, audit mobile speed, and ensure Google Maps action links (menu/booking) are synchronized.';
  } else if (record.websiteStatus === 'Unclear') {
    recommendation = 'Conduct secondary audit across local directories; verify domain ownership and claim official Google Business profile.';
  } else {
    // Website Not Found
    if (cat.includes('cafe') || cat.includes('bakery') || cat.includes('restaurant')) {
      recommendation = 'Launch a fast 1-page mobile site with online digital menu, location map, and direct WhatsApp / call table booking.';
    } else if (cat.includes('salon') || cat.includes('spa') || cat.includes('barber')) {
      recommendation = 'Deploy service menu page with transparent pricing tiers, portfolio photo gallery, and online appointment request button.';
    } else if (cat.includes('clinic') || cat.includes('dental') || cat.includes('health') || cat.includes('hospital')) {
      recommendation = 'Build professional clinic portal highlighting doctor credentials, consultation hours, accepted insurance, and patient inquiries.';
    } else if (cat.includes('auto') || cat.includes('repair') || cat.includes('mechanic')) {
      recommendation = 'Create local landing page detailing vehicle service packages, roadside assistance contacts, and Google Maps directions.';
    } else if (cat.includes('boutique') || cat.includes('retail') || cat.includes('jewel') || cat.includes('store')) {
      recommendation = 'Establish brand landing page featuring seasonal catalog, store hours, virtual tour, and WhatsApp order inquiries.';
    } else if (cat.includes('fitness') || cat.includes('gym') || cat.includes('yoga')) {
      recommendation = 'Set up simple schedule landing page with membership packages, trainer bios, and free trial pass request form.';
    } else {
      recommendation = 'Create dedicated official landing page with service offerings, verified contact details, opening hours, and clear call-to-actions.';
    }
  }

  const breakdown: ScoreBreakdown = {
    noWebsitePoints,
    ratingPoints,
    reviewCountPoints,
    completenessPoints,
    improvementPoints,
    totalScore,
    reasons
  };

  return { score: totalScore, breakdown, recommendation };
}

export function rankBusinesses(businesses: BusinessRecord[]): BusinessRecord[] {
  return [...businesses].sort((a, b) => {
    // Primary: Opportunity score descending
    if (b.opportunityScore !== a.opportunityScore) {
      return b.opportunityScore - a.opportunityScore;
    }
    // Secondary tie-breaker: Review count descending (market validation)
    if (b.reviewCount !== a.reviewCount) {
      return b.reviewCount - a.reviewCount;
    }
    // Tertiary tie-breaker: Rating descending
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }
    // Alphabetical
    return a.businessName.localeCompare(b.businessName);
  });
}
