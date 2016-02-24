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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },

  draw() {
    let ctx = this.get("output").getContext("2d");
    this.get("look.lines").forEach((text) => {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(100, 0);
      ctx.closePath();
      ctx.stroke();
    });
  }
});
