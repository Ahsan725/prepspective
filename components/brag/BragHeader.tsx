'use client';

import React from 'react';
import { motion } from 'framer-motion';
import BragStats from './BragStats';
import ExportBragSheet from './ExportBragSheet';
import { AddBragItem } from './AddBragItem';
import { SelectBragItem } from '@/db/schema';

interface BragHeaderProps {
  items: SelectBragItem[];
  totalCount: number;
  impactCount: number;
}

const BragHeader = ({ items, totalCount, impactCount }: BragHeaderProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 items-start">
      <motion.div
        className="lg:col-span-2 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="flex items-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="inline-block font-extrabold text-xs sm:text-sm lg:text-md text-indigo-700 tracking-wider bg-indigo-200 rounded-md px-2 py-0">
            PROFESSIONAL BRAG SHEET
          </h2>
        </motion.div>
        
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Your Impact Wall
        </motion.h1>

        <motion.p
          className="text-zinc-400 text-lg max-w-xl font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Build your legacy with data. Track wins, lead with evidence, and own your career growth.
        </motion.p>
        
        <BragStats items={items} />

        <div className="flex flex-wrap gap-4 mt-6">
          <AddBragItem />
          <ExportBragSheet items={items} />
        </div>
      </motion.div>

      <div className="flex flex-col gap-4">
        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors">
          <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-[0.2em] mb-1">Total</p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">{totalCount}</span>
            <span className="text-zinc-600 text-sm font-medium">contributions</span>
          </div>
        </div>

        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors">
          <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-[0.2em] mb-1">High Impact</p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">{impactCount}</span>
            <span className="text-zinc-600 text-sm font-medium">wins</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BragHeader;
