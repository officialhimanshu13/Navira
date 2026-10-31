export type ValidCity = 'Chandigarh' | 'Mohali';

export interface LocalityConfig {
  id: string;
  name: string;
  city: ValidCity;
  description: string;
}

export interface LocationConfiguration {
  studyAreaName: string;
  shortStudyArea: string;
  stateInfo: string;
  permittedCities: ValidCity[];
  disallowedNeighbouringAreas: string[];
  localities: LocalityConfig[];
}

export const PERMANENT_STUDY_AREA_CONFIG: LocationConfiguration = {
  studyAreaName: 'Mohali (SAS Nagar), Punjab and Chandigarh, India',
  shortStudyArea: 'Mohali & Chandigarh',
  stateInfo: 'Union Territory of Chandigarh & Punjab',
  permittedCities: ['Chandigarh', 'Mohali'],
  disallowedNeighbouringAreas: [
    'Panchkula',
    'Zirakpur',
    'Kharar',
    'Dera Bassi',
    'New Chandigarh',
    'Kalka',
    'Pinjore',
    'Delhi',
    'Lajpat Nagar',
    'Connaught Place',
    'Karol Bagh',
    'Hauz Khas',
    'Khan Market',
    'South Extension'
  ],
  localities: [
    // Chandigarh Localities
    { id: 'chd-sec17', name: 'Sector 17', city: 'Chandigarh', description: 'City Centre Plaza, Retail & Financial Hub' },
    { id: 'chd-sec35', name: 'Sector 35', city: 'Chandigarh', description: 'Commercial, Dining & Hospitality Hub' },
    { id: 'chd-sec26', name: 'Sector 26', city: 'Chandigarh', description: 'Madhya Marg Dining, Nightlife & Auto Hub' },
    { id: 'chd-sec8', name: 'Sector 8', city: 'Chandigarh', description: 'Inner Market, Chic Cafes & Salons' },
    { id: 'chd-sec9', name: 'Sector 9', city: 'Chandigarh', description: 'Madhya Marg High Street, Clinics & Luxury Studios' },
    { id: 'chd-sec22', name: 'Sector 22', city: 'Chandigarh', description: 'Aroma Complex & Mobile/Electronics Market' },
    { id: 'chd-sec34', name: 'Sector 34', city: 'Chandigarh', description: 'Sub-City Centre, Education & Professional Services' },
    { id: 'chd-ind1', name: 'Industrial Area Phase 1', city: 'Chandigarh', description: 'Commercial Hub, Retail & Auto Workshops' },
    { id: 'chd-ind2', name: 'Industrial Area Phase 2', city: 'Chandigarh', description: 'Workshops, Fabrication & Auto Repair' },
    { id: 'chd-sec15', name: 'Sector 15', city: 'Chandigarh', description: 'Patel Market & Retail District' },
    { id: 'chd-sec19', name: 'Sector 19', city: 'Chandigarh', description: 'Palika & Sadar Market District' },
    { id: 'chd-sec20', name: 'Sector 20', city: 'Chandigarh', description: 'Local Commercial & Home Services Market' },
    { id: 'chd-sec32', name: 'Sector 32', city: 'Chandigarh', description: 'Hospitality & Commercial Complex' },
    { id: 'chd-sec43', name: 'Sector 43', city: 'Chandigarh', description: 'District Court & Commercial Market' },

    // Mohali (SAS Nagar) Localities
    { id: 'moh-p3b2', name: 'Phase 3B2', city: 'Mohali', description: 'Primary Food Street, Commercial & Grooming Hub' },
    { id: 'moh-p5', name: 'Phase 5', city: 'Mohali', description: 'Commercial Market, Healthcare & Repair Services' },
    { id: 'moh-p7', name: 'Phase 7', city: 'Mohali', description: 'Major Retail Market, Auto Care & Clinics' },
    { id: 'moh-p9', name: 'Phase 9', city: 'Mohali', description: 'Commercial Strip near PCA Stadium' },
    { id: 'moh-p10', name: 'Phase 10', city: 'Mohali', description: 'Local Commercial & Dining Hub' },
    { id: 'moh-p11', name: 'Phase 11', city: 'Mohali', description: 'South Mohali Retail & Services Hub' },
    { id: 'moh-s70', name: 'Sector 70', city: 'Mohali', description: 'Mattaur Commercial Corridor & Clinics' },
    { id: 'moh-s71', name: 'Sector 71', city: 'Mohali', description: 'Healthcare Corridor & Commercial Complex' },
    { id: 'moh-s67', name: 'Sector 67', city: 'Mohali', description: 'Tech Services & Modern Commercial Market' },
    { id: 'moh-s82', name: 'Sector 82 (JLPL)', city: 'Mohali', description: 'Industrial Park, Auto Service & Hardware' },
    { id: 'moh-ind8', name: 'Industrial Area Phase 8', city: 'Mohali', description: 'IT Hub, Bestech Zone & Auto Care' }
  ]
};

