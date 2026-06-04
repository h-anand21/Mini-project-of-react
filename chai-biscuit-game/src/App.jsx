import React, { useState, useEffect } from 'react';
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

// Preload confetti images
const img1 = new Image(); img1.src = '/confetti/IMG_20260601_021641.png';
const img2 = new Image(); img2.src = '/confetti/IMG_20260601_021645.png';
const img3 = new Image(); img3.src = '/confetti/IMG_20260601_025336.png';
const img4 = new Image(); img4.src = '/confetti/IMG_20260601_025539.png';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [theme, setTheme] = useState('orange');
  const [firstPlayer, setFirstPlayer] = useState('X');
  const [matchTarget, setMatchTarget] = useState(5);   // 5 or 10
  const [matchWinner, setMatchWinner] = useState(null); // 'X' or 'O' when match is over
  const [isBotEnabled, setIsBotEnabled] = useState(false);

  const winInfo = calculateWinner(squares);
  const winner = winInfo ? winInfo.winner : null;
  const isDraw = !winner && squares.every((sq) => sq !== null);

  const handleClick = (i) => {
    if (squares[i] || winner || matchWinner) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    const newWinInfo = calculateWinner(nextSquares);
    if (newWinInfo) {
      const newScores = {
        ...scores,
        [newWinInfo.winner]: scores[newWinInfo.winner] + 1,
      };
      setScores(newScores);

      // Check if match is won
      if (newScores[newWinInfo.winner] >= matchTarget) {
        setMatchWinner(newWinInfo.winner);
      }
    }
  };

  useEffect(() => {
    if (isBotEnabled && !xIsNext && !winner && !matchWinner && !isDraw) {
      const timer = setTimeout(() => {
        const emptyIndices = squares.map((sq, i) => sq === null ? i : null).filter(i => i !== null);
        if (emptyIndices.length === 0) return;
        
        let move = -1;
        
        const checkWin = (squaresArray, player) => {
          const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
          ];
          for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squaresArray[a] === player && squaresArray[b] === player && squaresArray[c] === null) return c;
            if (squaresArray[a] === player && squaresArray[c] === player && squaresArray[b] === null) return b;
            if (squaresArray[b] === player && squaresArray[c] === player && squaresArray[a] === null) return a;
          }
          return -1;
        };
        
        // 1. Can Bot win?
        move = checkWin(squares, 'O');
        
        // 2. Can Developer win? Block it.
        if (move === -1) {
          move = checkWin(squares, 'X');
        }
        
        // 3. Take Center if available
        if (move === -1 && squares[4] === null) {
          move = 4;
        }
        
        // 4. Random available move
        if (move === -1) {
          move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        }
        
        if (move !== -1) {
          handleClick(move);
        }
      }, 500); // 500ms delay to feel natural
      
      return () => clearTimeout(timer);
    }
  }, [xIsNext, isBotEnabled, winner, matchWinner, isDraw, squares]);

  const handleFirstPlayerChange = (player) => {
    setFirstPlayer(player);
    setSquares(Array(9).fill(null));
    setXIsNext(player === 'X');
  };

  const handleMatchTargetChange = (val) => {
    setMatchTarget(val);
    setSquares(Array(9).fill(null));
    setXIsNext(firstPlayer === 'X');
    setScores({ X: 0, O: 0 });
    setMatchWinner(null);
  };

  const resetRound = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(firstPlayer === 'X');
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(firstPlayer === 'X');
    setScores({ X: 0, O: 0 });
    setMatchWinner(null);
  };

  // Rain on every round win
  const renderConfetti = () => {
    if (winner === 'X') {
      return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 99 }}>
          <Confetti recycle={false} numberOfPieces={25} gravity={0.2} drawShape={ctx => { ctx.drawImage(img1, -40, -40, 80, 80); }} />
          <Confetti recycle={false} numberOfPieces={25} gravity={0.25} drawShape={ctx => { ctx.drawImage(img2, -40, -40, 80, 80); }} />
          <Confetti recycle={false} numberOfPieces={20} gravity={0.3} drawShape={ctx => { ctx.drawImage(img3, -40, -40, 80, 80); }} />
          <Confetti recycle={false} numberOfPieces={20} gravity={0.22} drawShape={ctx => { ctx.drawImage(img4, -40, -40, 80, 80); }} />
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
            matchTarget={matchTarget}
            isActive={xIsNext && !winner && !isDraw && !matchWinner}
            icon={<img src={`/themes/${theme}/code.png`} alt="Code" />}
          />

          {/* Center Column */}
          <div className="center-column">
            <Header />

            <div className="board-wrapper" style={{ position: 'relative', marginTop: '15px' }}>
              <Board squares={squares} onClick={handleClick} theme={theme} isXNext={xIsNext} />
            </div>

            <div className="bottom-plank">
              <Controls
                onNewRound={resetRound}
                onReset={resetGame}
                firstPlayer={firstPlayer}
                onFirstPlayerChange={handleFirstPlayerChange}
                matchTarget={matchTarget}
                onMatchTargetChange={handleMatchTargetChange}
                isBotEnabled={isBotEnabled}
                onBotChange={setIsBotEnabled}
              />
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
            matchTarget={matchTarget}
            isActive={!xIsNext && !winner && !isDraw && !matchWinner}
            icon={<img src={`/themes/${theme}/bug.png`} alt="Bug" />}
          />
        </div>

        {/* Round Win Popup */}
        <AnimatePresence>
          {(winner || isDraw) && !matchWinner && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, pointerEvents: 'none' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="status-message clay-card"
                style={{ padding: '30px 50px', textAlign: 'center', border: '5px solid var(--wood)', background: 'var(--cream)', pointerEvents: 'auto', boxShadow: '0 20px 50px rgba(0,0,0,0.7)' }}
              >
                <h2 style={{ color: winner === 'X' ? 'var(--neon-green)' : winner === 'O' ? 'var(--neon-red)' : 'var(--wood-dark)', margin: 0, fontSize: '2.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.3)', fontWeight: '900' }}>
                  {winner ? `🎉 ${winner === 'X' ? 'Developer' : 'Bug'} Wins Round!` : '🤝 Draw! Keep Coding 💻'}
                </h2>
                <p style={{ color: '#666', margin: '8px 0 0', fontSize: '1rem' }}>
                  Score: Developer {scores.X} – Bug {scores.O} &nbsp;|&nbsp; First to {matchTarget} wins the match!
                </p>
                <div style={{ marginTop: '20px' }}>
                  <button className="btn btn-green" onClick={resetRound} style={{ margin: '0 auto' }}>
                    🚀 Next Round
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* MATCH WINNER Full-Screen */}
        <AnimatePresence>
          {matchWinner && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="match-winner-overlay"
            >
              {/* Extra confetti for match win */}
              {matchWinner === 'X' ? (
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                  <Confetti recycle={true} numberOfPieces={40} gravity={0.15} drawShape={ctx => { ctx.drawImage(img1, -40, -40, 80, 80); }} />
                  <Confetti recycle={true} numberOfPieces={40} gravity={0.2} drawShape={ctx => { ctx.drawImage(img2, -40, -40, 80, 80); }} />
                  <Confetti recycle={true} numberOfPieces={30} gravity={0.18} drawShape={ctx => { ctx.drawImage(img3, -40, -40, 80, 80); }} />
                  <Confetti recycle={true} numberOfPieces={30} gravity={0.22} drawShape={ctx => { ctx.drawImage(img4, -40, -40, 80, 80); }} />
                </div>
              ) : (
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                  <Confetti recycle={true} numberOfPieces={120} gravity={0.2} drawShape={ctx => { ctx.font='40px sans-serif'; ctx.fillText('🐞', -20, 15); }} />
                  <Confetti recycle={true} numberOfPieces={80} gravity={0.25} drawShape={ctx => { ctx.font='40px sans-serif'; ctx.fillText('🔥', -20, 15); }} />
                </div>
              )}

              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                className="match-winner-card"
              >
                <img
                  src={matchWinner === 'X' ? '/dev.png' : '/bug-win.png'}
                  alt={matchWinner === 'X' ? 'Developer Wins!' : 'Bug Wins!'}
                  className="match-winner-img"
                />
                <p className="match-winner-score">
                  Final Score: Developer {scores.X} – Bug {scores.O}
                </p>
                <button className="btn btn-green" onClick={resetGame} style={{ marginTop: '16px', fontSize: '1.2rem', padding: '14px 40px' }}>
                  🔄 Play Again
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
