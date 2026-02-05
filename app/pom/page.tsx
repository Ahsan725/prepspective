'use client';

import React from 'react';
import { usePomodoro } from '@/hooks/usePomodoro';
import AnalogTimerCard from '@/components/pomodoro/bento/AnalogTimerCard';
import CalendarCard from '@/components/pomodoro/bento/CalendarCard';
import MusicCard from '@/components/pomodoro/bento/MusicCard';
import DateTimeCard from '@/components/pomodoro/bento/DateTimeCard';
import ProgressCard from '@/components/pomodoro/bento/ProgressCard';
import LuxTodoList from '@/components/pomodoro/LuxTodoList';

const BentoPomodoroPage = () => {
  const { mode, timeLeft, isActive, toggleTimer, resetTimer, setMode } = usePomodoro();
  
  // Calculate max time based on mode for the analog progress
  const getMaxTime = (m: string) => {
    switch(m) {
        case 'work': return 25 * 60;
        case 'shortBreak': return 5 * 60;
        case 'longBreak': return 15 * 60;
        default: return 25 * 60;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex items-center justify-center p-4">
       {/* Main Grid Container - Full Width/Height minus padding */}
       <div className="w-full h-full min-h-[calc(100vh-2rem)] grid grid-cols-1 md:grid-cols-3 gap-6">
           
            {/* Left Column (Span 2) */}
            <div className="col-span-1 md:col-span-2 flex flex-col gap-6 h-full">
                {/* Timer Card - Flex grow to fill available space */}
                <div className="flex-1">
                    <AnalogTimerCard 
                        timeLeft={timeLeft}
                        maxTime={getMaxTime(mode)}
                        isActive={isActive}
                        mode={mode}
                        setMode={setMode} // Pass setMode here
                        onToggle={toggleTimer}
                        onReset={resetTimer}
                    />
                </div>
                
                {/* Bottom Row: Music & Date - Split 50/50 */}
                <div className="h-auto min-h-[220px] grid grid-cols-1 md:grid-cols-2 gap-6">
                    <MusicCard />
                    <DateTimeCard />
                </div>
            </div>

            {/* Right Column (Span 1) - Full Height Task List */}
            <div className="col-span-1 h-full">
                <LuxTodoList />
            </div>

       </div>
    </div>
  );
};

export default BentoPomodoroPage;
