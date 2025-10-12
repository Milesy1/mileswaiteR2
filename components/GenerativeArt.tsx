'use client';

import { useEffect, useRef } from 'react';

interface GenerativeArtProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function GenerativeArt({ width = 400, height = 400, className = '' }: GenerativeArtProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    // Colors from the original artwork - more accurate
    const colors = [
      '#4FD1C7', // Light teal/mint
      '#FFB4A2', // Light coral/salmon pink  
      '#FFFFFF'  // Pure white
    ];

    const draw = () => {
      // Clear canvas with dark teal background (more accurate to original)
      ctx.fillStyle = '#0F4C3A';
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.min(width, height) * 0.35;

      // Animation time - slower for more hypnotic effect
      timeRef.current += 0.015;

      // Main rotating ribbon system - creates the cylinder effect
      for (let i = 0; i < 150; i++) {
        // Create layered rotation effect
        const baseAngle = (i / 150) * Math.PI * 2;
        const rotationSpeed = timeRef.current * 0.3;
        const angle = baseAngle + rotationSpeed;
        
        // Varying radius creates the 3D cylinder shape
        const radiusVariation = Math.sin(timeRef.current * 0.4 + i * 0.08) * 0.3 + 0.7;
        const radius = maxRadius * radiusVariation;
        
        // Vertical positioning creates the head-like shape
        const verticalOffset = Math.sin(timeRef.current * 0.2 + i * 0.03) * 40;
        const y = centerY + verticalOffset;
        
        // Calculate 3D position
        const x3D = centerX + Math.cos(angle) * radius;
        const z3D = Math.sin(angle) * radius;
        
        // Perspective projection for 3D effect
        const perspective = 400;
        const depth = z3D + 300;
        const scale = perspective / depth;
        
        const screenX = centerX + (x3D - centerX) * scale;
        const screenY = y + (z3D * 0.2) * scale;

        // Ribbon properties - more dynamic
        const ribbonLength = 25 + Math.sin(timeRef.current * 0.8 + i * 0.12) * 8;
        const ribbonWidth = 1.5 + Math.sin(timeRef.current * 0.6 + i * 0.18) * 0.8;
        
        // Color selection - more sophisticated
        const colorPhase = (timeRef.current * 0.3 + i * 0.15) % (Math.PI * 2);
        const colorIndex = Math.floor((Math.sin(colorPhase) + 1) * 1.5);
        const color = colors[colorIndex] || colors[0];
        
        // Opacity based on depth and position
        const depthOpacity = Math.max(0.15, Math.min(0.95, scale * 0.8));
        const positionOpacity = Math.sin(timeRef.current * 0.5 + i * 0.1) * 0.3 + 0.7;
        const finalOpacity = depthOpacity * positionOpacity;
        
        ctx.save();
        ctx.globalAlpha = finalOpacity;
        ctx.strokeStyle = color;
        ctx.lineWidth = ribbonWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Draw ribbon with more organic curves
        ctx.beginPath();
        
        // Create flowing ribbon shape
        const segments = 5;
        for (let s = 0; s <= segments; s++) {
          const t = s / segments;
          const localAngle = angle + Math.sin(timeRef.current * 0.7 + i * 0.1) * 0.3;
          
          const segmentX = screenX + Math.cos(localAngle + t * 0.5) * ribbonLength * (0.5 - Math.abs(t - 0.5));
          const segmentY = screenY + Math.sin(localAngle + t * 0.3) * ribbonLength * 0.3 * Math.sin(t * Math.PI);
          
          if (s === 0) {
            ctx.moveTo(segmentX, segmentY);
          } else {
            ctx.lineTo(segmentX, segmentY);
          }
        }
        
        ctx.stroke();
        ctx.restore();
      }

      // Add floating particles for depth
      for (let i = 0; i < 25; i++) {
        const particleAngle = timeRef.current * 0.6 + i * 0.4;
        const particleRadius = maxRadius * (0.6 + Math.sin(timeRef.current * 0.4 + i) * 0.3);
        
        const particleX = centerX + Math.cos(particleAngle) * particleRadius;
        const particleY = centerY + Math.sin(particleAngle) * particleRadius * 0.4 + 
                         Math.sin(timeRef.current * 0.8 + i * 0.7) * 25;
        
        const particleSize = 1 + Math.sin(timeRef.current * 1.2 + i * 0.5) * 0.5;
        const particleColorIndex = Math.floor((Math.sin(timeRef.current * 0.4 + i * 0.6) + 1) * 1.5);
        const particleColor = colors[particleColorIndex] || colors[0];
        
        ctx.save();
        ctx.globalAlpha = 0.4 + Math.sin(timeRef.current * 0.9 + i) * 0.3;
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [width, height]);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="rounded-lg shadow-2xl"
        style={{ width: '100%', height: 'auto', maxWidth: width }}
      />
    </div>
  );
}
