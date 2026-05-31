import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TurnIndicator.css';

const TurnIndicator = ({ isXNext, theme }) => {
  return (
    <div className="turn-container">
      <AnimatePresence mode="wait">
        {isXNext ? (
          <motion.div
            key="code"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="turn code-turn"
          >
            <span className="turn-icon">💻</span> Developer's Turn
          </motion.div>
        ) : (
          <motion.div
            key="bug"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="turn bug-turn"
          >
            <span className="turn-icon">🐞</span> Bug's Turn
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TurnIndicator;
