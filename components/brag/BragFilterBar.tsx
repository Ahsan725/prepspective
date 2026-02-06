'use client';

import React, { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BragFilterBarProps {
  onSearch: (query: string) => void;
  onFilterCategory: (category: string | null) => void;
  selectedCategory: string | null;
}

const categories = ['Impact', 'Leadership', 'Technical', 'Other'];

const BragFilterBar = ({ onSearch, onFilterCategory, selectedCategory }: BragFilterBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      {/* Search Input */}
      <div className="relative flex-1 group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
        <input 
          placeholder="Search items, tags, or descriptions..." 
          onChange={(e) => onSearch(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-zinc-600"
        />
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
        <button
            onClick={() => onFilterCategory(null)}
            className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all whitespace-nowrap",
                selectedCategory === null 
                    ? "bg-indigo-600 text-white border-indigo-500" 
                    : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
            )}
        >
            All
        </button>
        {categories.map(cat => (
             <button
                key={cat}
                onClick={() => onFilterCategory(cat === selectedCategory ? null : cat)}
                className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all whitespace-nowrap",
                    selectedCategory === cat 
                        ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50" 
                        : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
                )}
            >
                {cat}
            </button>
        ))}
      </div>
    </div>
  );
};

export default BragFilterBar;
