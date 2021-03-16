class GridCanvas {
    constructor(rows, cols, scale) {
      this.totalWidth = cols * scale;
      this.totalHeight = rows * scale;
  
      this.createCanvas = function () {
        createCanvas(this.totalHeight, this.totalWidth, P2D);
      };
  
      this.draw2DGrid = function (colors, strokeColor = null) {
        if (colors.length !== cols * rows) {
          throw new Error("Color grid has to have `rows*cols` cells");
        }
  
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            strokeColor == null ? noStroke() : stroke(strokeColor);
            let index = y * cols + x;
  
            fill(colors[index]);
            let cx = x * scale;
            let cy = y * scale;
            rect(cx, cy, cx + scale, cy + scale);
          }
        }
      };
    }
  }