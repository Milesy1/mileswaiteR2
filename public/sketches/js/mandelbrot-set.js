// p5.js sketch in instance mode
let maxIterations = 100;
let zoom = 1;
let offsetX = 0;
let offsetY = 0;

p.setup = function() {
  p.createCanvas(400, 400);
  p.background(0);
  p.colorMode(p.HSB, 360, 100, 100);
  p.noLoop();
};

p.draw = function() {
  p.background(0);
  
  for (let x = 0; x < p.width; x++) {
    for (let y = 0; y < p.height; y++) {
      // Map pixel coordinates to complex plane
      let a = p.map(x, 0, p.width, -2.5 / zoom + offsetX, 1.5 / zoom + offsetX);
      let b = p.map(y, 0, p.height, -2 / zoom + offsetY, 2 / zoom + offsetY);
      
      let ca = a;
      let cb = b;
      let n = 0;
      
      // Iterate z = z^2 + c
      for (n = 0; n < maxIterations; n++) {
        let aa = a * a - b * b;
        let bb = 2 * a * b;
        a = aa + ca;
        b = bb + cb;
        
        if (a * a + b * b > 4) {
          break;
        }
      }
      
      // Color based on iterations
      if (n === maxIterations) {
        p.set(x, y, p.color(0, 0, 0));
      } else {
        let hue = p.map(n, 0, maxIterations, 0, 360);
        let brightness = p.map(n, 0, maxIterations, 0, 100);
        p.set(x, y, p.color(hue, 80, brightness));
      }
    }
  }
  
  p.updatePixels();
  
  // Animate zoom and offset
  zoom += 0.01;
  offsetX = p.sin(p.frameCount * 0.01) * 0.5;
  offsetY = p.cos(p.frameCount * 0.01) * 0.3;
  
  if (p.frameCount % 60 === 0) {
    p.redraw();
  }
};

