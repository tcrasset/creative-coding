class DisplayUnitVector {
    constructor(angle, magnitude, length, margin) {
      // If displaying in a grid, length is usually set to the
      // size of each cell in the grid
      this.value = new p5.Vector.fromAngle(angle);
      this.value.setMag(magnitude);
      this.length = length;
      this.margin = margin;
  
      this.angle = function () {
        return this.value.heading();
      };
  
      this.magnitude = function () {
        this.value.mag();
      };
  
      this.show = function (x, y, scale, mode = "CORNER") {
        const allowed_modes = ["CORNER", "CENTER"];
  
        if (!allowed_modes.includes(mode)) throw Error("Invalid mode");
  
        push();
        stroke(0);
        strokeWeight(1);
  
        // Wether to use the provided `x` and `y` coordinates as
        // being the corners (an thus we have to translate to the center)
        // or directly the center coordinates
        if (mode === "CORNER") {
          let center_x = x + 0.5 * scale;
          let center_y = y + 0.5 * scale;
          translate(center_x, center_y);
        } else if (mode === "CENTER") {
          translate(x, y);
        }
  
        rotate(this.angle());
  
        // Have the vector be of equal length on either side of the center
        const start_x = -this.length / 2 + margin;
        const end_x = this.length / 2 - margin;
        line(start_x, 0, end_x, 0);
  
        // Arrow head
        const arrow_proportion = 0.8
        const arrow_start_x = end_x * arrow_proportion
        const arrow_start_y = (1 - arrow_proportion)*end_x
        line(arrow_start_x, arrow_start_y, end_x, 0);
        line(arrow_start_x, -arrow_start_y, end_x, 0);
        pop();
      };
    }
  }
  