'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import GlobalAudioPlayer from '@/components/pomodoro/GlobalAudioPlayer';
import AmbientEffect from '@/components/pomodoro/AmbientEffect';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';
export type AudioMode = 'music' | 'white_noise';
export type AmbientType = 'none' | 'snow' | 'rain';

export const TRACKS = {
    music: [
        { title: "Hearty", url: "/music/hearty.mp3" },
        { title: "Aeon", url: "/music/aeon.mp3" },
        { title: "Angels By My Side", url: "/music/angelsbymyside.mp3" }
    ],
    white_noise: [
        { title: "Calming Rain", url: "/whitenoise/liecio-calming-rain-257596.mp3" },
        { title: "Cafe Noise", url: "/whitenoise/freesound_community-cafe-noise-32940.mp3" }, 
        { title: "City Ambience", url: "/whitenoise/guillermoanaya-city-ambience-121693.mp3" }
    ]
};

interface PomodoroState {
    mode: TimerMode;
    timeLeft: number;
    isActive: boolean;
    cycleCount: number;
    lastUpdated: number | null;
}

interface PomodoroContextType extends PomodoroState {
    toggleTimer: () => void;
    resetTimer: () => void;
    setMode: (mode: TimerMode) => void;
    skipTimer: () => void;
    
    isDocked: boolean;
    toggleDock: (value?: boolean) => void;

    // Audio State
    isAudioPlaying: boolean;
    audioMode: AudioMode;
    trackIndex: number;
    toggleAudio: () => void;
    setAudioMode: (mode: AudioMode) => void;
    nextTrack: () => void;
    
    // Ambient Visuals
    ambientEffect: AmbientType;
    setAmbientEffect: (effect: AmbientType) => void;
}

const PomodoroContext = createContext<PomodoroContextType | undefined>(undefined);

const MODES: Record<TimerMode, number> = {
    work: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
};

export const PomodoroProvider = ({ children }: { children: ReactNode }) => {
    // Docked state (persistent between navigations but not necessarily localStorage)
    const [isDocked, setIsDocked] = useState(false);

    // Main Timer State
    const [state, setState] = useState<PomodoroState>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('pomodoro-state');
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    // If timer was active, calculate elapsed time
                    if (parsed.isActive && parsed.lastUpdated) {
                        const now = Date.now();
                        const diffSeconds = Math.floor((now - parsed.lastUpdated) / 1000);
                        const newTimeLeft = Math.max(0, parsed.timeLeft - diffSeconds);
                        return {
                            ...parsed,
                            timeLeft: newTimeLeft,
                            isActive: newTimeLeft > 0 ? true : false,
                            lastUpdated: now,
                        };
                    }
                    return parsed;
                } catch (e) {
                    console.error("Failed to parse pomodoro state", e);
                }
            }
        }
        return {
            mode: 'work',
            timeLeft: MODES.work,
            isActive: false,
            cycleCount: 0,
            lastUpdated: null,
        };
    });

    // Save to local storage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('pomodoro-state', JSON.stringify({
                ...state,
                lastUpdated: Date.now()
            }));
        }

        // Update Tab Title
        if (state.isActive) {
            const minutes = Math.floor(state.timeLeft / 60);
            const seconds = state.timeLeft % 60;
            document.title = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} - Focus`;
        } else {
            // Revert title if needed, but managing document.title globally can be tricky 
            // if other pages set it. For now, we only set it on active timer.
            if (document.title.includes(' - Focus')) {
                 document.title = 'PrepSpective';
            }
        }
    }, [state]);

    const handleTimerComplete = useCallback(() => {
        setState((prev) => {
            let nextMode: TimerMode = 'work';
            let nextCycleCount = prev.cycleCount;

            if (prev.mode === 'work') {
                nextCycleCount += 1;
                if (nextCycleCount % 4 === 0) {
                    nextMode = 'longBreak';
                } else {
                    nextMode = 'shortBreak';
                }
            } else {
                nextMode = 'work';
            }

            return {
                mode: nextMode,
                timeLeft: MODES[nextMode],
                isActive: false, 
                cycleCount: nextCycleCount,
                lastUpdated: Date.now(),
            };
        });
    }, []);

    // Timer Tick
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (state.isActive && state.timeLeft > 0) {
            interval = setInterval(() => {
                setState((prev) => ({
                    ...prev,
                    timeLeft: prev.timeLeft - 1,
                    lastUpdated: Date.now(),
                }));
            }, 1000);
        } else if (state.timeLeft === 0 && state.isActive) {
            const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
            audio.play().catch(e => console.error("Audio play failed", e));
            handleTimerComplete();
        }
        return () => clearInterval(interval);
    }, [state.isActive, state.timeLeft, handleTimerComplete]);

    const toggleTimer = useCallback(() => {
        setState((prev) => ({ ...prev, isActive: !prev.isActive }));
    }, []);

    const resetTimer = useCallback(() => {
        setState((prev) => ({
            ...prev,
            isActive: false,
            timeLeft: MODES[prev.mode]
        }));
    }, []);

    const setMode = useCallback((mode: TimerMode) => {
        setState((prev) => ({
            ...prev,
            mode,
            timeLeft: MODES[mode],
            isActive: false,
        }));
    }, []);

    const skipTimer = useCallback(() => {
        handleTimerComplete();
    }, [handleTimerComplete]);
    
    // Audio State
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [audioMode, setAudioModeState] = useState<AudioMode>('music');
    const [trackIndex, setTrackIndex] = useState(0);

    // Ambient Visual State
    const [ambientEffect, setAmbientEffectState] = useState<AmbientType>('none');

    const toggleAudio = useCallback(() => setIsAudioPlaying(prev => !prev), []);
    
    const setAudioMode = useCallback((mode: AudioMode) => {
        setAudioModeState(mode);
        setTrackIndex(0);
        setIsAudioPlaying(true); // Auto play on switch? Matches MusicCard logic
    }, []);

    const nextTrack = useCallback(() => {
        setTrackIndex(prev => (prev + 1) % TRACKS[audioMode].length);
        setIsAudioPlaying(true); // Ensure playing
    }, [audioMode]);

    const setAmbientEffect = useCallback((effect: AmbientType) => {
        setAmbientEffectState(effect);
    }, []);

    const toggleDock = useCallback((value?: boolean) => {
        setIsDocked(prev => value !== undefined ? value : !prev);
    }, []);

    const value = {
        ...state,
        toggleTimer,
        resetTimer,
        setMode,
        skipTimer,
        
        isDocked,
        toggleDock,

        isAudioPlaying,
        audioMode,
        trackIndex,
        toggleAudio,
        setAudioMode,
        nextTrack,

        ambientEffect,
        setAmbientEffect
    };



    return (
        <PomodoroContext.Provider value={value}>
            <GlobalAudioPlayer />
            <AmbientEffect type={ambientEffect} />
            {children}
        </PomodoroContext.Provider>
    );
};

export const usePomodoroContext = () => {
    const context = useContext(PomodoroContext);
    if (context === undefined) {
        throw new Error('usePomodoroContext must be used within a PomodoroProvider');
    }
    return context;
};
