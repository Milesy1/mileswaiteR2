'use client';

import { useEffect, useRef } from 'react';

interface P5CanvasProps {
  sketchCode: string;
  width: number;
  height: number;
  className?: string;
}

export default function P5Canvas({ sketchCode, width, height, className = '' }: P5CanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let p5Instance: any;

    const loadP5 = async () => {
      const p5 = (await import('p5')).default;
      
      const sketch = function(p: any) {
        // Const declarations
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
          p.createCanvas(400, 400, p.WEBGL);
          p.strokeWeight(5);
          p.colorMode(p.RGB, 255);
        };

        p.draw = function() {
          p.background(0, 0, 0); // Black background
          t += 0.003;
          p.rotateX(t / 2);
          p.rotateY(t);
          p.rotateZ(t / 3);

          for (let i = 1; i <= NUM; i++) {
            const a = i < NUM / 2 ? i : NUM - i;

            const x = RAD * p.cos(t * a);
            const y = RAD * p.sin(t * a);
            const z = (i - NUM / 2) * 4;
            
            // Use cylinder colors based on z-position (depth) - equal amounts
            let color;
            if (z < -40) {
              color = COLORS[0]; // Red for back third
            } else if (z > 40) {
              color = COLORS[1]; // Green for front third  
            } else {
              color = COLORS[2]; // White for middle third
            }
            
            p.stroke(color[0], color[1], color[2]);
            p.point(x, y, z);
          }
        };
      };

      p5Instance = new p5(sketch, containerRef.current!);
    };

    loadP5();

    return () => {
      if (p5Instance) {
        p5Instance.remove();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={{ width, height }}
    />
  );
}
