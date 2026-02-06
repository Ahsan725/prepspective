'use client';

import React from 'react';
import { SelectBragItem } from '@/db/schema';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface BragHeatmapProps {
  items: SelectBragItem[];
}

const BragHeatmap = ({ items }: BragHeatmapProps) => {
  // Generate last 365 days (52 weeks)
  const today = new Date();
  const days: Date[] = [];
  const contributions: Record<string, number> = {};

  // Initialize map
  items.forEach(item => {
    const key = item.date.split('T')[0];
    contributions[key] = (contributions[key] || 0) + 1;
  });

  // Calculate start date (52 weeks ago, starting on Sunday)
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 365);
  while (startDate.getDay() !== 0) {
    startDate.setDate(startDate.getDate() - 1);
  }

  // Generate grid
  for (let i = 0; i < 365 + today.getDay(); i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    days.push(d);
  }

  // Weeks grouping
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];
  days.forEach(day => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  if (currentWeek.length > 0) weeks.push(currentWeek);

  const getColor = (count: number) => {
    if (count === 0) return 'bg-zinc-900 border-zinc-800';
    if (count === 1) return 'bg-indigo-900/40 border-indigo-900/60';
    if (count <= 3) return 'bg-indigo-700/60 border-indigo-700/80';
    return 'bg-indigo-500 border-indigo-400';
  };

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="min-w-[800px]">
        {/* Months Label */}
        <div className="flex text-[10px] text-zinc-500 mb-2 gap-[14px] pl-8">
            {/* Simplified for now, just static months or dynamic based on weeks */}
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                <span key={m} className="flex-1">{m}</span>
            ))}
        </div>

        <div className="flex gap-1">
          {/* Day Labels */}
          <div className="flex flex-col gap-1 text-[9px] text-zinc-600 mr-2 pt-2">
            <span className="h-2">Mon</span>
            <span className="h-2 mt-3">Wed</span>
            <span className="h-2 mt-3">Fri</span>
          </div>

          <div className="flex gap-1 flex-1">
            {weeks.map((week, i) => (
              <div key={i} className="flex flex-col gap-1">
                {week.map((day, j) => {
                    const key = day.toISOString().split('T')[0];
                    const count = contributions[key] || 0;
                    return (
                        <TooltipProvider key={key} delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div 
                                        className={cn(
                                            "w-2.5 h-2.5 rounded-[2px] border transition-colors",
                                            getColor(count)
                                        )}
                                    />
                                </TooltipTrigger>
                                <TooltipContent side="top" className="text-xs bg-zinc-800 border-zinc-700 text-white">
                                    {count} contributions on {day.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BragHeatmap;
