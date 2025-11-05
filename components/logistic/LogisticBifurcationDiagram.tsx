"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

export interface BifurcationPoint {
  r: number;
  x: number;
}

export interface LogisticBifurcationDiagramProps {
  points: BifurcationPoint[];
}

const X_MIN = 2.5, X_MAX = 4.0, Y_MIN = 0, Y_MAX = 1;

export default function LogisticBifurcationDiagram({ points }: LogisticBifurcationDiagramProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tooltip, setTooltip] = useState<{ x: number, y: number, r: number, xv: number } | null>(null);
  const [view, setView] = useState({ minR: X_MIN, maxR: X_MAX, minX: Y_MIN, maxX: Y_MAX });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
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

      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      for (let gy = 0; gy <= 10; gy++) {
        const y = (gy / 10) * (height/dpr);
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width/dpr, y); ctx.stroke();
      }
      for (let gx = 0; gx <= 6; gx++) {
        const x = (gx / 6) * (width/dpr);
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height/dpr); ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(50, height/dpr-30); ctx.lineTo(width/dpr-10, height/dpr-30); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(50, 20); ctx.lineTo(50, height/dpr-30); ctx.stroke();
      
      ctx.fillStyle = '#f4f4f4'; ctx.font = '14px system-ui,sans-serif';
      ctx.fillText('r', width/dpr-20, height/dpr-40);
      ctx.save(); ctx.translate(25, 27); ctx.rotate(-Math.PI/2);
      ctx.fillText('x', 0, 0); ctx.restore();

      ctx.fillStyle = '#aaa'; ctx.font = '12px system-ui,sans-serif';
      for(let r=2.5;r<=4.0;r+=0.25){
        const tx = px(r,view.minR,view.maxR,width/dpr);
        ctx.fillText(r.toFixed(2), tx-12, height/dpr-10);
        ctx.beginPath(); ctx.moveTo(tx, height/dpr-31); ctx.lineTo(tx, height/dpr-25); ctx.stroke();
      }
      for(let x=0;x<=1;x+=0.2){
        const ty = py(x,view.minX,view.maxX,height/dpr);
        ctx.fillText(x.toFixed(1), 8, ty+4);
        ctx.beginPath(); ctx.moveTo(48, ty); ctx.lineTo(54, ty); ctx.stroke();
      }

      ctx.save();
      ctx.globalAlpha = 0.7;
      for (let i = 0; i < points.length; i++) {
        const { r, x } = points[i];
        const dotX = px(r, view.minR, view.maxR, width/dpr);
        const dotY = py(x, view.minX, view.maxX, height/dpr);
        if (r < 3.57) ctx.fillStyle = '#fff';
        else ctx.fillStyle = '#52a7e7';
        ctx.fillRect(dotX, dotY, 1.3, 1.3);
      }
      ctx.restore();
    };
    
    render();
    
    const resizeObserver = new ResizeObserver(() => {
      render();
    });
    resizeObserver.observe(canvas);
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [points, view]);

  function px(r: number, minR: number, maxR: number, w: number) {
    return 50 + ((r - minR) / (maxR - minR)) * (w - 70);
  }
  function py(x: number, minX: number, maxX: number, h: number) {
    return 20 + (1 - (x - minX) / (maxX - minX)) * (h - 50);
  }

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const mx = e.clientX - bounds.left;
    const my = e.clientY - bounds.top;
    const width = bounds.width, height = bounds.height;
    let bestDist = 7, best: BifurcationPoint | null = null;
    let nearestX = 0, nearestY = 0;
    for (let i = 0; i < points.length; i++) {
      const { r, x } = points[i];
      const dotX = px(r, view.minR, view.maxR, width);
      const dotY = py(x, view.minX, view.maxX, height);
      const dist = Math.hypot(mx-dotX, my-dotY);
      if (dist < bestDist) {
        bestDist = dist;
        best = points[i];
        nearestX = dotX; nearestY = dotY;
      }
    }
    if (best) {
      setTooltip({ x: nearestX, y: nearestY, r: best.r, xv: best.x });
    } else {
      setTooltip(null);
    }
  }, [points, view]);
  
  const handleWheel = useCallback((e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const { minR, maxR, minX, maxX } = view;
    const zoomAmount = e.deltaY > 0 ? 1.13 : 0.89;
    let centerR = (minR+maxR)/2, spanR = (maxR-minR)*zoomAmount/2;
    let centerX = (minX+maxX)/2, spanX = (maxX-minX)*zoomAmount/2;
    setView({
      minR: Math.max(X_MIN, centerR-spanR),
      maxR: Math.min(X_MAX, centerR+spanR),
      minX: Math.max(Y_MIN, centerX-spanX),
      maxX: Math.min(Y_MAX, centerX+spanX)
    });
  }, [view]);

  const handleReset = () => setView({ minR: X_MIN, maxR: X_MAX, minX: Y_MIN, maxX: Y_MAX });

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="rounded-lg cursor-crosshair w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTooltip(null)}
        onWheel={handleWheel}
      />
      {tooltip && (
        <div className="absolute z-30 pointer-events-none px-3 py-2 bg-neutral-900/90 text-xs text-white rounded shadow" style={{ left: tooltip.x+8, top: tooltip.y+6 }}>
          <span>r: <b>{tooltip.r.toFixed(5)}</b><br/>x: <b>{tooltip.xv.toFixed(5)}</b></span>
        </div>
      )}
      <button className="absolute right-2 top-2 z-10 bg-primary-500 hover:bg-primary-700 text-white text-xs px-2 py-1 rounded shadow font-semibold" onClick={handleReset}>Reset</button>
    </div>
  );
}










