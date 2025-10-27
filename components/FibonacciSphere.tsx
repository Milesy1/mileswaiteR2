'use client';

import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    p5: any;
  }
}

interface FibonacciSphereProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function FibonacciSphere({ 
  width = 600, 
  height = 600, 
  className = '' 
}: FibonacciSphereProps) {
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

      // Fibonacci Sphere sketch
      const sketch = (p: any) => {
        let R = 277;
        let rotationX = 0;
        let rotationY = 0;
        let velocityX = 0;
        let velocityY = 0;
        let pushBack = 0;

        let phi = (p.sqrt(5) + 1) / 2 - 1; // golden ratio
        let ga = phi * 2 * p.PI;           // golden angle

        let kMaxPoints = 1000; // Reduced for web performance
        let nbrPoints = 1;
        let addPoints = true;

        // SpherePoint class
        class SpherePoint {
          lat: number;
          lon: number;
          
          constructor(lat: number, lon: number) {
            this.lat = lat;
            this.lon = lon;
          }
          
          show(yRot: number) {
            p.push();
            p.rotateY(this.lon);
            p.rotateZ(-this.lat);
            
            // Use cylinder colors: Red, Green, White with uniform distribution
            const COLORS = [
              [255, 0, 0],    // Red
              [0, 255, 0],    // Green  
              [255, 255, 255] // White
            ];
            
            // Use latitude (depth) for color distribution - equal amounts
            let colorIndex;
            if (this.lat < -0.33) { // Red for bottom third
              colorIndex = 0;
            } else if (this.lat > 0.33) { // Green for top third  
              colorIndex = 1;
            } else { // White for middle third
              colorIndex = 2;
            }
            
            let color = COLORS[colorIndex];
            p.stroke(color[0], color[1], color[2]);
            
            p.point(R, 0, 0);
            p.pop();
          }
        }

        let pts: SpherePoint[] = [];

        p.setup = () => {
          p.createCanvas(dimensions.width, dimensions.height, p.WEBGL);
          R = 0.8 * p.height / 2;
          
          initSphere();
          p.colorMode(p.RGB, 255);
        };

        p.draw = () => {
          if (addPoints) {
            nbrPoints += 1;
            nbrPoints = p.min(nbrPoints, kMaxPoints);
            initSphere();
          }
          
          p.background(0);
          
          renderGlobe();
          
          rotationX += velocityX;
          rotationY += velocityY;
          velocityX *= 0.95;
          velocityY *= 0.95;
          
          // Mouse control
          if (p.mouseIsPressed) {
            velocityX += (p.mouseY - p.pmouseY) * 0.01;
            velocityY -= (p.mouseX - p.pmouseX) * 0.01;
          }
        };

        function initSphere() {
          pts = [];
          for (let i = 1; i <= p.min(nbrPoints, kMaxPoints); ++i) {
            let lon = ga * i;
            lon /= 2 * p.PI; 
            lon -= p.floor(lon); 
            lon *= 2 * p.PI;
            if (lon > p.PI) lon -= 2 * p.PI;
            
            // Convert dome height to latitude
            let lat = p.asin(-1 + 2 * i / nbrPoints);
            
            pts.push(new SpherePoint(lat, lon));
          }
        }

        function renderGlobe() {
          p.push();
          p.translate(0, 0, pushBack);
          
          // Draw sphere outline
          p.fill(0);
          p.stroke(0);
          p.sphere(0.99 * R);
          
          let xRot = p.radians(-rotationX);
          let yRot = p.radians(270 - rotationY - p.millis() * 0.01);
          p.rotateX(xRot);
          p.rotateY(yRot);
          
          p.strokeWeight(3);
          
          // Draw all points
          for (let i = 0; i < pts.length; i++) {
            pts[i].show(yRot);
          }
          
          p.pop();
        }

        p.mouseClicked = () => {
          addPoints = !addPoints;
        };

        p.windowResized = () => {
          p.resizeCanvas(dimensions.width, dimensions.height);
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
