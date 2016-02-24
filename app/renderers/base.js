import Ember from "ember";

export default Ember.Object.extend({
  look: null,
  output: null,

  clear() {},
  draw() {},

  scheduleRedraw: Ember.observer("look.lines.[]", "look.texts.[]", function() {
    this.debouncedRun = Ember.run.debounce(this, this.redraw, 100);
  }),

  redraw() {
    this.clear();
    this.draw();
  },

  willDestroy() {
    Ember.run.cancel(this.debouncedRun);
    this._super();
  }
});
