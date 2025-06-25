import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import GameHeader from './GameHeader';
import GameStatus from './GameStatus';
import GameModeSelector from './GameModeSelector';
import { GameState, Player, CellValue, GameMode } from '../types/game';
import { AIPlayer } from '../utils/aiPlayer';

const TicTacToe: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    isDraw: false,
    scores: { X: 0, O: 0, draws: 0 },
    winningLine: null,
    gameMode: 'multiplayer',
    isAiThinking: false,
    ultimateWinner: null
  });

  const aiPlayer = new AIPlayer();

  const checkWinner = (board: CellValue[]): { winner: Player | null; winningLine: number[] | null } => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a] as Player, winningLine: line };
      }
    }

    return { winner: null, winningLine: null };
  };

  const checkUltimateWinner = (scores: { X: number; O: number; draws: number }): Player | null => {
    if (scores.X >= 3) return 'X';
    if (scores.O >= 3) return 'O';
    return null;
  };

  const handleCellClick = (index: number) => {
    if (gameState.board[index] || gameState.winner || gameState.isDraw || gameState.isAiThinking || gameState.ultimateWinner) return;
    
    // In AI mode, only allow human player (X) to click
    if (gameState.gameMode === 'ai' && gameState.currentPlayer === 'O') return;

    makeMove(index, gameState.currentPlayer);
  };

  const makeMove = (index: number, player: Player) => {
    const newBoard = [...gameState.board];
    newBoard[index] = player;

    const { winner, winningLine } = checkWinner(newBoard);
    const isDraw = !winner && newBoard.every(cell => cell !== null);

    const newScores = winner ? {
      ...gameState.scores,
      [winner]: gameState.scores[winner] + 1
    } : isDraw ? {
      ...gameState.scores,
      draws: gameState.scores.draws + 1
    } : gameState.scores;

    const ultimateWinner = checkUltimateWinner(newScores);

    setGameState(prev => ({
      ...prev,
      board: newBoard,
      currentPlayer: player === 'X' ? 'O' : 'X',
      winner,
      isDraw,
      winningLine,
      scores: newScores,
      ultimateWinner
    }));
  };

  // AI move effect
  useEffect(() => {
    if (gameState.gameMode === 'ai' && 
        gameState.currentPlayer === 'O' && 
        !gameState.winner && 
        !gameState.isDraw &&
        !gameState.ultimateWinner) {
      
      setGameState(prev => ({ ...prev, isAiThinking: true }));
      
      // Add delay to make AI thinking visible
      const timer = setTimeout(() => {
        const aiMove = aiPlayer.getBestMove(gameState.board);
        makeMove(aiMove, 'O');
        setGameState(prev => ({ ...prev, isAiThinking: false }));
      }, 800 + Math.random() * 1200); // Random delay between 0.8-2s

      return () => clearTimeout(timer);
    }
  }, [gameState.currentPlayer, gameState.gameMode, gameState.winner, gameState.isDraw, gameState.ultimateWinner]);

  const resetGame = () => {
    if (gameState.ultimateWinner) {
      // Reset everything including scores when there's an ultimate winner
      setGameState(prev => ({
        ...prev,
        board: Array(9).fill(null),
        currentPlayer: 'X',
        winner: null,
        isDraw: false,
        winningLine: null,
        isAiThinking: false,
        scores: { X: 0, O: 0, draws: 0 },
        ultimateWinner: null
      }));
    } else {
      // Just reset the current game
      setGameState(prev => ({
        ...prev,
        board: Array(9).fill(null),
        currentPlayer: 'X',
        winner: null,
        isDraw: false,
        winningLine: null,
        isAiThinking: false
      }));
    }
  };

  const resetScores = () => {
    setGameState(prev => ({
      ...prev,
      scores: { X: 0, O: 0, draws: 0 },
      ultimateWinner: null
    }));
  };

  const handleModeChange = (mode: GameMode) => {
    // Reset everything when switching modes
    setGameState(prev => ({
      ...prev,
      gameMode: mode,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      isDraw: false,
      winningLine: null,
      isAiThinking: false,
      scores: { X: 0, O: 0, draws: 0 },
      ultimateWinner: null
    }));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-6 shadow-2xl border border-white/20">
        <GameHeader 
          scores={gameState.scores} 
          onResetScores={resetScores}
          gameMode={gameState.gameMode}
          ultimateWinner={gameState.ultimateWinner}
        />
        
        <GameModeSelector 
          gameMode={gameState.gameMode}
          onModeChange={handleModeChange}
        />
        
        <GameStatus 
          currentPlayer={gameState.currentPlayer}
          winner={gameState.winner}
          isDraw={gameState.isDraw}
          gameMode={gameState.gameMode}
          isAiThinking={gameState.isAiThinking}
          ultimateWinner={gameState.ultimateWinner}
        />
        
        <GameBoard 
          board={gameState.board}
          onCellClick={handleCellClick}
          winner={gameState.winner}
          isDraw={gameState.isDraw}
          winningLine={gameState.winningLine}
        />
        
        <button
          onClick={resetGame}
          className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
        >
          {gameState.ultimateWinner ? 'Start New Tournament' : 'New Game'}
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;