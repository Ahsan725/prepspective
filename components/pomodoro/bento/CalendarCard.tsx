'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

const CalendarCard = () => {
    // Mock days
    const days = [
        { label: 'Fri', date: 13, active: true },
        { label: 'Sat', date: 14, active: false },
        { label: 'Sun', date: 15, active: false },
        { label: 'Mon', date: 16, active: false },
        { label: 'Tue', date: 17, active: false },
    ];

  return (
    <div className="bg-zinc-900 text-white rounded-[2rem] p-6 shadow-sm col-span-3 md:col-span-1 md:row-span-1 min-h-[300px] flex flex-col">
       <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Calendar</h3>
            <button className="flex items-center gap-1 text-xs px-3 py-1 rounded-full border border-zinc-700 hover:bg-zinc-800 transition-colors">
                Today <ChevronDown className="w-3 h-3" />
            </button>
       </div>

       {/* Days Grid */}
       <div className="flex justify-between mb-8">
            {days.map((day, i) => (
                <div key={i} className={`flex flex-col items-center gap-2 p-2 rounded-xl min-w-[3rem] ${day.active ? 'bg-rose-900/40 text-rose-500' : 'text-zinc-400 hover:bg-zinc-800/50'}`}>
                    <span className="text-xs font-semibold">{day.label}</span>
                    <span className="text-lg font-bold">{day.date}</span>
                </div>
            ))}
       </div>

       {/* Stats Line */}
       <div className="flex items-center gap-4 text-xs font-medium text-zinc-400 mb-2">
            <span className="text-green-500">4 ↑</span>
            <span>0 →</span>
            <span>0 ↓</span>
            <span className="ml-auto text-white">3H 55M Focus</span>
       </div>
       {/* Small Progress Bar */}
       <div className="w-full h-1 bg-zinc-800 rounded-full mb-6 relative">
            <div className="absolute left-1/3 w-1/4 h-full bg-rose-500 rounded-full"/>
       </div>

        {/* Schedule Item */}
       <div className="flex-1 bg-gradient-to-br from-rose-900/60 to-rose-950/20 rounded-xl p-4 flex items-center gap-4 border border-rose-900/20 relative overflow-hidden group hover:border-rose-900/50 transition-colors">
            {/* Time labels */}
            <div className="flex flex-col justify-between text-[10px] text-zinc-500 font-mono h-24 py-1 absolute left-3 top-4">
                <span>9:00 AM</span>
                <span>10:00 AM</span>
                <span>11:00 AM</span>
            </div>
            {/* Event Block */}
            <div className="w-full ml-12 bg-rose-500/20 border border-rose-500/30 rounded-lg h-full flex items-center justify-center">
                <span className="text-rose-200 font-medium">Game Design</span>
            </div>
       </div>

    </div>
  );
};

export default CalendarCard;
