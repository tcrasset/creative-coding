"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = void 0;
class Cell {
    constructor(i, j, _p5) {
        this.i = i;
        this.j = j;
        this.p5 = _p5;
    }
    show(cx, cy, scale, fillColor = null, strokeColor = null) {
        strokeColor == null ? this.p5.noStroke() : this.p5.stroke(strokeColor);
        fillColor == null ? this.p5.noFill() : this.p5.fill(fillColor);
        this.p5.rect(cx, cy, cx + scale, cy + scale);
    }
}
exports.Cell = Cell;
