import React, { useEffect } from 'react';

interface SpinningClockProps {
  onComplete: () => void;
}

const SpinningClock: React.FC<SpinningClockProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onComplete();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={handleBackgroundClick}
    >
      <div className="w-[80vmin] h-[80vmin] animate-spin-slow">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Clock face */}
          <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="1" />
          
          {/* Hour markers and numbers */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180); // Start from 12 o'clock
            const numberRadius = 38; // Slightly inside the hour markers
            const x = 50 + numberRadius * Math.cos(angle);
            const y = 50 + numberRadius * Math.sin(angle);
            const number = i === 0 ? 12 : i;
            
            return (
              <g key={i}>
                <line
                  x1="50"
                  y1="10"
                  x2="50"
                  y2="5"
                  stroke="white"
                  strokeWidth="2"
                  transform={`rotate(${i * 30} 50 50)`}
                />
                <text
                  x={x}
                  y={y}
                  fill="white"
                  fontSize="6"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontFamily: 'Arial' }}
                >
                  {number}
                </text>
              </g>
            );
          })}
          
          {/* Minute markers */}
          {[...Array(60)].map((_, i) => (
            <line
              key={`min-${i}`}
              x1="50"
              y1="8"
              x2="50"
              y2="5"
              stroke="white"
              strokeWidth="1"
              transform={`rotate(${i * 6} 50 50)`}
            />
          ))}
          
          {/* Hour hand (pointing to 12) */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="25"
            stroke="white"
            strokeWidth="3"
            transform="rotate(0 50 50)"
          />
          
          {/* Minute hand (pointing to exactly 6 minutes) */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="15"
            stroke="white"
            strokeWidth="2"
            transform="rotate(36 50 50)"
          />
          
          {/* Center dot */}
          <circle cx="50" cy="50" r="3" fill="white" />
        </svg>
      </div>
    </div>
  );
};

export default SpinningClock;