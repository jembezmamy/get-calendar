import Ember from "ember";

export default Ember.Object.extend({

  calendar: null,

  lines: Ember.computed({
    get() {
      return [];
    }
  }),

  texts: Ember.computed({
    get() {
      return [];
    }
  })
});
