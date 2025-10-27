// Converted from Processing to p5.js
// Fibonacci Sphere - A fast method for getting equidistant points on a sphere
// Original by Jim Bumgardner 10/6/2011

let R, rotationX, rotationY, velocityX, velocityY, pushBack;
let phi, ga;
let kMaxPoints, nbrPoints, addPoints;
let pts = [];

// GIF recording variables
let recording = false;
let frameCount = 0;
let maxFrames = 300; // 10 seconds at 30fps

// SpherePoint class
class SpherePoint {
  constructor(lat, lon) {
    this.lat = lat;
    this.lon = lon;
  }
  
  show(yRot) {
    push();
    rotateY(this.lon);
    rotateZ(-this.lat);
    
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
    stroke(color[0], color[1], color[2]);
    
    point(R, 0, 0);
    pop();
  }
}

function setup() {
  createCanvas(400, 400, WEBGL);
  
  // Initialize variables
  R = 0.8 * height / 2;
  rotationX = 0;
  rotationY = 0;
  velocityX = 0;
  velocityY = 0;
  pushBack = 0;
  
  phi = (sqrt(5) + 1) / 2 - 1; // golden ratio
  ga = phi * 2 * PI;           // golden angle
  
  kMaxPoints = 500; // Reduced for web performance
  nbrPoints = 1;
  addPoints = true;
  
  initSphere();
  colorMode(RGB, 255);
}

function draw() {
  // Always add points until we reach max
  if (nbrPoints < kMaxPoints) {
    nbrPoints += 2; // Add 2 points per frame for faster growth
    nbrPoints = min(nbrPoints, kMaxPoints);
    initSphere();
  }
  
  background(0);
  
  renderGlobe();
  
  rotationX += velocityX;
  rotationY += velocityY;
  velocityX *= 0.95;
  velocityY *= 0.95;
  
  // Auto-rotation
  rotationY += 0.01;
  
  // Mouse control
  if (mouseIsPressed) {
    velocityX += (mouseY - pmouseY) * 0.01;
    velocityY -= (mouseX - pmouseX) * 0.01;
  }
  
  // Record frame if recording
  if (recording && frameCount < maxFrames) {
    saveCanvas('fibonacci-sphere-frame-' + nf(frameCount, 4), 'png');
    frameCount++;
  }
  
  if (frameCount >= maxFrames) {
    recording = false;
    console.log('All frames captured! Use a tool to convert to GIF.');
  }
}

function initSphere() {
  pts = [];
  for (let i = 1; i <= min(nbrPoints, kMaxPoints); ++i) {
    let lon = ga * i;
    lon /= 2 * PI; 
    lon -= floor(lon); 
    lon *= 2 * PI;
    if (lon > PI) lon -= 2 * PI;
    
    // Convert dome height to latitude
    let lat = asin(-1 + 2 * i / nbrPoints);
    
    pts.push(new SpherePoint(lat, lon));
  }
}

function renderGlobe() {
  push();
  translate(0, 0, pushBack);
  
  // Draw sphere outline
  fill(0);
  stroke(0);
  sphere(0.99 * R);
  
  let xRot = radians(-rotationX);
  let yRot = radians(270 - rotationY - millis() * 0.01);
  rotateX(xRot);
  rotateY(yRot);
  
  strokeWeight(3);
  
  // Draw all points
  for (let i = 0; i < pts.length; i++) {
    pts[i].show(yRot);
  }
  
  pop();
}

function mouseClicked() {
  addPoints = !addPoints;
}

// GIF recording controls
function keyPressed() {
  if (key === 'g' || key === 'G') {
    if (!recording) {
      recording = true;
      frameCount = 0;
      console.log('Started recording frames... Press G again to stop.');
    } else {
      recording = false;
      console.log('Stopped recording. Check your downloads for PNG frames.');
    }
  }
}
