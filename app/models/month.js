import Ember from "ember";
import Day from "./day";

var monthNames = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

export default Ember.Object.extend({
  year: null,
  number: 1,

  name: Ember.computed("number", {
    get() {
      return monthNames[this.get("number") - 1];
    }
  }),

  date: Ember.computed("year.number", "number", {
    get() {
      return moment([this.get("year.number"), this.get("number") - 1]);
    }
  }),

  dayCount: Ember.computed("date", {
    get() {
      return this.get("date").daysInMonth();
    }
  }),

  days: Ember.computed("dayCount", {
    get() {
      let dayCount = this.get("dayCount");
      return Array.apply(null, {length: dayCount}).map((v, i) => {
        return Day.create({
          number: i + 1,
          month: this
        });
      });
    }
  })
});
