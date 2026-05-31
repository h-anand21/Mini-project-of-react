import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header/Header';
import PlayerCard from './components/PlayerCard/PlayerCard';
import Board from './components/Board/Board';
import TurnIndicator from './components/Status/TurnIndicator';
import Controls from './components/Controls/Controls';
import Footer from './components/Footer/Footer';
import ThemeSelector from './components/ThemeSelector/ThemeSelector';
import { calculateWinner } from './utils/calculateWinner';
import './App.css';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [theme, setTheme] = useState('orange');

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
    setXIsNext(true); // Developer always starts new round
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setScores({ X: 0, O: 0 });
  };

  const renderConfetti = () => {
    if (winner === 'X') {
      return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 99 }}>
          <Confetti recycle={false} numberOfPieces={100} gravity={0.25} drawShape={ctx => { ctx.font='35px sans-serif'; ctx.fillText('☕', -15, 10); }} />
          <Confetti recycle={false} numberOfPieces={100} gravity={0.25} drawShape={ctx => { ctx.font='35px sans-serif'; ctx.fillText('🍪', -15, 10); }} />
          <Confetti recycle={false} numberOfPieces={80} gravity={0.25} drawShape={ctx => { ctx.font='35px sans-serif'; ctx.fillText('💻', -15, 10); }} />
        </div>
      );
    } else if (winner === 'O') {
      return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 99 }}>
          <Confetti recycle={false} numberOfPieces={100} gravity={0.25} drawShape={ctx => { ctx.font='35px sans-serif'; ctx.fillText('🐞', -15, 10); }} />
          <Confetti recycle={false} numberOfPieces={100} gravity={0.25} drawShape={ctx => { ctx.font='35px sans-serif'; ctx.fillText('💥', -15, 10); }} />
          <Confetti recycle={false} numberOfPieces={80} gravity={0.25} drawShape={ctx => { ctx.font='35px sans-serif'; ctx.fillText('🔥', -15, 10); }} />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="app-container" data-theme={theme}>
      <ThemeSelector currentTheme={theme} onThemeChange={setTheme} />
      <div className="bg-decorations"></div>
      
      {renderConfetti()}
      
      <div className="game-content">
        <div className="game-layout">
          {/* Left Column */}
          <PlayerCard 
            player="player1"
            playerNumber="PLAYER 1"
            name="Developer"
            subtitle="Code"
            score={scores.X}
            isActive={xIsNext && !winner && !isDraw}
            icon={<img src={`/themes/${theme}/code.png`} alt="Code" />}
          />

          {/* Center Column */}
          <div className="center-column">
            <Header />
            
            <div style={{ position: 'relative', marginTop: '15px' }}>
              <TurnIndicator isXNext={xIsNext} />
              <Board squares={squares} onClick={handleClick} theme={theme} />
            </div>

            <div className="bottom-plank">
              <Controls onNewRound={resetRound} onReset={resetGame} />
              <Footer />
            </div>
          </div>

          {/* Right Column */}
          <PlayerCard 
            player="player2"
            playerNumber="PLAYER 2"
            name="Bug"
            subtitle="Bug"
            score={scores.O}
            isActive={!xIsNext && !winner && !isDraw}
            icon={<img src={`/themes/${theme}/bug.png`} alt="Bug" />}
          />
        </div>

        <AnimatePresence>
          {(winner || isDraw) && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, pointerEvents: 'none' }}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="status-message clay-card"
                style={{ padding: '30px 50px', textAlign: 'center', border: '5px solid var(--wood)', background: 'var(--cream)', pointerEvents: 'auto', boxShadow: '0 20px 50px rgba(0,0,0,0.7)' }}
              >
                <h2 style={{ color: winner === 'X' ? 'var(--neon-green)' : winner === 'O' ? 'var(--neon-red)' : 'var(--wood-dark)', margin: 0, fontSize: '2.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.3)', fontWeight: '900' }}>
                  {winner ? `🎉 ${winner === 'X' ? 'Developer' : 'Bug'} Wins!` : '🤝 Match Draw! Keep Coding 💻'}
                </h2>
                <div style={{ marginTop: '20px' }}>
                  <button className="btn btn-primary" onClick={resetRound} style={{ margin: '0 auto' }}>
                    🚀 New Commit (Next Round)
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
