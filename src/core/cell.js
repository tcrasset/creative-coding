class Cell {
  constructor(i = required(), j = required(), _p5 = required()) {
    this.i = i
    this.j = j
    this.p5 = _p5
  }

  show(cx, cy, scale, fillColor = null, strokeColor = null) {
    strokeColor == null ? this.p5.noStroke() : this.p5.stroke(strokeColor)
    fillColor == null ? this.p5.noFill() : this.p5.fill(fillColor)
    this.p5.fill(fillColor)
    this.p5.rect(cx, cy, cx + scale, cy + scale)
  }
}
