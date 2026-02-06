'use client';

import React, { useRef, useEffect } from 'react';
import { usePomodoroContext, TRACKS } from '@/context/PomodoroContext';

const GlobalAudioPlayer = () => {
    const { isAudioPlaying, audioMode, trackIndex } = usePomodoroContext();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const currentTrack = TRACKS[audioMode][trackIndex];

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            if (isAudioPlaying) {
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isAudioPlaying, trackIndex, audioMode, currentTrack]); // Added currentTrack dep

    return (
        <audio 
            ref={audioRef}
            src={currentTrack.url}
            loop
            className="hidden"
            onEnded={() => {
                if(isAudioPlaying) audioRef.current?.play();
            }}
        />
    );
};

export default GlobalAudioPlayer;
