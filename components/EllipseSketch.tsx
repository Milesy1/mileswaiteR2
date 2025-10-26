'use client';

import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    p5: any;
  }
}

interface EllipseSketchProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function EllipseSketch({ 
  width = 500, 
  height = 500, 
  className = '' 
}: EllipseSketchProps) {
  const [dimensions, setDimensions] = useState({ width, height });
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<any>(null);

  // Handle responsive dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        
        const newWidth = containerWidth > 0 ? containerWidth : width;
        const newHeight = containerHeight > 0 ? containerHeight : height;
        
        setDimensions({ width: newWidth, height: newHeight });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
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
      if (!containerRef.current || p5InstanceRef.current) return;

      // Converted Processing sketch with slow Red, Green, White cycling and fade
      const sketch = (p: any) => {
        let theta = 0;
        let npoints = 60;
        let anglestep: number;
        let anglestart = 0;
        let r: number;
        let colorIndex = 0;
        let colorProgress = 0;

        // Red, Green, White color cycle
        const COLORS = [
          [255, 0, 0],    // Red
          [0, 255, 0],    // Green  
          [255, 255, 255] // White
        ];

        p.setup = () => {
          p.createCanvas(dimensions.width, dimensions.height);
          r = p.width / 3;
          p.noStroke();
          
          p.colorMode(p.RGB, 255);
          anglestep = p.TWO_PI / npoints;
        };

        p.draw = () => {
          p.clear();
          
          // Slower color cycling (every 3 seconds instead of 1)
          let timeCycle = (p.millis() * 0.0003) % 3; // Slower: 0.0003 instead of 0.001
          colorIndex = p.floor(timeCycle);
          colorProgress = timeCycle - colorIndex; // Progress between colors (0-1)
          
          // Get current and next colors for smooth transition
          let currentColor = COLORS[colorIndex];
          let nextColor = COLORS[(colorIndex + 1) % 3];
          
          // Interpolate between colors for smooth fade
          let red = p.lerp(currentColor[0], nextColor[0], colorProgress);
          let green = p.lerp(currentColor[1], nextColor[1], colorProgress);
          let blue = p.lerp(currentColor[2], nextColor[2], colorProgress);
          
          p.fill(red, green, blue);
          
          p.translate(p.width / 2, p.height / 2);
          p.rotate(theta);
          
          for (let i = 0; i < npoints; i++) {
            let angle = anglestart + i * anglestep;
            p.ellipse(1.2 * r * p.cos(angle), 0.8 * r * p.sin(angle), 2, 2);
          }
          
          anglestart -= 0.02187; // Another 10% slower: 0.0243 * 0.9 = 0.02187
          theta += 0.00729; // Another 10% slower: 0.0081 * 0.9 = 0.00729
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
    />
  );
}
