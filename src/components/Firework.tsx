import React, { useEffect, useRef } from 'react';

interface FireworkProps {
  color: string;
  x: number;
  y: number;
  onComplete: () => void;
}

const Firework: React.FC<FireworkProps> = ({ color, x, y, onComplete }) => {
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
    }> = [];

    // Create more particles
    for (let i = 0; i < 40; i++) {
      const angle = (Math.PI * 2 * i) / 40;
      const speed = 3 + Math.random() * 2;
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
      });
    }

    let animationFrame: number;
    let startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let allParticlesFaded = true;

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.05; // gravity
        particle.alpha = Math.max(0, particle.alpha - 0.01); // Slower fade

        if (particle.alpha > 0) {
          allParticlesFaded = false;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 4, 0, Math.PI * 2); // Bigger particles
        ctx.fillStyle = `${color}${Math.floor(particle.alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      });

      if (allParticlesFaded || elapsed > 2000) { // Longer duration
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
  }, [color, x, y, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
}

export default Firework;