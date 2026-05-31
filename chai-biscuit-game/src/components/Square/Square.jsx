import React from 'react';
import { motion } from 'framer-motion';

const Square = ({ value, onClick }) => {
  return (
    <button className="cell" onClick={onClick}>
      {value === 'X' && (
        <motion.img
          src="/src/assets/images/chai.png"
          alt="Chai"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="piece-img"
        />
      )}
      {value === 'O' && (
        <motion.img
          src="/src/assets/images/biscuit.png"
          alt="Biscuit"
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="piece-img"
        />
      )}
    </button>
  );
};

export default Square;
