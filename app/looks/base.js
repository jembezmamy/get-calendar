import Ember from "ember";

export default Ember.Object.extend({

  lines: Ember.computed({
    get() {
      return [1];
    }
  }),

  texts: Ember.computed({
    get() {
      return [];
    }
  })
});
