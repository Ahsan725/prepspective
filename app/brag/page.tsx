import React from 'react';
import { getBragItems } from '@/lib/actions/brag-actions';
import BragViewSwitcher from '@/components/brag/BragViewSwitcher';
import { AddBragItem } from '@/components/brag/AddBragItem';
import BragStats from '@/components/brag/BragStats';
import ExportBragSheet from '@/components/brag/ExportBragSheet';
import { Trophy, TrendingUp, Zap } from 'lucide-react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function BragPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const items = await getBragItems();

  const impactCount = items.filter(i => i.category === 'Impact').length;
  const totalCount = items.length;

  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-32 pt-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 items-end">
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-full">
              <Zap className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Professional Brag Sheet</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Your Impact Wall
            </h1>
            <p className="text-zinc-400 text-lg max-w-xl">
              Build your legacy with data. Track wins, lead with evidence, and own your career growth.
            </p>
            
            <BragStats items={items} />

            {/* Export Buttons */}
            <ExportBragSheet items={items} />
          </div>

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

        {/* Separator */}
        <div className="w-full h-px bg-zinc-800 mb-8" />

        {/* View Switcher (Grid / Timeline) */}
        <BragViewSwitcher items={items} />
      </div>

      {/* Floating Action Button */}
      <AddBragItem />
    </main>
  );
}
