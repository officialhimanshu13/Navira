import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import { BusinessRecord } from '../types/business';
import { PieChart as PieIcon, BarChart2, MapPin, Activity, Info } from 'lucide-react';

interface ChartsSectionProps {
  businesses: BusinessRecord[];
}

const STATUS_COLORS = {
  Found: '#34d399',
  'Not Found': '#fb7185',
  Unclear: '#fbbf24'
};

export const ChartsSection: React.FC<ChartsSectionProps> = ({ businesses }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'category' | 'locality' | 'city' | 'scatter'>('overview');

  // 1. Doughnut chart data: Website Status
  const statusCounts = {
    Found: businesses.filter((b) => b.websiteStatus === 'Found').length,
    'Not Found': businesses.filter((b) => b.websiteStatus === 'Not Found').length,
    Unclear: businesses.filter((b) => b.websiteStatus === 'Unclear').length
  };

  const total = businesses.length || 1;

  const pieData = [
    { name: 'Website Found', value: statusCounts.Found, status: 'Found', pct: ((statusCounts.Found / total) * 100).toFixed(1) },
    { name: 'Website Not Found', value: statusCounts['Not Found'], status: 'Not Found', pct: ((statusCounts['Not Found'] / total) * 100).toFixed(1) },
    { name: 'Unclear Status', value: statusCounts.Unclear, status: 'Unclear', pct: ((statusCounts.Unclear / total) * 100).toFixed(1) }
  ];

  // 2. Stacked Bar Chart data: Website Status by Category
  const categoryMap: Record<string, { Found: number; 'Not Found': number; Unclear: number; total: number }> = {};
  businesses.forEach((b) => {
    if (!categoryMap[b.category]) {
      categoryMap[b.category] = { Found: 0, 'Not Found': 0, Unclear: 0, total: 0 };
    }
    categoryMap[b.category][b.websiteStatus]++;
    categoryMap[b.category].total++;
  });

  const categoryData = Object.entries(categoryMap)
    .map(([category, counts]) => ({
      category,
      Found: counts.Found,
      'Not Found': counts['Not Found'],
      Unclear: counts.Unclear,
      total: counts.total
    }))
    .sort((a, b) => b['Not Found'] - a['Not Found']);

  // 3. Bar Chart data: Businesses by Locality
  const localityMap: Record<string, { Found: number; 'Not Found': number; Unclear: number; total: number }> = {};
  businesses.forEach((b) => {
    if (!localityMap[b.locality]) {
      localityMap[b.locality] = { Found: 0, 'Not Found': 0, Unclear: 0, total: 0 };
    }
    localityMap[b.locality][b.websiteStatus]++;
    localityMap[b.locality].total++;
  });

  const localityData = Object.entries(localityMap)
    .map(([locality, counts]) => ({
      locality,
      Found: counts.Found,
      'Not Found': counts['Not Found'],
      Unclear: counts.Unclear,
      total: counts.total
    }))
    .sort((a, b) => b.total - a.total);

  // 4. City-wise comparison (Chandigarh vs Mohali)
  const cityMap: Record<string, { Found: number; 'Not Found': number; Unclear: number; total: number }> = {};
  businesses.forEach((b) => {
    const c = b.city || 'Chandigarh';
    if (!cityMap[c]) {
      cityMap[c] = { Found: 0, 'Not Found': 0, Unclear: 0, total: 0 };
    }
    cityMap[c][b.websiteStatus]++;
    cityMap[c].total++;
  });

  const cityData = Object.entries(cityMap).map(([city, counts]) => ({
    city,
    Found: counts.Found,
    'Not Found': counts['Not Found'],
    Unclear: counts.Unclear,
    total: counts.total,
    noWebPct: ((counts['Not Found'] / (counts.total || 1)) * 100).toFixed(1)
  }));

  // 5. Scatter Plot data: Rating vs Review Count
  const scatterData = businesses.map((b) => ({
    name: b.businessName,
    category: b.category,
    city: b.city,
    locality: b.locality,
    rating: b.rating,
    reviews: b.reviewCount,
    status: b.websiteStatus,
    score: b.opportunityScore
  }));

  // Custom tooltips
  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white text-xs p-2.5 rounded-lg shadow-xl border border-slate-700">
          <p className="font-semibold">{data.name}</p>
          <p className="text-slate-300 mt-1">
            Count: <span className="text-white font-bold">{data.value}</span> ({data.pct}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white text-xs p-3 rounded-lg shadow-xl border border-slate-700">
          <p className="font-semibold text-slate-100">{label}</p>
          <div className="mt-1.5 space-y-1">
            {payload.map((item: any) => (
              <div key={item.name} className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}:
                </span>
                <span className="font-semibold text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomScatterTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white text-xs p-3 rounded-lg shadow-xl border border-slate-700 max-w-xs">
          <p className="font-bold text-white text-sm">{data.name}</p>
          <p className="text-teal-400 mt-0.5">{data.category}</p>
          <div className="mt-2 space-y-1 text-slate-300">
            <p>Rating: <span className="font-semibold text-white">{data.rating}★</span></p>
            <p>Reviews: <span className="font-semibold text-white">{data.reviews}</span></p>
            <p>Status: <span className={`font-semibold ${data.status === 'Not Found' ? 'text-rose-400' : data.status === 'Found' ? 'text-emerald-400' : 'text-amber-400'}`}>{data.status}</span></p>
            <p>Opportunity Score: <span className="font-bold text-amber-300">{data.score} / 10</span></p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Charts Navigation Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-700/40 pb-3">
        <div className="flex items-center gap-1 sm:gap-1.5 bg-slate-800/60 p-1 rounded-xl border border-slate-700/50">
          <button
            onClick={() => setActiveTab('overview')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-slate-700 text-slate-100 shadow-sm'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5" />
            <span>Overview & Category</span>
          </button>

          <button
            onClick={() => setActiveTab('category')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'category'
                ? 'bg-slate-700 text-slate-100 shadow-sm'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Category Deep Dive</span>
          </button>

          <button
            onClick={() => setActiveTab('locality')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'locality'
                ? 'bg-slate-700 text-slate-100 shadow-sm'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Locality Distribution</span>
          </button>

          <button
            onClick={() => setActiveTab('city')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'city'
                ? 'bg-slate-700 text-slate-100 shadow-sm'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Chandigarh vs. Mohali</span>
          </button>

          <button
            onClick={() => setActiveTab('scatter')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'scatter'
                ? 'bg-slate-700 text-slate-100 shadow-sm'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Rating vs. Reviews Matrix</span>
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Found
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" /> Not Found
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Unclear
          </span>
        </div>
      </div>

      {/* Tab 1: Overview Grid (Doughnut + Stacked Bar Category) */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Doughnut Chart: Overall Website Status */}
          <div className="lg:col-span-5 bg-slate-900/60 backdrop-blur-sm p-5 rounded-2xl border border-slate-700/50 flex flex-col">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-100">Website Presence Distribution</h3>
                <p className="text-xs text-slate-500 mt-0.5">Proportion of researched businesses by website verification state</p>
              </div>
              <Info className="w-4 h-4 text-slate-400" />
            </div>

            <div className="h-64 my-auto relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry) => (
                      <Cell
                        key={`cell-${entry.name}`}
                        fill={STATUS_COLORS[entry.status as keyof typeof STATUS_COLORS]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              {/* Center text in donut */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-extrabold text-rose-300">{statusCounts['Not Found']}</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-rose-400">No Website</span>
              </div>
            </div>

            {/* Legend / Metrics summary */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-700/40 text-center">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <span className="block text-[11px] font-medium text-emerald-400">Found</span>
                <span className="text-base font-bold text-emerald-400">{statusCounts.Found}</span>
                <span className="block text-[10px] text-emerald-500 font-semibold">{pieData[0].pct}%</span>
              </div>
              <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <span className="block text-[11px] font-medium text-rose-400">Not Found</span>
                <span className="text-base font-bold text-rose-400">{statusCounts['Not Found']}</span>
                <span className="block text-[10px] text-rose-500 font-semibold">{pieData[1].pct}%</span>
              </div>
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <span className="block text-[11px] font-medium text-amber-400">Unclear</span>
                <span className="text-base font-bold text-amber-400">{statusCounts.Unclear}</span>
                <span className="block text-[10px] text-amber-500 font-semibold">{pieData[2].pct}%</span>
              </div>
            </div>
          </div>

          {/* Stacked Bar Chart: Website Status by Category */}
          <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-sm p-5 rounded-2xl border border-slate-700/50 flex flex-col">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-100">Website Presence by Business Category</h3>
                <p className="text-xs text-slate-500 mt-0.5">Comparison of online presence across key commercial sectors</p>
              </div>
              <span className="text-xs text-slate-500 font-medium">{categoryData.length} categories</span>
            </div>

            <div className="h-72 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryData}
                  layout="vertical"
                  margin={{ top: 10, right: 20, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1e293b" />
                  <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <YAxis
                    type="category"
                    dataKey="category"
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    width={130}
                  />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px', color: '#94a3b8' }} />
                  <Bar dataKey="Not Found" stackId="a" fill={STATUS_COLORS['Not Found']} name="Website Not Found" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="Unclear" stackId="a" fill={STATUS_COLORS['Unclear']} name="Unclear Status" />
                  <Bar dataKey="Found" stackId="a" fill={STATUS_COLORS['Found']} name="Website Found" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Category Deep Dive */}
      {activeTab === 'category' && (
        <div className="bg-slate-900/60 backdrop-blur-sm p-5 rounded-2xl border border-slate-700/50">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-100">Full Category Comparison</h3>
            <p className="text-xs text-slate-500">Examines which local industries exhibit the largest digital presence deficits</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                margin={{ top: 10, right: 20, left: 10, bottom: 35 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis 
                  dataKey="category" 
                  angle={-20} 
                  textAnchor="end" 
                  interval={0} 
                  tick={{ fontSize: 11, fill: '#94a3b8' }} 
                />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip content={<CustomBarTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px', color: '#94a3b8' }} />
                <Bar dataKey="Not Found" fill={STATUS_COLORS['Not Found']} name="Website Not Found" />
                <Bar dataKey="Unclear" fill={STATUS_COLORS['Unclear']} name="Unclear Status" />
                <Bar dataKey="Found" fill={STATUS_COLORS['Found']} name="Website Found" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Tab 3: Locality Distribution */}
      {activeTab === 'locality' && (
        <div className="bg-slate-900/60 backdrop-blur-sm p-5 rounded-2xl border border-slate-700/50">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-100">Business Distribution & Digital Status by Locality</h3>
            <p className="text-xs text-slate-500">Commercial clusters surveyed across Mohali and Chandigarh</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={localityData}
                margin={{ top: 10, right: 20, left: 10, bottom: 45 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="locality" angle={-25} textAnchor="end" interval={0} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip content={<CustomBarTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px', color: '#94a3b8' }} />
                <Bar dataKey="Not Found" stackId="a" fill={STATUS_COLORS['Not Found']} name="Website Not Found" />
                <Bar dataKey="Unclear" stackId="a" fill={STATUS_COLORS['Unclear']} name="Unclear" />
                <Bar dataKey="Found" stackId="a" fill={STATUS_COLORS['Found']} name="Website Found" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Tab 4: City Comparison (Chandigarh vs Mohali) */}
      {activeTab === 'city' && (
        <div className="bg-slate-900/60 backdrop-blur-sm p-5 rounded-2xl border border-slate-700/50">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-100">City-Level Digital Presence Comparison</h3>
              <p className="text-xs text-slate-500">Direct comparative evaluation of businesses in Chandigarh vs. Mohali</p>
            </div>
            <div className="text-xs bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 px-3 py-1 rounded-lg font-medium">
              Study Area Lock: Mohali & Chandigarh
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {cityData.map((cd) => (
              <div key={cd.city} className="p-4 rounded-xl border border-slate-700/50 bg-slate-800/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-100 text-sm">{cd.city}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-700/60 text-slate-300">
                    {cd.total} Businesses
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <span className="block text-[10px] text-emerald-400">Found</span>
                    <span className="font-bold text-emerald-400 text-sm">{cd.Found}</span>
                  </div>
                  <div className="p-2 bg-rose-500/10 rounded-lg border border-rose-500/20">
                    <span className="block text-[10px] text-rose-400">Not Found</span>
                    <span className="font-bold text-rose-400 text-sm">{cd['Not Found']}</span>
                  </div>
                  <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <span className="block text-[10px] text-amber-400">Unclear</span>
                    <span className="font-bold text-amber-400 text-sm">{cd.Unclear}</span>
                  </div>
                </div>
                <div className="mt-3 text-xs text-slate-500 flex justify-between items-center border-t border-slate-700/40 pt-2">
                  <span>Digital Gap Rate:</span>
                  <strong className="text-rose-400">{cd.noWebPct}% no website</strong>
                </div>
              </div>
            ))}
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={cityData}
                margin={{ top: 10, right: 30, left: 20, bottom: 15 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="city" tick={{ fontSize: 12, fontWeight: 'bold', fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip content={<CustomBarTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px', color: '#94a3b8' }} />
                <Bar dataKey="Not Found" fill={STATUS_COLORS['Not Found']} name="Website Not Found" />
                <Bar dataKey="Unclear" fill={STATUS_COLORS['Unclear']} name="Unclear" />
                <Bar dataKey="Found" fill={STATUS_COLORS['Found']} name="Website Found" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Tab 5: Scatter Plot (Rating vs Review Count) */}
      {activeTab === 'scatter' && (
        <div className="bg-slate-900/60 backdrop-blur-sm p-5 rounded-2xl border border-slate-700/50">
          <div className="mb-2 flex items-start justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-100">Customer Engagement Matrix: Rating vs. Review Count</h3>
              <p className="text-xs text-slate-500">
                Identifies established, high-reputation businesses (high rating & high review volume) currently lacking an official website
              </p>
            </div>
            <div className="text-xs bg-slate-800/60 border border-slate-700/50 p-2 rounded-xl text-slate-400 max-w-sm">
              <span className="font-semibold text-rose-400">Red dots in top-right:</span> Prime candidates for digital conversion funnels.
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  type="number"
                  dataKey="rating"
                  name="Rating"
                  domain={[3.5, 5.0]}
                  unit="★"
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                  label={{ value: 'Public Google Maps Rating (Stars)', position: 'insideBottom', offset: -10, fontSize: 11, fill: '#64748b' }}
                />
                <YAxis
                  type="number"
                  dataKey="reviews"
                  name="Reviews"
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                  label={{ value: 'Review Count', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#64748b' }}
                />
                <ZAxis range={[50, 150]} />
                <Tooltip content={<CustomScatterTooltip />} />
                <Scatter
                  name="Businesses"
                  data={scatterData}
                >
                  {scatterData.map((entry, index) => (
                    <Cell
                      key={`scatter-cell-${index}`}
                      fill={STATUS_COLORS[entry.status as keyof typeof STATUS_COLORS]}
                      opacity={0.85}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};
