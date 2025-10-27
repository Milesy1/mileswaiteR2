// Circular Logograms - Arrival-inspired aesthetic
// Radial writing system with organic evolution

let time = 0;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  strokeCap(ROUND);
}

function draw() {
  // Semi-transparent background for fade effect
  background(20, 20, 20, 25);
  
  // Center the drawing
  translate(width/2, height/2);
  
  // Setup stroke
  noFill();
  stroke(255, 200);
  
  // Configuration
  let segments = 12;
  let radius = 140;
  
  // Draw radial segments
  for (let i = 0; i < segments; i++) {
    let angle = (360 / segments) * i;
    let noiseVal = noise(time * 0.01 + i * 0.1);
    let variation = noiseVal * 40;
    
    push();
    rotate(angle);
    
    // Outer arc with variable length
    strokeWeight(2);
    let arcStart = -30 + variation;
    let arcEnd = 30 + variation;
    arc(0, 0, radius, radius, arcStart, arcEnd);
    
    // Inner connecting line
    let innerRadius = radius * 0.6;
    line(innerRadius, 0, radius * 0.5, 0);
    
    // Small detail arc
    strokeWeight(1);
    arc(0, 0, innerRadius, innerRadius, -15, 15);
    
    pop();
  }
  
  // Center circles
  strokeWeight(1.5);
  circle(0, 0, 60);
  
  strokeWeight(1);
  circle(0, 0, 30);
  
  time += 1;
}
