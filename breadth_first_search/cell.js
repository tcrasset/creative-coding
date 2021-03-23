class Cell {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.discovered = false

    this.discover = function () {
      this.discovered = true
    }

    this.show = function (cx, cy, scale) {
      const cellColor = this.discovered ? color(255, 0, 0) : color(0, 255, 0)
      fill(cellColor)
      rect(cx, cy, cx + scale, cy + scale)
    }
  }
}
