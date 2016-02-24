import Ember from "ember";

export default Ember.Controller.extend({

  look: Ember.computed({
    get() {
      return this.get("container").lookup("look:simple");
    }
  }),

  renderer: Ember.computed("look", {
    get() {
      let renderer = this.get("container").lookup("renderer:canvas");
      renderer.set("look", this.get("look"));
      return renderer;
    }
  })

});
