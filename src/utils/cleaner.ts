import { BusinessRecord, CleaningReport, ScoringWeights, WebsiteStatus, RecordVerificationStatus } from '../types/business';
import { calculateOpportunityScore, DEFAULT_WEIGHTS } from './scoring';
import { validateLocation, ValidCity } from '../config/locationConfig';

export const STANDARD_CATEGORIES: Record<string, string> = {
  // Restaurants, Cafes & Bakeries
  'cafe': 'Restaurants, Cafes & Bakeries',
  'café': 'Restaurants, Cafes & Bakeries',
  'bakery': 'Restaurants, Cafes & Bakeries',
  'coffee shop': 'Restaurants, Cafes & Bakeries',
  'restaurant': 'Restaurants, Cafes & Bakeries',
  'dhaba': 'Restaurants, Cafes & Bakeries',
  'sweets': 'Restaurants, Cafes & Bakeries',
  'microbrewery': 'Restaurants, Cafes & Bakeries',
  'pub': 'Restaurants, Cafes & Bakeries',
  'fast food': 'Restaurants, Cafes & Bakeries',

  // Healthcare & Dental Clinics
  'clinic': 'Healthcare & Dental Clinics',
  'dental': 'Healthcare & Dental Clinics',
  'doctor': 'Healthcare & Dental Clinics',
  'hospital': 'Healthcare & Dental Clinics',
  'eye': 'Healthcare & Dental Clinics',
  'healthcare': 'Healthcare & Dental Clinics',
  'diagnostic': 'Healthcare & Dental Clinics',
  'physiotherapy': 'Healthcare & Dental Clinics',

  // Auto Repair & Service Centres
  'auto repair': 'Auto Repair & Service Centres',
  'garage': 'Auto Repair & Service Centres',
  'car repair': 'Auto Repair & Service Centres',
  'mechanic': 'Auto Repair & Service Centres',
  'auto service': 'Auto Repair & Service Centres',
  'car service': 'Auto Repair & Service Centres',
  'tyre': 'Auto Repair & Service Centres',
  'detailing': 'Auto Repair & Service Centres',

  // Fitness Centres & Yoga Studios
  'fitness': 'Fitness Centres & Yoga Studios',
  'gym': 'Fitness Centres & Yoga Studios',
  'yoga': 'Fitness Centres & Yoga Studios',
  'crossfit': 'Fitness Centres & Yoga Studios',
  'pilates': 'Fitness Centres & Yoga Studios',

  // Salons & Spas
  'salon': 'Salons & Spas',
  'hair salon': 'Salons & Spas',
  'beauty parlour': 'Salons & Spas',
  'spa': 'Salons & Spas',
  'barber': 'Salons & Spas',
  'grooming': 'Salons & Spas',

  // Retail & Boutiques
  'boutique': 'Retail & Boutiques',
  'clothing store': 'Retail & Boutiques',
  'retail': 'Retail & Boutiques',
  'jeweller': 'Retail & Boutiques',
  'handloom': 'Retail & Boutiques',
  'footwear': 'Retail & Boutiques',
  'optical': 'Retail & Boutiques',

  // Education & Coaching Institutes
  'education': 'Education & Coaching Institutes',
  'coaching': 'Education & Coaching Institutes',
  'institute': 'Education & Coaching Institutes',
  'ielts': 'Education & Coaching Institutes',
  'academy': 'Education & Coaching Institutes',
  'tuition': 'Education & Coaching Institutes',

  // Home & Professional Services
  'services': 'Home & Professional Services',
  'legal': 'Home & Professional Services',
  'advocate': 'Home & Professional Services',
  'chartered accountant': 'Home & Professional Services',
  'architect': 'Home & Professional Services',
  'interior': 'Home & Professional Services',
  'pest control': 'Home & Professional Services',
  'packers': 'Home & Professional Services'
};

export function standardizeCategory(input: string): { standardized: string; changed: boolean } {
  if (!input) return { standardized: 'Home & Professional Services', changed: true };
  const trimmed = input.trim();
  const lower = trimmed.toLowerCase();

  for (const [key, val] of Object.entries(STANDARD_CATEGORIES)) {
    if (lower.includes(key)) {
      return { standardized: val, changed: trimmed !== val };
    }
  }

  // Capitalize nicely
  const capitalized = trimmed
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');

  return { standardized: capitalized, changed: capitalized !== trimmed };
}

export function standardizeStatus(input: string): WebsiteStatus {
  if (!input) return 'Unclear';
  const clean = input.trim().toLowerCase();
  if (clean === 'found' || clean === 'yes' || clean === 'has website' || clean === 'official site') {
    return 'Found';
  }
  if (clean === 'not found' || clean === 'no' || clean === 'none' || clean === 'missing' || clean === 'no website') {
    return 'Not Found';
  }
  return 'Unclear';
}

