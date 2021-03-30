"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridCanvas = void 0;
var GridCanvas = /** @class */ (function () {
    function GridCanvas(rows, cols, scale, _p5) {
        this.p5 = _p5;
        this.cols = cols;
        this.rows = rows;
        this.scale = scale;
        this.totalWidth = cols * scale;
        this.totalHeight = rows * scale;
        this.arrayLength = rows * cols;
        this.grid = Array(this.arrayLength);
    }
    // Grid of size `this.totalHeight` and `this.totalWidth`, divided
    // into squares of size `this.scale`, creating a total amount of `this.rows`
    // and `this.cols` (`rows` and `cols` contains an int, the number of elements).
    //
    // The horizontal axis has the following components/nomenclature:
    //    - `cols` amount of cell in a horizontal row
    //    - y stands for coordinates in that axis
    //    - j stands for the grid index on that axis
    //    - this.totalWidth as the total width
    //
    // The vertical axis has the following components/nomenclature:
    //    - `rows` amount of cells in a vertical column
    //    - x stands for coordinates in that axis
    //    - i stands for the grid index on that axis
    //    - this.totalHeight as the total height
    GridCanvas.cellIndexToCoordinates = function (i, j, scale, _p5) {
        // Given a cell index (amount of rows/cols) and the scale, return the coordinate of that
        // cell (upper left corner)
        return _p5.createVector(i * scale, j * scale);
    };
    GridCanvas.cellIndex = function (x, y, scale, _p5) {
        // Given any valid `x` and `y` from the canvas
        // returns the corresponding cell index where
        // x and y is located in as a p5.Vector
        var i = _p5.floor(x / scale);
        var j = _p5.floor(y / scale);
        return _p5.createVector(i, j);
    };
    GridCanvas.prototype.createCanvas = function () {
        this.p5.createCanvas(this.totalHeight, this.totalWidth, this.p5.P2D);
    };
    GridCanvas.prototype.createGrid = function (cellCallback) {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                var index = this.cellIndexToArrayIndex(i, j);
                this.grid[index] = cellCallback(i, j, this.scale);
            }
        }
        return this.grid;
    };
    GridCanvas.prototype.draw2DGrid = function (shapeCallback) {
        // Draws the 2D grid with an object returned by `shapeCallback`
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                var cellCoordinates = GridCanvas.cellIndexToCoordinates(i, j, this.scale, this.p5);
                shapeCallback(cellCoordinates.x, cellCoordinates.y, this.scale);
            }
        }
    };
    GridCanvas.prototype.isValidI = function (i) {
        return i >= 0 && i < this.rows;
    };
    GridCanvas.prototype.isValidJ = function (j) {
        return j >= 0 && j < this.cols;
    };
    GridCanvas.prototype.checkOOBIndex = function (i, j) {
        var coords = GridCanvas.cellIndexToCoordinates(i, j, this.scale, this.p5);
        this.checkOOBCoords(coords.x, coords.y);
    };
    GridCanvas.prototype.checkOOBCoords = function (x, y) {
        if (x >= this.totalHeight || x < 0 || y >= this.totalWidth || y < 0) {
            throw Error("Position out of bounds. Actual(" + x + ", " + y + "), Min is (0,0),\n         Max is (" + this.totalWidth + ", " + this.totalHeight + ") ");
        }
    };
    GridCanvas.prototype.neighbours = function (i, j, withDiagonals) {
        if (withDiagonals === void 0) { withDiagonals = false; }
        var neighbours = [];
        if (this.isValidI(i - 1))
            neighbours.push(this.p5.createVector(i - 1, j));
        if (this.isValidJ(j - 1))
            neighbours.push(this.p5.createVector(i, j - 1));
        if (this.isValidJ(j + 1))
            neighbours.push(this.p5.createVector(i, j + 1));
        if (this.isValidI(i + 1))
            neighbours.push(this.p5.createVector(i + 1, j));
        if (withDiagonals) {
            // ! UPPER LEFT DIAGONAL
            if (this.isValidI(i - 1) && this.isValidJ(j - 1))
                neighbours.push(this.p5.createVector(i - 1, j - 1));
            // ! UPPER RIGHT DIAGONAL
            if (this.isValidI(i + 1) && this.isValidJ(j - 1))
                neighbours.push(this.p5.createVector(i + 1, j - 1));
            // ! LOWER LEFT DIAGONAL
            if (this.isValidI(i - 1) && this.isValidJ(j + 1))
                neighbours.push(this.p5.createVector(i - 1, j + 1));
            // ! LOWER RIGHT DIAGONAL
            if (this.isValidI(i + 1) && this.isValidJ(j + 1))
                neighbours.push(this.p5.createVector(i + 1, j + 1));
        }
        return neighbours;
    };
    GridCanvas.prototype.cellIndexToArrayIndex = function (i, j) {
        this.checkOOBIndex(i, j);
        return i * this.cols + j;
    };
    GridCanvas.prototype.arrayIndexToCellIndex = function (index) {
        if (index >= this.arrayLength || index < 0) {
            throw Error("Index (" + index + ") out of bounds");
        }
        var x = index % this.cols; // % is the "modulo operator", the remainder of i / width;
        var y = index / this.cols;
        return this.p5.createVector(x, y);
    };
    GridCanvas.prototype.getGridElementAtCellIndex = function (i, j) {
        try {
            // When called as a first function (i.e. not within this.getGridElementAtCoordinate()),
            // we want the user to know that he selected an out of bounds index.
            var index = this.cellIndexToArrayIndex(i, j);
            return this.grid[index];
        }
        catch (error) {
            console.error("Index (" + i + ", " + j + ") out of bounds. Min is (0,0). \n          Max is (" + (this.cols - 1) + ", " + (this.rows - 1) + ")");
        }
    };
    GridCanvas.prototype.getGridElementAtArrayIndex = function (index) {
        try {
            // When called as a first function (i.e. not within this.getGridElementAtCoordinate()),
            // we want the user to know that he selected an out of bounds index.
            return this.grid[index];
        }
        catch (error) {
            console.error("Index (index) out of bounds. Min is (0). \n          Max is (" + (this.arrayLength - 1) + ")");
        }
    };
    GridCanvas.prototype.getGridElementAtCoordinate = function (x, y) {
        // Given a valid `x` and `y` on the canvas, returns the
        // element at these coordinates
        this.checkOOBCoords(x, y);
        var cellIndex = GridCanvas.cellIndex(x, y, this.scale, this.p5);
        return this.getGridElementAtCellIndex(cellIndex.x, cellIndex.y);
    };
    return GridCanvas;
}());
exports.GridCanvas = GridCanvas;
