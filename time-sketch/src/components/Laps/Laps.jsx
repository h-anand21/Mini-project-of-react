import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaFlag } from 'react-icons/fa';
import { useStopwatch } from '../../hooks/useStopwatch';

export const Laps = ({ setActiveTab }) => {
  const { laps, removeLap, formatTime } = useStopwatch();
  
  return (
    <motion.div 
      className="bg-[var(--color-note-green)] p-6 sketch-border mt-4 mb-4"
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-hand text-xl flex items-center gap-1 text-[var(--color-ink)] leading-none py-1">
          <FaFlag className="text-base opacity-70" /> Recent Laps
        </h3>
        <button 
          onClick={() => setActiveTab && setActiveTab('History')}
          className="font-hand text-xs border border-[var(--color-ink)] opacity-60 px-2 py-0.5 rounded-md bg-[var(--color-paper)] hover:opacity-100 transition-all text-[var(--color-ink)]"
        >
          View All
        </button>
      </div>
      
      <div className="mt-2 max-h-[120px] overflow-y-auto pr-2 custom-scrollbar">
        {laps.length === 0 ? (
          <p className="font-hand text-[var(--color-ink)] opacity-70 text-center py-2 text-sm italic">No laps recorded.</p>
        ) : (
          <div className="space-y-1.5 font-medium text-[var(--color-ink)] opacity-90 font-sans text-xs">
            <AnimatePresence>
              {laps.slice(0, 10).map((lapItem, index) => {
                const formatted = formatTime(lapItem.time);
                return (
                  <motion.div 
                    key={lapItem.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex justify-between items-center border-b border-dashed border-[var(--color-ink)] border-opacity-30 pb-2 group"
                  >
                    <span className="text-[var(--color-ink)] opacity-80">Lap {laps.length - index}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-[#ff477e] font-medium tracking-wide">
                        {formatted.hours !== '00' ? `${formatted.hours}:` : ''}{formatted.minutes}:{formatted.seconds}.{formatted.ms}
                      </span>
                      <button 
                        onClick={() => removeLap(lapItem.id)}
                        className="text-[var(--color-ink)] opacity-50 hover:text-red-500 hover:opacity-100 group-hover:opacity-100 transition-opacity"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
};
