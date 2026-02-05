'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AmbientEffectProps {
  type: 'none' | 'snow' | 'rain';
}

interface Drop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  layer: number;
}

interface Snowflake {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  wobbleOffset: number;
  wobbleSpeed: number;
  rotation: number;
  rotationSpeed: number;
  layer: number;
}

const AmbientEffect: React.FC<AmbientEffectProps> = ({ type }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (type === 'none') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    let animationId: number;
    let tick = 0;

    // --- Rain Setup ---
    const rainDrops: Drop[] = [];
    const rainCount = 150;
    const rainAngleRad = (15 * Math.PI) / 180;
    
    // --- Snow Setup ---
    const snowFlakes: Snowflake[] = [];
    const snowCount = 150;
    const snowLayers = [
      { speed: 0.3, minSize: 1, maxSize: 2.5, opacity: 0.4 },
      { speed: 0.6, minSize: 2, maxSize: 4, opacity: 0.6 },
      { speed: 1, minSize: 3, maxSize: 6, opacity: 0.9 },
    ];

    if (type === 'rain') {
      for (let i = 0; i < rainCount; i++) {
        const layer = i < rainCount * 0.3 ? 0 : i < rainCount * 0.6 ? 1 : 2;
        const config = [
          { speed: 12, length: 15, opacity: 0.2 },
          { speed: 18, length: 20, opacity: 0.35 },
          { speed: 25, length: 28, opacity: 0.5 },
        ][layer];
        rainDrops.push({
          x: Math.random() * (canvas.width + 100) - 50,
          y: Math.random() * canvas.height,
          length: config.length + Math.random() * 10,
          speed: config.speed + Math.random() * 5,
          opacity: config.opacity + Math.random() * 0.1,
          layer,
        });
      }
    } else if (type === 'snow') {
      for (let i = 0; i < snowCount; i++) {
        const layer = i < snowCount * 0.4 ? 0 : i < snowCount * 0.75 ? 1 : 2;
        const config = snowLayers[layer];
        snowFlakes.push({
          x: Math.random() * (canvas.width + 100) - 50,
          y: Math.random() * canvas.height,
          size: config.minSize + Math.random() * (config.maxSize - config.minSize),
          speed: config.speed * (0.8 + Math.random() * 0.4),
          opacity: config.opacity * (0.8 + Math.random() * 0.2),
          wobbleOffset: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.02 + Math.random() * 0.02,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          layer,
        });
      }
      snowFlakes.sort((a, b) => a.layer - b.layer);
    }

    let nextLightning = Date.now() + 3000 + Math.random() * 5000;

    const animate = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (type === 'rain') {
        const lightning = true;
        const flash = flashRef.current;
        if (lightning && Date.now() > nextLightning) {
          if (flash) {
            flash.style.opacity = "0.4";
            setTimeout(() => { if (flash) flash.style.opacity = "0.1"; }, 50);
            setTimeout(() => { if (flash) flash.style.opacity = "0"; }, 150);
          }
          nextLightning = Date.now() + 5000 + Math.random() * 10000;
        }

        ctx.strokeStyle = "rgba(174, 194, 224, 0.4)";
        ctx.lineCap = 'round';
        for (const drop of rainDrops) {
          drop.y += drop.speed;
          drop.x += Math.sin(rainAngleRad) * drop.speed;
          if (drop.y > canvas.height + 50) {
            drop.y = -drop.length - Math.random() * 100;
            drop.x = Math.random() * (canvas.width + 100) - 50;
          }
          ctx.globalAlpha = drop.opacity;
          ctx.lineWidth = drop.layer === 2 ? 1.5 : drop.layer === 1 ? 1 : 0.5;
          ctx.beginPath();
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x + Math.sin(rainAngleRad) * drop.length, drop.y + Math.cos(rainAngleRad) * drop.length);
          ctx.stroke();
        }
      } else if (type === 'snow') {
        const wind = 0.3;
        const speedMult = 1;
        for (const flake of snowFlakes) {
          flake.y += flake.speed * speedMult * 1.5;
          const wobble = Math.sin(tick * flake.wobbleSpeed + flake.wobbleOffset) * 0.5;
          flake.x += wobble + wind * flake.speed * speedMult;
          flake.rotation += flake.rotationSpeed * speedMult;

          if (flake.y > canvas.height + 20) {
            flake.y = -10 - Math.random() * 50;
            flake.x = Math.random() * (canvas.width + 100) - 50;
          }
          if (flake.x < -50) flake.x = canvas.width + 50;
          if (flake.x > canvas.width + 50) flake.x = -50;

          ctx.save();
          ctx.translate(flake.x, flake.y);
          ctx.rotate(flake.rotation);
          ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
          ctx.shadowBlur = flake.size * 2;
          ctx.globalAlpha = flake.opacity;
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          ctx.beginPath();
          ctx.arc(0, 0, flake.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', updateSize);
    };
  }, [type]);

  if (type === 'none') return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[100] overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {type === 'rain' && (
        <>
          <div
            ref={flashRef}
            className="absolute inset-0 bg-blue-100 opacity-0 transition-opacity duration-100 mix-blend-screen"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-zinc-950/20 to-transparent" />
        </>
      )}
      {type === 'snow' && (
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-zinc-200/10 to-transparent" />
      )}
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_50%,rgba(0,0,0,0.2)_100%)]" />
    </div>
  );
};

export default AmbientEffect;
