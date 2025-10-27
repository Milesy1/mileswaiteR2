// Rotating Ellipse Pattern
let theta = 0;
let npoints = 60;
let anglestep;
let anglestart = 0;
let r;
let colorIndex = 0;
let colorProgress = 0;

// Red, Green, White color cycle
const COLORS = [
  [255, 0, 0],    // Red
  [0, 255, 0],    // Green  
  [255, 255, 255] // White
];

function setup() {
  createCanvas(400, 400);
  r = width / 3;
  noStroke();
  
  colorMode(RGB, 255);
  anglestep = TWO_PI / npoints;
}

function draw() {
  clear();
  
  // Slower color cycling (every 3 seconds instead of 1)
  let timeCycle = (frameCount * 0.01) % 3; // Use frameCount instead of millis
  colorIndex = floor(timeCycle);
  colorProgress = timeCycle - colorIndex; // Progress between colors (0-1)
  
  // Get current and next colors for smooth transition
  let currentColor = COLORS[colorIndex];
  let nextColor = COLORS[(colorIndex + 1) % 3];
  
  // Interpolate between colors for smooth fade
  let red = lerp(currentColor[0], nextColor[0], colorProgress);
  let green = lerp(currentColor[1], nextColor[1], colorProgress);
  let blue = lerp(currentColor[2], nextColor[2], colorProgress);
  
  fill(red, green, blue);
  
  translate(width / 2, height / 2);
  rotate(theta);
  
  for (let i = 0; i < npoints; i++) {
    let angle = anglestart + i * anglestep;
    ellipse(1.2 * r * cos(angle), 0.8 * r * sin(angle), 2, 2);
  }
  
  anglestart -= 0.02187; // Another 10% slower: 0.0243 * 0.9 = 0.02187
  theta += 0.00729; // Another 10% slower: 0.0081 * 0.9 = 0.00729
}
