import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaPlus, FaCheck } from 'react-icons/fa';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const Notes = () => {
  const [notes, setNotes] = useLocalStorage('quick_notes', [
    { id: 1, text: 'Drink water', completed: false },
    { id: 2, text: 'Take break after 1 hour', completed: false },
    { id: 3, text: "Don't forget to exercise", completed: false }
  ]);
  const [inputValue, setInputValue] = useState('');

  const addNote = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setNotes([...notes, { id: Date.now(), text: inputValue.trim(), completed: false }]);
      setInputValue('');
    }
  };

  const toggleComplete = (id) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, completed: !note.completed } : note
    ));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <motion.div 
      className="bg-[var(--color-note-pink)] p-4 transform rotate-1 relative sketch-border shadow-sm mt-1 shrink-0 flex flex-col max-h-[320px] min-h-[200px]"
      whileHover={{ scale: 1.02, rotate: 0 }}
    >
      {/* Tape */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#ffc3a0] rotate-2 opacity-90" style={{ border: '1px solid rgba(0,0,0,0.1)', clipPath: 'polygon(5% 0, 95% 2%, 100% 90%, 98% 100%, 2% 98%, 0 85%)' }}></div>
      
      <div className="flex items-center gap-1 mb-2 mt-1 shrink-0">
        <span className="text-lg">📋</span>
        <h3 className="font-hand text-xl text-[var(--color-ink)] leading-none py-1">Quick Notes</h3>
      </div>
      
      {/* Todo List */}
      <div className="overflow-y-auto custom-scrollbar flex-1 pr-2 mb-3">
        <AnimatePresence>
          {notes.length === 0 ? (
            <p className="font-hand text-sm opacity-60 text-center italic mt-4 text-[var(--color-ink)]">No notes yet!</p>
          ) : (
            notes.map((note) => (
              <motion.div 
                key={note.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-start justify-between gap-2 mb-2 group"
              >
                <div className="flex items-start gap-2 flex-1 cursor-pointer" onClick={() => toggleComplete(note.id)}>
                  <div className={`mt-1 w-4 h-4 sketch-border flex items-center justify-center shrink-0 transition-colors ${note.completed ? 'bg-[var(--color-ink)]' : 'bg-transparent'}`}>
                    {note.completed && <FaCheck className="text-[var(--color-paper)] text-[10px]" />}
                  </div>
                  <span className={`font-hand text-[1rem] leading-tight text-[var(--color-ink)] transition-all ${note.completed ? 'opacity-50 line-through decoration-wavy decoration-red-400' : 'opacity-90'}`}>
                    {note.text}
                  </span>
                </div>
                <button 
                  onClick={() => deleteNote(note.id)}
                  className="opacity-0 group-hover:opacity-50 hover:!opacity-100 text-red-500 transition-opacity mt-1 shrink-0"
                >
                  <FaTrash className="text-xs" />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Input Form */}
      <form onSubmit={addNote} className="flex items-center gap-2 mt-auto shrink-0 relative z-20">
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Jot down a task..."
          className="w-full bg-transparent border-b-2 border-dashed border-[var(--color-ink)] border-opacity-30 outline-none font-hand text-base text-[var(--color-ink)] placeholder-[var(--color-ink)] placeholder-opacity-40 py-1"
        />
        <button type="submit" className="text-[var(--color-ink)] opacity-60 hover:opacity-100 transition-opacity p-1 shrink-0">
          <FaPlus />
        </button>
      </form>

      {/* Decorative Paper Plane Doodle */}
      <svg className="absolute -bottom-2 right-1 w-12 h-12 text-[var(--color-ink)] opacity-40 pointer-events-none z-10 hidden lg:block" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M80 20 L20 40 L45 55 L80 20 Z" fill="var(--color-paper)" />
        <path d="M80 20 L55 80 L45 55" fill="var(--color-paper)" />
        <path d="M45 55 L55 70 L55 60 Z" fill="var(--color-ink)" opacity="0.1" />
        <path d="M15 85 Q30 90 40 70 T40 45" strokeWidth="1" strokeDasharray="3 3"/>
      </svg>
    </motion.div>
  );
};
