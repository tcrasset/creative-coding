class ParticleSwarm {
  constructor(nParticles = required(), color = 255, _p5 = required()) {
    this.p5 = _p5;
    this.nParticles = nParticles;
    this.color = color;
    this.particles = this.createRandomParticles();
  }

  createRandomParticles() {
    const particles = [];
    for (let i = 0; i < this.nParticles; i++) {
      particles[i] = new Particle(
        this.p5.random(this.p5.width),
        this.p5.random(this.p5.height),
        this.p5,
      );
    }
    return particles;
  }

  stepParticles(gridCanvas) {
    this.particles.forEach((particle) => {
      const fieldVector = gridCanvas.getGridElementAtCoordinate(
        particle.pos.x,
        particle.pos.y,
      );
      particle.applyForce(fieldVector.value);

      particle.update();
      particle.edges(gridCanvas.totalWidth, gridCanvas.totalHeight);
      particle.show(this.color);
    });
  }
}
