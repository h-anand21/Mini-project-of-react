import React from 'react';
import { motion } from 'framer-motion';
import { useStopwatch } from '../../hooks/useStopwatch';
import { FaPlay, FaPause, FaRedo, FaFlag } from 'react-icons/fa';

export const Stopwatch = () => {
  const { time, isRunning, start, pause, reset, lap, formatTime } = useStopwatch();
  const formatted = formatTime(time);

  return (
    <motion.div 
      className="sketch-border p-3 lg:p-4 relative shrink-0"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center gap-2 mb-1 lg:mb-2">
        <span className="text-lg">⏱️</span>
        <h3 className="font-hand text-lg lg:text-xl marker-highlight marker-pink px-2 leading-none py-1">
          STOPWATCH
        </h3>
      </div>
      
      <div className="flex justify-center items-baseline text-4xl md:text-5xl lg:text-6xl font-medium text-center my-2 lg:my-3 tracking-wider leading-none">
        {formatted.hours !== '00' && <span>{formatted.hours}:</span>}
        <span>{formatted.minutes}:</span>
        <span>{formatted.seconds}</span>
        <span className="text-2xl lg:text-3xl text-[#ff477e] font-bold ml-1">.{formatted.ms}</span>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3 mt-2 lg:mt-4">
        {!isRunning ? (
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={start}
            className="sketch-button px-5 py-2 md:py-2.5 bg-[var(--color-btn-green)] font-medium flex items-center gap-2 rounded-xl text-black text-sm lg:text-base"
          >
            <FaPlay className="text-xs" /> Start
          </motion.button>
        ) : (
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={pause}
            className="sketch-button px-5 py-2 md:py-2.5 bg-[var(--color-btn-yellow)] font-medium flex items-center gap-2 rounded-xl text-black text-sm lg:text-base"
          >
            <FaPause className="text-xs" /> Pause
          </motion.button>
        )}
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={reset}
          className="sketch-button px-5 py-2 md:py-2.5 bg-[var(--color-btn-red)] font-medium flex items-center gap-2 rounded-xl text-black text-sm lg:text-base"
        >
          <FaRedo className="text-xs" /> Reset
        </motion.button>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={lap}
          disabled={time === 0}
          className={`sketch-button px-5 py-2 md:py-2.5 bg-[var(--color-btn-purple)] font-medium flex items-center gap-2 rounded-xl text-black text-sm lg:text-base ${time === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <FaFlag className="text-xs" /> Lap
        </motion.button>
      </div>

      {/* Stopwatch Doodles */}
      {/* Top right star */}
      <svg className="absolute top-4 right-4 w-6 h-6 text-yellow-400 transform rotate-12" fill="currentColor" stroke="black" strokeWidth="1" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
      
      {/* Left empty space: Coffee cup */}
      <svg className="absolute bottom-8 left-8 w-12 h-12 text-[var(--color-ink)] opacity-40 transform -rotate-12 pointer-events-none hidden md:block" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M20 40 Q 20 20 80 20 Q 80 40 80 40 L 75 80 Q 70 90 50 90 Q 30 90 25 80 Z" fill="var(--color-paper)" />
        <path d="M80 30 Q 95 30 95 45 Q 95 60 77 60" />
        <path d="M40 10 Q 45 0 50 10 Q 55 20 50 30" strokeDasharray="4 4" />
        <path d="M60 15 Q 65 5 70 15 Q 75 25 70 35" strokeDasharray="4 4" />
      </svg>

      {/* Right empty space: Lightning bolt */}
      <div className="absolute top-1/2 right-12 w-10 h-10 text-yellow-500 opacity-60 transform -translate-y-1/2 rotate-12 pointer-events-none hidden md:block">
        <svg viewBox="0 0 24 24" fill="var(--color-paper)" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </div>
      
    </motion.div>
  );
};
