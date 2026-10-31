import { calculateOpportunityScore, DEFAULT_WEIGHTS, rankBusinesses } from '../src/utils/scoring.ts';
import { cleanAndValidateDataset, standardizeCategory, standardizeStatus } from '../src/utils/cleaner.ts';
import { VERIFIED_MOHALI_CHANDIGARH_BUSINESSES } from '../src/data/verifiedBusinesses.ts';
import { 
  PERMANENT_STUDY_AREA_CONFIG, 
  DISALLOWED_NEIGHBORING_AREAS, 
  validateLocation 
} from '../src/config/locationConfig.ts';
import * as fs from 'fs';
import * as path from 'path';

console.log('================================================================');
console.log('=== AUTOMATED VERIFICATION SUITE: MOHALI & CHANDIGARH DATASET ===');
console.log('================================================================\n');

let passed = 0;
let failed = 0;

function assert(condition: boolean, msg: string) {
  if (condition) {
    console.log(`  ✓ PASS: ${msg}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${msg}`);
    failed++;
  }
}

// -------------------------------------------------------------
// Test Suite 1: Study Area & Boundary Enforcement
// -------------------------------------------------------------
console.log('Suite 1: Study Area & Boundary Enforcement');

// 1.1 Study Area Configuration
assert(
  PERMANENT_STUDY_AREA_CONFIG.studyAreaName.includes('Mohali') &&
  PERMANENT_STUDY_AREA_CONFIG.studyAreaName.includes('Chandigarh'),
  'Permanent study area configuration locked to Mohali and Chandigarh'
);
assert(
  PERMANENT_STUDY_AREA_CONFIG.permittedCities.includes('Chandigarh') &&
  PERMANENT_STUDY_AREA_CONFIG.permittedCities.includes('Mohali') &&
  PERMANENT_STUDY_AREA_CONFIG.permittedCities.length === 2,
  'Permitted cities strictly limited to Chandigarh and Mohali only'
);

// 1.2 Disallowed Neighboring Areas Rejection
const disallowedSamples = [
  { city: 'Panchkula', locality: 'Sector 5' },
  { city: 'Zirakpur', locality: 'VIP Road' },
  { city: 'Kharar', locality: 'Main Road' },
  { city: 'Delhi', locality: 'Connaught Place' },
  { city: 'Gurugram', locality: 'DLF Phase 3' },
  { city: 'Noida', locality: 'Sector 18' },
  { city: 'Dera Bassi', locality: 'Main Bazaar' }
];
for (const sample of disallowedSamples) {
  const result = validateLocation(sample.city, sample.locality);
  assert(!result.isValid, `Correctly rejected disallowed location: "${sample.locality}, ${sample.city}"`);
}

// 1.3 Approved Localities Acceptance
const approvedSamples = [
  { city: 'Chandigarh', locality: 'Sector 35', address: 'SCO 12, Sector 35-C, Chandigarh' },
  { city: 'Mohali', locality: 'Phase 7', address: 'SCF 18, Phase 7, Mohali' },
  { city: 'Mohali', locality: 'Sector 82', address: 'Plot 4, Sector 82 JLPL Industrial Area, Mohali' },
  { city: 'Chandigarh', locality: 'Sector 17', address: 'SCO 45, Sector 17 Plaza, Chandigarh' }
];
for (const sample of approvedSamples) {
  const result = validateLocation(sample.city, sample.locality, sample.address);
  assert(
    result.isValid && result.normalizedCity === sample.city,
    `Correctly validated approved location: "${sample.locality}, ${sample.city}" as ${result.normalizedCity}`
  );
}

// -------------------------------------------------------------
// Test Suite 2: Active Dataset Integrity (325 Records)
// -------------------------------------------------------------
console.log('\nSuite 2: Active Dataset Integrity');

const dataset = VERIFIED_MOHALI_CHANDIGARH_BUSINESSES;

// 2.1 Dataset Volume
assert(
  dataset.length >= 300 && dataset.length <= 500,
  `Active dataset count ${dataset.length} is within the 300-500 target range`
);

// 2.2 Zero Delhi Records in Active Dataset
const delhiRecords = dataset.filter((b) => {
  const text = `${b.city} ${b.locality} ${b.address}`.toLowerCase();
  return text.includes('delhi') || text.includes('connaught') || text.includes('lajpat');
});
assert(delhiRecords.length === 0, `Active dataset contains 0 Delhi records (found: ${delhiRecords.length})`);

// 2.3 Zero Out-of-Scope Neighboring Areas (Panchkula, Zirakpur, Kharar, etc.)
const outOfScopeRecords = dataset.filter((b) => {
  const text = `${b.city} ${b.locality} ${b.address}`.toLowerCase();
  return (
    text.includes('panchkula') ||
    text.includes('zirakpur') ||
    text.includes('kharar') ||
    text.includes('dera bassi') ||
    text.includes('mullanpur')
  );
});
assert(outOfScopeRecords.length === 0, `Active dataset contains 0 neighboring out-of-scope records (found: ${outOfScopeRecords.length})`);

// 2.4 All Active Records Belong to Mohali or Chandigarh
const invalidCityRecords = dataset.filter(
  (b) => b.city !== 'Chandigarh' && b.city !== 'Mohali'
);
assert(invalidCityRecords.length === 0, `100% of active records belong to Chandigarh or Mohali (invalid: ${invalidCityRecords.length})`);

const chdCount = dataset.filter((b) => b.city === 'Chandigarh').length;
const mohCount = dataset.filter((b) => b.city === 'Mohali').length;
assert(chdCount > 100 && mohCount > 100, `Balanced geographic distribution: Chandigarh (${chdCount}) & Mohali (${mohCount})`);

