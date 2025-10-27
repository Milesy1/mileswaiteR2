// Simple test sketch
function setup() {
  createCanvas(400, 400);
  console.log('Simple test setup() called!');
  background(255, 0, 0); // Red background
}

function draw() {
  console.log('Simple test draw() called!');
  fill(255, 255, 0); // Yellow
  ellipse(mouseX, mouseY, 50, 50);
}

