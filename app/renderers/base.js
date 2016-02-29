import Ember from "ember";

export function mm(v) {
  return v / 0.3528;
}

export default Ember.Object.extend({
  look: null,

  output: null,
  clear() {},
  draw() {},

  width: mm(1000),
  height: mm(700),
  marginTop: mm(50),
  marginRight: mm(50),
  marginBottom: mm(50),
  marginLeft: mm(50),
  scale: 1,

  scheduleRedraw: Ember.observer("look.lines.[]", "look.texts.[]", function() {
    this.debouncedRun = Ember.run.debounce(this, this.redraw, 100);
  }),

  redraw() {
    let promise = this.clear();
    if (promise && promise.then) {
      promise.then(() => {
        this.draw();
      });
    } else {
      this.draw();
    }
  },

  willDestroy() {
    Ember.run.cancel(this.debouncedRun);
    this._super();
  },


  scaledWidth: Ember.computed("width", "scale", {
    get() {
      return this.get("scale") * this.get("width");
    }
  }),

  scaledHeight: Ember.computed("height", "scale", {
    get() {
      return this.get("scale") * this.get("height");
    }
  }),


  innerWidth: Ember.computed("width", "marginLeft", "marginRight", {
    get() {
      return this.get("width") - this.get("marginLeft") - this.get("marginRight");
    }
  }),

  innerHeight: Ember.computed("height", "marginTop", "marginBottom", {
    get() {
      return this.get("height") - this.get("marginTop") - this.get("marginBottom");
    }
  }),

  scaleHorizontally(v) {
    return v * this.get("innerWidth") + this.get("marginLeft");
  },

  scaleVertically(v) {
    return v * this.get("innerHeight") + this.get("marginTop");
  }
});
