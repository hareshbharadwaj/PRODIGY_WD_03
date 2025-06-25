import React from 'react';
import { Bot, Users } from 'lucide-react';
import { GameMode } from '../types/game';

interface GameModeSelectorProps {
  gameMode: GameMode;
  onModeChange: (mode: GameMode) => void;
}

const GameModeSelector: React.FC<GameModeSelectorProps> = ({ gameMode, onModeChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-white/90 mb-3 text-center">Game Mode</h3>
      <div className="flex gap-3">
        <button
          onClick={() => onModeChange('multiplayer')}
          className={`
            flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl
            transition-all duration-300 transform hover:scale-105 active:scale-95
            ${gameMode === 'multiplayer' 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
              : 'bg-white/10 text-white/70 hover:bg-white/20'
            }
          `}
        >
          <Users className="w-5 h-5" />
          <span className="font-medium">2 Players</span>
        </button>
        
        <button
          onClick={() => onModeChange('ai')}
          className={`
            flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl
            transition-all duration-300 transform hover:scale-105 active:scale-95
            ${gameMode === 'ai' 
              ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg' 
              : 'bg-white/10 text-white/70 hover:bg-white/20'
            }
          `}
        >
          <Bot className="w-5 h-5" />
          <span className="font-medium">vs AI</span>
        </button>
      </div>
    </div>
  );
};

export default GameModeSelector;