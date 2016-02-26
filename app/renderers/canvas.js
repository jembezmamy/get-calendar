import Ember from "ember";
import BaseRenderer from "./base";

export default BaseRenderer.extend({
  output: Ember.computed({
    get() {
      return document.createElement("canvas");
    }
  }),

  clear() {
    let canvas = this.get("output");
    let ctx = canvas.getContext("2d");
    canvas.width = this.get("scaledWidth");
    canvas.height = this.get("scaledHeight");
  },

  draw() {
    let ctx = this.get("output").getContext("2d");
    let scale = this.get("scale");

    ctx.scale(scale, scale);

    this.get("look.lines").forEach((line) => {
      ctx.beginPath();
      ctx.moveTo(this.scaleHorizontally(line.x0), this.scaleVertically(line.y0));
      ctx.lineTo(this.scaleHorizontally(line.x1), this.scaleVertically(line.y1));
      ctx.lineWidth = line.width;
      ctx.setLineDash(line.dash);
      ctx.stroke();
    });

    this.get("look.texts").forEach((text) => {
      ctx.font = text.font;
      ctx.textAlign = text.align;
      ctx.fillText(text.value, this.scaleHorizontally(text.x), this.scaleVertically(text.y));
    });
  }
});
