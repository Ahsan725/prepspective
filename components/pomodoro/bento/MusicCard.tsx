'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, Music as MusicIcon, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type AudioMode = 'music' | 'white_noise';

const TRACKS = {
    music: [
        { title: "Aeon", url: "/music/aeon.mp3" },
        { title: "Angels By My Side", url: "/music/angelsbymyside.mp3" },
        { title: "Hearty", url: "/music/hearty.mp3" }
    ],
    white_noise: [
        { title: "Cafe Noise", url: "/whitenoise/freesound_community-cafe-noise-32940.mp3" }, 
        { title: "City Ambience", url: "/whitenoise/guillermoanaya-city-ambience-121693.mp3" }, 
        { title: "Calming Rain", url: "/whitenoise/liecio-calming-rain-257596.mp3" }
    ]
};

const MusicCard = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [mode, setMode] = useState<AudioMode>('music');
    const [trackIndex, setTrackIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const currentTrack = TRACKS[mode][trackIndex];

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, trackIndex, mode]);

    const togglePlay = () => setIsPlaying(!isPlaying);

    const nextTrack = () => {
        setTrackIndex((prev) => (prev + 1) % TRACKS[mode].length);
        setIsPlaying(true);
    };

    const switchMode = (newMode: AudioMode) => {
        setMode(newMode);
        setTrackIndex(0);
        setIsPlaying(false);
    };

    return (
        <div className="bg-zinc-900 text-white rounded-[2rem] p-6 flex flex-col justify-between shadow-sm col-span-3 md:col-span-1 min-h-[220px]">
            {/* Header / Mode Switcher - Centered and matched to Timer style */}
            <div className="flex justify-center items-center gap-3 mb-6 relative">
                <button
                    onClick={() => switchMode('music')}
                    className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 border border-transparent flex items-center gap-2",
                        mode === 'music' 
                            ? "text-white border-zinc-700 bg-zinc-800" 
                            : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                    )}
                >
                    <MusicIcon className="w-3 h-3" /> Music
                </button>
                <button
                    onClick={() => switchMode('white_noise')}
                    className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 border border-transparent flex items-center gap-2",
                        mode === 'white_noise' 
                            ? "text-white border-zinc-700 bg-zinc-800" 
                            : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                    )}
                >
                    <Zap className="w-3 h-3" /> White Noise
                </button>
            </div>

            {/* Track Info */}
            <div className="mb-4">
                <h3 className="text-lg font-bold truncate">{currentTrack.title}</h3>
                <p className="text-zinc-400 text-xs mt-1 flex items-center gap-2">
                    {mode === 'music' ? 'Lo-Fi / Study' : 'Ambient / Noise'}
                    {isPlaying && (
                        <span className="flex gap-0.5 items-end h-3">
                            <motion.span className="w-0.5 bg-indigo-500 block" animate={{ height: [2, 10, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} />
                            <motion.span className="w-0.5 bg-indigo-500 block" animate={{ height: [4, 12, 6] }} transition={{ repeat: Infinity, duration: 0.4 }} />
                            <motion.span className="w-0.5 bg-indigo-500 block" animate={{ height: [6, 8, 2] }} transition={{ repeat: Infinity, duration: 0.6 }} />
                        </span>
                    )}
                </p>
            </div>

            {/* Soundwave Visualizer */}
            <div className="flex items-center justify-between gap-0.5 h-12 mb-6 w-full px-1">
                {Array.from({ length: 50 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-1 bg-indigo-500 rounded-full"
                        animate={{
                            height: isPlaying ? [4, Math.random() * 24 + 4, Math.random() * 16 + 4, 4] : 4,
                            opacity: isPlaying ? [0.5, 1, 0.5] : 0.3
                        }}
                        transition={{
                            duration: Math.random() * 0.5 + 0.3, // Random duration between 0.3s and 0.8s
                            repeat: Infinity,
                            repeatType: "mirror",
                            delay: Math.random() * 0.5,
                            ease: "easeInOut"
                        }}
                        style={{ height: 4 }}
                    />
                ))}
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center gap-6">
                <button
                    onClick={togglePlay}
                    className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-500 hover:scale-105 transition-all shadow-lg shadow-indigo-900/20"
                >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current text-white" /> : <Play className="w-5 h-5 fill-current text-white ml-1" />}
                </button>

                <button
                    onClick={nextTrack}
                    className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-zinc-700 transition-colors"
                >
                     <SkipForward className="w-4 h-4 fill-current text-white" />
                </button>
            </div>
            
            <audio 
                ref={audioRef}
                src={currentTrack.url}
                loop
                onEnded={() => {
                    // Loop is true, but just in case
                    if(isPlaying) audioRef.current?.play();
                }}
            />
        </div>
    );
};

export default MusicCard;
