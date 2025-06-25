import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Primary Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
      
      {/* Animated Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-gradient-x"></div>
      <div className="absolute inset-0 bg-gradient-to-l from-cyan-600/10 via-blue-600/10 to-indigo-600/10 animate-gradient-y"></div>
      
      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-2xl animate-float"></div>
        
        {/* Rotating geometric shapes */}
        <div className="absolute top-1/6 right-1/3 w-32 h-32 bg-gradient-to-r from-yellow-400/5 to-orange-500/5 transform rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-1/4 left-1/6 w-24 h-24 bg-gradient-to-r from-green-400/5 to-teal-500/5 transform rotate-12 animate-bounce-slow"></div>
        <div className="absolute top-1/3 left-1/5 w-16 h-16 bg-gradient-to-r from-pink-400/8 to-purple-500/8 transform animate-pulse"></div>
        
        {/* Moving particles */}
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 4}s`
            }}
          ></div>
        ))}
        
        {/* Larger glowing particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`glow-${i}`}
            className="absolute w-3 h-3 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full animate-float-glow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Mesh gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(120,219,255,0.1),transparent_50%)]"></div>
      
      {/* Animated wave effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-wave"></div>
      </div>
    </div>
  );
};

export default AnimatedBackground;