import React from 'react';
import { motion } from 'framer-motion';

const Square = ({ value, onClick }) => {
  return (
    <motion.button 
      className="cell" 
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {value === 'X' && (
        <motion.img
          src="/src/assets/images/code.png"
          alt="Code"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="piece-img"
        />
      )}
      {value === 'O' && (
        <motion.img
          src="/src/assets/images/bug.png"
          alt="Bug"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="piece-img"
        />
      )}
    </motion.button>
  );
};

export default Square;
