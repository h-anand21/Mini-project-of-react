import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header/Header';
import PlayerCard from './components/PlayerCard/PlayerCard';
import Board from './components/Board/Board';
import TurnIndicator from './components/Status/TurnIndicator';
import Controls from './components/Controls/Controls';
import Footer from './components/Footer/Footer';
import { calculateWinner } from './utils/calculateWinner';
import chaiIcon from './assets/images/chai.png';
import biscuitIcon from './assets/images/biscuit.png';
import './App.css';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const winInfo = calculateWinner(squares);
  const winner = winInfo ? winInfo.winner : null;
  const isDraw = !winner && squares.every((square) => square !== null);

  const handleClick = (i) => {
    if (squares[i] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    const newWinInfo = calculateWinner(nextSquares);
    if (newWinInfo) {
      setScores((prev) => ({
        ...prev,
        [newWinInfo.winner]: prev[newWinInfo.winner] + 1,
      }));
    }
  };

  const resetRound = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true); // Chai always starts new round
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setScores({ X: 0, O: 0 });
  };

  return (
    <div className="app">
      {winner && <Confetti recycle={false} numberOfPieces={500} gravity={0.2} />}
      <Header />
      
      <TurnIndicator isXNext={xIsNext} />

      <div className="game-layout">
        <PlayerCard 
          player="player1"
          name="Player 1"
          score={scores.X}
          isActive={xIsNext && !winner && !isDraw}
          icon={<img src={chaiIcon} alt="Chai" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />}
        />

        <Board squares={squares} onClick={handleClick} />

        <PlayerCard 
          player="player2"
          name="Player 2"
          score={scores.O}
          isActive={!xIsNext && !winner && !isDraw}
          icon={<img src={biscuitIcon} alt="Biscuit" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />}
        />
      </div>

      <AnimatePresence>
        {(winner || isDraw) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="status-message clay-card"
            style={{ padding: '20px 40px', marginTop: '20px', textAlign: 'center', backgroundColor: 'var(--card)' }}
          >
            <h2 style={{ color: winner === 'X' ? 'var(--tea)' : winner === 'O' ? 'var(--cookie)' : 'var(--dark)', margin: 0 }}>
              {winner ? `🎉 ${winner === 'X' ? 'Chai' : 'Biscuit'} Wins!` : '🤝 Match Draw! Tea Time ☕'}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      <Controls onNewRound={resetRound} onReset={resetGame} />

      <Footer />
    </div>
  );
}

export default App;
