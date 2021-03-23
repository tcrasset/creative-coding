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
