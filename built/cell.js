"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = void 0;
var Cell = /** @class */ (function () {
    function Cell(i, j, _p5) {
        this.i = i;
        this.j = j;
        this.p5 = _p5;
    }
    Cell.prototype.show = function (cx, cy, scale, fillColor, strokeColor) {
        if (fillColor === void 0) { fillColor = null; }
        if (strokeColor === void 0) { strokeColor = null; }
        strokeColor == null ? this.p5.noStroke() : this.p5.stroke(strokeColor);
        fillColor == null ? this.p5.noFill() : this.p5.fill(fillColor);
        this.p5.rect(cx, cy, cx + scale, cy + scale);
    };
    return Cell;
}());
exports.Cell = Cell;
