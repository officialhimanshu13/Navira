import { BusinessRecord } from '../types/business';
import { calculateOpportunityScore, DEFAULT_WEIGHTS } from '../utils/scoring';
import verifiedDataRaw from './verifiedBusinesses.json';

export const VERIFIED_MOHALI_CHANDIGARH_BUSINESSES: BusinessRecord[] = verifiedDataRaw.map((raw: any) => {
  const { score, breakdown, recommendation } = calculateOpportunityScore(
    {
      businessName: raw.businessName,
      category: raw.category,
      locality: raw.locality,
      address: raw.address,
      phone: raw.phone,
      rating: raw.rating,
      reviewCount: raw.reviewCount,
      websiteStatus: raw.websiteStatus
    },
    DEFAULT_WEIGHTS
  );

  return {
    businessId: raw.businessId,
    businessName: raw.businessName,
    city: raw.city,
    locality: raw.locality,
    address: raw.address,
    category: raw.category,
    googleMapsUrl: raw.googleMapsUrl,
    rating: raw.rating,
    reviewCount: raw.reviewCount,
    phone: raw.phone,
    websiteUrl: raw.websiteUrl,
    websiteStatus: raw.websiteStatus,
    verificationNotes: raw.verificationNotes,
    collectionDate: raw.collectionDate,
    lastVerificationDate: raw.lastVerificationDate,
    recordVerificationStatus: raw.recordVerificationStatus,
    placeId: raw.placeId,
    opportunityScore: score,
    scoreBreakdown: breakdown,
    recommendation,
    isSampleData: false
  };
});
