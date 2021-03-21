class GridCanvas {
  constructor(rows, cols, scale) {
    this.cols = cols;
    this.rows = rows;
    this.scale = scale;
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

          let cell_coordinates = this.cellIndexToCoordinates(x, y);
          let index = this.cellIndexToArrayIndex(x, y);
          this.elements[index] = shapeCallback(
            cell_coordinates.x,
            cell_coordinates.y,
            scale
          );
        }
      }
    };

    this.cellIndexToCoordinates = function (cell_index_x, cell_index_y) {
      //Given a cell index (amount of rows/cols), return the coordinate of that
      // cell (upper left corner)
      return createVector(cell_index_x * scale, cell_index_y * scale);
    };

    this.cellCoordinates = function (x, y) {
      // Given at `x` and `y` on the canvas, returns the
      // underlying element coordinates (upper left corner)

      let cellIndex = cellIndex(x, y);
      return this.cellIndexToCoordinates(cellIndex.x, cellIndex.y);
    };

    this.cellIndex = function (x, y) {
      // Given any valid `x` and `y` from the canvas
      // returns the corresponding cell index where
      // x and y is located in as a p5.Vector

      if (x > this.totalWidth || x < 0 || y > this.totalHeight || y < 0) {
        throw Error(
          `Position out of bounds. Actual(${x}, ${y}) Max(${this.totalWidth}, ${this.totalHeight}) Min(0,0)`
        );
      }

      let x_index = floor(x / this.scale);
      let y_index = floor(y / this.scale);
      return createVector(x_index, y_index);
    };

    this.cellIndexToArrayIndex = function (cell_x_index, cell_y_index) {
      return cell_y_index * this.cols + cell_x_index;
    };

    this.getElementAtCellIndex = function (cell_x_index, cell_y_index) {
      let index = this.cellIndexToArrayIndex(cell_x_index, cell_y_index);
      print(cell_x_index, cell_y_index);
      print(index);
      return this.elements[index];
    };

    this.getElementAtCoordinate = function (x, y) {
      // Given a valid `x` and `y` on the canvas, returns the
      // element at these coordinates
      let cell_index = this.cellIndex(x, y);
      print(cell_index);
      console.log(cell_index);
      return this.getElementAtCellIndex(cell_index.x, cell_index.y);
    };
  }
}
