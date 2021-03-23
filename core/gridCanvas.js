class GridCanvas {
  // Grid of size `this.totalHeight` and `this.totalWidth`, divided
  // into squares of size `this.scale`, creating a total amount of `this.rows`
  // and `this.cols` (`rows` and `cols` contains an int, the number of elements).
  //
  // The horizontal axis has the following components/nomenclature:
  //    - `cols` amount of cell in a horizontal row
  //    - x stands for coordinates in that axis
  //    - i stands for the grid index on that axis
  //    - this.totalWidth as the total width
  //
  // The vertical axis has the following components/nomenclature:
  //    - `rows` amount of cells in a vertical column
  //    - y stands for coordinates in that axis
  //    - j stands for the grid index on that axis
  //    - this.totalHeight as the total height


  static cellIndexToCoordinates = function (i, j, scale) {
    //Given a cell index (amount of rows/cols) and the scale, return the coordinate of that
    // cell (upper left corner)
    return createVector(i * scale, j * scale);
  };

  static cellIndex = function (x, y, scale) {
    // Given any valid `x` and `y` from the canvas
    // returns the corresponding cell index where
    // x and y is located in as a p5.Vector

    let i = floor(x / scale);
    let j = floor(y / scale);
    return createVector(i, j);
  };



  constructor(rows, cols, scale) {
    this.cols = cols;
    this.rows = rows;
    this.scale = scale;
    this.totalWidth = cols * scale;
    this.totalHeight = rows * scale;
    this.grid = Array(rows * cols);

    this.createCanvas = function () {
      createCanvas(this.totalHeight, this.totalWidth, P2D);
    };

    this.createGrid = function (cellCallback) {
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let index = this.cellIndexToArrayIndex(i, j);
          this.grid[index] = cellCallback(i, j);
        }
      }
      return this.grid;
    };

    this.draw2DGrid = function (shapeCallback) {
      // Draws the 2D grid with an object returned by `shapeCallback`
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let cell_coordinates = GridCanvas.cellIndexToCoordinates(i, j, this.scale);
          let index = this.cellIndexToArrayIndex(i, j);
          shapeCallback(
            cell_coordinates.x,
            cell_coordinates.y,
            scale
          );
        }
      }
    };

    this.valid_i = function (i) {
      return i >= 0 && i < this.cols;
    };

    this.valid_j = function (j) {
      return j >= 0 && j < this.rows;
    };

    this.checkOOBIndex = function (i, j) {
      let coords = GridCanvas.cellIndexToCoordinates(i, j, this.scale);
      this.checkOOBCoords(coords.x, coords.y);
    };

    this.checkOOBCoords = function (x, y) {
      if (x > this.totalWidth || x < 0 || y > this.totalHeight || y < 0) {
        throw Error(
          `Position out of bounds. Actual(${x}, ${y}) Max(${this.totalWidth}, ${this.totalHeight}) Min(0,0)`
        );
      }
    };

    this.neighbours = function (i, j, withDiagonals = false) {
      let neighbours = [];

      if (this.valid_i(i - 1)) neighbours.push(createVector(i - 1, j));
      if (this.valid_j(j - 1)) neighbours.push(createVector(i, j - 1));
      if (this.valid_j(j + 1)) neighbours.push(createVector(i, j + 1));
      if (this.valid_i(i + 1)) neighbours.push(createVector(i + 1, j));

      if (withDiagonals) {
        //! UPPER LEFT DIAGONAL
        if (this.valid_i(i - 1) && this.valid_j(j - 1))
          neighbours.push(createVector(i - 1, j - 1));
        //! UPPER RIGHT DIAGONAL
        if (this.valid_i(i + 1) && this.valid_j(j - 1))
          neighbours.push(createVector(i + 1, j - 1));
        //! LOWER LEFT DIAGONAL
        if (this.valid_i(i - 1) && this.valid_j(j + 1))
          neighbours.push(createVector(i - 1, j + 1));
        //! LOWER RIGHT DIAGONAL
        if (this.valid_i(i + 1) && this.valid_j(j + 1))
          neighbours.push(createVector(i + 1, j + 1));
      }

      return neighbours;
    };

    this.cellIndexToArrayIndex = function (i, j) {
      this.checkOOBIndex(i, j);
      return j * this.cols + i;
    };

    this.getGridElementAtCellIndex = function (i, j) {
      let index = this.cellIndexToArrayIndex(i, j);
      return this.grid[index];
    };

    this.getGridElementAtCoordinate = function (x, y) {
      // Given a valid `x` and `y` on the canvas, returns the
      // element at these coordinates

      this.checkOOBCoords(x, y);

      let cell_index = GridCanvas.cellIndex(x, y);
      return this.getGridElementAtCellIndex(cell_index.x, cell_index.y);
    };

    this.cellCoordinates = function (x, y) {
      // Given at `x` and `y` on the canvas, returns the
      // underlying element coordinates (upper left corner)
  
      let cellIndex = cellIndex(x, y);
      return GridCanvas.cellIndexToCoordinates(cellIndex.x, cellIndex.y, this.scale);
    };
  }
}
