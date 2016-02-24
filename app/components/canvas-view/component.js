import Ember from "ember";

export default Ember.Component.extend({
  canvas: null,

  didInsertElement() {
    Ember.run.scheduleOnce("afterRender", this, this.appendCanvas);
  },

  appendCanvas() {
    this.element.appendChild(this.get("canvas"));
  }
});
