'use client';

import React, { useState } from 'react';
import { SelectBragItem } from '@/db/schema';
import { Trophy, Star, Lightbulb, TrendingUp, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import BragEntrySheet from './BragEntrySheet';

interface BragTimelineProps {
  items: SelectBragItem[];
}

const categoryConfig: Record<string, { icon: any; iconColor: string; bg: string; border: string }> = {
  Impact: { icon: TrendingUp, iconColor: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' },
  Leadership: { icon: Trophy, iconColor: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  Technical: { icon: Lightbulb, iconColor: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  Other: { icon: Star, iconColor: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
};

const CARD_HEIGHT = 'h-[180px]';

// Group items by year and month
const groupByYearMonth = (items: SelectBragItem[]) => {
  const groups: Record<string, SelectBragItem[]> = {};
  
  items.forEach(item => {
    const d = new Date(item.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  });

  return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]));
};

const TimelineCard = ({ item, isLeft }: { item: SelectBragItem; isLeft: boolean }) => {
  const [showSheet, setShowSheet] = useState(false);
  const config = categoryConfig[item.category] || categoryConfig.Other;
  const Icon = config.icon;

  return (
    <>
      <div
        onClick={() => setShowSheet(true)}
        className={cn(
          "w-full p-4 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors cursor-pointer",
          CARD_HEIGHT
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 mb-2">
            <div className={cn("p-1.5 rounded-lg border", config.bg, config.border)}>
              <Icon className={cn("w-3.5 h-3.5", config.iconColor)} />
            </div>
            {item.metric && (
              <span className={cn(
                "text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border truncate max-w-[80px]",
                config.bg, config.border, config.iconColor
              )}>
                {item.metric}
              </span>
            )}
          </div>

          <h4 className="text-sm font-bold text-white mb-1 line-clamp-2 leading-snug">{item.title}</h4>
          
          {item.description && (
            <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed flex-grow">{item.description}</p>
          )}

          <div className="flex items-center gap-1.5 text-zinc-600 mt-auto pt-2">
            <Calendar className="w-3 h-3" />
            <span className="text-[10px]">{new Date(item.date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      <BragEntrySheet item={item} open={showSheet} onOpenChange={setShowSheet} />
    </>
  );
};

const BragTimeline = ({ items }: BragTimelineProps) => {
  const grouped = groupByYearMonth(items);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/30 rounded-full flex items-center justify-center mb-6">
          <Calendar className="w-8 h-8 text-indigo-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No timeline yet</h3>
        <p className="text-zinc-400 max-w-sm">Start recording your wins and watch your career story unfold.</p>
      </div>
    );
  }

  let globalIndex = 0;

  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Central Timeline Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-800 -translate-x-0.5" />

      {grouped.map(([yearMonth, monthItems]) => {
        const d = new Date(yearMonth + '-01');
        const monthLabel = d.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

        return (
          <div key={yearMonth} className="mb-12">
            {/* Month Header */}
            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-indigo-500 ring-4 ring-zinc-950" />
              <div className="px-5 py-2 bg-zinc-900 border border-zinc-800 rounded-full z-10">
                <span className="text-sm font-semibold text-white">{monthLabel}</span>
              </div>
            </div>

            {/* Items for this month */}
            <div className="space-y-6">
              {monthItems.map((item) => {
                const isLeft = globalIndex % 2 === 0;
                globalIndex++;

                return (
                  <div key={item.id} className="relative flex items-start">
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 w-3 h-3 -translate-x-1/2 mt-[90px] rounded-full bg-zinc-700 ring-2 ring-zinc-950" />

                    {/* Left Side */}
                    <div className={cn("w-1/2 pr-6", !isLeft && "invisible")}>
                      {isLeft && <TimelineCard item={item} isLeft={true} />}
                    </div>

                    {/* Right Side */}
                    <div className={cn("w-1/2 pl-6", isLeft && "invisible")}>
                      {!isLeft && <TimelineCard item={item} isLeft={false} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BragTimeline;
