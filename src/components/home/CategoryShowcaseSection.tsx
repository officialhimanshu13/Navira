import React from 'react';
import { CATEGORY_SHOWCASE } from '../../data/marketplaceData';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface CategoryShowcaseSectionProps {
  onSelectCategory: (categoryQuery: string) => void;
}

export const CategoryShowcaseSection: React.FC<CategoryShowcaseSectionProps> = ({
  onSelectCategory,
}) => {
  return (
    <section className="py-20 relative bg-[#07172C]/30 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#19BDF0]/10 border border-[#19BDF0]/20 text-[#19BDF0] text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Commercial Sectors</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Explore Industry Categories
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Discover tailored website solutions and active client opportunities across all major business segments in Mohali and Chandigarh.
            </p>
          </div>
          <button
            onClick={() => onSelectCategory('All')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#19BDF0] hover:text-[#7DD3FC] transition-colors"
          >
            <span>View All Categories</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* 8 Category Visual Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORY_SHOWCASE.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.queryCategory)}
              className="group relative rounded-2xl overflow-hidden bg-[#0B1B33] border border-white/[0.08] hover:border-[#19BDF0]/50 transition-all duration-300 cursor-pointer shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Photo Banner with Aspect Ratio */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={cat.imageUrl}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B33] via-[#0B1B33]/40 to-transparent" />
                
                {/* Top Corner Badge */}
                <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 backdrop-blur-md text-white/80 group-hover:text-white group-hover:bg-[#19BDF0] group-hover:text-slate-950 transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>

                <div className="absolute bottom-2 left-3 right-3">
                  <span className="text-[10px] font-semibold text-[#19BDF0] bg-[#19BDF0]/15 px-2 py-0.5 rounded-full border border-[#19BDF0]/30 backdrop-blur-md">
                    {cat.opportunitiesCount}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#19BDF0] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Popular Features Chips */}
                <div className="mt-3 pt-3 border-t border-white/[0.06] flex flex-wrap gap-1">
                  {cat.popularFeatures.map((feat) => (
                    <span
                      key={feat}
                      className="text-[10px] bg-white/[0.04] text-slate-300 px-2 py-0.5 rounded-md border border-white/5"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

