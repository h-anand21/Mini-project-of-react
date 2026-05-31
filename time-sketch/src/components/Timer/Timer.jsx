import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTimer } from '../../hooks/useTimer';
import { FaPlay, FaPause, FaRedo, FaChevronUp, FaChevronDown } from 'react-icons/fa';

export const Timer = () => {
  const { timeRemaining, isRunning, playSound, setPlaySound, start, pause, reset, setTimer, formatTime } = useTimer();
  
  const formatted = formatTime(timeRemaining);
  const [inputH, setInputH] = useState('01');
  const [inputM, setInputM] = useState('20');
  const [inputS, setInputS] = useState('00');
  
  const isSetupMode = !isRunning;

  const handleStart = () => {
    if (isSetupMode) {
      setTimer(inputH, inputM, inputS);
      setTimeout(start, 50);
    } else {
      start();
    }
  };

  const handleReset = () => {
    reset();
    setInputH('01');
    setInputM('20');
    setInputS('00');
  };

  const incrementValue = (val, max, setter) => {
    const num = parseInt(val) || 0;
    const next = (num + 1) > max ? 0 : num + 1;
    setter(String(next).padStart(2, '0'));
  };

  const decrementValue = (val, max, setter) => {
    const num = parseInt(val) || 0;
    const next = (num - 1) < 0 ? max : num - 1;
    setter(String(next).padStart(2, '0'));
  };

  return (
    <motion.div 
      className="sketch-border p-3 lg:p-4 relative shrink-0"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center gap-2 mb-1 lg:mb-2">
        <span className="text-lg">⏳</span>
        <h3 className="font-hand text-lg lg:text-xl marker-highlight marker-purple px-2 leading-none py-1">
          TIMER
        </h3>
      </div>
      
      <div className="flex justify-center items-start gap-2 md:gap-3 my-2 lg:my-3 text-4xl md:text-5xl lg:text-5xl font-medium tracking-wider leading-none pt-2">
        {/* Hours */}
        <div className="flex flex-col items-center">
          {isSetupMode ? (
            <div className="flex flex-col items-center sketch-border px-2 py-1 group min-w-[70px] lg:min-w-[80px] bg-[var(--color-paper)]">
              <button onClick={() => incrementValue(inputH, 99, setInputH)} className="opacity-60 hover:opacity-100 text-[var(--color-ink)] p-0.5"><FaChevronUp className="text-sm"/></button>
              <span className="text-center w-full py-0.5">{inputH}</span>
              <button onClick={() => decrementValue(inputH, 99, setInputH)} className="opacity-60 hover:opacity-100 text-[var(--color-ink)] p-0.5"><FaChevronDown className="text-sm"/></button>
            </div>
          ) : (
            <div className="flex flex-col items-center sketch-border px-2 py-3 min-w-[70px] lg:min-w-[80px] bg-[var(--color-paper)]">
              <span>{formatted.hours}</span>
            </div>
          )}
          <span className="text-[10px] md:text-[11px] font-normal mt-3 text-[var(--color-ink)] opacity-70 font-sans tracking-widest uppercase block">Hours</span>
        </div>
        
        <span className="text-[var(--color-ink)] pt-4 md:pt-6">:</span>
        
        {/* Minutes */}
        <div className="flex flex-col items-center">
          {isSetupMode ? (
            <div className="flex flex-col items-center sketch-border px-2 py-1 group min-w-[70px] lg:min-w-[80px] bg-[var(--color-paper)]">
              <button onClick={() => incrementValue(inputM, 59, setInputM)} className="opacity-60 hover:opacity-100 text-[var(--color-ink)] p-0.5"><FaChevronUp className="text-sm"/></button>
              <span className="text-center w-full py-0.5">{inputM}</span>
              <button onClick={() => decrementValue(inputM, 59, setInputM)} className="opacity-60 hover:opacity-100 text-[var(--color-ink)] p-0.5"><FaChevronDown className="text-sm"/></button>
            </div>
          ) : (
            <div className="flex flex-col items-center sketch-border px-2 py-3 min-w-[70px] lg:min-w-[80px] bg-[var(--color-paper)]">
              <span>{formatted.minutes}</span>
            </div>
          )}
          <span className="text-[10px] md:text-[11px] font-normal mt-3 text-[var(--color-ink)] opacity-70 font-sans tracking-widest uppercase block">Minutes</span>
        </div>
        
        <span className="text-[var(--color-ink)] pt-4 md:pt-6">:</span>
        
        {/* Seconds */}
        <div className="flex flex-col items-center">
          {isSetupMode ? (
            <div className="flex flex-col items-center sketch-border px-2 py-1 group min-w-[70px] lg:min-w-[80px] bg-[var(--color-paper)]">
              <button onClick={() => incrementValue(inputS, 59, setInputS)} className="opacity-60 hover:opacity-100 text-[var(--color-ink)] p-0.5"><FaChevronUp className="text-sm"/></button>
              <span className="text-center w-full py-0.5">{inputS}</span>
              <button onClick={() => decrementValue(inputS, 59, setInputS)} className="opacity-60 hover:opacity-100 text-[var(--color-ink)] p-0.5"><FaChevronDown className="text-sm"/></button>
            </div>
          ) : (
            <div className="flex flex-col items-center sketch-border px-2 py-3 min-w-[70px] lg:min-w-[80px] bg-[var(--color-paper)]">
              <span>{formatted.seconds}</span>
            </div>
          )}
          <span className="text-[10px] md:text-[11px] font-normal mt-3 text-[var(--color-ink)] opacity-70 font-sans tracking-widest uppercase block">Seconds</span>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center items-center gap-3 mt-4 lg:mt-6 pb-6 lg:pb-8">
        {!isRunning ? (
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
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
          onClick={handleReset}
          className="sketch-button px-5 py-2 md:py-2.5 bg-[var(--color-btn-red)] font-medium flex items-center gap-2 rounded-xl text-black text-sm lg:text-base"
        >
          <FaRedo className="text-xs" /> Reset
        </motion.button>
      </div>

      {/* Sound Toggle Absolute Bottom Left */}
      <div className="absolute bottom-3 left-4 flex items-center gap-2 z-20">
        <span className="font-hand text-[var(--color-ink)] opacity-80 text-xs flex items-center gap-1">
          🎵 Sound
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only peer" 
            checked={playSound} 
            onChange={() => setPlaySound(!playSound)} 
          />
          <div className="w-7 h-4 bg-[var(--color-paper)] border border-[var(--color-ink)] opacity-60 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[var(--color-ink)] after:border-[var(--color-ink)] after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[var(--color-btn-green)] peer-checked:opacity-100 peer-checked:after:bg-black peer-checked:after:border-black"></div>
        </label>
      </div>

      {/* Timer Doodles */}
      {/* Top right star */}
      <svg className="absolute top-4 right-6 w-5 h-5 text-yellow-400 transform rotate-12" fill="currentColor" stroke="black" strokeWidth="1" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>

      {/* Left empty space: Focus Text & Squiggly Arrow */}
      <div className="absolute top-1/2 left-8 transform -translate-y-1/2 -rotate-12 opacity-50 flex flex-col items-center pointer-events-none hidden md:flex">
        <span className="font-hand text-xl text-[var(--color-ink)] font-bold">Focus!</span>
        <svg className="w-8 h-8 text-[var(--color-ink)] mt-1" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M20 20 Q 80 20 80 50 Q 80 80 50 80" />
          <path d="M60 70 L 50 80 L 60 90" />
        </svg>
      </div>

      {/* Right empty space: Target Bullseye */}
      <svg className="absolute top-1/2 right-10 w-14 h-14 text-[var(--color-ink)] opacity-30 transform -translate-y-1/2 rotate-6 pointer-events-none hidden md:block" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="50" cy="50" r="40" strokeDasharray="4 4" />
        <circle cx="50" cy="50" r="25" />
        <circle cx="50" cy="50" r="8" fill="currentColor" />
        <path d="M80 20 L 55 45" />
        <path d="M85 15 L 75 25 M 85 25 L 75 15" />
      </svg>
      
      {/* Clock Doodle bottom right */}
      <svg className="absolute bottom-2 right-4 w-12 h-12 text-[var(--color-ink)] opacity-10 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7 v5 l3 3" />
        <path d="M12 2 v2 M12 20 v2 M2 12 h2 M20 12 h2" strokeWidth="1" />
      </svg>
    </motion.div>
  );
};
