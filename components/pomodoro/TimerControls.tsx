'use client';

import React from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface TimerControlsProps {
  isActive: boolean;
  onToggle: () => void;
  onReset: () => void;
  onSkip: () => void;
  mode: 'work' | 'shortBreak' | 'longBreak';
}

const TimerControls: React.FC<TimerControlsProps> = ({ isActive, onToggle, onReset, onSkip, mode }) => {
  const modeColors = {
    work: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    shortBreak: 'bg-teal-600 hover:bg-teal-700 text-white',
    longBreak: 'bg-purple-600 hover:bg-purple-700 text-white',
  };

  return (
    <div className="flex items-center gap-6 mt-8">
      <Button
        variant="ghost"
        size="icon"
        onClick={onReset}
        className="w-12 h-12 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        title="Reset Timer"
      >
        <RotateCcw className="w-6 h-6 text-foreground/70" />
      </Button>

      <Button
        variant="default"
        size="lg"
        onClick={onToggle}
        className={cn("w-24 h-24 rounded-full shadow-2xl transition-all duration-300 hover:scale-110", modeColors[mode])}
      >
        {isActive ? (
          <Pause className="w-10 h-10 fill-current" />
        ) : (
          <Play className="w-10 h-10 fill-current ml-1" />
        )}
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onSkip}
        className="w-12 h-12 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        title="Skip to next"
      >
        <SkipForward className="w-6 h-6 text-foreground/70" />
      </Button>
    </div>
  );
};

export default TimerControls;
