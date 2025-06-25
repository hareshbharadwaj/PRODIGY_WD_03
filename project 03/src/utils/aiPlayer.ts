import { CellValue, Player } from '../types/game';

export class AIPlayer {
  private readonly player: Player = 'O';
  private readonly opponent: Player = 'X';

  // Main AI move function
  public getBestMove(board: CellValue[]): number {
    // First, try to win
    const winMove = this.findWinningMove(board, this.player);
    if (winMove !== -1) return winMove;

    // Second, block opponent from winning
    const blockMove = this.findWinningMove(board, this.opponent);
    if (blockMove !== -1) return blockMove;

    // Third, use minimax for optimal play
    const bestMove = this.minimax(board, 0, false, -Infinity, Infinity);
    return bestMove.index;
  }

  // Find a winning move for the given player
  private findWinningMove(board: CellValue[], player: Player): number {
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const testBoard = [...board];
        testBoard[i] = player;
        if (this.checkWinner(testBoard) === player) {
          return i;
        }
      }
    }
    return -1;
  }

  // Minimax algorithm with alpha-beta pruning
  private minimax(
    board: CellValue[], 
    depth: number, 
    isMaximizing: boolean, 
    alpha: number, 
    beta: number
  ): { score: number; index: number } {
    const winner = this.checkWinner(board);
    
    // Terminal states
    if (winner === this.player) return { score: 10 - depth, index: -1 };
    if (winner === this.opponent) return { score: depth - 10, index: -1 };
    if (this.isBoardFull(board)) return { score: 0, index: -1 };

    const availableMoves = this.getAvailableMoves(board);
    let bestMove = { score: isMaximizing ? -Infinity : Infinity, index: -1 };

    for (const move of availableMoves) {
      const newBoard = [...board];
      newBoard[move] = isMaximizing ? this.player : this.opponent;

      const result = this.minimax(newBoard, depth + 1, !isMaximizing, alpha, beta);

      if (isMaximizing) {
        if (result.score > bestMove.score) {
          bestMove = { score: result.score, index: move };
        }
        alpha = Math.max(alpha, result.score);
      } else {
        if (result.score < bestMove.score) {
          bestMove = { score: result.score, index: move };
        }
        beta = Math.min(beta, result.score);
      }

      // Alpha-beta pruning
      if (beta <= alpha) break;
    }

    return bestMove;
  }

  // Check for winner
  private checkWinner(board: CellValue[]): Player | null {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a] as Player;
      }
    }

    return null;
  }

  // Check if board is full
  private isBoardFull(board: CellValue[]): boolean {
    return board.every(cell => cell !== null);
  }

  // Get available moves
  private getAvailableMoves(board: CellValue[]): number[] {
    return board.map((cell, index) => cell === null ? index : -1).filter(index => index !== -1);
  }
}