'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    p5: any;
  }
}

export default function FibonacciSphereBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<any>(null);

  useEffect(() => {
    const loadP5 = async () => {
      if (typeof window !== 'undefined' && !window.p5) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js';
        script.onload = () => {
          initializeP5();
        };
        document.head.appendChild(script);
      } else if (window.p5) {
        initializeP5();
      }
    };

    const initializeP5 = () => {
      if (containerRef.current && window.p5) {
        // Clean up existing instance
        if (p5InstanceRef.current) {
          p5InstanceRef.current.remove();
        }

        const sketch = (p: any) => {
          let R, rotationX, rotationY, velocityX, velocityY, pushBack;
          let phi, ga;
          let kMaxPoints, nbrPoints, addPoints;
          let pts = [];

          // SpherePoint class
          class SpherePoint {
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

          p.setup = () => {
            p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
            
            // Initialize variables
            R = 0.3 * p.min(p.width, p.height) / 2;
            rotationX = 0;
            rotationY = 0;
            velocityX = 0;
            velocityY = 0;
            pushBack = 0;
            
            phi = (p.sqrt(5) + 1) / 2 - 1; // golden ratio
            ga = phi * 2 * p.PI;           // golden angle
            
            kMaxPoints = 1000; // Reduced for web performance
            nbrPoints = 1;
            addPoints = true;
            
            initSphere();
            p.colorMode(p.RGB, 255);
          };

          p.draw = () => {
            if (addPoints) {
              nbrPoints += 1;
              nbrPoints = p.min(nbrPoints, kMaxPoints);
              initSphere();
            }
            
            p.clear();
            
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
            p.resizeCanvas(p.windowWidth, p.windowHeight);
          };
        };

        p5InstanceRef.current = new window.p5(sketch, containerRef.current);
      }
    };

    loadP5();

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
}