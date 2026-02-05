'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface TimerDisplayProps {
  timeLeft: number;
  mode: 'work' | 'shortBreak' | 'longBreak';
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft, mode }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const modeColors = {
    work: 'text-indigo-600 dark:text-indigo-400',
    shortBreak: 'text-teal-600 dark:text-teal-400',
    longBreak: 'text-purple-600 dark:text-purple-400',
  };

  const modeLabels = {
    work: 'Focus Time',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={cn("text-[8rem] md:text-[10rem] font-bold leading-none tracking-tighter tabular-nums transition-colors duration-500 select-none", modeColors[mode])}>
        {formattedTime}
      </div>
      <div className={cn("text-2xl md:text-3xl font-light tracking-widest uppercase transition-colors duration-500", modeColors[mode])}>
        {modeLabels[mode]}
      </div>
    </div>
  );
};

export default TimerDisplay;
