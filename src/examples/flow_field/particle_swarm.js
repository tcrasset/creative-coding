class ParticleSwarm {
  constructor(nParticles, color = 255) {
    this.nParticles = nParticles
    this.color = color

    this.createRandomParticles = function () {
      const particles = []
      for (let i = 0; i < this.nParticles; i++) {
        particles[i] = new Particle(random(width), random(height))
      }
      return particles
    }

    this.particles = this.createRandomParticles()

    this.stepParticles = function (gridCanvas) {
      this.particles.forEach((particle) => {
        const fieldVector = gridCanvas.getGridElementAtCoordinate(
          particle.pos.x,
          particle.pos.y
        )
        particle.applyForce(fieldVector.value)

        particle.update()
        particle.edges(gridCanvas.totalWidth, gridCanvas.totalHeight)
        particle.show(this.color)
      })
    }
  }
}