// 2.5 No Demonstration Records Counted as Genuine
const demoRecords = dataset.filter((b) => b.isSampleData === true);
assert(demoRecords.length === 0, `0 demonstration records marked as active genuine data (found: ${demoRecords.length})`);

const verifiedRealRecords = dataset.filter((b) => b.recordVerificationStatus === 'Verified Real Business');
assert(
  verifiedRealRecords.length === dataset.length,
  `100% of records (${verifiedRealRecords.length}/${dataset.length}) have "Verified Real Business" status`
);

// -------------------------------------------------------------
// Test Suite 3: Deduplication and Data Quality Cleaner
// -------------------------------------------------------------
console.log('\nSuite 3: Deduplication and Data Quality Cleaner');

// 3.1 Inject duplicate and disallowed records into cleanAndValidateDataset
const sampleDup = { ...dataset[0] };
const disallowedRecord = {
  ...dataset[1],
  businessId: 'DIS-999',
  businessName: 'Panchkula Sweet Shop',
  locality: 'Sector 11, Panchkula',
  address: 'Sector 11, Panchkula, Haryana',
  city: 'Panchkula' as any
};

const testBatch = [dataset[0], sampleDup, disallowedRecord, dataset[1], dataset[2]];
const { cleanedRecords, report } = cleanAndValidateDataset(testBatch);

assert(report.duplicateCount === 1, `Cleaner detected and removed exact duplicate (detected: ${report.duplicateCount})`);
assert(
  report.disallowedLocationsRemoved.length === 1,
  `Cleaner intercepted and blocked disallowed location (removed: ${report.disallowedLocationsRemoved.length})`
);
assert(cleanedRecords.length === 3, `Cleaner preserved exactly 3 unique valid records (got: ${cleanedRecords.length})`);

// -------------------------------------------------------------
// Test Suite 4: Website Status & Opportunity Scoring Logic
// -------------------------------------------------------------
console.log('\nSuite 4: Website Status & Opportunity Scoring Logic');

const notFoundCount = dataset.filter((b) => b.websiteStatus === 'Not Found').length;
const foundCount = dataset.filter((b) => b.websiteStatus === 'Found').length;
const unclearCount = dataset.filter((b) => b.websiteStatus === 'Unclear').length;

assert(
  notFoundCount + foundCount + unclearCount === dataset.length,
  `All records have a valid WebsiteStatus: Not Found (${notFoundCount}), Found (${foundCount}), Unclear (${unclearCount})`
);
assert(notFoundCount > 150, `Majority of small businesses lack websites (${notFoundCount}/${dataset.length})`);

// Verify scoring rubric
const sampleProspect = {
  businessName: 'Test High Priority Clinic',
  category: 'Healthcare & Dental Clinics',
  locality: 'Phase 7',
  address: 'SCF 12, Phase 7, Mohali',
  city: 'Mohali' as const,
  phone: '+91 172 222 3344',
  rating: 4.8,
  reviewCount: 95,
  websiteStatus: 'Not Found' as const
};
const prospectScore = calculateOpportunityScore(sampleProspect, DEFAULT_WEIGHTS);
assert(
  prospectScore.score >= 9,
  `High priority business correctly receives 9-10 score (got: ${prospectScore.score})`
);
assert(
  prospectScore.breakdown.noWebsitePoints === 3,
  'Awards 3 points for missing website'
);
assert(
  prospectScore.breakdown.ratingPoints === 2,
  'Awards 2 points for rating >= 4.2'
);

// -------------------------------------------------------------
// Test Suite 5: CSV & Excel File Verification
// -------------------------------------------------------------
console.log('\nSuite 5: CSV and Deliverable File Consistency');

const cleanCsvPath = path.join(process.cwd(), 'Google_Maps_Business_Analysis/02_Clean_Data/business_analysis_clean.csv');
const rawCsvPath = path.join(process.cwd(), 'Google_Maps_Business_Analysis/01_Raw_Data/business_listings_raw.csv');
const finalCsvPath = path.join(process.cwd(), 'Google_Maps_Business_Analysis/06_Final_Submission/final_dataset.csv');
const archiveJsonPath = path.join(process.cwd(), 'archive/delhi_demonstration_dataset.json');

assert(fs.existsSync(cleanCsvPath), 'Clean CSV file exists in 02_Clean_Data');
assert(fs.existsSync(rawCsvPath), 'Raw CSV file exists in 01_Raw_Data');
assert(fs.existsSync(finalCsvPath), 'Final CSV file exists in 06_Final_Submission');
assert(fs.existsSync(archiveJsonPath), 'Archived Delhi demonstration dataset exists in archive/');

// Verify CSV row count
const cleanCsvLines = fs.readFileSync(cleanCsvPath, 'utf-8').trim().split('\n');
assert(
  cleanCsvLines.length === 326, // 1 header + 325 data rows
  `Clean CSV contains exactly 325 data rows (got: ${cleanCsvLines.length - 1})`
);

// Verify Archive contains 45 records
const archiveJson = JSON.parse(fs.readFileSync(archiveJsonPath, 'utf-8'));
assert(
  archiveJson.length === 45,
  `Archived Delhi demonstration dataset contains exactly 45 records (got: ${archiveJson.length})`
);

// -------------------------------------------------------------
// Final Results
// -------------------------------------------------------------
console.log('\n================================================================');
console.log(`Test Execution Complete: ${passed} Passed, ${failed} Failed`);
console.log('================================================================');

if (failed > 0) {
  process.exit(1);
}
