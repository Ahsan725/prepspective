'use client';

import React, { useState, useMemo } from 'react';
import { SelectBragItem } from '@/db/schema';
import BragGrid from './BragGrid';
import BragTimeline from './BragTimeline';
import BragFilterBar from './BragFilterBar';
import GoalProgress from './GoalProgress';
import { LayoutGrid, GitBranch, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

interface BragDashboardProps {
  items: SelectBragItem[];
}

type ViewType = 'grid' | 'timeline';

const BragDashboard = ({ items }: BragDashboardProps) => {
  const [view, setView] = useState<ViewType>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter Logic
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags?.toLowerCase().includes(searchQuery.toLowerCase()); // Search tags too
      
      const matchesCategory = selectedCategory ? item.category === selectedCategory : true;

      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Top Section: Goals Only (Heatmap removed) */}
      <div className="grid grid-cols-1 gap-6">
        <GoalProgress current={items.length} target={50} />
      </div>

      <div className="w-full h-px bg-zinc-800" />

      {/* Controls: Search, Filter, View Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <BragFilterBar 
            onSearch={setSearchQuery} 
            onFilterCategory={setSelectedCategory} 
            selectedCategory={selectedCategory} 
        />

        <div className="flex items-center gap-2 self-start md:self-auto min-w-fit">
            <div className="inline-flex items-center p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
            <button
                onClick={() => setView('grid')}
                className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-xs transition-all duration-200",
                view === 'grid' 
                    ? "bg-indigo-600 text-white" 
                    : "text-zinc-600 hover:text-white hover:bg-zinc-800"
                )}
            >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Wall</span>
            </button>
            <button
                onClick={() => setView('timeline')}
                className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-xs transition-all duration-200",
                view === 'timeline' 
                    ? "bg-indigo-600 text-white" 
                    : "text-zinc-600 hover:text-white hover:bg-zinc-800"
                )}
            >
                <GitBranch className="w-4 h-4" />
                <span className="hidden sm:inline">Timeline</span>
            </button>
            </div>
        </div>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
            key={view + filteredItems.length}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
        >
            {filteredItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center mb-4">
                        <Search className="w-6 h-6 text-zinc-600" />
                    </div>
                    <h3 className="text-zinc-400 font-medium">No matches found</h3>
                    <p className="text-zinc-600 text-sm mt-1">Try adjusting your filters</p>
                </div>
            ) : (
                view === 'grid' ? (
                <BragGrid items={filteredItems} />
                ) : (
                <BragTimeline items={filteredItems} />
                )
            )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BragDashboard;
