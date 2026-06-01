import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimer } from '../../hooks/useTimer';
import { FaPlay, FaPause, FaRedo, FaChevronUp, FaChevronDown, FaExpand, FaCompress } from 'react-icons/fa';

export const Timer = () => {
  const { timeRemaining, initialSeconds, isRunning, playSound, setPlaySound, start, pause, reset, setTimer, formatTime } = useTimer();
  
  const formatted = formatTime(timeRemaining);
  const [inputH, setInputH] = useState('01');
  const [inputM, setInputM] = useState('20');
  const [inputS, setInputS] = useState('00');
  
  const isSetupMode = !isRunning;
  const isFinished = timeRemaining === 0 && initialSeconds > 0;
  
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

  const handleInputChange = (e, setter) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 2) val = val.slice(0, 2);
    setter(val);
  };

  const handleInputBlur = (val, max, setter) => {
    if (val === '') {
      setter('00');
      return;
    }
    let num = parseInt(val, 10);
    if (num > max) num = max;
    setter(String(num).padStart(2, '0'));
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
        <span className="text-lg">⏳</span>
        <h3 className="font-hand text-lg lg:text-xl marker-highlight marker-purple px-2 leading-none py-1">
          TIMER
        </h3>
      </div>
      
      <div className={`flex justify-center items-start gap-1 sm:gap-2 md:gap-3 font-medium tracking-wider leading-none pt-2 my-2 lg:my-3 ${isFullscreen ? 'text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] mt-6 md:mt-10 mb-8 md:mb-16' : 'text-4xl md:text-5xl lg:text-5xl'}`}>
        {/* Hours */}
        <div className="flex flex-col items-center">
          <div className={`flex flex-col items-center justify-center sketch-border relative bg-[var(--color-paper)] ${isFullscreen ? 'w-[90px] h-[110px] sm:w-[120px] sm:h-[140px] md:w-[180px] md:h-[210px] lg:w-[225px] lg:h-[260px]' : 'w-[75px] h-[90px] lg:w-[90px] lg:h-[105px]'}`}>
            {isSetupMode ? (
              <>
                <button onClick={() => incrementValue(inputH, 99, setInputH)} className="absolute top-2 opacity-60 hover:opacity-100 text-[var(--color-ink)] p-1"><FaChevronUp className={isFullscreen ? 'text-lg md:text-2xl lg:text-3xl' : 'text-[10px] lg:text-xs'}/></button>
                <input 
                  type="text" 
                  value={inputH} 
                  onChange={(e) => handleInputChange(e, setInputH)}
                  onBlur={() => handleInputBlur(inputH, 99, setInputH)}
                  className="text-center w-full bg-transparent outline-none m-0 p-0 absolute top-1/2 transform -translate-y-1/2" 
                />
                <button onClick={() => decrementValue(inputH, 99, setInputH)} className="absolute bottom-2 opacity-60 hover:opacity-100 text-[var(--color-ink)] p-1"><FaChevronDown className={isFullscreen ? 'text-lg md:text-2xl lg:text-3xl' : 'text-[10px] lg:text-xs'}/></button>
              </>
            ) : (
              <span className="absolute top-1/2 transform -translate-y-1/2">{formatted.hours}</span>
            )}
          </div>
          <span className={`font-normal mt-3 text-[var(--color-ink)] opacity-70 font-sans tracking-widest uppercase block ${isFullscreen ? 'text-xs sm:text-sm md:text-base lg:text-xl mt-4 md:mt-6' : 'text-[10px] md:text-[11px]'}`}>Hours</span>
        </div>
        
        <span className={`text-[var(--color-ink)] ${isFullscreen ? 'pt-6 sm:pt-8 md:pt-12 lg:pt-16' : 'pt-4 md:pt-6'}`}>:</span>
        
        {/* Minutes */}
        <div className="flex flex-col items-center">
          <div className={`flex flex-col items-center justify-center sketch-border relative bg-[var(--color-paper)] ${isFullscreen ? 'w-[90px] h-[110px] sm:w-[120px] sm:h-[140px] md:w-[180px] md:h-[210px] lg:w-[225px] lg:h-[260px]' : 'w-[75px] h-[90px] lg:w-[90px] lg:h-[105px]'}`}>
            {isSetupMode ? (
              <>
                <button onClick={() => incrementValue(inputM, 59, setInputM)} className="absolute top-2 opacity-60 hover:opacity-100 text-[var(--color-ink)] p-1"><FaChevronUp className={isFullscreen ? 'text-lg md:text-2xl lg:text-3xl' : 'text-[10px] lg:text-xs'}/></button>
                <input 
                  type="text" 
                  value={inputM} 
                  onChange={(e) => handleInputChange(e, setInputM)}
                  onBlur={() => handleInputBlur(inputM, 59, setInputM)}
                  className="text-center w-full bg-transparent outline-none m-0 p-0 absolute top-1/2 transform -translate-y-1/2" 
                />
                <button onClick={() => decrementValue(inputM, 59, setInputM)} className="absolute bottom-2 opacity-60 hover:opacity-100 text-[var(--color-ink)] p-1"><FaChevronDown className={isFullscreen ? 'text-lg md:text-2xl lg:text-3xl' : 'text-[10px] lg:text-xs'}/></button>
              </>
            ) : (
              <span className="absolute top-1/2 transform -translate-y-1/2">{formatted.minutes}</span>
            )}
          </div>
          <span className={`font-normal mt-3 text-[var(--color-ink)] opacity-70 font-sans tracking-widest uppercase block ${isFullscreen ? 'text-xs sm:text-sm md:text-base lg:text-xl mt-4 md:mt-6' : 'text-[10px] md:text-[11px]'}`}>Minutes</span>
        </div>
        
        <span className={`text-[var(--color-ink)] ${isFullscreen ? 'pt-6 sm:pt-8 md:pt-12 lg:pt-16' : 'pt-4 md:pt-6'}`}>:</span>
        
        {/* Seconds */}
        <div className="flex flex-col items-center">
          <div className={`flex flex-col items-center justify-center sketch-border relative bg-[var(--color-paper)] ${isFullscreen ? 'w-[90px] h-[110px] sm:w-[120px] sm:h-[140px] md:w-[180px] md:h-[210px] lg:w-[225px] lg:h-[260px]' : 'w-[75px] h-[90px] lg:w-[90px] lg:h-[105px]'}`}>
            {isSetupMode ? (
              <>
                <button onClick={() => incrementValue(inputS, 59, setInputS)} className="absolute top-2 opacity-60 hover:opacity-100 text-[var(--color-ink)] p-1"><FaChevronUp className={isFullscreen ? 'text-lg md:text-2xl lg:text-3xl' : 'text-[10px] lg:text-xs'}/></button>
                <input 
                  type="text" 
                  value={inputS} 
                  onChange={(e) => handleInputChange(e, setInputS)}
                  onBlur={() => handleInputBlur(inputS, 59, setInputS)}
                  className="text-center w-full bg-transparent outline-none m-0 p-0 absolute top-1/2 transform -translate-y-1/2" 
                />
                <button onClick={() => decrementValue(inputS, 59, setInputS)} className="absolute bottom-2 opacity-60 hover:opacity-100 text-[var(--color-ink)] p-1"><FaChevronDown className={isFullscreen ? 'text-lg md:text-2xl lg:text-3xl' : 'text-[10px] lg:text-xs'}/></button>
              </>
            ) : (
              <span className="absolute top-1/2 transform -translate-y-1/2">{formatted.seconds}</span>
            )}
          </div>
          <span className={`font-normal mt-3 text-[var(--color-ink)] opacity-70 font-sans tracking-widest uppercase block ${isFullscreen ? 'text-xs sm:text-sm md:text-base lg:text-xl mt-4 md:mt-6' : 'text-[10px] md:text-[11px]'}`}>Seconds</span>
        </div>
      </div>
      
      <div className={`flex flex-wrap justify-center items-center gap-3 ${isFullscreen ? 'scale-100 sm:scale-110 md:scale-150 mt-6 md:mt-12' : 'mt-4 lg:mt-6 pb-6 lg:pb-8'}`}>
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
      <svg className={`absolute ${isFullscreen ? 'top-12 right-24 w-12 h-12' : 'top-4 right-6 w-5 h-5'} text-yellow-400 transform rotate-12 pointer-events-none`} fill="currentColor" stroke="black" strokeWidth="1" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>

      {/* Left empty space: Cartoon Alarm Clock */}
      <div className={`absolute ${isFullscreen ? 'top-4 left-4 sm:top-8 sm:left-8 md:top-1/2 md:left-20 scale-75 sm:scale-100 md:scale-[2.5] transform md:-translate-y-1/2' : 'bottom-6 left-6 hidden md:block'} flex flex-col items-center pointer-events-none opacity-60 text-[var(--color-ink)]`}>
        <motion.svg 
          width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          animate={(!isSetupMode && isRunning) ? { rotate: [-5, 5, -5, 5, 0], scale: [1, 1.1, 1] } : {}}
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
          {(!isSetupMode && isRunning) ? (
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
        {(!isRunning) && (
          <motion.div 
            className="absolute top-0 right-[-10px] text-xs font-hand"
            animate={{ opacity: [0, 1, 0], y: [0, -10, -20] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Zzz...
          </motion.div>
        )}
      </div>

      {/* Right empty space: Target Bullseye */}
      <svg className={`absolute top-1/2 ${isFullscreen ? 'right-24 w-32 h-32' : 'right-10 w-14 h-14 hidden md:block'} text-[var(--color-ink)] opacity-30 transform -translate-y-1/2 rotate-6 pointer-events-none`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="50" cy="50" r="40" strokeDasharray="4 4" />
        <circle cx="50" cy="50" r="25" />
        <circle cx="50" cy="50" r="8" fill="currentColor" />
        <path d="M80 20 L 55 45" />
        <path d="M85 15 L 75 25 M 85 25 L 75 15" />
      </svg>
      
      {/* Clock-Head Man bottom right */}
      <div className={`absolute ${isFullscreen ? 'bottom-4 right-4 sm:bottom-8 sm:right-8 md:bottom-16 md:right-20 scale-75 sm:scale-100 md:scale-150' : 'bottom-2 right-4'} flex flex-col items-center pointer-events-none opacity-50 text-[var(--color-ink)]`}>
        <svg width="60" height="80" viewBox="0 0 60 80" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Body */}
          <path d="M30 35 V 60" />
          {/* Arms */}
          <path d="M30 40 L 15 50 M 30 40 L 45 50" />
          {/* Legs */}
          <path d="M30 60 L 15 80 M 30 60 L 45 80" />
          
          {/* Clock Head */}
          <circle cx="30" cy="20" r="15" fill="var(--color-paper)" />
          <circle cx="30" cy="20" r="2" fill="currentColor" />
          {/* Hands */}
          <motion.g animate={!isSetupMode && isRunning ? { rotate: 360 } : {}} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} style={{ originX: "30px", originY: "20px" }}>
            <line x1="30" y1="20" x2="30" y2="10" />
          </motion.g>
          <motion.g animate={!isSetupMode && isRunning ? { rotate: 360 } : {}} transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }} style={{ originX: "30px", originY: "20px" }}>
            <line x1="30" y1="20" x2="40" y2="20" />
          </motion.g>
        </svg>
        {!isSetupMode && isRunning && (
          <motion.span 
            className="font-hand text-xs mt-1"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
          >
            TICK TOCK!
          </motion.span>
        )}
      </div>

      {/* Time's Up Overlay */}
      <AnimatePresence>
        {isFinished && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[var(--color-paper)] rounded-2xl"
          >
            {/* Massive Ringing Alarm Clock */}
            <motion.svg 
              width="150" height="150" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className="text-[var(--color-ink)]"
              animate={{ rotate: [-10, 10, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            >
              {/* Left Bell */}
              <path d="M 15 20 C 10 15, 15 5, 25 10" />
              {/* Right Bell */}
              <path d="M 45 20 C 50 15, 45 5, 35 10" />
              {/* Hammer Ringing */}
              <motion.line x1="30" y1="12" x2="30" y2="4" animate={{ x1: [28, 32, 28], x2: [28, 32, 28] }} transition={{ repeat: Infinity, duration: 0.1 }} />
              <motion.circle cx="30" cy="4" r="2" fill="currentColor" animate={{ cx: [28, 32, 28] }} transition={{ repeat: Infinity, duration: 0.1 }} />
              
              {/* Main Body */}
              <circle cx="30" cy="35" r="18" fill="var(--color-paper)" />
              {/* Legs */}
              <line x1="20" y1="50" x2="15" y2="58" />
              <line x1="40" y1="50" x2="45" y2="58" />
              
              {/* Crazy Eyes */}
              <path d="M 22 30 L 26 26 L 22 22 M 38 30 L 34 26 L 38 22" />
              {/* Yelling Mouth */}
              <circle cx="30" cy="40" r="4" fill="currentColor" />
            </motion.svg>
            
            <motion.h2 
              className="font-hand text-5xl md:text-7xl lg:text-8xl text-[var(--color-ink)] mt-6 font-bold"
              animate={{ scale: [1, 1.1, 1], color: ['var(--color-ink)', '#ff477e', 'var(--color-ink)'] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              TIME'S UP!
            </motion.h2>

            <button 
              onClick={reset} 
              className="mt-8 sketch-button px-8 py-3 bg-[var(--color-btn-green)] text-black font-bold text-xl rounded-xl z-10 hover:scale-105 active:scale-95 transition-transform"
            >
              Okay!
            </button>
            
            {/* Ringing Sound lines */}
            <motion.div className="absolute top-1/4 left-[10%] text-5xl md:text-7xl font-hand font-bold text-[#ff477e] pointer-events-none" animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 1.5], rotate: -15 }} transition={{ repeat: Infinity, duration: 1 }}>RIIIING!</motion.div>
            <motion.div className="absolute top-1/4 right-[10%] text-5xl md:text-7xl font-hand font-bold text-yellow-500 pointer-events-none" animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 1.5], rotate: 15 }} transition={{ repeat: Infinity, duration: 1, delay: 0.5 }}>RIIIING!</motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.div>
    </div>
  );
};
