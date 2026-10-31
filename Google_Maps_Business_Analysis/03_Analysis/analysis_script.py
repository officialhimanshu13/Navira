"""
Google Maps Business Analysis - Automated Analysis Script
Permanent Study Area: Mohali & Chandigarh, India
"""
import os
import pandas as pd

def run_analysis(csv_path=None):
    if csv_path is None:
        base = os.path.dirname(os.path.abspath(__file__))
        csv_path = os.path.join(base, "..", "02_Clean_Data", "business_analysis_clean.csv")
    df = pd.read_csv(csv_path)
    total = len(df)
    print(f"=== Study Area: Mohali & Chandigarh Analysis ({total} Businesses) ===")
    
    print("\n1. City Distribution:")
    for city, count in df["City"].value_counts().items():
        print(f"   {city}: {count} ({count/total*100:.1f}%)")
        
    print("\n2. Website Verification Status:")
    for status, count in df["Website Verification Status"].value_counts().items():
        print(f"   {status}: {count} ({count/total*100:.1f}%)")
        
    print("\n3. Top 5 High-Opportunity Businesses:")
    top5 = df.sort_values(by=["Opportunity Score (0-10)", "Review Count"], ascending=[False, False]).head(5)
    for _, row in top5.iterrows():
        print(f"   - {row['Business Name']} ({row['City']} - {row['Locality']} | {row['Business Category']}): Score {row['Opportunity Score (0-10)']}/10, {row['Public Rating']}★ ({row['Review Count']} reviews)")

if __name__ == "__main__":
    run_analysis()
