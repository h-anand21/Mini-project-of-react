import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStopwatch } from '../../hooks/useStopwatch';
import { FaPlay, FaPause, FaRedo, FaFlag, FaExpand, FaCompress } from 'react-icons/fa';

export const Stopwatch = () => {
  const { time, isRunning, start, pause, reset, lap, formatTime } = useStopwatch();
  const formatted = formatTime(time);
  
  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div ref={containerRef} className={isFullscreen ? "w-full h-full bg-[var(--bg)] flex items-center justify-center p-4 md:p-8 lg:p-12" : ""}>
      <motion.div 
        className={`sketch-border relative shrink-0 bg-[var(--color-paper)] overflow-hidden ${isFullscreen ? 'w-full h-full max-w-7xl flex flex-col items-center justify-center p-8' : 'p-3 lg:p-4'}`}
        whileHover={!isFullscreen ? { scale: 1.01 } : {}}
        transition={{ type: "spring", stiffness: 300 }}
      >
      {/* Expand/Compress Button */}
      <button 
        onClick={toggleFullscreen}
        className={`absolute ${isFullscreen ? 'top-8 right-8 text-3xl' : 'top-3 right-12 text-lg'} text-[var(--color-ink)] opacity-50 hover:opacity-100 transition-opacity z-20`}
        title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
      >
        {isFullscreen ? <FaCompress /> : <FaExpand />}
      </button>
      <div className="flex items-center gap-2 mb-1 lg:mb-2">
        <span className="text-lg">⏱️</span>
        <h3 className="font-hand text-lg lg:text-xl marker-highlight marker-pink px-2 leading-none py-1">
          STOPWATCH
        </h3>
      </div>
      
      <div className={`flex justify-center items-baseline font-medium text-center tracking-wider leading-none ${isFullscreen ? 'text-[12vw] my-10' : 'text-4xl md:text-5xl lg:text-6xl my-2 lg:my-3'}`}>
        {formatted.hours !== '00' && <span>{formatted.hours}:</span>}
        <span>{formatted.minutes}:</span>
        <span>{formatted.seconds}</span>
        <span className={`${isFullscreen ? 'text-[8vw]' : 'text-2xl lg:text-3xl'} text-[#ff477e] font-bold ml-1`}>.{formatted.ms}</span>
      </div>
      
      <div className={`flex flex-wrap justify-center gap-3 ${isFullscreen ? 'mt-6 md:mt-8 scale-100 sm:scale-110 md:scale-150' : 'mt-2 lg:mt-4'}`}>
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
      <svg className={`absolute ${isFullscreen ? 'top-12 right-24 w-12 h-12' : 'top-4 right-4 w-6 h-6'} text-yellow-400 transform rotate-12 pointer-events-none`} fill="currentColor" stroke="black" strokeWidth="1" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
      
      {/* Left empty space: Cartoon Alarm Clock */}
      <div className={`absolute ${isFullscreen ? 'top-4 left-4 sm:top-8 sm:left-8 md:top-1/2 md:left-20 scale-75 sm:scale-100 md:scale-[2] transform md:-translate-y-1/2' : 'bottom-6 left-6 hidden md:block'} flex flex-col items-center pointer-events-none opacity-60 text-[var(--color-ink)]`}>
        <motion.svg 
          width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          animate={isRunning ? { rotate: [-5, 5, -5, 5, 0], scale: [1, 1.1, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          {/* Left Bell */}
          <path d="M 15 20 C 10 15, 15 5, 25 10" />
          {/* Right Bell */}
          <path d="M 45 20 C 50 15, 45 5, 35 10" />
          {/* Hammer */}
          <line x1="30" y1="12" x2="30" y2="4" />
          <circle cx="30" cy="4" r="2" fill="currentColor" />
          
          {/* Main Body */}
          <circle cx="30" cy="35" r="18" fill="var(--color-paper)" />
          
          {/* Legs */}
          <line x1="20" y1="50" x2="15" y2="58" />
          <line x1="40" y1="50" x2="45" y2="58" />
          
          {/* Cartoon Face */}
          {isRunning ? (
             <>
               {/* Excited Eyes */}
               <path d="M 22 30 L 26 26 L 22 22 M 38 30 L 34 26 L 38 22" />
               {/* Open Mouth */}
               <ellipse cx="30" cy="40" rx="3" ry="5" fill="currentColor" />
             </>
          ) : (
             <>
               {/* Sleeping/Closed Eyes */}
               <path d="M 22 30 Q 26 34 30 30 M 30 30 Q 34 34 38 30" />
             </>
          )}
        </motion.svg>
        {!isRunning && (
          <motion.div 
            className="absolute top-0 right-[-10px] text-xs font-hand"
            animate={{ opacity: [0, 1, 0], y: [0, -10, -20] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Zzz...
          </motion.div>
        )}
      </div>

      {/* Right empty space: Running Stick Figure */}
      <div className={`absolute ${isFullscreen ? 'bottom-4 right-4 sm:bottom-8 sm:right-8 md:bottom-20 md:right-24 scale-75 sm:scale-100 md:scale-150' : 'bottom-6 right-8 hidden md:block'} flex flex-col items-center pointer-events-none opacity-70 text-[var(--color-ink)]`}>
        <svg width="60" height="80" viewBox="0 0 60 80" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Head */}
          <circle cx="30" cy="15" r="10" />
          {/* Body */}
          <path d="M30 25 V 50" />
          
          {isRunning ? (
            <>
              {/* Left Arm swinging back and forth */}
              <motion.path d="M30 30 L 15 45" animate={{ d: ["M30 30 L 15 45", "M30 30 L 45 45", "M30 30 L 15 45"] }} transition={{ repeat: Infinity, duration: 0.6 }} />
              {/* Right Arm swinging opposite */}
              <motion.path d="M30 30 L 45 45" animate={{ d: ["M30 30 L 45 45", "M30 30 L 15 45", "M30 30 L 45 45"] }} transition={{ repeat: Infinity, duration: 0.6 }} />
              {/* Left Leg */}
              <motion.path d="M30 50 L 15 75" animate={{ d: ["M30 50 L 15 75", "M30 50 L 45 75", "M30 50 L 15 75"] }} transition={{ repeat: Infinity, duration: 0.6 }} />
              {/* Right Leg */}
              <motion.path d="M30 50 L 45 75" animate={{ d: ["M30 50 L 45 75", "M30 50 L 15 75", "M30 50 L 45 75"] }} transition={{ repeat: Infinity, duration: 0.6 }} />
            </>
          ) : (
            <>
              {/* Static pose */}
              <path d="M30 30 L 15 45" />
              <path d="M30 30 L 45 45" />
              <path d="M30 50 L 15 75" />
              <path d="M30 50 L 45 75" />
            </>
          )}
        </svg>
        {isRunning && (
          <motion.span 
            className="font-hand text-xs mt-1"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          >
            huff puff...
          </motion.span>
        )}
      </div>
      </motion.div>
    </div>
  );
};
