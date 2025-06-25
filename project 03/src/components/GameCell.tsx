import React, { useState } from 'react';
import { CellValue } from '../types/game';

interface GameCellProps {
  value: CellValue;
  onClick: () => void;
  isWinning: boolean;
  isDisabled: boolean;
}

const GameCell: React.FC<GameCellProps> = ({ value, onClick, isWinning, isDisabled }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getCellContent = () => {
    if (value === 'X') {
      return (
        <div className="relative w-8 h-8 flex items-center justify-center">
          {/* First line of X */}
          <div className="absolute w-8 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 transform rotate-45 rounded-full shadow-lg shadow-cyan-400/50"></div>
          {/* Second line of X */}
          <div className="absolute w-8 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 transform -rotate-45 rounded-full shadow-lg shadow-cyan-400/50"></div>
        </div>
      );
    }
    
    if (value === 'O') {
      return (
        <div className="w-8 h-8 border-4 border-purple-500 rounded-full bg-gradient-to-br from-purple-400/20 to-purple-600/20 shadow-lg"></div>
      );
    }

    return null;
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={isDisabled || value !== null}
      className={`
        aspect-square bg-white/5 backdrop-blur-sm rounded-xl border border-white/10
        transition-all duration-300 transform hover:scale-105 active:scale-95
        flex items-center justify-center relative overflow-hidden min-h-[80px]
        ${isWinning ? 'bg-gradient-to-br from-yellow-400/30 to-orange-500/30 shadow-lg shadow-yellow-400/20' : ''}
        ${isHovered && !value && !isDisabled ? 'bg-white/10 shadow-lg' : ''}
        ${!isDisabled && !value ? 'hover:shadow-xl hover:border-white/20 cursor-pointer' : ''}
        ${isDisabled ? 'cursor-not-allowed' : ''}
      `}
    >
      {/* Hover effect overlay */}
      {isHovered && !value && !isDisabled && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-xl"></div>
      )}
      
      {/* Winning animation */}
      {isWinning && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-xl"></div>
      )}
      
      {/* Cell content */}
      <div className={`transform transition-all duration-500 ${value ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}>
        {getCellContent()}
      </div>
      
      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </button>
  );
};

export default GameCell;