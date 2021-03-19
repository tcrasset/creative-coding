class GridCanvas {
  constructor(rows, cols, scale) {
    this.totalWidth = cols * scale;
    this.totalHeight = rows * scale;

    this.createCanvas = function () {
      createCanvas(this.totalHeight, this.totalWidth, P2D);
    };

    this.draw2DGrid = function (shapeCallback, colors = null, strokeColor = null) {
      // Draws the 2D grid with an object returned by `shapeCallback`,
      // with optionally a filled color and an optional stroke
      if (colors.length !== cols * rows) {
        throw new Error("Color grid has to have `rows*cols` cells");
      }

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          strokeColor == null ? noStroke() : stroke(strokeColor);
          colors == null ? noFill() : fill(colors[y * cols + x]);

          let cx = x * scale;
          let cy = y * scale;

          shapeCallback(cx, cy, scale);
        }
      }
    };
  }
}
