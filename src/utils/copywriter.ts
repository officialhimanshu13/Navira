import { BusinessRecord } from '../types/business';

export interface BusinessUICopy {
  businessId: string;
  businessName: string;
  category: string;
  locality: string;
  city: string;
  rating: number;
  reviewCount: number;
  dynamicTag: string;
  tagVariant: 'amber' | 'emerald' | 'cyan' | 'rose' | 'violet';
  marketObservation: string;
  tailoredRecommendation: string;
}

/**
 * Generates bespoke, high-conversion copy for verified SMB listings in Mohali & Chandigarh.
 */
export function generateBusinessUICopy(b: BusinessRecord): BusinessUICopy {
  const isHighReviews = b.reviewCount >= 200;
  const isEliteRating = b.rating >= 4.5;
  const loc = `${b.locality}, ${b.city}`;
  const cat = b.category.toLowerCase();

  let dynamicTag = 'Verified Tricity Merchant • Missing Web Presence';
  let tagVariant: 'amber' | 'emerald' | 'cyan' | 'rose' | 'violet' = 'rose';
  let marketObservation = '';
  let tailoredRecommendation = '';

  // 1. DINING, CAFES & BAKERIES
  if (cat.includes('restaurant') || cat.includes('cafe') || cat.includes('bakery')) {
    if (isHighReviews && isEliteRating) {
      dynamicTag = 'Iconic Tricity Dining • Zero Digital Menu';
      tagVariant = 'amber';
    } else if (isHighReviews) {
      dynamicTag = 'High Weekend Footfall • Missing Direct Reservation';
      tagVariant = 'cyan';
    } else {
      dynamicTag = 'Active Local Patronage • Absent Web Portal';
      tagVariant = 'rose';
    }

    marketObservation = `Anchored in ${loc}, this dining destination commands a stellar ${b.rating}★ Google reputation across ${b.reviewCount} customer reviews, yet operates with zero direct digital touchpoints.`;
    tailoredRecommendation = 'Deploy a mobile-responsive digital menu with instant UPI QR payments, upcoming acoustic/weekend event calendars, and 1-tap WhatsApp table booking.';
  }
  // 2. HEALTHCARE & DENTAL CLINICS
  else if (cat.includes('healthcare') || cat.includes('dental') || cat.includes('clinic')) {
    if (isEliteRating) {
      dynamicTag = 'Trusted Clinical Practice • Missing Patient Scheduler';
      tagVariant = 'emerald';
    } else {
      dynamicTag = 'High Patient Influx • Zero Online Intake';
      tagVariant = 'cyan';
    }

    marketObservation = `A cornerstone healthcare facility in ${loc} maintaining a commanding ${b.rating}★ rating from ${b.reviewCount} verified patients on Google Maps without an official digital reception portal.`;
    tailoredRecommendation = 'Launch a HIPAA/ISO-compliant patient portal featuring verified doctor credentials, specialized treatment breakdowns, and automated appointment slot scheduling.';
  }
  // 3. SALONS & SPAS
  else if (cat.includes('salon') || cat.includes('spa') || cat.includes('beauty')) {
    dynamicTag = isHighReviews 
      ? 'High-Volume Lifestyle Brand • Absent Lookbook & Booking' 
      : 'Boutique Stylist Studio • Missing Rate Card';
    tagVariant = 'violet';

    marketObservation = `Commanding an enviable ${b.rating}★ rating across ${b.reviewCount} client reviews in ${loc}, this studio relies solely on physical walk-ins despite immense digital visual demand.`;
    tailoredRecommendation = 'Construct a luxury digital storefront displaying seasonal bridal packages, certified stylist lookbooks, transparent service rate cards, and instant calendar booking.';
  }
  // 4. RETAIL & BOUTIQUES
  else if (cat.includes('retail') || cat.includes('boutique') || cat.includes('shopping')) {
    dynamicTag = 'Commercial Hub Footfall • Zero Online Catalog';
    tagVariant = 'amber';

    marketObservation = `Prominently positioned in ${loc} with ${b.reviewCount} Google reviews (${b.rating}★), this commercial retail store captures foot traffic but leaks repeat buyers to digital marketplaces.`;
    tailoredRecommendation = 'Engineer a digital lookbook and real-time inventory catalog with WhatsApp-powered curbside pick-up and localized same-day Tricity delivery tracking.';
  }
  // 5. FITNESS & YOGA
  else if (cat.includes('fitness') || cat.includes('gym') || cat.includes('yoga')) {
    dynamicTag = 'Prime Membership Demand • Absent Class Schedule';
    tagVariant = 'emerald';

    marketObservation = `A recognized fitness training hub in ${loc} boasting a verified ${b.rating}★ score over ${b.reviewCount} reviews, currently offering no self-serve pass booking for prospective members.`;
    tailoredRecommendation = 'Deploy an interactive class timetable with trainer bios, progressive training plans, and automated trial pass lead capture.';
  }
  // 6. EDUCATION & COACHING
  else if (cat.includes('education') || cat.includes('coaching') || cat.includes('academy')) {
    dynamicTag = 'High Student Enrollment • Missing Course Portal';
    tagVariant = 'cyan';

    marketObservation = `Established academic institute in ${loc} with a solid ${b.rating}★ Google standing based on ${b.reviewCount} student reviews, lacking an authoritative centralized digital enrollment platform.`;
    tailoredRecommendation = 'Develop an authoritative institutional portal with syllabus downloads, faculty achievements, mock test registrations, and direct batch admission workflows.';
  }
  // 7. AUTO REPAIR & SERVICE CENTRES
  else if (cat.includes('auto') || cat.includes('repair') || cat.includes('car')) {
    dynamicTag = 'High Service Volume • Missing Slot Tracker';
    tagVariant = 'rose';

    marketObservation = `Strategically situated in ${loc} with ${b.reviewCount} customer reviews (${b.rating}★), serving fleet and personal vehicles without a web-based service estimator.`;
    tailoredRecommendation = 'Introduce a roadside emergency assistance locator, instant maintenance pricing calculator, and real-time vehicle bay service booking.';
  }
  // 8. PROFESSIONAL & CORPORATE SERVICES
  else {
    dynamicTag = 'Established Sector Practice • Absent Authority Portal';
    tagVariant = 'cyan';

    marketObservation = `Operating out of ${loc} with an impressive ${b.rating}★ rating from ${b.reviewCount} clients, providing high-stakes consultation without a dedicated credibility portal.`;
    tailoredRecommendation = 'Build an executive advisory website featuring case studies, partner profiles, regulatory practice summaries, and confidential client intake workflows.';
  }

  return {
    businessId: b.businessId,
    businessName: b.businessName,
    category: b.category,
    locality: b.locality,
    city: b.city,
    rating: b.rating,
    reviewCount: b.reviewCount,
    dynamicTag,
    tagVariant,
    marketObservation,
    tailoredRecommendation,
  };
}

