// Simple rotating cylinder test
let angle = 0;

function setup() {
  createCanvas(400, 400, WEBGL);
  console.log('Cylinder test loaded');
}

function draw() {
  background(0);
  
  // Basic lighting
  ambientLight(100, 100, 100);
  directionalLight(255, 255, 255, 0, -1, -1);
  
  // Rotate
  rotateY(angle);
  rotateX(angle * 0.3);
  
  // Draw simple cylinder
  stroke(255, 255, 255, 255);
  strokeWeight(3);
  noFill();
  
  // Draw vertical lines
  for (let i = 0; i < 8; i++) {
    let theta = map(i, 0, 8, 0, TWO_PI);
    let x = cos(theta) * 50;
    let z = sin(theta) * 50;
    
    // Vertical line
    line(x, -80, z, x, 80, z);
  }
  
  // Draw circles
  beginShape();
  for (let i = 0; i < 8; i++) {
    let theta = map(i, 0, 8, 0, TWO_PI);
    let x = cos(theta) * 50;
    let z = sin(theta) * 50;
    vertex(x, 80, z);
  }
  endShape(CLOSE);
  
  beginShape();
  for (let i = 0; i < 8; i++) {
    let theta = map(i, 0, 8, 0, TWO_PI);
    let x = cos(theta) * 50;
    let z = sin(theta) * 50;
    vertex(x, -80, z);
  }
  endShape(CLOSE);
  
  // Animate
  angle += 0.05;
}

