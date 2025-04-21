import React, { useEffect, useRef } from 'react';

interface RainbowFireworkProps {
  x: number;
  y: number;
  onComplete: () => void;
}

const COLORS = [
  '#FF0000', // Red
  '#FF7F00', // Orange
  '#FFFF00', // Yellow
  '#00FF00', // Green
  '#0000FF', // Blue
  '#4B0082', // Indigo
  '#9400D3'  // Violet
];

const RainbowFirework: React.FC<RainbowFireworkProps> = ({ x, y, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
    }> = [];

    // Create more particles for each color
    COLORS.forEach((color, colorIndex) => {
      const particlesPerColor = 15; // Increased from 8
      for (let i = 0; i < particlesPerColor; i++) {
        const angle = (Math.PI * 2 * i) / particlesPerColor + (colorIndex * Math.PI / 4);
        const speed = 6 + Math.random() * 4; // Increased speed for wider spread
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color
        });
      }
    });

    let animationFrame: number;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let allParticlesFaded = true;

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.15; // Increased gravity for more dramatic arcs
        particle.alpha = Math.max(0, particle.alpha - 0.005); // Slower fade for longer duration

        if (particle.alpha > 0) {
          allParticlesFaded = false;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 5, 0, Math.PI * 2); // Increased particle size
        ctx.fillStyle = `${particle.color}${Math.floor(particle.alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      });

      if (allParticlesFaded || elapsed > 5000) { // Increased to 5 seconds
        cancelAnimationFrame(animationFrame);
        onComplete();
        return;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [x, y, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
};

export default RainbowFirework;