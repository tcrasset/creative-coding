"use strict";
/* eslint-disable new-cap */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayUnitVector = void 0;
var p5_1 = __importDefault(require("p5"));
var DisplayUnitVector = /** @class */ (function () {
    function DisplayUnitVector(angle, magnitude, length, margin, _p5) {
        this.p5 = _p5;
        // The angle should be in radians.
        this.value = p5_1.default.Vector.fromAngle(this.p5.degrees(angle));
        this.value.setMag(magnitude);
        // If displaying in a grid, length is usually set to the
        // size of each cell in the grid
        this.length = length;
        this.margin = margin;
    }
    DisplayUnitVector.prototype.angle = function () {
        return this.value.heading();
    };
    DisplayUnitVector.prototype.setAngle = function (angle) {
        this.value = p5_1.default.Vector.fromAngle(this.p5.degrees(angle));
    };
    DisplayUnitVector.prototype.magnitude = function () {
        return this.value.mag();
    };
    DisplayUnitVector.prototype.show = function (x, y, scale, mode) {
        // const allowedModes = ['CORNER', 'CENTER'];
        // if (!allowedModes.includes(mode)) throw Error('Invalid mode');
        if (mode === void 0) { mode = 'CORNER'; }
        this.p5.push();
        this.p5.stroke(0);
        this.p5.strokeWeight(1);
        // Whether to use the provided `x` and `y` coordinates as
        // being the corners (an thus we have to translate to the center)
        // or directly the center coordinates
        if (mode === 'CORNER') {
            var centerX = x + 0.5 * scale;
            var centerY = y + 0.5 * scale;
            this.p5.translate(centerX, centerY);
        }
        else if (mode === 'CENTER') {
            this.p5.translate(x, y);
        }
        this.p5.rotate(this.angle());
        // Have the vector be of equal length on either side of the center
        var startX = -this.length / 2 + this.margin;
        var endX = this.length / 2 - this.margin;
        this.p5.line(startX, 0, endX, 0);
        // Arrow head
        var arrowProportion = 0.8;
        var arrowStartX = endX * arrowProportion;
        var arrowStartY = (1 - arrowProportion) * endX;
        this.p5.line(arrowStartX, arrowStartY, endX, 0);
        this.p5.line(arrowStartX, -arrowStartY, endX, 0);
        this.p5.pop();
    };
    return DisplayUnitVector;
}());
exports.DisplayUnitVector = DisplayUnitVector;
