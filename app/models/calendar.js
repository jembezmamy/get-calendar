import Ember from "ember";
import moment from "moment";
import Month from "./month";

export default Ember.Object.extend({

  year: 0,
  number: Ember.computed.reads("year"),
  locale: null,

  months: Ember.computed({
    get() {
      return Array.apply(null, {length: 12}).map((v, i) => {
        return Month.create({
          number: i + 1,
          year: this
        });
      });
    }
  })

});
