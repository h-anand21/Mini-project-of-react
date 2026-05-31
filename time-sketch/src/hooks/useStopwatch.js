import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useStopwatch() {
  const [time, setTime] = useState(0); // Use regular state for rapidly changing value
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useLocalStorage('stopwatch_laps', []);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        if (startTime) {
          const now = Date.now();
          setTime(prevTime => prevTime + (now - startTime));
          setStartTime(now);
        } else {
          setStartTime(Date.now());
        }
      }, 10);
    } else {
      setStartTime(null);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, startTime]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    setStartTime(null);
  }, [setLaps]);
  
  const lap = useCallback(() => {
    if (time > 0) {
      setLaps((prevLaps) => [
        { id: Date.now(), time },
        ...prevLaps
      ]);
    }
  }, [time, setLaps]);
  
  const removeLap = useCallback((id) => {
    setLaps((prevLaps) => prevLaps.filter(lap => lap.id !== id));
  }, [setLaps]);

  const formatTime = (timeInMs) => {
    const hours = Math.floor(timeInMs / 3600000);
    const minutes = Math.floor((timeInMs % 3600000) / 60000);
    const seconds = Math.floor((timeInMs % 60000) / 1000);
    const ms = Math.floor((timeInMs % 1000) / 10);
    
    return {
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
      ms: String(ms).padStart(2, '0'),
      formatted: `${hours > 0 ? String(hours).padStart(2, '0') + ':' : ''}${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(2, '0')}`
    };
  };

  return { time, isRunning, laps, start, pause, reset, lap, removeLap, formatTime };
}
