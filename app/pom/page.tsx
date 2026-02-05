'use client';

import React, { useState } from 'react';
import { usePomodoro } from '@/hooks/usePomodoro';
import AnalogTimerCard from '@/components/pomodoro/bento/AnalogTimerCard';
import CalendarCard from '@/components/pomodoro/bento/CalendarCard';
import MusicCard from '@/components/pomodoro/bento/MusicCard';
import DateTimeCard from '@/components/pomodoro/bento/DateTimeCard';
import ProgressCard from '@/components/pomodoro/bento/ProgressCard';
import LuxTodoList from '@/components/pomodoro/LuxTodoList';
import AmbientEffect from '@/components/pomodoro/AmbientEffect';

const BentoPomodoroPage = () => {
  const { mode, timeLeft, isActive, toggleTimer, resetTimer, setMode } = usePomodoro();
  const [ambientEffect, setAmbientEffect] = useState<'none' | 'snow' | 'rain'>('none');
  
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
    <div className="h-[calc(100vh-5rem)] bg-zinc-50 text-zinc-900 flex items-center justify-center p-2 overflow-hidden relative">
       {/* Ambient Effect Overlay - User requested it over everything */}
       <AmbientEffect type={ambientEffect} />

       {/* Main Grid Container */}
       <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-3 relative z-10">
           
            {/* Left Column (Span 2) */}
            <div className="col-span-1 md:col-span-2 flex flex-col gap-3 h-full min-h-0">
                {/* Top Row: Date & Music - Split 50/50 */}
                <div className="h-auto min-h-[200px] grid grid-cols-1 md:grid-cols-2 gap-3">
                    <DateTimeCard />
                    <MusicCard />
                </div>

                {/* Bottom: Timer Card - Flex grow to fill available space */}
                <div className="flex-1 min-h-0">
                    <AnalogTimerCard 
                        timeLeft={timeLeft}
                        maxTime={getMaxTime(mode)}
                        isActive={isActive}
                        mode={mode}
                        setMode={setMode}
                        onToggle={toggleTimer}
                        onReset={resetTimer}
                        ambientEffect={ambientEffect}
                        setAmbientEffect={setAmbientEffect}
                    />
                </div>
            </div>

            {/* Right Column (Span 1) - Full Height Task List */}
            <div className="col-span-1 h-full min-h-0">
                <LuxTodoList />
            </div>

       </div>
    </div>
  );
};

export default BentoPomodoroPage;
