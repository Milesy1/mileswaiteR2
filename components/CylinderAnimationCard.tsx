'use client';

import { useEffect, useRef } from 'react';

interface CylinderAnimationCardProps {
  autoPlay?: boolean;
}

export default function CylinderAnimationCard({ autoPlay = false }: CylinderAnimationCardProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(autoPlay);
  const shouldAnimateRef = useRef(autoPlay);

  useEffect(() => {
    if (!containerRef.current) return;

    let p5Instance: any;

    const loadP5 = async () => {
      // Check if p5 is already loaded
      if (typeof window !== 'undefined' && (window as any).p5) {
        createSketch();
        return;
      }

      // Load p5.js from CDN for better stability
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
          p.createCanvas(440, 440, p.WEBGL); // Increased by 10% from 400
          p.strokeWeight(4);
          p.colorMode('RGB', 255);
          p.frameRate(30); // Limit to 30 FPS for better performance
        };

        p.draw = function() {
          p.background(0, 0, 0);
          
          // Only animate when visible and should animate
          if (isVisibleRef.current && shouldAnimateRef.current) {
            t += 0.005; // Slightly faster rotation
          }
          
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
        try {
          p5Instance.remove();
        } catch (e) {
          console.warn('Error removing p5 instance:', e);
        }
        p5Instance = null;
      }
      // Clear container content instead of removing individual elements
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  // Intersection Observer to pause animations when not visible
  useEffect(() => {
    if (!containerRef.current) return;

    // Fallback for browsers without Intersection Observer support
    if (!('IntersectionObserver' in window)) {
      isVisibleRef.current = true; // Always animate if no support
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { 
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '0px' // No margin
      }
    );

    const currentContainer = containerRef.current;
    observer.observe(currentContainer);

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
      observer.disconnect();
    };
  }, []);

  const handleClick = () => {
    if (!autoPlay) {
      shouldAnimateRef.current = !shouldAnimateRef.current;
    }
  };

  return (
    <div 
      className="relative group cursor-pointer bg-white dark:bg-neutral-900 rounded-none overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 border border-neutral-100 dark:border-neutral-800 group-hover:border-primary-200 dark:group-hover:border-primary-500"
      onClick={handleClick}
    >
      {/* Animation Container */}
      <div 
        ref={containerRef}
        className="w-full h-72 bg-black" // Increased by 10% from h-64 to h-72
      />
    </div>
  );
}
