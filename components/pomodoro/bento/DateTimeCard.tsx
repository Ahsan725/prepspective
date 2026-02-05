'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';

const DateTimeCard = () => {
    const [date, setDate] = useState<Date | null>(null);

    useEffect(() => {
        setDate(new Date());
        const timer = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (!date) return <div className="bg-zinc-900 rounded-[2rem] w-full h-full min-h-[220px] animate-pulse"></div>;

    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateString = date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="bg-zinc-900 text-white rounded-[2rem] p-6 flex flex-col justify-center items-center shadow-sm w-full h-full min-h-[220px]">
        <div className="flex flex-col items-center gap-2">
            <span className="text-zinc-400 text-sm font-medium uppercase tracking-widest flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Today
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-center text-zinc-100 mt-1">
                {dateString}
            </h2>
        </div>

        <div className="my-6 w-16 h-[1px] bg-zinc-800"></div>

        <div className="flex flex-col items-center gap-1">
             <span className="text-zinc-500 text-xs font-medium uppercase tracking-widest flex items-center gap-2">
                <Clock className="w-3 h-3" /> Current Time
            </span>
            <div className="text-5xl md:text-6xl font-bold text-indigo-500 tracking-tighter">
                {timeString}
            </div>
        </div>
    </div>
  );
};

export default DateTimeCard;
