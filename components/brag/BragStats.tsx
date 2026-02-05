'use client';

import React from 'react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';
import { SelectBragItem } from '@/db/schema';

interface BragStatsProps {
  items: SelectBragItem[];
}

const BragStats = ({ items }: BragStatsProps) => {
  // Group items by month
  const dataMap: Record<string, number> = {};
  
  // Initialize last 6 months
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleDateString(undefined, { month: 'short' });
    dataMap[label] = 0;
  }

  items.forEach(item => {
    const d = new Date(item.date);
    const label = d.toLocaleDateString(undefined, { month: 'short' });
    if (dataMap[label] !== undefined) {
      dataMap[label] += 1;
    }
  });

  const chartData = Object.entries(dataMap).map(([name, total]) => ({
    name,
    total,
  }));

  return (
    <div className="w-full h-24 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#71717a' }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', fontSize: '12px' }}
            itemStyle={{ color: '#a5b4fc' }}
            labelStyle={{ color: '#fff' }}
            cursor={{ stroke: '#3730a3', strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#6366f1"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorTotal)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BragStats;
