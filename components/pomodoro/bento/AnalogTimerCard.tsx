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
}

const AnalogTimerCard: React.FC<AnalogTimerCardProps> = ({ timeLeft, maxTime, isActive, mode, onToggle, onReset, setMode }) => {
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
    shortBreak: 'bg-teal-400',
    longBreak: 'bg-purple-400',
  };

  const modeBgColors = {
    work: 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-900/40',
    shortBreak: 'bg-teal-600 hover:bg-teal-500 shadow-teal-900/40',
    longBreak: 'bg-purple-600 hover:bg-purple-500 shadow-purple-900/40',
  };

  return (
    <div className="relative w-full h-full bg-zinc-900 rounded-[2rem] shadow-sm border border-zinc-800 p-6 flex flex-col items-center justify-between overflow-hidden">
        
       {/* Mode Selectors - Clean, removed grey background box */}
       <div className="flex gap-4 z-10 relative top-2">
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

      {/* Clock Face & Digital Time */}
       <div className="relative flex-1 flex flex-col items-center justify-center w-full my-4">
            
            {/* Analog Clock */}
            <div 
                className={cn(
                    "relative w-[220px] h-[220px] md:w-[280px] md:h-[280px] rounded-full",
                    "shadow-[0_0_50px_-10px] border-4 border-zinc-800 bg-zinc-900", // Glow effect aligned with user request
                    mode === 'work' ? "shadow-indigo-500/20" : mode === 'shortBreak' ? "shadow-teal-500/20" : "shadow-purple-500/20"
                )}
            >
                {/* Minute Hand - Longer/Thicker - Grey/White */}
                <div 
                    className="absolute top-1/2 left-1/2 w-1.5 h-[40%] bg-zinc-200 origin-bottom rounded-full"
                    style={{ 
                        transform: `translate(-50%, -100%) rotate(${minuteDeg}deg)`,
                        transition: 'transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 0.44)'
                    }}
                />
                
                {/* Second Hand - Thin/Colored - Updates every second */}
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

             {/* Digital Time Display (Below Clock) */}
             <div className="mt-8 text-5xl md:text-7xl font-bold text-white tracking-tighter">
                {formattedTime}
             </div>
             <div className="text-zinc-500 font-medium tracking-widest uppercase text-xs mt-2">
                {isActive ? 'Session in Progress' : 'Ready to Start'}
             </div>
       </div>

      {/* Controls: Restart & Play/Pause */}
      <div className="relative z-10 mb-2 flex items-center gap-4">
          <Button 
            onClick={onReset}
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-full border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800 bg-transparent"
             title="Restart Timer"
          >
             <RotateCcw className="w-5 h-5" />
          </Button>

          <Button 
            onClick={onToggle}
            className={cn(
                "px-8 py-6 text-lg rounded-full shadow-xl hover:scale-105 transition-all flex items-center gap-2", 
                modeBgColors[mode]
            )}
          >
             {isActive ? <Pause className="fill-current w-5 h-5" /> : <Play className="fill-current ml-1 w-5 h-5" />}
             {isActive ? 'Pause' : 'Start'}
          </Button>
      </div>

    </div>
  );
};

export default AnalogTimerCard;
