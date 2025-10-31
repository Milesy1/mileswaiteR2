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
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState(() => {
    // Initialize with fallback dimensions that match common container sizes
    // This prevents layout shift on initial render
    if (typeof window !== 'undefined') {
      // Use viewport-based initial size for better UX
      // Mobile-friendly sizing
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const isMobile = vw < 640; // sm breakpoint
      return {
        width: isMobile ? Math.min(vw * 0.95, 400) : Math.min(vw * 0.9, 800),
        height: isMobile ? Math.min(vh * 0.5, 400) : Math.min(vh * 0.7, 600)
      };
    }
    return { width, height };
  });
  const [isReady, setIsReady] = useState(false);

  // Handle responsive dimensions - use multiple strategies to ensure accurate sizing
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        
        // Use container dimensions or fallback to props
        const newWidth = containerWidth > 0 ? containerWidth : width;
        const newHeight = containerHeight > 0 ? containerHeight : height;
        
        // Update dimensions using functional update to avoid stale closure
        setDimensions(prev => {
          // Only update if dimensions actually changed
          if (newWidth !== prev.width || newHeight !== prev.height) {
            // Mark as ready when dimensions are valid
            if (newWidth > 0 && newHeight > 0) {
              setTimeout(() => setIsReady(true), 0);
            }
            return { width: newWidth, height: newHeight };
          }
          return prev;
        });
      }
    };

    // Immediate update attempt
    updateDimensions();

    // Use requestAnimationFrame to ensure layout is calculated
    const updateWithRAF = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Double RAF for more reliable layout calculation
          updateDimensions();
        });
      });
    };

    // Initial update with multiple strategies
    const timeoutId1 = setTimeout(updateWithRAF, 0);
    const timeoutId2 = setTimeout(updateWithRAF, 10);
    const timeoutId3 = setTimeout(updateWithRAF, 50);
    
    // Use ResizeObserver for better responsiveness
    let resizeObserver: ResizeObserver | null = null;
    const setupResizeObserver = () => {
      if (containerRef.current && typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            const { width: w, height: h } = entry.contentRect;
            if (w > 0 && h > 0) {
              setDimensions({ width: w, height: h });
              setIsReady(true);
            }
          }
        });
        resizeObserver.observe(containerRef.current);
      }
    };
    
    // Set up ResizeObserver immediately
    const observerTimeoutId = setTimeout(setupResizeObserver, 0);
    
    // Fallback to window resize listener
    window.addEventListener('resize', updateWithRAF);
    
    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
      clearTimeout(observerTimeoutId);
      window.removeEventListener('resize', updateWithRAF);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [width, height]); // Only depend on props, not state

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
      style={{ 
        width: '100%', 
        height: '100%',
        minHeight: dimensions.height > 0 ? `${dimensions.height}px` : '400px',
        minWidth: dimensions.width > 0 ? `${dimensions.width}px` : '400px'
      }}
    />
  );
}
