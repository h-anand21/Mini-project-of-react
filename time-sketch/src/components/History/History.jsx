import React from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaFlag, FaHourglassEnd, FaChartBar } from 'react-icons/fa';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const History = () => {
  const [laps, setLaps] = useLocalStorage('stopwatch_laps', []);
  const [timerHistory, setTimerHistory] = useLocalStorage('timer_history', []);

  const formatStopwatchTime = (timeInMs) => {
    const hours = Math.floor(timeInMs / 3600000);
    const minutes = Math.floor((timeInMs % 3600000) / 60000);
    const seconds = Math.floor((timeInMs % 60000) / 1000);
    const ms = Math.floor((timeInMs % 1000) / 10);
    return `${hours > 0 ? String(hours).padStart(2, '0') + ':' : ''}${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
  };

  const formatTimerDuration = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) return `${h}h ${m}m ${s}s`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  };

  const clearHistory = () => {
    if(window.confirm('Clear all history? This cannot be undone.')) {
      setLaps([]);
      setTimerHistory([]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex flex-col gap-4 pb-10"
    >
      <div className="flex justify-between items-end mb-2">
        <h3 className="font-hand text-3xl flex items-center gap-2 text-[var(--color-ink)]">
          <FaChartBar className="text-2xl" /> Your Activity
        </h3>
        <button 
          onClick={clearHistory}
          className="font-hand text-sm border border-[var(--color-ink)] opacity-60 px-3 py-1 rounded-md bg-[var(--color-paper)] hover:opacity-100 hover:text-red-500 transition-all text-[var(--color-ink)]"
        >
          Clear Data
        </button>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div className="bg-[var(--color-note-yellow)] p-4 sketch-border transform -rotate-1 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-[#ffc3a0] rotate-2 opacity-90" style={{ border: '1px solid rgba(0,0,0,0.1)', clipPath: 'polygon(5% 0, 95% 2%, 100% 90%, 98% 100%, 2% 98%, 0 85%)' }}></div>
          <p className="font-hand text-lg text-[var(--color-ink)] opacity-80">Total Laps</p>
          <p className="font-hand text-4xl text-[var(--color-ink)] font-bold">{laps.length}</p>
        </div>
        <div className="bg-[var(--color-note-blue)] p-4 sketch-border transform rotate-1 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-[#a0e4ff] -rotate-2 opacity-90" style={{ border: '1px solid rgba(0,0,0,0.1)', clipPath: 'polygon(5% 0, 95% 2%, 100% 90%, 98% 100%, 2% 98%, 0 85%)' }}></div>
          <p className="font-hand text-lg text-[var(--color-ink)] opacity-80">Timers Finished</p>
          <p className="font-hand text-4xl text-[var(--color-ink)] font-bold">{timerHistory.length}</p>
        </div>
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        {/* Laps List */}
        <div className="bg-[var(--color-paper)] p-4 sketch-border relative h-[400px] flex flex-col">
          <h4 className="font-hand text-2xl flex items-center gap-2 text-[var(--color-ink)] mb-4 pb-2 border-b-2 border-dashed border-[var(--color-ink)] border-opacity-30">
            <FaFlag className="text-xl opacity-80" /> Stopwatch Laps
          </h4>
          <div className="overflow-y-auto custom-scrollbar flex-1 pr-2">
            {laps.length === 0 ? (
              <p className="font-hand text-[var(--color-ink)] opacity-60 text-center italic mt-10">No laps yet.</p>
            ) : (
              <div className="space-y-3 font-medium text-[var(--color-ink)] font-sans text-sm">
                {laps.map((lapItem, index) => (
                  <div key={lapItem.id} className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                    <span className="opacity-70">Lap {laps.length - index}</span>
                    <span className="text-[#ff477e] font-bold tracking-wider">{formatStopwatchTime(lapItem.time)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Timers List */}
        <div className="bg-[var(--color-paper)] p-4 sketch-border relative h-[400px] flex flex-col">
          <h4 className="font-hand text-2xl flex items-center gap-2 text-[var(--color-ink)] mb-4 pb-2 border-b-2 border-dashed border-[var(--color-ink)] border-opacity-30">
            <FaHourglassEnd className="text-xl opacity-80" /> Completed Timers
          </h4>
          <div className="overflow-y-auto custom-scrollbar flex-1 pr-2">
            {timerHistory.length === 0 ? (
              <p className="font-hand text-[var(--color-ink)] opacity-60 text-center italic mt-10">No completed timers.</p>
            ) : (
              <div className="space-y-3 font-medium text-[var(--color-ink)] font-sans text-sm">
                {timerHistory.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                    <div className="flex flex-col">
                      <span className="opacity-90">{formatTimerDuration(item.duration)} Focus</span>
                      <span className="text-xs opacity-50">{new Date(item.date).toLocaleDateString()} at {new Date(item.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <span className="text-green-500 font-bold">Done ✅</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
