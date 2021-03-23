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

  static cellIndexToCoordinates(
    i = required(),
    j = required(),
    scale = required()
  ) {
    // Given a cell index (amount of rows/cols) and the scale, return the coordinate of that
    // cell (upper left corner)
    return createVector(i * scale, j * scale)
  }

  static cellIndex(x = required(), y = required(), scale = required()) {
    // Given any valid `x` and `y` from the canvas
    // returns the corresponding cell index where
    // x and y is located in as a p5.Vector

    const i = floor(x / scale)
    const j = floor(y / scale)
    return createVector(i, j)
  }

  constructor(rows = required(), cols = required(), scale = required()) {
    this.cols = cols
    this.rows = rows
    this.scale = scale
    this.totalWidth = cols * scale
    this.totalHeight = rows * scale

    this.gridLength = rows * cols
    this.grid = Array(this.gridLength)

    this.createCanvas = function () {
      createCanvas(this.totalHeight, this.totalWidth, P2D)
    }

    this.createGrid = function (cellCallback = required()) {
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const index = this.cellIndexToArrayIndex(i, j)
          this.grid[index] = cellCallback(i, j)
        }
      }
      return this.grid
    }

    this.draw2DGrid = function (shapeCallback = required()) {
      // Draws the 2D grid with an object returned by `shapeCallback`
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const cellCoordinates = GridCanvas.cellIndexToCoordinates(
            i,
            j,
            this.scale
          )
          shapeCallback(cellCoordinates.x, cellCoordinates.y, scale)
        }
      }
    }

    this.valid_i = function (i = required()) {
      return i >= 0 && i < this.cols
    }

    this.valid_j = function (j = required()) {
      return j >= 0 && j < this.rows
    }

    this.checkOOBIndex = function (i = required(), j = required()) {
      const coords = GridCanvas.cellIndexToCoordinates(i, j, this.scale)
      this.checkOOBCoords(coords.x, coords.y)
    }

    this.checkOOBCoords = function (x = required(), y = required()) {
      if (x > this.totalWidth || x < 0 || y > this.totalHeight || y < 0) {
        throw Error(
          `Position out of bounds. Actual(${x}, ${y}) Max(${this.totalWidth}, ${this.totalHeight}) Min(0,0)`
        )
      }
    }

    this.neighbours = function (
      i = required(),
      j = required(),
      withDiagonals = false
    ) {
      const neighbours = []

      if (this.valid_i(i - 1)) neighbours.push(createVector(i - 1, j))
      if (this.valid_j(j - 1)) neighbours.push(createVector(i, j - 1))
      if (this.valid_j(j + 1)) neighbours.push(createVector(i, j + 1))
      if (this.valid_i(i + 1)) neighbours.push(createVector(i + 1, j))

      if (withDiagonals) {
        // ! UPPER LEFT DIAGONAL
        if (this.valid_i(i - 1) && this.valid_j(j - 1))
          neighbours.push(createVector(i - 1, j - 1))
        // ! UPPER RIGHT DIAGONAL
        if (this.valid_i(i + 1) && this.valid_j(j - 1))
          neighbours.push(createVector(i + 1, j - 1))
        // ! LOWER LEFT DIAGONAL
        if (this.valid_i(i - 1) && this.valid_j(j + 1))
          neighbours.push(createVector(i - 1, j + 1))
        // ! LOWER RIGHT DIAGONAL
        if (this.valid_i(i + 1) && this.valid_j(j + 1))
          neighbours.push(createVector(i + 1, j + 1))
      }

      return neighbours
    }

    this.cellIndexToArrayIndex = function (i = required(), j = required()) {
      this.checkOOBIndex(i, j)
      return j * this.cols + i
    }

    this.arrayIndexToCellIndex = function (index = required()) {
      if (index >= this.arrayLength || index < 0) {
        throw Error('Index out of bounds')
      }
      x = index % this.cols // % is the "modulo operator", the remainder of i / width;
      y = index / this.cols
      return createVector(x, y)
    }

    this.getGridElementAtCellIndex = function (i = required(), j = required()) {
      const index = this.cellIndexToArrayIndex(i, j)
      return this.grid[index]
    }

    this.getGridElementAtCoordinate = function (
      x = required(),
      y = required()
    ) {
      // Given a valid `x` and `y` on the canvas, returns the
      // element at these coordinates

      this.checkOOBCoords(x, y)

      const cellIndex = GridCanvas.cellIndex(x, y, this.scale)
      return this.getGridElementAtCellIndex(cellIndex.x, cellIndex.y)
    }
  }
}
