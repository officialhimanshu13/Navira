import { ValidCity } from '../config/locationConfig';

export type WebsiteStatus = 'Found' | 'Not Found' | 'Unclear';
export type RecordVerificationStatus = 'Verified Real Business' | 'Unverified' | 'Archived Sample';

export interface ScoreBreakdown {
  noWebsitePoints: number;     // 0–3 points
  ratingPoints: number;        // 0–2 points
  reviewCountPoints: number;   // 0–2 points
  completenessPoints: number;  // 0–1 point
  improvementPoints: number;   // 0–2 points
  totalScore: number;          // Max 10
  reasons: string[];
}

export interface BusinessRecord {
  businessId: string;
  businessName: string;
  city: ValidCity;
  locality: string;
  address: string;
  category: string;
  googleMapsUrl: string;
  rating: number;              // 0 to 5.0
  reviewCount: number;         // 0+
  phone: string;
  websiteUrl: string;
  websiteStatus: WebsiteStatus;
  verificationNotes: string;
  collectionDate: string;      // YYYY-MM-DD
  lastVerificationDate: string;// YYYY-MM-DD
  recordVerificationStatus: RecordVerificationStatus;
  placeId?: string;
  opportunityScore: number;    // 0–10
  scoreBreakdown: ScoreBreakdown;
  recommendation: string;
  isSampleData?: boolean;
}

export interface ScoringWeights {
  notFoundPoints: number;       // default 3
  unclearPoints: number;        // default 1
  foundPoints: number;          // default 0
  highRatingMin: number;        // default 4.2
  highRatingPoints: number;     // default 2
  midRatingMin: number;         // default 3.8
  midRatingPoints: number;      // default 1
  highReviewsMin: number;       // default 40
  highReviewsPoints: number;    // default 2
  midReviewsMin: number;        // default 15
  midReviewsPoints: number;     // default 1
  completenessPoints: number;   // default 1
  improvementMaxPoints: number; // default 2
}

export interface CleaningReport {
  totalRecords: number;
  validRecords: number;
  duplicateCount: number;
  duplicatesRemoved: string[];
  disallowedLocationsRemoved: string[];
  chandigarhCount: number;
  mohaliCount: number;
  verifiedRealCount: number;
  unverifiedCount: number;
  missingFieldCounts: {
    phone: number;
    address: number;
    rating: number;
    websiteUrl: number;
    verificationNotes: number;
  };
  categoriesStandardized: number;
  healthScore: number; // 0-100%
}

export interface FilterState {
  searchQuery: string;
  selectedCity: 'All' | ValidCity;
  selectedCategory: string;
  selectedLocality: string;
  selectedStatus: 'All' | WebsiteStatus;
  selectedVerificationStatus: 'All' | RecordVerificationStatus;
  minRating: number;
  minReviews: number;
  onlyOpportunities: boolean;
}
