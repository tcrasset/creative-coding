"use strict";
/* eslint-disable new-cap */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayUnitVector = void 0;
const p5_1 = __importDefault(require("p5"));
class DisplayUnitVector {
    constructor(angle, magnitude, length, margin, _p5) {
        this.p5 = _p5;
        // The angle should be in radians.
        this.value = p5_1.default.Vector.fromAngle(this.p5.degrees(angle));
        this.value.setMag(magnitude);
        // If displaying in a grid, length is usually set to the
        // size of each cell in the grid
        this.length = length;
        this.margin = margin;
    }
    angle() {
        return this.value.heading();
    }
    setAngle(angle) {
        this.value = p5_1.default.Vector.fromAngle(this.p5.degrees(angle));
    }
    magnitude() {
        return this.value.mag();
    }
    show(x, y, scale, mode = 'CORNER') {
        // const allowedModes = ['CORNER', 'CENTER'];
        // if (!allowedModes.includes(mode)) throw Error('Invalid mode');
        this.p5.push();
        this.p5.stroke(0);
        this.p5.strokeWeight(1);
        // Whether to use the provided `x` and `y` coordinates as
        // being the corners (an thus we have to translate to the center)
        // or directly the center coordinates
        if (mode === 'CORNER') {
            const centerX = x + 0.5 * scale;
            const centerY = y + 0.5 * scale;
            this.p5.translate(centerX, centerY);
        }
        else if (mode === 'CENTER') {
            this.p5.translate(x, y);
        }
        this.p5.rotate(this.angle());
        // Have the vector be of equal length on either side of the center
        const startX = -this.length / 2 + this.margin;
        const endX = this.length / 2 - this.margin;
        this.p5.line(startX, 0, endX, 0);
        // Arrow head
        const arrowProportion = 0.8;
        const arrowStartX = endX * arrowProportion;
        const arrowStartY = (1 - arrowProportion) * endX;
        this.p5.line(arrowStartX, arrowStartY, endX, 0);
        this.p5.line(arrowStartX, -arrowStartY, endX, 0);
        this.p5.pop();
    }
}
exports.DisplayUnitVector = DisplayUnitVector;
