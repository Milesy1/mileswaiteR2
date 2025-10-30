'use client';

import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    p5: any;
  }
}

interface MySketchProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function MySketch({ 
  width = 400, 
  height = 400, 
  className = '' 
}: MySketchProps) {
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 });
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<any>(null);

  // Handle responsive dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        
        // Use container dimensions or fallback to props
        const newWidth = containerWidth > 0 ? containerWidth : width;
        const newHeight = containerHeight > 0 ? containerHeight : height;
        
        // Only update if dimensions actually changed
        if (newWidth !== dimensions.width || newHeight !== dimensions.height) {
          setDimensions({ width: newWidth, height: newHeight });
        }
      }
    };

    // Use requestAnimationFrame to ensure layout is calculated
    const updateWithRAF = () => {
      requestAnimationFrame(() => {
        updateDimensions();
      });
    };

    // Initial update with a small delay to ensure parent layout is complete
    const timeoutId = setTimeout(updateWithRAF, 0);
    
    // Use ResizeObserver for better responsiveness (set up after initial render)
    let resizeObserver: ResizeObserver | null = null;
    const setupResizeObserver = () => {
      if (containerRef.current && typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => {
          updateWithRAF();
        });
        resizeObserver.observe(containerRef.current);
      }
    };
    
    // Set up ResizeObserver after a brief delay to ensure container is mounted
    const observerTimeoutId = setTimeout(setupResizeObserver, 100);
    
    // Fallback to window resize listener
    window.addEventListener('resize', updateWithRAF);
    
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(observerTimeoutId);
      window.removeEventListener('resize', updateWithRAF);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [width, height]);

  useEffect(() => {
    // Load p5.js dynamically
    const loadP5 = async () => {
      if (typeof window !== 'undefined' && !window.p5) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js';
        script.onload = () => {
          initializeSketch();
        };
        document.head.appendChild(script);
      } else if (window.p5) {
        initializeSketch();
      }
    };

    const initializeSketch = () => {
      if (!containerRef.current) return;
      
      // If sketch already exists, just resize it instead of recreating
      if (p5InstanceRef.current) {
        const canvasWidth = dimensions.width > 0 ? dimensions.width : containerRef.current.clientWidth || width;
        const canvasHeight = dimensions.height > 0 ? dimensions.height : containerRef.current.clientHeight || height;
        if (p5InstanceRef.current.resizeCanvas) {
          p5InstanceRef.current.resizeCanvas(canvasWidth, canvasHeight);
        }
        return;
      }

      // Your sketch code
      const sketch = (p: any) => {
        const RAD = 100;
        let t = 0;
        const NUM = 60;

        // Cylinder color palette
        const COLORS = [
          [255, 0, 0],    // Red (outer cylinder)
          [0, 255, 0],    // Green (inner cylinder)  
          [255, 255, 255] // White (outer-most cylinder)
        ];

        p.setup = () => {
          // Ensure we have valid dimensions
          const canvasWidth = dimensions.width > 0 ? dimensions.width : containerRef.current?.clientWidth || width;
          const canvasHeight = dimensions.height > 0 ? dimensions.height : containerRef.current?.clientHeight || height;
          p.createCanvas(canvasWidth, canvasHeight, p.WEBGL);
          p.strokeWeight(5);
          p.colorMode(p.RGB, 255);
        };

        p.windowResized = () => {
          // Handle resize events
          if (containerRef.current) {
            const newWidth = containerRef.current.clientWidth || dimensions.width;
            const newHeight = containerRef.current.clientHeight || dimensions.height;
            p.resizeCanvas(newWidth, newHeight);
          }
        };

        p.draw = () => {
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

      p5InstanceRef.current = new window.p5(sketch, containerRef.current);
    };

    loadP5();

    // Cleanup
    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, [dimensions.width, dimensions.height]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