/**
 * Validates whether a given city and locality strictly belong to the permitted study area.
 */
export function validateLocation(
  city?: string,
  locality?: string,
  address?: string
): { isValid: boolean; normalizedCity: ValidCity | 'Unknown'; normalizedLocality: string; error?: string } {
  const textToCheck = `${city || ''} ${locality || ''} ${address || ''}`.toLowerCase();

  // 1. Strict rejection of disallowed neighbouring areas
  for (const disallowed of PERMANENT_STUDY_AREA_CONFIG.disallowedNeighbouringAreas) {
    if (textToCheck.includes(disallowed.toLowerCase())) {
      return {
        isValid: false,
        normalizedCity: 'Unknown',
        normalizedLocality: locality || 'Unknown',
        error: `Location '${disallowed}' is strictly outside the permanent study area (Mohali and Chandigarh). Neighbouring areas like Panchkula, Zirakpur, Kharar, or Delhi are excluded.`
      };
    }
  }

  // 2. Identify City
  let matchedCity: ValidCity | 'Unknown' = 'Unknown';
  if (textToCheck.includes('mohali') || textToCheck.includes('sas nagar') || textToCheck.includes('s.a.s nagar')) {
    matchedCity = 'Mohali';
  } else if (textToCheck.includes('chandigarh')) {
    matchedCity = 'Chandigarh';
  }

  // 3. Match Locality
  const locList = PERMANENT_STUDY_AREA_CONFIG.localities;
  const candidates = matchedCity !== 'Unknown' 
    ? locList.filter((l) => l.city === matchedCity)
    : locList;

  let matchedLocality: LocalityConfig | undefined;

  if (locality) {
    const locLower = locality.trim().toLowerCase();
    // 1. Exact match first
    matchedLocality = candidates.find((l) => l.name.toLowerCase() === locLower);
    
    // 2. Word boundary match (longest name first so Sector 82 matches before Sector 8)
    if (!matchedLocality) {
      const sorted = [...candidates].sort((a, b) => b.name.length - a.name.length);
      matchedLocality = sorted.find((l) => {
        const escaped = l.name.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        return new RegExp(`\\b${escaped}\\b`, 'i').test(locality);
      });
    }
  }

  if (!matchedLocality && address) {
    const sorted = [...candidates].sort((a, b) => b.name.length - a.name.length);
    matchedLocality = sorted.find((l) => {
      const escaped = l.name.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      return new RegExp(`\\b${escaped}\\b`, 'i').test(address);
    });
  }

  if (matchedLocality) {
    return {
      isValid: true,
      normalizedCity: matchedLocality.city,
      normalizedLocality: matchedLocality.name
    };
  }

  // If city is explicitly Chandigarh or Mohali and locality is provided
  if (matchedCity !== 'Unknown' && locality && locality.trim()) {
    return {
      isValid: true,
      normalizedCity: matchedCity,
      normalizedLocality: locality.trim()
    };
  }

  return {
    isValid: false,
    normalizedCity: matchedCity,
    normalizedLocality: locality || 'Unknown',
    error: `Location does not match approved localities in Mohali or Chandigarh.`
  };
}
