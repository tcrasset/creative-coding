class Cell {
  constructor(i = required(), j = required()) {
    this.i = i
    this.j = j
  }

  show(cx, cy, scale, fillColor = null, strokeColor = null) {
    strokeColor == null ? noStroke() : stroke(strokeColor)
    fillColor == null ? noFill() : fill(fillColor)
    fill(fillColor)
    rect(cx, cy, cx + scale, cy + scale)
  }
}
