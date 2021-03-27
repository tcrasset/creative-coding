class Particle {
  constructor(x = required(), y = required(), _p5 = required()) {
    this.p5 = _p5
    this.pos = this.p5.createVector(x, y)
    this.prevPos = this.pos.copy()
    this.vel = this.p5.createVector(0, 0)
    this.acc = this.p5.createVector(0, 0)
    this.maxSpeed = 5
  }

  show(color = this.p5.color(255)) {
    this.p5.stroke(color)
    this.p5.strokeWeight(1)
    this.p5.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
    this.updatePrev()
  }

  updatePrev() {
    this.prevPos.x = this.pos.x
    this.prevPos.y = this.pos.y
  }

  update() {
    this.vel.add(this.acc)
    this.vel.limit(this.maxSpeed)
    this.pos.add(this.vel)
    // print(this.pos);
    this.acc.mult(0)
  }

  applyForce(force) {
    this.acc.add(force)
  }

  edges(width, height) {
    if (this.pos.x >= width) {
      this.pos.x = 0
      this.updatePrev()
    }
    if (this.pos.x < 0) {
      this.pos.x = width - 1
      this.updatePrev()
    }
    if (this.pos.y >= height) {
      this.pos.y = 0
      this.updatePrev()
    }
    if (this.pos.y < 0) {
      this.pos.y = height - 1
      this.updatePrev()
    }
  }
}
