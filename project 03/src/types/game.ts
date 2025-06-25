export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type GameMode = 'multiplayer' | 'ai';

export interface Scores {
  X: number;
  O: number;
  draws: number;
}

export interface GameState {
  board: CellValue[];
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
  scores: Scores;
  winningLine: number[] | null;
  gameMode: GameMode;
  isAiThinking: boolean;
  ultimateWinner: Player | null;
}