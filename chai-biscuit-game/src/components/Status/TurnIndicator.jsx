import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TurnIndicator.css';

const TurnIndicator = ({ isXNext }) => {
  return (
    <div className="turn-container">
      <AnimatePresence mode="wait">
        {isXNext ? (
          <motion.div
            key="chai"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="turn chai-turn"
          >
            ☕ Player 1 (Chai) Turn
          </motion.div>
        ) : (
          <motion.div
            key="biscuit"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="turn biscuit-turn"
          >
            🍪 Player 2 (Biscuit) Turn
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TurnIndicator;
