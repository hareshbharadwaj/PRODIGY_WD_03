import React from 'react';
import TicTacToe from './components/TicTacToe';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <AnimatedBackground />
      <div className="relative z-10 w-full max-w-lg p-4">
        <TicTacToe />
      </div>
    </div>
  );
}

export default App;