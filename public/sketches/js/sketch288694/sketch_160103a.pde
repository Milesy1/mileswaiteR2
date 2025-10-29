ArrayList particles = new ArrayList();

float am = 360;

void setup() {
  size(640, 640);
  noStroke();
  // Circle Example (am = 360)
  for(int i = 0; i < am; i+=10){
    particles.add(new Particle(new PVector(sin(radians(i))*101, cos(radians(i))*101), new PVector(sin(radians(i))*100, cos(radians(i))*100), i));
    particles.add(new Particle(new PVector(sin(radians(i))*99, cos(radians(i))*99), new PVector(sin(radians(i))*100, cos(radians(i))*100), i));
  }
  // Line Example (am = 640 or height);
  /*for(int i = 0; i < am; i+=10){
    particles.add(new Particle(new PVector(6, -height/2+i), new PVector(5, -height/2+i), i/2));
    particles.add(new Particle(new PVector(-6, -height/2+i), new PVector(-5, -height/2+i), i/2));
  }*/
}

void draw() {
  background(0);
  translate(width/2, height/2);
  for (int i = 0; i < particles.size(); i++) {
    Particle p = (Particle) particles.get(i);
    p.draw();
    p.move();
    p.boundary();
  }
}

class Particle {
  // Location, Velocity, Acceleration, Boundary, StartLocation
  PVector loc, vel, acc, limit, startLocation;

  float delay;

  Particle(PVector l, PVector lim, float d) {
    loc = new PVector(l.x, l.y);
    limit = lim;
    vel = new PVector();
    acc = new PVector();

    startLocation = loc.get();

    delay = d;
  }
  
  void draw(){
    ellipse(loc.x, loc.y, 3, 3); 
  }

  void move() {
    handleRepel();
    vel.add(acc);
    loc.add(vel);
    acc.mult(0);
  }

  void applyForce(PVector f) {
    acc.add(PVector.div(f, 1));
  }

  void boundary() {
    if (compareValue(limit, loc, startLocation)) {
      loc = limit.get();
      vel.mult(-0.5);
    }
  }

  void handleRepel() {
    if (delay > 0) {
      delay-=2;
    } else {
      delay = am;
    }
    if (delay < 10) {
      PVector f = new PVector(startLocation.x-limit.x, startLocation.y-limit.y);
      f.normalize();
      applyForce(f);
    } else {
      PVector f = new PVector(limit.x-startLocation.x, limit.y-startLocation.y);
      f.normalize();
      applyForce(f);
    }
  }
}
// Return whether the location has gone behind the limit.
boolean compareValue(PVector limit, PVector loc, PVector startLocation) {
  // Determine what side it is (Left or Right)
  boolean turnX = startLocation.x < limit.x;
  if (turnX && loc.x > limit.x)return true; 
  if (!turnX && loc.x < limit.x)return true; 
  boolean turnY = startLocation.y < limit.y;
  if (turnY && loc.y > limit.y)return true; 
  if (!turnY && loc.y < limit.y)return true; 
  
  return false;
}

