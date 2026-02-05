'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const ProgressCard = () => {
    // Mock heatmap data
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const intensity = [
        [0, 1, 3, 2, 4, 1, 2], // Row 1
        [3, 3, 1, 3, 3, 3, 2], // Row 2
        [1, 2, 4, 3, 3, 4, 1], // Row 3
        [3, 3, 1, 2, 2, 2, 3], // Row 4
    ];

    const getColor = (val: number) => {
        if (val === 0) return 'bg-rose-100 dark:bg-rose-950/30';
        if (val === 1) return 'bg-rose-300 dark:bg-rose-800/50';
        if (val === 2) return 'bg-rose-400 dark:bg-rose-600/60';
        if (val === 3) return 'bg-rose-500 dark:bg-rose-500/80';
        return 'bg-rose-600 dark:bg-rose-400';
    }

  return (
    <div className="bg-zinc-900 text-white rounded-[2rem] p-6 shadow-sm col-span-3 md:col-span-1 min-h-[220px]">
       <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Progress Report</h3>
             <button className="flex items-center gap-1 text-xs px-3 py-1 rounded-full border border-zinc-700 hover:bg-zinc-800 transition-colors">
                Weekly <ChevronDown className="w-3 h-3" />
            </button>
       </div>
        
        {/* Heatmap Grid */}
        <div className="flex flex-col gap-2">
            <div className="flex justify-between text-[10px] text-zinc-500 uppercase tracking-widest px-1">
                {days.map(d => <span key={d}>{d}</span>)}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
                {intensity.flat().map((val, i) => (
                    <div 
                        key={i} 
                        className={cn(
                            "aspect-square rounded-md transition-all duration-300 hover:scale-110 cursor-pointer",
                            getColor(val)
                        )} 
                        title={`Activity level: ${val}`}
                    />
                ))}
            </div>
        </div>
    </div>
  );
};

export default ProgressCard;
