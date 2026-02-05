'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, Music as MusicIcon, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type AudioMode = 'music' | 'white_noise';

const TRACKS = {
    music: [
        { title: "Lofi Beats - Chill", url: "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" },
        { title: "Study Session", url: "https://cdn.pixabay.com/audio/2022/11/02/audio_64866ec560.mp3" },
        { title: "Focus Flow", url: "https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d0.mp3" }
    ],
    white_noise: [
        { title: "Rain Sounds", url: "https://cdn.pixabay.com/audio/2021/08/09/audio_0dcdd97d42.mp3" }, 
        { title: "Coffee Shop", url: "https://cdn.pixabay.com/audio/2014/06/16/09/16/coffee-36940_1280.mp3" }, 
        { title: "Forest Ambience", url: "https://cdn.pixabay.com/audio/2021/09/06/audio_3e4d941785.mp3" }
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
            {/* Header / Mode Switcher */}
            <div className="flex justify-between items-center mb-4 bg-zinc-800/50 p-1 rounded-full">
                <button
                    onClick={() => switchMode('music')}
                    className={cn(
                        "flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all",
                        mode === 'music' ? "bg-indigo-600 text-white shadow-md" : "text-zinc-400 hover:text-white"
                    )}
                >
                    <MusicIcon className="w-3 h-3" /> Music
                </button>
                <button
                    onClick={() => switchMode('white_noise')}
                    className={cn(
                        "flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all",
                        mode === 'white_noise' ? "bg-indigo-600 text-white shadow-md" : "text-zinc-400 hover:text-white"
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

            {/* Visualizer / Progress Mock */}
            <div className="bg-zinc-800 h-1.5 rounded-full w-full mb-6 overflow-hidden relative">
                <motion.div
                    className="absolute top-0 left-0 bottom-0 bg-indigo-500 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: isPlaying ? '100%' : '0%' }}
                    transition={{ duration: 180, ease: 'linear', repeat: Infinity }}
                />
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
