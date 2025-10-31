"use client";

import React, { useEffect, useRef } from "react";

export interface LyapunovPoint {
  value: number;
  created_at?: string;
}

export interface LogisticLyapunovChartProps {
  points: LyapunovPoint[];
}

export default function LogisticLyapunovChart({ points }: LogisticLyapunovChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || points.length === 0) return;
    
    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const width = canvas.clientWidth * dpr;
      const height = canvas.clientHeight * dpr;
      canvas.width = width;
      canvas.height = height;

      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.scale(dpr, dpr);
      
      ctx.fillStyle = '#181828';
      ctx.fillRect(0, 0, width/dpr, height/dpr);

      const padding = 50;
      const chartWidth = width/dpr - padding * 2;
      const chartHeight = height/dpr - padding * 2;
      
      const values = points.map(p => p.value);
      const minVal = Math.min(...values, -1);
      const maxVal = Math.max(...values, 1);
      const range = maxVal - minVal || 1;

      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(padding, padding);
      ctx.lineTo(padding, height/dpr - padding);
      ctx.lineTo(width/dpr - padding, height/dpr - padding);
      ctx.stroke();

      ctx.fillStyle = '#f4f4f4';
      ctx.font = '14px system-ui,sans-serif';
      ctx.fillText('Lyapunov Exponent', width/dpr/2 - 60, padding - 10);
      ctx.save();
      ctx.translate(20, height/dpr/2);
      ctx.rotate(-Math.PI/2);
      ctx.fillText('Value', 0, 0);
      ctx.restore();

      ctx.strokeStyle = '#52a7e7';
      ctx.lineWidth = 2;
      ctx.beginPath();
      points.forEach((point, i) => {
        const x = padding + (i / (points.length - 1 || 1)) * chartWidth;
        const y = height/dpr - padding - ((point.value - minVal) / range) * chartHeight;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      ctx.fillStyle = '#52a7e7';
      points.forEach((point, i) => {
        const x = padding + (i / (points.length - 1 || 1)) * chartWidth;
        const y = height/dpr - padding - ((point.value - minVal) / range) * chartHeight;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 1;
      const zeroY = height/dpr - padding - ((0 - minVal) / range) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding, zeroY);
      ctx.lineTo(width/dpr - padding, zeroY);
      ctx.stroke();
    };
    
    render();
    
    const resizeObserver = new ResizeObserver(() => {
      render();
    });
    resizeObserver.observe(canvas);
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [points]);

  if (points.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-neutral-900 rounded-lg">
        <p className="text-neutral-400">No Lyapunov data available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="rounded-lg w-full h-full"
      />
    </div>
  );
}






