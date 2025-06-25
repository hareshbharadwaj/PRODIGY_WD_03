import React from 'react';
import { RotateCcw, Trophy, Bot, User, Crown } from 'lucide-react';
import { Scores, GameMode, Player } from '../types/game';

interface GameHeaderProps {
  scores: Scores;
  onResetScores: () => void;
  gameMode: GameMode;
  ultimateWinner: Player | null;
}

const GameHeader: React.FC<GameHeaderProps> = ({ scores, onResetScores, gameMode, ultimateWinner }) => {
  const isUltimateWinnerX = ultimateWinner === 'X';
  const isUltimateWinnerO = ultimateWinner === 'O';

  return (
    <div className="text-center mb-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
        Tic Tac Toe
      </h1>
      
      {ultimateWinner && (
        <div className="mb-4 p-4 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl border border-yellow-400/30">
          <div className="flex items-center justify-center gap-2 text-yellow-400 text-xl font-bold">
            <Crown className="w-6 h-6" />
            <span>
              {gameMode === 'ai' 
                ? (ultimateWinner === 'X' ? 'You are the Ultimate Winner!' : 'AI is the Ultimate Winner!')
                : `Player ${ultimateWinner} is the Ultimate Winner!`
              }
            </span>
            <Crown className="w-6 h-6" />
          </div>
          <div className="text-sm text-yellow-300 mt-1">First to win 3 games!</div>
        </div>
      )}
      
      <div className="flex justify-between items-center bg-white/5 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
        <div className="flex items-center space-x-6">
          <div className="text-center relative">
            {isUltimateWinnerX && (
              <div className="absolute -top-2 -right-2 text-yellow-400">
                <Crown className="w-4 h-4" />
              </div>
            )}
            <div className="flex items-center justify-center gap-1 mb-1">
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">X</div>
              {gameMode === 'ai' && <User className="w-4 h-4 text-cyan-400" />}
            </div>
            <div className="text-sm text-white/70">
              {gameMode === 'ai' ? 'You' : 'Player 1'}
            </div>
            <div className="text-lg font-semibold text-white">{scores.X}</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            <div className="text-sm text-white/70 mt-1">Draws</div>
            <div className="text-lg font-semibold text-white">{scores.draws}</div>
          </div>
          
          <div className="text-center relative">
            {isUltimateWinnerO && (
              <div className="absolute -top-2 -right-2 text-yellow-400">
                <Crown className="w-4 h-4" />
              </div>
            )}
            <div className="flex items-center justify-center gap-1 mb-1">
              <div className="text-2xl font-bold text-purple-400">O</div>
              {gameMode === 'ai' && <Bot className="w-4 h-4 text-purple-400" />}
            </div>
            <div className="text-sm text-white/70">
              {gameMode === 'ai' ? 'AI' : 'Player 2'}
            </div>
            <div className="text-lg font-semibold text-white">{scores.O}</div>
          </div>
        </div>
        
        <button
          onClick={onResetScores}
          className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all duration-300 transform hover:scale-110 active:scale-95"
          title="Reset Scores"
        >
          <RotateCcw className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default GameHeader;