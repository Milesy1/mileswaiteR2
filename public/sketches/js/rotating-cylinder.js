// Rotating Cylinder p5.js sketch
let angle = 0;
let radius = 60;
let cylinderHeight = 100;

function setup() {
  createCanvas(400, 400, WEBGL);
  console.log('Cylinder sketch loaded');
}

function draw() {
  background(0);
  
  // Basic lighting
  ambientLight(80, 80, 80);
  directionalLight(255, 255, 255, 0, -1, -1);
  
  // Rotate the cylinder
  rotateY(angle);
  rotateX(angle * 0.3);
  
  // Draw cylinder wireframe
  stroke(255, 255, 255, 200);
  strokeWeight(2);
  noFill();
  
  // Draw vertical lines
  for (let i = 0; i < 12; i++) {
    let theta = map(i, 0, 12, 0, TWO_PI);
    let x = cos(theta) * radius;
    let z = sin(theta) * radius;
    
    // Vertical line
    line(x, -cylinderHeight/2, z, x, cylinderHeight/2, z);
    
    // Horizontal lines
    let nextTheta = map((i + 1) % 12, 0, 12, 0, TWO_PI);
    let nextX = cos(nextTheta) * radius;
    let nextZ = sin(nextTheta) * radius;
    
    line(x, -cylinderHeight/2, z, nextX, -cylinderHeight/2, nextZ);
    line(x, cylinderHeight/2, z, nextX, cylinderHeight/2, nextZ);
  }
  
  // Draw top and bottom circles
  stroke(255, 255, 255, 255);
  strokeWeight(3);
  
  // Top circle
  beginShape();
  for (let i = 0; i < 12; i++) {
    let theta = map(i, 0, 12, 0, TWO_PI);
    let x = cos(theta) * radius;
    let z = sin(theta) * radius;
    vertex(x, cylinderHeight/2, z);
  }
  endShape(CLOSE);
  
  // Bottom circle
  beginShape();
  for (let i = 0; i < 12; i++) {
    let theta = map(i, 0, 12, 0, TWO_PI);
    let x = cos(theta) * radius;
    let z = sin(theta) * radius;
    vertex(x, -cylinderHeight/2, z);
  }
  endShape(CLOSE);
  
  // Animate
  angle += 0.03;
}
