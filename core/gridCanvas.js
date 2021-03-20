class GridCanvas {
  constructor(rows, cols, scale) {
    this.totalWidth = cols * scale;
    this.totalHeight = rows * scale;
    this.elements = [];

    this.createCanvas = function () {
      createCanvas(this.totalHeight, this.totalWidth, P2D);
    };

    this.draw2DGrid = function (
      shapeCallback,
      colors = null,
      strokeColor = null
    ) {
      // Draws the 2D grid with an object returned by `shapeCallback` in each cell,
      // with optionally a filled color and an optional stroke
      if (colors !== null && colors.length !== cols * rows) {
        throw new Error("Color grid has to have `rows*cols` cells");
      }

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          strokeColor == null ? noStroke() : stroke(strokeColor);
          colors == null ? noFill() : fill(colors[y * cols + x]);

          let cell_x = x * scale;
          let cell_y = y * scale;
          let index = y * cols + x;
          this.elements[index] = shapeCallback(cell_x, cell_y, scale);
        }
      }
    };
  }
}
