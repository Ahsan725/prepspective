import React from 'react';
import { getBragItems } from '@/lib/actions/brag-actions';
import BragDashboard from '@/components/brag/BragDashboard';
import { AddBragItem } from '@/components/brag/AddBragItem';
import BragHeader from '@/components/brag/BragHeader';
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
        {/* Animated Header Section (Client Component) */}
        <BragHeader items={items} totalCount={totalCount} impactCount={impactCount} />
        
        {/* Main Dashboard (Search, Grid/Timeline) */}
        <BragDashboard items={items} />
      </div>

      {/* Floating Action Button - Removed and moved to Header */}
    </main>
  );
}
