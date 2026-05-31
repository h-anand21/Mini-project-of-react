import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Stopwatch } from '../components/Stopwatch/Stopwatch';
import { Timer } from '../components/Timer/Timer';
import { Goals } from '../components/Goals/Goals';
import { Laps } from '../components/Laps/Laps';
import { Notes } from '../components/Notes/Notes';
import { History } from '../components/History/History';
import { ThemeToggle } from '../components/ThemeToggle/ThemeToggle';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <div className="min-h-screen relative overflow-hidden bg-[var(--color-paper)] transition-colors duration-300">
      {/* Extraneous ThemeToggle removed */}
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[220px_1fr_300px] max-w-[1400px] mx-auto h-screen pb-16 md:pb-0 overflow-hidden">
        
        {/* Left Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Section */}
        <div className="flex flex-col gap-3 py-3 px-3 md:py-4 md:px-6 overflow-y-auto relative z-10 custom-scrollbar h-full">
          <div className="flex justify-between items-center mb-1">
            <h2 className="font-hand text-3xl lg:text-4xl text-[var(--color-ink)] relative inline-block">
              {activeTab}
              <span className="absolute -bottom-1 left-0 w-full h-[4px] wave-line block"></span>
            </h2>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <svg className="w-5 h-5 text-yellow-400 transform -rotate-12 hidden md:block" fill="currentColor" stroke="black" strokeWidth="1" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
          </div>
          
          {(activeTab === 'Dashboard' || activeTab === 'Stopwatch') && <Stopwatch />}
          {(activeTab === 'Dashboard' || activeTab === 'Timer') && <Timer />}
          
          {activeTab === 'History' && (
            <History />
          )}
          
          {activeTab === 'Settings' && (
            <div className="sketch-border bg-[var(--color-paper)] p-6 text-center mt-4">
              <h3 className="font-hand text-2xl text-[var(--color-ink)]">Settings (Coming Soon!) ⚙️</h3>
            </div>
          )}
          
          {/* Quote at bottom of main section */}
          <div className="mt-auto pt-2 text-center pb-8 md:pb-12 relative hidden md:block shrink-0 z-20">
            <div className="sketch-border rounded-xl px-4 py-2 bg-[var(--color-btn-purple)] inline-block border-dashed text-[var(--color-ink)] opacity-90 relative shadow-sm">
              <span className="absolute -left-2 -top-2 text-xl text-[var(--color-marker-purple)] font-serif">"</span>
              <p className="font-hand text-sm lg:text-base">Time is what we want most, but what we use worst.</p>
              
              {/* Lightbulb doodle */}
              <svg className="absolute -right-4 -top-3 w-6 h-6 text-yellow-500 transform rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 18h6" />
                <path d="M10 22h4" />
                <path d="M12 2v1" />
                <path d="M12 15a5 5 0 10-5-5" fill="var(--color-paper)" />
              </svg>
            </div>
          </div>
        </div>

        <div className={`flex-col gap-2 py-3 px-3 md:py-4 lg:pr-6 overflow-y-auto relative custom-scrollbar h-full z-10 ${activeTab === 'Dashboard' ? 'flex' : 'hidden lg:flex'}`}>
          <Goals />
          <Laps setActiveTab={setActiveTab} />
          <Notes />
          
          {/* Potted Plant Doodle in Right Panel empty space */}
          <div className="mt-auto pt-6 pb-20 flex justify-center opacity-70 shrink-0 pointer-events-none hidden xl:flex">
            <svg className="w-24 h-24 text-[var(--color-ink)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M30 90 L 70 90 L 65 60 L 35 60 Z" fill="var(--color-paper)" />
              <path d="M35 60 Q 50 50 50 30" />
              <path d="M50 30 Q 30 20 20 40 Q 30 50 50 40" fill="var(--color-note-green)" />
              <path d="M50 45 Q 70 30 80 50 Q 60 60 50 55" fill="var(--color-note-green)" />
              <path d="M50 60 Q 20 60 10 80 Q 30 90 45 65" fill="var(--color-note-green)" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Global Landscape Doodles at the bottom */}
      <div className="fixed bottom-0 left-0 w-full h-24 pointer-events-none z-0 overflow-hidden flex justify-between items-end px-10 pb-1 hidden md:flex">
        <svg className="w-full h-full absolute bottom-0 left-0 text-ink" viewBox="0 0 1000 100" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Hills */}
          <path d="M-50,100 Q 150,50 350,100" />
          <path d="M250,100 Q 500,60 750,100" />
          <path d="M650,100 Q 850,70 1050,100" />
          
          {/* Grass details */}
          <path d="M 100,90 L102,85 L104,92 M 104,92 L106,83 L108,90" />
          <path d="M 400,95 L402,90 L404,97" />
          <path d="M 800,92 L802,86 L804,94 M 804,94 L806,85 L808,92" />
        </svg>
        
        {/* Flower Right */}
        <svg className="absolute bottom-2 right-20 w-12 h-20 text-ink" viewBox="0 0 50 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M25 100 Q 30 70 25 40" />
          <path d="M25 70 Q 15 65 15 55" fill="var(--color-paper)" />
          <path d="M25 65 Q 35 60 35 50" fill="var(--color-paper)" />
          {/* Petals */}
          <circle cx="25" cy="40" r="5" fill="#ffd9e2" />
          <circle cx="20" cy="35" r="5" fill="#ffd9e2" />
          <circle cx="30" cy="35" r="5" fill="#ffd9e2" />
          <circle cx="20" cy="45" r="5" fill="#ffd9e2" />
          <circle cx="30" cy="45" r="5" fill="#ffd9e2" />
          <circle cx="25" cy="40" r="2" fill="yellow" />
        </svg>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[var(--color-paper)] border-t-2 border-[var(--color-ink)] z-50 flex justify-around p-3 pb-safe">
        {[
          { name: 'Dashboard', icon: '🏠' },
          { name: 'Stopwatch', icon: '⏱️' },
          { name: 'Timer', icon: '⏳' },
          { name: 'History', icon: '📊' },
          { name: 'Settings', icon: '⚙️' }
        ].map((item, index) => (
          <div 
            key={index} 
            onClick={() => setActiveTab(item.name)}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-transform ${activeTab === item.name ? 'scale-110 opacity-100' : 'opacity-50'}`}
          >
            <span className="text-2xl">{item.icon}</span>
            {activeTab === item.name && <div className="w-1 h-1 rounded-full bg-[var(--color-ink)]"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
