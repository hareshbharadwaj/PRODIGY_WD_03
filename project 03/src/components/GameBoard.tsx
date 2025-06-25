import React from 'react';
import GameCell from './GameCell';
import { CellValue, Player } from '../types/game';

interface GameBoardProps {
  board: CellValue[];
  onCellClick: (index: number) => void;
  winner: Player | null;
  isDraw: boolean;
  winningLine: number[] | null;
}

const GameBoard: React.FC<GameBoardProps> = ({
  board,
  onCellClick,
  winner,
  isDraw,
  winningLine
}) => {
  return (
    <div className="grid grid-cols-3 gap-3 p-4">
      {board.map((cell, index) => (
        <GameCell
          key={index}
          value={cell}
          onClick={() => onCellClick(index)}
          isWinning={winningLine?.includes(index) || false}
          isDisabled={winner !== null || isDraw}
        />
      ))}
    </div>
  );
};

export default GameBoard;