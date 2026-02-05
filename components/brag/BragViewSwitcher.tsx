'use client';

import React, { useState } from 'react';
import { SelectBragItem } from '@/db/schema';
import BragGrid from './BragGrid';
import BragTimeline from './BragTimeline';
import { LayoutGrid, GitBranch } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BragViewSwitcherProps {
  items: SelectBragItem[];
}

type ViewType = 'grid' | 'timeline';

const BragViewSwitcher = ({ items }: BragViewSwitcherProps) => {
  const [view, setView] = useState<ViewType>('grid');

  return (
    <div>
      {/* View Toggle */}
      <div className="flex items-center justify-center gap-2 mb-10">
        <div className="inline-flex items-center p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
          <button
            onClick={() => setView('grid')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200",
              view === 'grid' 
                ? "bg-indigo-600 text-white" 
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            )}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Wall</span>
          </button>
          <button
            onClick={() => setView('timeline')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200",
              view === 'timeline' 
                ? "bg-indigo-600 text-white" 
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            )}
          >
            <GitBranch className="w-4 h-4" />
            <span>Timeline</span>
          </button>
        </div>
      </div>

      {/* View Content */}
      <div>
        {view === 'grid' ? (
          <BragGrid items={items} />
        ) : (
          <BragTimeline items={items} />
        )}
      </div>
    </div>
  );
};

export default BragViewSwitcher;
