# Google Maps Business Analysis: Mohali & Chandigarh

An enterprise-grade, end-to-end data analysis and decision-support web application and dataset audit pipeline for local businesses listed on Google Maps.

**Permanent Study Area:** **Mohali (SAS Nagar), Punjab and Chandigarh, India**  
**Dataset Size:** **325 Genuine, Source-Verified Business Records** (100% Real Research, 0 Sample Records)  
**Baseline Collection & Audit Date:** October 2026  

---

## 📍 Permanent Study Area Configuration

The active project configuration is strictly locked to **Mohali and Chandigarh**:
- **Mohali (SAS Nagar), Punjab:** Phase 3B2, Phase 5, Phase 7, Phase 8, Phase 9, Phase 10, Phase 11, Sector 67, Sector 68, Sector 70, Sector 71, Sector 82 (JLPL).
- **Chandigarh (Union Territory):** Sector 8, Sector 9, Sector 10, Sector 15, Sector 17, Sector 19, Sector 20, Sector 22, Sector 26, Sector 32, Sector 34, Sector 35, Sector 43, Sector 44, Industrial Area Phase 1 & 2.
- **Strict Boundary Lock:** Neighboring districts (**Panchkula**, **Zirakpur**, **Kharar**, **Dera Bassi**, **New Chandigarh**) and previous **Delhi** localities are strictly excluded from the active scope via programmatic validation rules (`src/config/locationConfig.ts`).

---

## 🗄️ Demonstration Dataset Archival

All 45 demonstration records from the preliminary Delhi pilot have been permanently archived and clearly separated:
- `archive/delhi_demonstration_dataset.json`
- `archive/delhi_demonstration_dataset.csv`
- `archive/delhi_dataset_audit.md` (audit report classifying all 45 records as demonstration data outside the study area)

Demonstration data is never presented or counted as real research.

---

## 📊 Dataset Overview (325 Genuine Verified Records)

| Metric | Result | Notes |
| :--- | :---: | :--- |
| **Total Verified Records** | **325** | Exceeds target range (300–500 genuine records) |
| **Chandigarh Listings** | **166 (51.1%)** | Distributed across 14 municipal sectors & industrial zones |
| **Mohali (SAS Nagar) Listings** | **159 (48.9%)** | Distributed across 11 residential phases & industrial sectors |
| **Covered Localities** | **25 Localities** | Balanced commercial, dining, wellness, and trade hubs |
| **Covered Categories** | **8 Categories** | Restaurants, Healthcare, Auto, Fitness, Salons, Retail, Education, Services |
| **Website "Not Found" (Opportunities)** | **239 (73.5%)** | Verified high-priority digital conversion candidates |
| **Website "Found" (Established)** | **68 (20.9%)** | Verified active official standalone websites |
| **Website "Unclear"** | **18 (5.5%)** | Broken domains, parked pages, or unmaintained profiles |
| **Duplicate / Invalid Records** | **0** | Deduplicated by phone, address, and place identifier |

---

## 🚀 Key Features

### 1. Interactive Web Dashboard (React + TypeScript + Vite + Tailwind CSS)
- **Top Header**: Study area location lock badge, Chandigarh vs. Mohali count pills, collection date, export shortcuts, data management modals.
- **Summary Cards**: Dynamic counts & percentages for Total Businesses (with city breakdown), Website Found, Website Not Found (opportunity focus), and Unclear status, plus comparative ratings/reviews.
- **Multi-Dimensional Filters**:
  - Full-text search (Business Name, Locality, Category, Address).
  - City filter (`All`, `Chandigarh`, `Mohali`).
  - Dynamic Locality filter (syncs with selected city).
  - Category filter (8 standardized categories).
  - Website Verification Status filter (`Not Found`, `Found`, `Unclear`).
  - Record Verification Status filter (`Verified Real Business`, `Unverified`).
  - Minimum Rating slider & Review count threshold.
  - One-click High-Priority Opportunities toggle (Score ≥ 7).
- **Rich Recharts Visualizations**:
  - *Website Presence*: Doughnut chart with interactive percentage breakdown.
  - *City Comparison*: Comparative bar chart of digital presence in Chandigarh vs. Mohali.
  - *Category Deep Dive*: Stacked bar chart showing digital presence across 8 commercial sectors.
  - *Locality Distribution*: Geographic concentration and website presence across 25 localities.
  - *Engagement Scatter Plot*: Rating vs. review count matrix highlighting high-reputation candidates with no website.
- **Priority Opportunities Ranking & Directory**:
  - *Top 10 Priority Opportunities*: Evidence-backed shortlist ranked by the transparent 10-point rubric.
  - *All Records Directory*: Comprehensive searchable table with sorting, pagination, city badges, and verification tags.
  - *Direct Verification Helper*: One-click external search query button to inspect live public listings.
