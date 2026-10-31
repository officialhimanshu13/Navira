import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { BusinessRecord, CleaningReport } from '../types/business';
import { rankBusinesses } from './scoring';

export function exportToCSV(businesses: BusinessRecord[], filename = 'business_analysis_clean.csv'): void {
  const exportData = businesses.map((b) => ({
    'Business ID': b.businessId,
    'Business Name': b.businessName,
    'City': b.city,
    'Locality': b.locality,
    'Full Address': b.address,
    'Business Category': b.category,
    'Google Maps URL': b.googleMapsUrl,
    'Public Rating': b.rating,
    'Review Count': b.reviewCount,
    'Public Phone': b.phone,
    'Official Website URL': b.websiteUrl,
    'Website Verification Status': b.websiteStatus,
    'Verification Notes': b.verificationNotes,
    'Data Collection Date': b.collectionDate,
    'Last Verification Date': b.lastVerificationDate,
    'Record Verification Status': b.recordVerificationStatus,
    'Opportunity Score (0-10)': b.opportunityScore,
    'Score Breakdown Rationale': b.scoreBreakdown.reasons.join('; '),
    'Actionable Recommendation': b.recommendation,
    'Study Area': `${b.city}, Punjab/UT, India`
  }));

  const csv = Papa.unparse(exportData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportTop10CSV(businesses: BusinessRecord[]): void {
  const top10 = rankBusinesses(businesses).slice(0, 10);
  exportToCSV(top10, 'top_10_priority_opportunities_tricity.csv');
}

export function exportToExcel(
  businesses: BusinessRecord[],
  report?: CleaningReport,
  filename = 'business_analysis_clean.xlsx'
): void {
  const wb = XLSX.utils.book_new();

  // Sheet 1: Cleaned Dataset
  const cleanedData = businesses.map((b) => ({
    'Business ID': b.businessId,
    'Business Name': b.businessName,
    'City': b.city,
    'Locality': b.locality,
    'Full Address': b.address,
    'Category': b.category,
    'Google Maps Listing': b.googleMapsUrl,
    'Rating': b.rating,
    'Review Count': b.reviewCount,
    'Public Phone': b.phone,
    'Official Website': b.websiteUrl || 'None',
    'Website Status': b.websiteStatus,
    'Verification Notes': b.verificationNotes,
    'Collection Date': b.collectionDate,
    'Last Verification Date': b.lastVerificationDate,
    'Record Verification Status': b.recordVerificationStatus,
    'Opportunity Score': b.opportunityScore,
    'Score Rationale': b.scoreBreakdown.reasons.join('; '),
    'Recommended Action': b.recommendation
  }));
  const wsClean = XLSX.utils.json_to_sheet(cleanedData);
  XLSX.utils.book_append_sheet(wb, wsClean, 'Cleaned Dataset');

  // Sheet 2: Top 10 Opportunities
  const top10 = rankBusinesses(businesses).slice(0, 10);
  const top10Data = top10.map((b, idx) => ({
    'Priority Rank': idx + 1,
    'Business Name': b.businessName,
    'City': b.city,
    'Locality': b.locality,
    'Category': b.category,
    'Rating': b.rating,
    'Review Count': b.reviewCount,
    'Website Status': b.websiteStatus,
    'Opportunity Score': b.opportunityScore,
    'Evaluation Breakdown': b.scoreBreakdown.reasons.join('; '),
    'Actionable Recommendation': b.recommendation,
    'Google Maps URL': b.googleMapsUrl
  }));
  const wsTop10 = XLSX.utils.json_to_sheet(top10Data);
  XLSX.utils.book_append_sheet(wb, wsTop10, 'Top 10 Opportunities');

  // Sheet 3: Locality-wise Summary
  const localitySummary: Record<string, { city: string; total: number; found: number; notFound: number; unclear: number }> = {};
  businesses.forEach((b) => {
    const key = `${b.locality} (${b.city})`;
    if (!localitySummary[key]) {
      localitySummary[key] = { city: b.city, total: 0, found: 0, notFound: 0, unclear: 0 };
    }
    localitySummary[key].total++;
    if (b.websiteStatus === 'Found') localitySummary[key].found++;
    else if (b.websiteStatus === 'Not Found') localitySummary[key].notFound++;
    else localitySummary[key].unclear++;
  });

  const localityRows = Object.entries(localitySummary).map(([loc, stats]) => ({
    'Locality': loc,
    'City': stats.city,
    'Total Businesses': stats.total,
    'Website Found': stats.found,
    'Website Not Found': stats.notFound,
    'Unclear Status': stats.unclear,
    'Opportunity Share (%)': ((stats.notFound / stats.total) * 100).toFixed(1) + '%'
  }));
  const wsLocality = XLSX.utils.json_to_sheet(localityRows);
  XLSX.utils.book_append_sheet(wb, wsLocality, 'Locality Summary');

  // Sheet 4: Category-wise Summary Pivot
  const categorySummary: Record<string, { total: number; found: number; notFound: number; unclear: number }> = {};
  businesses.forEach((b) => {
    if (!categorySummary[b.category]) {
      categorySummary[b.category] = { total: 0, found: 0, notFound: 0, unclear: 0 };
    }
    categorySummary[b.category].total++;
    if (b.websiteStatus === 'Found') categorySummary[b.category].found++;
    else if (b.websiteStatus === 'Not Found') categorySummary[b.category].notFound++;
    else categorySummary[b.category].unclear++;
  });

  const summaryRows = Object.entries(categorySummary).map(([cat, stats]) => ({
    'Business Category': cat,
    'Total Businesses': stats.total,
    'Website Found': stats.found,
    'Website Not Found': stats.notFound,
    'Unclear Status': stats.unclear,
    'Opportunity Rate (%)': ((stats.notFound / stats.total) * 100).toFixed(1) + '%'
  }));
  const wsSummary = XLSX.utils.json_to_sheet(summaryRows);
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Category Analysis');

  // Sheet 5: Data Quality & Location Audit
  if (report) {
    const auditRows = [
      { Metric: 'Study Area', Value: 'Mohali (SAS Nagar), Punjab and Chandigarh, India' },
      { Metric: 'Total Records Evaluated', Value: report.totalRecords },
      { Metric: 'Valid Active Records', Value: report.validRecords },
      { Metric: 'Chandigarh Records Count', Value: report.chandigarhCount },
      { Metric: 'Mohali Records Count', Value: report.mohaliCount },
      { Metric: 'Verified Real Businesses', Value: report.verifiedRealCount },
      { Metric: 'Unverified Records', Value: report.unverifiedCount },
      { Metric: 'Duplicates Detected & Removed', Value: report.duplicateCount },
      { Metric: 'Disallowed Area Records Blocked', Value: report.disallowedLocationsRemoved.length },
      { Metric: 'Categories Standardized', Value: report.categoriesStandardized },
      { Metric: 'Data Health Score', Value: `${report.healthScore}%` }
    ];
    const wsAudit = XLSX.utils.json_to_sheet(auditRows);
    XLSX.utils.book_append_sheet(wb, wsAudit, 'Data Quality Audit');
  }

  XLSX.writeFile(wb, filename);
}
