'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    p5: any;
  }
}

export default function ParticleBackground() {
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
          let particles = [];
          let am = 360;

          p.setup = () => {
            p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
            p.noStroke();
            
            // Circle Example (am = 360)
            for(let i = 0; i < am; i += 10) {
              particles.push(new Particle(
                p.createVector(p.sin(p.radians(i)) * 101, p.cos(p.radians(i)) * 101), 
                p.createVector(p.sin(p.radians(i)) * 100, p.cos(p.radians(i)) * 100), 
                i
              ));
              particles.push(new Particle(
                p.createVector(p.sin(p.radians(i)) * 99, p.cos(p.radians(i)) * 99), 
                p.createVector(p.sin(p.radians(i)) * 100, p.cos(p.radians(i)) * 100), 
                i
              ));
            }
          };

          p.draw = () => {
            p.clear();
            // Position animation perfectly between subtitle and first blog post
            // Adjust positioning for mobile vs desktop to center between containers
            let yOffset = p.width < 768 ? -20 + (p.height * 0.015) : -50 + (p.height * 0.025);
            p.translate(0, yOffset, 0);
            
            for(let i = 0; i < particles.length; i++) {
              let particle = particles[i];
              particle.draw();
              particle.move();
              particle.boundary();
            }
          };

          p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
          };

          class Particle {
            constructor(l: any, lim: any, d: number) {
              this.loc = p.createVector(l.x, l.y);
              this.limit = lim;
              this.vel = p.createVector();
              this.acc = p.createVector();
              
              this.startLocation = this.loc.copy();
              this.delay = d;
              
              // Color based on position (matching your other animations)
              this.setColor();
            }
            
            setColor() {
              // Check if we're in light mode
              const isLightMode = document.documentElement.classList.contains('light') || 
                                 !document.documentElement.classList.contains('dark');
              
              // More stark, vibrant colors - black for light mode, white for dark mode
              const COLORS = [
                [255, 0, 0],    // Bright Red
                [0, 255, 0],    // Bright Green  
                isLightMode ? [0, 0, 0] : [255, 255, 255] // Black for light mode, White for dark mode
              ];
              
              // Use angle/position for color distribution
              let angle = p.atan2(this.loc.y, this.loc.x);
              let normalizedAngle = (angle + p.PI) / (2 * p.PI); // Normalize to 0-1
              
              if(normalizedAngle < 0.33) {
                this.color = COLORS[0]; // Bright Red
              } else if(normalizedAngle < 0.66) {
                this.color = COLORS[1]; // Bright Green
              } else {
                this.color = COLORS[2]; // Black (light mode) or White (dark mode)
              }
            }
            
            draw() {
              // Check theme in real-time and set color accordingly
              const isLightMode = document.documentElement.classList.contains('light') || 
                                 !document.documentElement.classList.contains('dark');
              
              // Use angle/position for color distribution
              let angle = p.atan2(this.loc.y, this.loc.x);
              let normalizedAngle = (angle + p.PI) / (2 * p.PI); // Normalize to 0-1
              
              let currentColor;
              if(normalizedAngle < 0.33) {
                currentColor = [255, 0, 0]; // Bright Red
              } else if(normalizedAngle < 0.66) {
                currentColor = [0, 255, 0]; // Bright Green
              } else {
                currentColor = isLightMode ? [0, 0, 0] : [255, 255, 255]; // Black (light mode) or White (dark mode)
              }
              
              p.fill(currentColor[0], currentColor[1], currentColor[2]);
              // Adjust particle size for mobile vs desktop
              let particleSize = p.width < 768 ? 1.5 : 2;
              p.ellipse(this.loc.x, this.loc.y, particleSize, particleSize);
            }
            
            move() {
              this.handleRepel();
              this.vel.add(this.acc);
              this.loc.add(this.vel);
              this.acc.mult(0);
            }
            
            applyForce(f: any) {
              let force = f.copy();
              force.div(1);
              this.acc.add(force);
            }
            
            boundary() {
              if(compareValue(this.limit, this.loc, this.startLocation)) {
                this.loc = this.limit.copy();
                this.vel.mult(-0.5);
              }
            }
            
            handleRepel() {
              if(this.delay > 0) {
                this.delay -= 2;
              } else {
                this.delay = am;
              }
              
              if(this.delay < 10) {
                let f = p.createVector(
                  this.startLocation.x - this.limit.x, 
                  this.startLocation.y - this.limit.y
                );
                f.normalize();
                this.applyForce(f);
              } else {
                let f = p.createVector(
                  this.limit.x - this.startLocation.x, 
                  this.limit.y - this.startLocation.y
                );
                f.normalize();
                this.applyForce(f);
              }
            }
          }

          // Return whether the location has gone behind the limit.
          function compareValue(limit: any, loc: any, startLocation: any) {
            // Determine what side it is (Left or Right)
            let turnX = startLocation.x < limit.x;
            if(turnX && loc.x > limit.x) return true;
            if(!turnX && loc.x < limit.x) return true;
            
            let turnY = startLocation.y < limit.y;
            if(turnY && loc.y > limit.y) return true;
            if(!turnY && loc.y < limit.y) return true;
            
            return false;
          }
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
