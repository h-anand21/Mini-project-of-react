import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useTimer() {
  const [initialSeconds, setInitialSeconds] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0); // Use regular state for timer
  const [isRunning, setIsRunning] = useState(false);
  const [endTime, setEndTime] = useState(null);
  const [playSound, setPlaySound] = useLocalStorage('timer_sound', true);
  
  useEffect(() => {
    let intervalId;
    if (isRunning && timeRemaining > 0) {
      if (!endTime) {
        setEndTime(Date.now() + timeRemaining * 1000);
      }
      
      intervalId = setInterval(() => {
        if (endTime) {
          const remaining = Math.ceil((endTime - Date.now()) / 1000);
          if (remaining <= 0) {
            setTimeRemaining(0);
            setIsRunning(false);
            setEndTime(null);
            
            // Log the completed timer
            const storedHistory = window.localStorage.getItem('timer_history');
            let historyArray = storedHistory ? JSON.parse(storedHistory) : [];
            historyArray = [
              { id: Date.now(), duration: initialSeconds, date: new Date().toISOString() },
              ...historyArray
            ];
            window.localStorage.setItem('timer_history', JSON.stringify(historyArray));
            window.dispatchEvent(new CustomEvent('local-storage', { detail: { key: 'timer_history', value: historyArray } }));
            
            if (playSound) {
              try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (AudioContext) {
                  const ctx = new AudioContext();
                  const playBeep = (time) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.type = 'square';
                    osc.frequency.setValueAtTime(880, time); // A5 note
                    gain.gain.setValueAtTime(0.1, time);
                    gain.gain.setValueAtTime(0.1, time + 0.1);
                    gain.gain.linearRampToValueAtTime(0, time + 0.15);
                    osc.start(time);
                    osc.stop(time + 0.15);
                  };
                  // Play 4 rapid beeps
                  playBeep(ctx.currentTime);
                  playBeep(ctx.currentTime + 0.2);
                  playBeep(ctx.currentTime + 0.4);
                  playBeep(ctx.currentTime + 0.6);
                }
              } catch(e) {
                console.error("Audio failed", e);
              }
            }
          } else {
            setTimeRemaining(remaining);
          }
        }
      }, 100);
    } else {
      setEndTime(null);
    }
    
    return () => clearInterval(intervalId);
  }, [isRunning, timeRemaining, endTime, playSound]);

  const setTimer = useCallback((h, m, s) => {
    const totalSeconds = (parseInt(h) || 0) * 3600 + (parseInt(m) || 0) * 60 + (parseInt(s) || 0);
    setInitialSeconds(totalSeconds);
    setTimeRemaining(totalSeconds);
    setIsRunning(false);
    setEndTime(null);
  }, []);

  const start = useCallback(() => {
    if (timeRemaining > 0) setIsRunning(true);
  }, [timeRemaining]);
  
  const pause = useCallback(() => {
    setIsRunning(false);
    setEndTime(null);
  }, []);
  
  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeRemaining(initialSeconds);
    setEndTime(null);
  }, [initialSeconds]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    
    return {
      hours: String(h).padStart(2, '0'),
      minutes: String(m).padStart(2, '0'),
      seconds: String(s).padStart(2, '0'),
      formatted: `${String(h).padStart(2, '0')} : ${String(m).padStart(2, '0')} : ${String(s).padStart(2, '0')}`
    };
  };

  return { 
    timeRemaining, 
    initialSeconds, 
    isRunning, 
    playSound, 
    setPlaySound, 
    setTimer, 
    start, 
    pause, 
    reset, 
    formatTime 
  };
}
