import React from 'react';
import { Bot, User } from 'lucide-react';
import { Player, GameMode } from '../types/game';

interface GameStatusProps {
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
  gameMode: GameMode;
  isAiThinking: boolean;
  ultimateWinner: Player | null;
}

const GameStatus: React.FC<GameStatusProps> = ({ 
  currentPlayer, 
  winner, 
  isDraw, 
  gameMode, 
  isAiThinking,
  ultimateWinner
}) => {
  const getStatusMessage = () => {
    if (ultimateWinner) {
      return (
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400 mb-2">🏆 Ultimate Victory! 🏆</div>
          <div className="text-lg flex items-center justify-center gap-2">
            {gameMode === 'ai' ? (
              <>
                {ultimateWinner === 'X' ? (
                  <>
                    <User className="w-5 h-5 text-cyan-400" />
                    <span className="font-bold text-cyan-400">You won 3 games first!</span>
                  </>
                ) : (
                  <>
                    <Bot className="w-5 h-5 text-purple-400" />
                    <span className="font-bold text-purple-400">AI won 3 games first!</span>
                  </>
                )}
              </>
            ) : (
              <>
                Player <span className={`font-bold ${ultimateWinner === 'X' ? 'text-cyan-400' : 'text-purple-400'}`}>{ultimateWinner}</span> won 3 games first!
              </>
            )}
          </div>
        </div>
      );
    }

    if (winner) {
      const isAiWinner = gameMode === 'ai' && winner === 'O';
      const isPlayerWinner = gameMode === 'ai' && winner === 'X';
      
      return (
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400 mb-2">🎉 Game Over! 🎉</div>
          <div className="text-lg flex items-center justify-center gap-2">
            {gameMode === 'ai' ? (
              <>
                {isAiWinner && (
                  <>
                    <Bot className="w-5 h-5 text-purple-400" />
                    <span className="font-bold text-purple-400">AI wins!</span>
                  </>
                )}
                {isPlayerWinner && (
                  <>
                    <User className="w-5 h-5 text-cyan-400" />
                    <span className="font-bold text-cyan-400">You win!</span>
                  </>
                )}
              </>
            ) : (
              <>
                Player <span className={`font-bold ${winner === 'X' ? 'text-cyan-400' : 'text-purple-400'}`}>{winner}</span> wins!
              </>
            )}
          </div>
        </div>
      );
    }
    
    if (isDraw) {
      return (
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-400 mb-2">🤝 It's a Draw! 🤝</div>
          <div className="text-lg text-white/80">Great game!</div>
        </div>
      );
    }

    if (isAiThinking) {
      return (
        <div className="text-center">
          <div className="text-lg text-white/80 mb-2">AI is thinking...</div>
          <div className="flex items-center justify-center gap-2">
            <Bot className="w-5 h-5 text-purple-400 animate-pulse" />
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="text-center">
        <div className="text-lg text-white/80 mb-2">Current Turn</div>
        <div className="text-xl font-semibold flex items-center justify-center gap-2">
          {gameMode === 'ai' ? (
            <>
              {currentPlayer === 'X' ? (
                <>
                  <User className="w-5 h-5 text-cyan-400" />
                  <span className="font-bold text-cyan-400">Your turn</span>
                </>
              ) : (
                <>
                  <Bot className="w-5 h-5 text-purple-400" />
                  <span className="font-bold text-purple-400">AI's turn</span>
                </>
              )}
            </>
          ) : (
            <>
              Player <span className={`font-bold ${currentPlayer === 'X' ? 'text-cyan-400' : 'text-purple-400'}`}>{currentPlayer}</span>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="mb-6 bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
      {getStatusMessage()}
    </div>
  );
};

export default GameStatus;