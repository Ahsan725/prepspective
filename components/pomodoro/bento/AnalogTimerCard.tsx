'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Play, Pause } from 'lucide-react';

interface AnalogTimerCardProps {
  timeLeft: number;
  maxTime: number;
  isActive: boolean;
  mode: 'work' | 'shortBreak' | 'longBreak';
  setMode?: (mode: 'work' | 'shortBreak' | 'longBreak') => void; // Added setMode
  onToggle: () => void;
  onReset: () => void;
}

const AnalogTimerCard: React.FC<AnalogTimerCardProps> = ({ timeLeft, maxTime, isActive, mode, onToggle, setMode }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  // Calculate progress for the circle
  const progress = (timeLeft / maxTime) * 100;
  const circumference = 2 * Math.PI * 180; // Radius approx based on viewBox
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const modeColors = {
    work: 'text-indigo-500 stroke-indigo-500',
    shortBreak: 'text-teal-400 stroke-teal-400',
    longBreak: 'text-purple-400 stroke-purple-400',
  };

  const modeBgColors = {
    work: 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-900/40',
    shortBreak: 'bg-teal-600 hover:bg-teal-500 shadow-teal-900/40',
    longBreak: 'bg-purple-600 hover:bg-purple-500 shadow-purple-900/40',
  };

  return (
    <div className="relative w-full h-full bg-zinc-900 rounded-[2rem] shadow-sm border border-zinc-800 p-8 flex flex-col items-center justify-between overflow-hidden">
      
      {/* Mode Selectors */}
      <div className="flex gap-2 z-10 bg-zinc-800/50 p-1.5 rounded-full backdrop-blur-sm relative top-2">
         {[
             { id: 'work', label: 'Focus' },
             { id: 'shortBreak', label: 'Short Break' },
             { id: 'longBreak', label: 'Long Break' }
         ].map((m) => (
             <button
                key={m.id}
                onClick={() => setMode && setMode(m.id as any)}
                className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300",
                    mode === m.id 
                        ? "bg-zinc-700 text-white shadow-sm" 
                        : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                )}
             >
                 {m.label}
             </button>
         ))}
      </div>

      {/* Analog Clock Face */}
      <div className="relative flex-1 flex items-center justify-center w-full">
          {/* Progress Circle SVG */}
          <div className="relative w-[300px] h-[300px] md:w-[420px] md:h-[420px]">
             <svg className="w-full h-full -rotate-90">
                 {/* Background Circle */}
                 {/* Using slightly lighter zinc for track on dark bg */}
                 <circle
                    cx="50%"
                    cy="50%"
                    r="45%" 
                    className="fill-none stroke-zinc-800"
                    strokeWidth="180" 
                 />
                 {/* Progress Slice */}
                 <motion.circle
                    cx="50%"
                    cy="50%"
                    r="25%" 
                    className={cn("fill-none transition-all duration-1000 ease-in-out", modeColors[mode])}
                    strokeWidth="200"
                    strokeDasharray={circumference * 2.5} 
                    strokeDashoffset={strokeDashoffset * 2.5} 
                    strokeLinecap="butt"
                    opacity={0.3} // Slightly higher opacity for visibility on dark
                 />
             </svg>
             <motion.div 
                className="absolute top-1/2 left-1/2 w-1 h-[190px] origin-bottom rounded-full z-10"
                animate={{ rotate: (360 - progress * 3.6) }}
                transition={{ duration: 1, ease: "linear" }}
                style={{
                    marginTop: '-190px',
                    marginLeft: '-2px',
                }}
             >
                 <div className={cn("w-full h-full rounded-full opacity-80", mode === 'work' ? 'bg-indigo-500' : mode === 'shortBreak' ? 'bg-teal-400' : 'bg-purple-400')} />
                 {/* Center Knob */}
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10 bg-zinc-900 rounded-full shadow-lg border-4 border-zinc-800"></div>
             </motion.div>
             
              {/* Digital Time Display (Centered) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none mt-12">
                  <div className="text-6xl md:text-8xl font-bold text-white tracking-tighter drop-shadow-2xl">
                    {formattedTime}
                  </div>
                  <div className="text-zinc-500 font-medium tracking-widest uppercase text-sm mt-2">
                    {isActive ? 'Session in Progress' : 'Ready to Start'}
                  </div>
              </div>

          </div>
      </div>

      {/* Start Button */}
      <div className="relative z-10 mb-4">
          <Button 
            onClick={onToggle}
            className={cn(
                "px-12 py-7 text-lg rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center gap-3", 
                modeBgColors[mode]
            )}
          >
             {isActive ? <Pause className="fill-current" /> : <Play className="fill-current ml-1" />}
             {isActive ? 'Pause Session' : 'Start Session'}
          </Button>
      </div>

    </div>
  );
};

export default AnalogTimerCard;
