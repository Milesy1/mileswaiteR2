// 元ネタは昔見たやつ 全体の形状が球体だったはず（あいまい）
// Updated to match cylinder colors: Red, Green, White
const RAD = 100;
let t = 0;
const NUM = 60;

// Cylinder color palette
const COLORS = [
  [255, 0, 0],    // Red (outer cylinder)
  [0, 255, 0],    // Green (inner cylinder)  
  [255, 255, 255] // White (outer-most cylinder)
];

function setup() {
  createCanvas(400, 400, WEBGL);
  strokeWeight(5);
  colorMode(RGB, 255);
}

function draw() {
  background(0, 0, 0); // Black background
  t += 0.003;
  rotateX(t / 2);
  rotateY(t);
  rotateZ(t / 3);

  for (let i = 1; i <= NUM; i++) {
    const a = i < NUM / 2 ? i : NUM - i;

    const x = RAD * cos(t * a);
    const y = RAD * sin(t * a);
    const z = (i - NUM / 2) * 4;
    
    // Use cylinder colors based on z-position (depth) - equal amounts
    let color;
    if (z < -40) {
      color = COLORS[0]; // Red for back third
    } else if (z > 40) {
      color = COLORS[1]; // Green for front third  
    } else {
      color = COLORS[2]; // White for middle third
    }
    
    stroke(color[0], color[1], color[2]);
    point(x, y, z);
  }
}
