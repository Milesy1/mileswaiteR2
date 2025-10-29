'use client';

import { useEffect, useRef, useState } from 'react';

export default function CylinderPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<any>(null);
  const hasLoaded = useRef(false);
  const containerId = useRef(`p5-container-${Date.now()}`);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent double loading in React StrictMode
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    if (!containerRef.current) return;

    // Clear any existing content first
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    setIsLoading(true);

    let p5Instance: any;

    const loadP5 = async () => {
      // Check if p5 is already loaded
      if (typeof window !== 'undefined' && (window as any).p5) {
        createSketch();
        return;
      }

      // Load p5.js library
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js';
      script.onload = () => {
        createSketch();
      };
      document.head.appendChild(script);
    };

    const createSketch = () => {
      const p5 = (window as any).p5;
      if (!p5) return;

      // Double-check: remove any existing p5 instances
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }

      // Clear container again before creating new sketch
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }

      const sketch = function(p: any) {
        const RAD = 100;
        let t = 0;
        const NUM = 60;

        // Cylinder color palette
        const COLORS = [
          [255, 0, 0],    // Red (outer cylinder)
          [0, 255, 0],    // Green (inner cylinder)  
          [255, 255, 255] // White (outer-most cylinder)
        ];

        p.setup = function() {
          // Make canvas responsive to container size
          const container = containerRef.current;
          if (container) {
            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;
            const size = Math.min(containerWidth, containerHeight, window.innerHeight * 0.7);
            p.createCanvas(size, size, p.WEBGL);
          } else {
            p.createCanvas(600, 600, p.WEBGL);
          }
          p.strokeWeight(4);
          p.colorMode('RGB', 255);
          p.frameRate(30);
        };

        p.draw = function() {
          p.background(0, 0, 0);
          t += 0.005;
          p.rotateX(t / 2);
          p.rotateY(t);
          p.rotateZ(t / 3);

          for (let i = 1; i <= NUM; i++) {
            const a = i < NUM / 2 ? i : NUM - i;
            const x = RAD * p.cos(t * a);
            const y = RAD * p.sin(t * a);
            const z = (i - NUM / 2) * 4;
            
            let color;
            if (z < -40) {
              color = COLORS[0];
            } else if (z > 40) {
              color = COLORS[1];
            } else {
              color = COLORS[2];
            }
            
            p.stroke(color[0], color[1], color[2]);
            p.point(x, y, z);
          }
        };
      };

      p5Instance = new p5(sketch, containerRef.current!);
      p5InstanceRef.current = p5Instance;
      setIsLoading(false);
    };

    loadP5();

    return () => {
      if (p5InstanceRef.current) {
        try {
          p5InstanceRef.current.remove();
        } catch (e) {
          console.warn('Error removing p5 instance:', e);
        }
        p5InstanceRef.current = null;
      }
      // Clear container content instead of removing individual elements
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <main className="min-h-screen pt-20 pb-20">
      <section className="max-w-6xl mx-auto px-4 py-12 relative">
        
        {/* Canvas Container - Single, properly constrained */}
        <div 
          ref={containerRef}
          id="p5-canvas-container"
          style={{
            maxWidth: '1000px',
            width: '90vw',
            aspectRatio: '1/1',
            maxHeight: 'calc(100vh - 300px)', // More aggressive constraint
            height: 'auto',
            margin: '0 auto',
            overflow: 'hidden', // Force clip any overflow
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          {/* Loading indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="text-white text-sm">Loading...</div>
            </div>
          )}
          {/* p5.js canvas will mount here */}
        </div>
        
      </section>
      
      {/* Inline styles to force canvas sizing */}
      <style jsx>{`
        #p5-canvas-container canvas {
          max-width: 100% !important;
          max-height: calc(100vh - 300px) !important;
          width: auto !important;
          height: auto !important;
          position: relative !important;
          z-index: 1 !important;
        }
        #p5-canvas-container .cylinder-text {
          position: absolute !important;
          bottom: 8px !important;
          left: 8px !important;
          z-index: 100 !important;
          pointer-events: none !important;
        }
      `}</style>
    </main>
  );
}
