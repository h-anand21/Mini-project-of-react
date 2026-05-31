import React from 'react';
import { motion } from 'framer-motion';
import { FaStopwatch } from 'react-icons/fa';

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { name: 'Dashboard', icon: '🏠' },
    { name: 'Stopwatch', icon: '⏱️' },
    { name: 'Timer', icon: '⏳' },
    { name: 'History', icon: '📊' },
    { name: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="hidden md:block notebook-spiral h-screen sticky top-0 z-10">
      <div className="pl-6 md:pl-8 pr-4 md:pr-6 py-4 md:py-6 h-full flex flex-col">
        
        <div className="mb-4 lg:mb-6">
          <h1 className="font-hand text-3xl flex items-center gap-2 mb-1 text-[var(--color-ink)]">
            <FaStopwatch className="text-2xl" /> TimeSketch
          </h1>
          <p className="font-hand text-[var(--color-ink)] opacity-70 text-xs italic transform -rotate-1 ml-4 inline-block relative">
            Track Time, Achieve More
            <span className="absolute -bottom-2 left-0 w-full h-[4px] wave-line block"></span>
          </p>
        </div>

        <nav className="space-y-1.5 flex-1 mt-2">
          {menuItems.map((item, index) => {
            const isActive = activeTab === item.name;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(item.name)}
                className={`font-hand text-xl px-3 py-1.5 rounded-lg cursor-pointer flex items-center gap-3 transition-colors relative z-10 ${
                  isActive ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink)] opacity-70 hover:opacity-100'
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-[var(--color-btn-yellow)] rounded-lg transform -rotate-1 -z-10 opacity-80"></div>
                )}
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </motion.div>
            );
          })}
        </nav>

        <div className="mt-auto relative pb-2 shrink-0">
          {/* Signpost Doodle */}
          <svg className="w-28 h-20 text-[var(--color-ink)] opacity-80 mb-4" viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M50 78 L50 40 M30 40 L70 40 L80 30 L70 20 L30 20 Z" fill="var(--color-paper)" />
            <path d="M45 40 L45 20 M55 40 L55 20" />
            <path d="M0 78 Q20 68 40 78 T80 73 T100 78" strokeWidth="1" strokeDasharray="3 3"/>
            <circle cx="20" cy="68" r="1" fill="currentColor"/>
            <circle cx="80" cy="73" r="1" fill="currentColor"/>
            <path d="M70 15 Q75 5 80 15" />
          </svg>
          
          <div className="flex items-center gap-2 text-[var(--color-ink)]">
            <div className="w-10 h-10 bg-[var(--color-btn-purple)] rounded-full flex items-center justify-center text-xl border-2 border-[var(--color-ink)] overflow-hidden">
              <span className="translate-y-1">👦</span>
            </div>
            <div>
              <p className="font-hand text-base leading-tight">Hello, Developer!</p>
              <p className="font-hand text-xs opacity-70">Stay productive 🚀</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
