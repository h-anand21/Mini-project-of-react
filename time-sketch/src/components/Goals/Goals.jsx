import React from 'react';
import { motion } from 'framer-motion';

export const Goals = () => {
  return (
    <div className="relative mb-2 shrink-0">
      <motion.div 
        className="bg-[var(--color-note-yellow)] p-4 transform -rotate-1 relative sketch-border shadow-sm"
        whileHover={{ scale: 1.02, rotate: 0 }}
      >
        {/* Tape at the top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#ffc3a0] rotate-2 opacity-90" style={{ border: '1px solid rgba(0,0,0,0.1)', clipPath: 'polygon(5% 0, 95% 2%, 100% 90%, 98% 100%, 2% 98%, 0 85%)' }}></div>
        
        <div className="flex justify-between items-start mb-1 mt-1">
          <h3 className="font-hand text-2xl text-[var(--color-ink)]">Today's Goal ⭐</h3>
        </div>
        
        <p className="font-hand text-lg text-[var(--color-ink)] opacity-90 leading-tight max-w-[200px]">
          Stay focused and finish what you started! 💪
        </p>
        
        <div className="mt-2 w-full h-[2px] border-b-2 border-dashed border-[var(--color-ink)] opacity-30"></div>

        {/* Little Boy Doodle */}
        <div className="absolute bottom-0 right-0 w-20 h-28 pointer-events-none text-[var(--color-ink)]">
          <svg viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
            {/* Head */}
            <circle cx="50" cy="30" r="12" fill="var(--color-paper)" />
            <circle cx="46" cy="28" r="1.5" fill="currentColor" />
            <circle cx="54" cy="28" r="1.5" fill="currentColor" />
            <path d="M47 34 Q50 36 53 34" />
            
            {/* Body */}
            <path d="M50 42 L50 80" />
            
            {/* Arms */}
            <path d="M50 50 L30 65" />
            <path d="M50 50 L70 65" />
            
            {/* Legs */}
            <path d="M50 80 L35 110" />
            <path d="M50 80 L65 110" />
            
            {/* Speech Bubble */}
            <path d="M60 20 Q70 0 90 10 Q105 20 90 35 Q80 40 60 20 Z" fill="var(--color-paper)" strokeWidth="1" />
            <text x="75" y="20" fontSize="8" fontFamily="sans-serif" fill="currentColor" className="font-hand">You</text>
            <text x="73" y="28" fontSize="8" fontFamily="sans-serif" fill="currentColor" className="font-hand">got this!</text>
          </svg>
        </div>
      </motion.div>
    </div>
  );
};
