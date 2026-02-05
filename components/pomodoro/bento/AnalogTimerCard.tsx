'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface AnalogTimerCardProps {
  timeLeft: number;
  maxTime: number;
  isActive: boolean;
  mode: 'work' | 'shortBreak' | 'longBreak';
  setMode?: (mode: 'work' | 'shortBreak' | 'longBreak') => void;
  onToggle: () => void;
  onReset: () => void;
  ambientEffect?: 'none' | 'snow' | 'rain';
  setAmbientEffect?: (effect: 'none' | 'snow' | 'rain') => void;
}

const AnalogTimerCard: React.FC<AnalogTimerCardProps> = ({ timeLeft, maxTime, isActive, mode, onToggle, onReset, setMode, ambientEffect, setAmbientEffect }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Rotation Logic (Clockwise - Cumulative)
  const elapsed = maxTime - timeLeft;
  
  // Minute Hand: 6 degrees per minute elapsed
  const minuteDeg = (elapsed / 60) * 6; 
  
  // Second Hand: 6 degrees per second elapsed (Current elapsed seconds * 6)
  // This grows indefinitely (0 -> 6 -> ... -> 360 -> 366) preventing rewind animation
  const secondDeg = elapsed * 6;

  // Theme Colors
  const needleColors = {
    work: 'bg-indigo-500',
    shortBreak: 'bg-blue-500',
    longBreak: 'bg-emerald-500',
  };

  const modeBgColors = {
    work: 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-900/40',
    shortBreak: 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/40',
    longBreak: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/40',
  };

  return (
    <div className="relative w-full h-full bg-zinc-900 rounded-[2rem] shadow-sm border border-zinc-800 p-5 flex flex-col items-center justify-between overflow-hidden">
        
       {/* Top Controls Container for Mode and Atmosphere Selectors */}
       <div className="flex flex-col items-center gap-3 z-10 relative top-1">
         {/* Mode Selectors - Clean, removed grey background box */}
         <div className="flex gap-3">
           {[
               { id: 'work', label: 'Focus' },
               { id: 'shortBreak', label: 'Short Break' },
               { id: 'longBreak', label: 'Long Break' }
           ].map((m) => (
               <button
                  key={m.id}
                  onClick={() => setMode && setMode(m.id as any)}
                  className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 border border-transparent",
                      mode === m.id 
                          ? "text-white border-zinc-700 bg-zinc-800" 
                          : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                  )}
               >
                   {m.label}
                </button>
            ))}
         </div>

         {/* Atmosphere Selectors - Added as requested */}
         <div className="flex gap-3">
            {[
                { id: 'none', label: 'Clear' },
                { id: 'snow', label: 'Snow' },
                { id: 'rain', label: 'Rain' }
            ].map((e) => (
                <button
                   key={e.id}
                   onClick={() => setAmbientEffect && setAmbientEffect(e.id as any)}
                   className={cn(
                       "px-3 py-1 rounded-full text-[10px] font-medium transition-all duration-300 border border-transparent",
                       ambientEffect === e.id 
                           ? "text-zinc-200 border-zinc-800 bg-zinc-900/50" 
                           : "text-zinc-600 hover:text-zinc-400 hover:bg-zinc-800/30"
                   )}
                >
                    {e.label}
                </button>
            ))}
         </div>
       </div>

      {/* Responsive Layout Container: Clock on Left/Top, Time & Controls on Right/Bottom */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full min-h-0 overflow-hidden px-4">
        
        {/* Left Side: Analog Clock Face */}
        <div className="relative flex items-center justify-center">
            <div 
                className={cn(
                    "relative w-[180px] h-[180px] md:w-[220px] md:h-[220px] lg:w-[260px] lg:h-[260px] rounded-full",
                    "shadow-[0_0_50px_-10px] border-4 border-zinc-800 bg-zinc-900 transition-all duration-500",
                    mode === 'work' ? "shadow-indigo-500/20" : mode === 'shortBreak' ? "shadow-blue-500/20" : "shadow-emerald-500/20"
                )}
            >
                {/* Minute Hand */}
                <div 
                    className="absolute top-1/2 left-1/2 w-1.5 h-[40%] bg-zinc-200 origin-bottom rounded-full"
                    style={{ 
                        transform: `translate(-50%, -100%) rotate(${minuteDeg}deg)`,
                        transition: 'transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 0.44)'
                    }}
                />
                
                {/* Second Hand */}
                <div 
                    className={cn(
                        "absolute top-1/2 left-1/2 w-0.5 h-[45%] origin-bottom rounded-full transition-transform duration-300 ease-linear",
                        needleColors[mode]
                    )}
                    style={{ 
                        transform: `translate(-50%, -100%) rotate(${secondDeg}deg)`
                    }}
                />

                {/* Center Point */}
                <div className={cn("absolute top-1/2 left-1/2 w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-sm z-10 border-2 border-zinc-900", needleColors[mode])} />
            </div>
        </div>

        {/* Right Side: Digital Time, Status, and Controls */}
        <div className="flex flex-col items-center md:items-start justify-center gap-6">
            
            {/* Digital Time Display */}
            <div className="flex flex-col items-center md:items-start">
              <div className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter tabular-nums leading-none">
                  {formattedTime}
              </div>
              <div className="text-zinc-500 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs mt-3 flex items-center gap-2">
                 <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", isActive ? needleColors[mode] : "bg-zinc-700")} />
                 {isActive ? 'Session in Progress' : 'Ready to Start'}
              </div>
            </div>

            {/* Controls: Restart & Play/Pause */}
            <div className="flex items-center gap-4">
                <Button 
                    onClick={onReset}
                    variant="outline"
                    size="icon"
                    className="w-12 h-12 rounded-full border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800 bg-transparent transition-all active:scale-95"
                    title="Restart Timer"
                >
                    <RotateCcw className="w-5 h-5" />
                </Button>

                <Button 
                    onClick={onToggle}
                    className={cn(
                        "px-10 py-7 text-xl font-bold rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3", 
                        modeBgColors[mode]
                    )}
                >
                    {isActive ? <Pause className="fill-current w-6 h-6" /> : <Play className="fill-current ml-1 w-6 h-6" />}
                    {isActive ? 'Pause' : 'Start'}
                </Button>
            </div>
        </div>
      </div>

    </div>
  );
};

export default AnalogTimerCard;
