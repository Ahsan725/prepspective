import { useState, useEffect, useCallback } from 'react';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

interface PomodoroState {
    mode: TimerMode;
    timeLeft: number;
    isActive: boolean;
    cycleCount: number;
    lastUpdated: number | null;
}

const MODES: Record<TimerMode, number> = {
    work: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60, // Default to 15m, user can treat as 15-30
};

export const usePomodoro = () => {
    // Initialize state with default or valid local storage data
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
                            isActive: newTimeLeft > 0 ? true : false, // Auto-pause if finished while away? Or just finish. Let's finish.
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

    // Save to local storage whenever state changes
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
            document.title = 'Pomodoro Timer';
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
                // Break finished, back to work
                nextMode = 'work';
            }

            return {
                mode: nextMode,
                timeLeft: MODES[nextMode],
                isActive: false, // Auto-pause on mode switch
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
            // Timer finished
            const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
            audio.play().catch(e => console.error("Audio play failed", e));
            handleTimerComplete();
        }
        return () => clearInterval(interval);
    }, [state.isActive, state.timeLeft, handleTimerComplete]); // Added handleTimerComplete to deps

    const toggleTimer = () => {
        setState((prev) => ({ ...prev, isActive: !prev.isActive }));
    };

    const resetTimer = () => {
        setState((prev) => ({
            ...prev,
            isActive: false,
            timeLeft: MODES[prev.mode]
        }));
    };

    const setMode = (mode: TimerMode) => {
        setState((prev) => ({
            ...prev,
            mode,
            timeLeft: MODES[mode],
            isActive: false,
        }));
    };

    const skipTimer = () => {
        handleTimerComplete();
    };

    return {
        ...state,
        toggleTimer,
        resetTimer,
        setMode,
        skipTimer
    };
};
