import React from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon, FaCloud } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="flex items-center gap-2 text-[var(--color-ink)] z-50 sketch-border px-3 py-1.5 bg-[var(--color-paper)] relative">
      {/* Tiny tape */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-[#ffc3a0] rotate-2 opacity-90" style={{ border: '1px solid rgba(0,0,0,0.1)', clipPath: 'polygon(5% 0, 95% 2%, 100% 90%, 98% 100%, 2% 98%, 0 85%)' }}></div>
      
      <FaSun className={`text-xl ${theme === 'light' ? 'text-yellow-500' : 'text-gray-400'}`} />
      
      {/* Custom Switch */}
      <div 
        className="w-10 h-5 border-[1.5px] border-[var(--color-ink)] rounded-full relative cursor-pointer bg-[var(--color-paper)]"
        onClick={toggleTheme}
      >
        <motion.div 
          className="w-3.5 h-3.5 bg-[var(--color-ink)] rounded-full absolute top-[1px] left-[1px]"
          animate={{ x: theme === 'dark' ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
      
      <FaMoon className={`text-xl ${theme === 'dark' ? 'text-blue-400' : 'text-gray-400'}`} />
      
      <span className="w-[1px] h-6 bg-gray-300 mx-1"></span>
      <FaCloud className="text-xl text-gray-400" />
    </div>
  );
};
