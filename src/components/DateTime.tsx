import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import SpinningClock from './SpinningClock';

function DateTime() {
  const [date, setDate] = useState(new Date());
  const [showClock, setShowClock] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="flex items-center gap-2 text-gray-600">
      <button 
        onClick={() => setShowClock(true)} 
        className="hover:text-gray-800 transition-colors cursor-pointer"
      >
        <Clock size={20} />
      </button>
      <span>{formatDate(date)}</span>
      <span className="font-mono">{formatTime(date)}</span>
      
      {showClock && <SpinningClock onComplete={() => setShowClock(false)} />}
    </div>
  );
}

export default DateTime;