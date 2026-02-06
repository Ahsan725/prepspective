'use client';

import React from 'react';
import { usePomodoro } from '@/hooks/usePomodoro';
import { Play, Pause, SkipForward, X, Music2, CloudRainWind } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const PomodoroMiniWidget = () => {
    const { 
        timeLeft, 
        isActive, 
        mode, 
        toggleTimer, 
        skipTimer, 
        isDocked, 
        toggleDock,
        isAudioPlaying,
        audioMode,
        toggleAudio,
        setAudioMode
    } = usePomodoro();

    // Only show if docked
    if (!isDocked) return null;

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-3 bg-indigo-600 border border-indigo-500 shadow-md rounded-full px-4 py-1.5 mr-2"
            >
                 {/* Audio Controls */}
                 <div className="flex items-center gap-1 border-r border-indigo-400 pr-2 mr-1">
                    <button 
                        onClick={() => audioMode === 'music' && isAudioPlaying ? toggleAudio() : setAudioMode('music')}
                        className={cn(
                            "p-1 rounded-full transition-colors",
                            audioMode === 'music' && isAudioPlaying ? "bg-indigo-500 text-white" : "text-indigo-200 hover:text-white hover:bg-indigo-500"
                        )}
                        title="Music"
                    >
                        <Music2 className="w-3.5 h-3.5" />
                    </button>
                    <button 
                        onClick={() => audioMode === 'white_noise' && isAudioPlaying ? toggleAudio() : setAudioMode('white_noise')}
                        className={cn(
                            "p-1 rounded-full transition-colors",
                            audioMode === 'white_noise' && isAudioPlaying ? "bg-indigo-500 text-white" : "text-indigo-200 hover:text-white hover:bg-indigo-500"
                        )}
                         title="White Noise"
                    >
                        <CloudRainWind className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* Time Display */}
                <div className="font-mono font-bold text-sm tabular-nums text-white">
                    {formattedTime}
                </div>

                {/* Controls */}
                <div className="flex items-center gap-1">
                    <button 
                        onClick={toggleTimer}
                        className="p-1 hover:bg-indigo-500 rounded-full transition-colors text-indigo-100 hover:text-white"
                    >
                        {isActive ? (
                            <Pause className="w-3.5 h-3.5 fill-current" />
                        ) : (
                            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        )}
                    </button>
                    
                    <button 
                        onClick={skipTimer}
                        className="p-1 hover:bg-indigo-500 rounded-full transition-colors text-indigo-100 hover:text-white"
                    >
                        <SkipForward className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                    
                     {/* Undock / Close Widget */}
                     <button 
                        onClick={() => toggleDock(false)}
                        className="p-1 hover:bg-indigo-500 rounded-full transition-colors text-indigo-100 hover:text-white ml-1.5"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PomodoroMiniWidget;