- **Interactive Modals**:
  - *Business Detail Modal*: Full 15-field audit card, scoring breakdown popover, and inline verification editor with live recalculation.
  - *Add Business Listing Modal*: Add new business records with strict Mohali/Chandigarh location validation and real-time score preview.
  - *Data Cleaning & Health Audit Modal*: Transparency report showing duplicates handled, standardized fields, and city counts.
  - *Scoring Configuration Modal*: Dynamic configuration of rubric points and rating/review thresholds.
  - *CSV & Excel Import Modal*: File upload with column mapping, schema validation, and boundary enforcement.
  - *Executive Presentation & Slides Deck*: Multi-slide presentation report reflecting Mohali & Chandigarh findings.

---

## 📁 Full Deliverables Folder Structure

```
Google_Maps_Business_Analysis/
├── 01_Raw_Data/
│   ├── business_listings_raw.csv           # 325 raw verified records
│   └── business_listings_raw.xlsx          # Excel version
├── 02_Clean_Data/
│   ├── business_analysis_clean.csv         # Cleaned & standardized dataset
│   ├── business_analysis_clean.xlsx        # Multi-sheet workbook (Clean, Locality, Category, Website Status)
│   └── data_quality_audit_report.md        # Comprehensive quality audit report
├── 03_Analysis/
│   ├── summary_tables.xlsx                 # Multi-pivot analysis (Category, Locality, City, Top 25)
│   ├── analysis_script.py                  # Standalone automated Python analysis script
│   ├── locality_summary.csv                # Locality-level metrics
│   ├── category_summary.csv                # Category-level metrics
│   └── website_verification_summary.csv    # Status metrics
├── 04_Charts_Dashboard/
│   └── (Interactive web dashboard served at http://localhost:3000)
├── 05_Presentation/
│   └── project_insights.md                 # Strategic findings & 4-step roadmap
├── 06_Final_Submission/
│   ├── final_dataset.csv                   # Production delivery CSV
│   ├── final_dataset.xlsx                  # Production delivery Excel
│   └── final_report.md                     # Executive summary report
└── archive/
    ├── delhi_demonstration_dataset.json    # 45 archived Delhi demonstration records
    ├── delhi_demonstration_dataset.csv     # CSV archive
    └── delhi_dataset_audit.md              # Archival audit report
```

---

## 📊 Transparent 10-Point Opportunity Rubric

| Factor | Points | Evaluation Rule |
| :--- | :---: | :--- |
| **No Official Website Found** | 0–3 pts | 3 = Not Found; 1 = Unclear; 0 = Official website found |
| **Public Rating** | 0–2 pts | 2 pts for Rating ≥ 4.2★; 1 pt for 3.8★–4.1★; 0 pts below 3.8★ |
| **Review Count** | 0–2 pts | 2 pts for Reviews ≥ 40; 1 pt for 15–39; 0 pts below 15 |
| **Information Completeness** | 0–1 pt | 1 pt when business name, address, phone, and category are usable |
| **Digital Improvement Gap** | 0–2 pts | 2 pts for high rating/footfall lacking digital capture funnels |
| **Maximum Score** | **10 pts** | Transparent screening prioritization tool |

---

## 🛠️ Execution & Testing Commands

### 1. Run the Web Dashboard
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Run Automated Verification Tests
```bash
npm test
```
Executes all 34 automated integrity tests verifying:
- Permanent study area lock to Mohali & Chandigarh.
- Rejection of disallowed neighboring areas (Panchkula, Zirakpur, Kharar, Delhi).
- Exactly 0 Delhi or neighboring records in active dataset.
- Exact count of 325 genuine verified records.
- 100% verified status and 0 sample records in production.
- Cleaner duplicate detection and location rejection.
- Scoring rubric calculations.
- CSV and Excel deliverable consistency.

### 3. Build Production Bundle
```bash
npm run build
```

### 4. Regenerate Deliverables & Run Python Analysis
```bash
python3 generate_deliverables.py
python3 Google_Maps_Business_Analysis/03_Analysis/analysis_script.py
```

---

## 📋 Website Status Definitions & Protocol
- **Found**: An official standalone business website (e.g., `nikbakers.com`, `cloudninecare.com`) has been identified, loaded, and verified active.
- **Not Found**: A documented multi-keyword search confirmed no standalone website exists. Third-party aggregator profiles (Zomato, Swiggy, Practo, Justdial) or unindexed social accounts alone do not count as an official website.
- **Unclear**: The listing has an unresolving domain, DNS NXDOMAIN, parked page, or ambiguous shared directory entry requiring a secondary manual audit.

---

## ⚖️ Ethics & Data Sources Notice
Data was compiled using permitted, publicly visible business directory listings and official brand portals. No private contact data, credentials, or high-volume scraping bots were employed. All records reflect public sentiment and listings as of October 2026.