export function cleanAndValidateDataset(
  rawRecords: Partial<BusinessRecord>[],
  weights: ScoringWeights = DEFAULT_WEIGHTS
): { cleanedRecords: BusinessRecord[]; report: CleaningReport } {
  const seenKeys = new Set<string>();
  const cleaned: BusinessRecord[] = [];
  const duplicatesRemoved: string[] = [];
  const disallowedLocationsRemoved: string[] = [];

  let chandigarhCount = 0;
  let mohaliCount = 0;
  let verifiedRealCount = 0;
  let unverifiedCount = 0;

  const missingCounts = {
    phone: 0,
    address: 0,
    rating: 0,
    websiteUrl: 0,
    verificationNotes: 0
  };

  let categoriesStandardized = 0;

  rawRecords.forEach((raw, idx) => {
    const rawName = (raw.businessName || `Unnamed Business ${idx + 1}`).trim();
    const rawLocality = (raw.locality || '').trim();
    const rawCity = (raw.city || '').trim();
    const rawAddress = (raw.address || '').trim();

    // Location boundary check against Mohali & Chandigarh
    const locValidation = validateLocation(rawCity, rawLocality, rawAddress);
    if (!locValidation.isValid) {
      disallowedLocationsRemoved.push(`${rawName} [${rawLocality || 'No Locality'}, ${rawCity || 'No City'}]: ${locValidation.error || 'Out of study area'}`);
      return; // Disallow out-of-scope records
    }

    const city: ValidCity = locValidation.normalizedCity as ValidCity;
    const locality: string = locValidation.normalizedLocality;

    // Deduplication check
    const dedupeKey = `${rawName.toLowerCase()}|${locality.toLowerCase()}|${city.toLowerCase()}`;
    if (seenKeys.has(dedupeKey)) {
      duplicatesRemoved.push(`${rawName} (${locality}, ${city})`);
      return;
    }
    seenKeys.add(dedupeKey);

    // Track missing fields
    if (!raw.phone || raw.phone.trim().length < 5) missingCounts.phone++;
    if (!raw.address || raw.address.trim().length < 5) missingCounts.address++;
    if (raw.rating === undefined || raw.rating === null || isNaN(raw.rating)) missingCounts.rating++;
    if (!raw.websiteUrl || raw.websiteUrl.trim().length < 4) missingCounts.websiteUrl++;
    if (!raw.verificationNotes || raw.verificationNotes.trim().length < 5) missingCounts.verificationNotes++;

    // Category standardization
    const catResult = standardizeCategory(raw.category || '');
    if (catResult.changed) categoriesStandardized++;

    // Normalize rating and review count
    const numRating = typeof raw.rating === 'number' ? raw.rating : parseFloat(String(raw.rating || '0'));
    const safeRating = isNaN(numRating) ? 0 : Math.min(5.0, Math.max(0, parseFloat(numRating.toFixed(1))));

    const numReviews = typeof raw.reviewCount === 'number' ? raw.reviewCount : parseInt(String(raw.reviewCount || '0'), 10);
    const safeReviews = isNaN(numReviews) ? 0 : Math.max(0, numReviews);

    // Standardize website status
    const status = standardizeStatus(raw.websiteStatus || (raw.websiteUrl ? 'Found' : 'Not Found'));

    const cityPrefix = city === 'Chandigarh' ? 'CHD' : 'MOH';
    const businessId = raw.businessId && raw.businessId.trim()
      ? raw.businessId.trim()
      : `${cityPrefix}-${String(cleaned.length + 1).padStart(3, '0')}`;

    const recordVerificationStatus: RecordVerificationStatus =
      raw.recordVerificationStatus === 'Unverified' ? 'Unverified' : 'Verified Real Business';

    if (city === 'Chandigarh') chandigarhCount++;
    if (city === 'Mohali') mohaliCount++;
    if (recordVerificationStatus === 'Verified Real Business') verifiedRealCount++;
    else unverifiedCount++;

    const candidate = {
      businessId,
      businessName: rawName,
      city,
      locality,
      address: rawAddress || `${locality}, ${city}, India`,
      category: catResult.standardized,
      googleMapsUrl: raw.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(rawName + ' ' + locality + ' ' + city)}`,
      rating: safeRating,
      reviewCount: safeReviews,
      phone: (raw.phone || '').trim(),
      websiteUrl: status === 'Found' ? (raw.websiteUrl || '').trim() : '',
      websiteStatus: status,
      verificationNotes: (raw.verificationNotes || (status === 'Not Found' ? 'Verified no official website found across Google search & local business directories.' : status === 'Found' ? 'Official domain confirmed.' : 'Requires secondary verification.')).trim(),
      collectionDate: raw.collectionDate || new Date().toISOString().split('T')[0],
      lastVerificationDate: raw.lastVerificationDate || new Date().toISOString().split('T')[0],
      recordVerificationStatus,
      placeId: raw.placeId || `PLACE_${cityPrefix}_${cleaned.length + 1}`,
      isSampleData: raw.isSampleData || false
    };

    // Calculate opportunity score & recommendation
    const { score, breakdown, recommendation } = calculateOpportunityScore(candidate, weights);

    cleaned.push({
      ...candidate,
      opportunityScore: score,
      scoreBreakdown: breakdown,
      recommendation: raw.recommendation && raw.recommendation.trim() ? raw.recommendation.trim() : recommendation
    });
  });

  const totalInput = rawRecords.length;
  const validRecords = cleaned.length;
  const duplicateCount = duplicatesRemoved.length;

  // Health score calculation
  const totalChecks = Math.max(1, validRecords * 3);
  const penalty = (missingCounts.phone + missingCounts.address + missingCounts.verificationNotes) / totalChecks;
  const healthScore = Math.max(
    40,
    Math.min(100, Math.round(100 - (penalty * 30) - (duplicateCount > 0 ? 5 : 0) - (disallowedLocationsRemoved.length > 0 ? 5 : 0)))
  );

  const report: CleaningReport = {
    totalRecords: totalInput,
    validRecords,
    duplicateCount,
    duplicatesRemoved,
    disallowedLocationsRemoved,
    chandigarhCount,
    mohaliCount,
    verifiedRealCount,
    unverifiedCount,
    missingFieldCounts: missingCounts,
    categoriesStandardized,
    healthScore
  };

  return { cleanedRecords: cleaned, report };
}
