'use client';

import { useEffect, useRef } from 'react';

export default function CylinderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let p5Instance: any;

    const loadP5 = async () => {
      const p5 = (await import('p5')).default;
      
      const sketch = function(p: any) {
        const RAD = 100;
        let t = 0;
        const NUM = 60;

        const COLORS = [
          [255, 0, 0],
          [0, 255, 0],
          [255, 255, 255]
        ];

        p.setup = function() {
          p.createCanvas(400, 400, p.WEBGL);
          p.strokeWeight(5);
          p.colorMode(p.RGB, 255);
        };

        p.draw = function() {
          p.background(0, 0, 0);
          t += 0.003;
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
    };

    loadP5();

    return () => {
      if (p5Instance) {
        p5Instance.remove();
      }
    };
  }, []);

  return (
    <main style={{
      minHeight: '100vh',
      paddingTop: '120px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '120px 20px 60px',
      backgroundColor: 'var(--bg-color, #ffffff)'
    }}>
      
      <section style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '48px'
      }}>
        
        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '300',
          margin: 0,
          textAlign: 'center',
          color: 'inherit'
        }}>
          cylinder
        </h1>
        
        {/* Animation Container */}
        <div 
          ref={containerRef}
          id="p5-container" 
          style={{
            width: 'min(900px, 85vw)',
            height: 'min(900px, 85vw)',
            position: 'relative'
          }}
        />
        
      </section>
      
    </main>
  );
}
