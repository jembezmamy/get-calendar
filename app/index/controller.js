import Ember from "ember";

const { getOwner } = Ember;

export default Ember.Controller.extend({

  look: Ember.computed("model", {
    get() {
      let look = getOwner(this).lookup("look:simple");
      look.set("calendar", this.get("model"));
      return look;
    }
  }),

  renderer: Ember.computed("look", {
    get() {
      let renderer = getOwner(this).lookup("renderer:canvas");
      renderer.setProperties({
        look: this.get("look"),
        scale: 0.5
      });
      return renderer;
    }
  })

});
