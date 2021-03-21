class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.prevPos = this.pos.copy();
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 10;

    this.show = function (color = 255) {
      stroke(color);
      strokeWeight(1);
      line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
      this.updatePrev();
    };

    this.updatePrev = function () {
      this.prevPos.x = this.pos.x;
      this.prevPos.y = this.pos.y;
    };

    this.update = function () {
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.pos.add(this.vel);
      // print(this.pos);
      this.acc.mult(0);
    };

    this.applyForce = function (force) {
      this.acc.add(force);
    };

    this.edges = function (width, height) {
      if (this.pos.x >= width) {
        this.pos.x = 0;
        this.updatePrev();
      }
      if (this.pos.x < 0) {
        this.pos.x = width - 1;
        this.updatePrev();
      }
      if (this.pos.y >= height) {
        this.pos.y = 0;
        this.updatePrev();
      }
      if (this.pos.y < 0) {
        this.pos.y = height - 1;
        this.updatePrev();
      }
    };
  }
}

class PatricleSwarm {
  constructor(nParticles, color = 255) {
    this.nParticles = nParticles;
    this.color = color;

    this.createRandomParticles = function () {
      let particles = [];
      for (let i = 0; i < this.nParticles; i++) {
        particles[i] = new Particle(random(width), random(height));
      }
      return particles;
    };

    this.particles = this.createRandomParticles();

    this.stepParticles = function (gridCanvas) {
      this.particles.forEach((particle) => {
        let fieldVector = gridCanvas.getElementAtCoordinate(
          particle.pos.x,
          particle.pos.y
        );
        particle.applyForce(fieldVector.value);

        particle.update();
        particle.edges(gridCanvas.totalWidth, gridCanvas.totalHeight);
        particle.show(this.color);
      });
    };
  }
}
