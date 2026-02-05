'use client';

import React from 'react';
import { SelectBragItem } from '@/db/schema';
import BragCard from './BragCard';

interface BragGridProps {
  items: SelectBragItem[];
}

const BragGrid = ({ items }: BragGridProps) => {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/30 rounded-full flex items-center justify-center mb-6">
          <span className="text-2xl text-indigo-400">+</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Your contribution wall is empty</h3>
        <p className="text-zinc-400 max-w-sm">Start building your legacy. Add your first contribution and watch your impact grow.</p>
      </div>
    );
  }

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
      {items.map((item) => (
        <div key={item.id} className="break-inside-avoid mb-4">
          <BragCard item={item} />
        </div>
      ))}
    </div>
  );
};

export default BragGrid;
