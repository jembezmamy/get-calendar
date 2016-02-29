import Ember from "ember";
import moment from "moment";

export default Ember.Object.extend({
  month: null,
  number: 0,

  year: Ember.computed.reads("month.year"),

  date: Ember.computed("year.number", "month.number", "number", {
    get() {
      return moment([
        this.get("year.number"),
        this.get("month.number") - 1,
        this.get("number")
      ]);
    }
  }),

  weekDay: Ember.computed("date", {
    get() {
      return this.get("date").format("ddd");
    }
  }),

  isHoliday: Ember.computed("date", {
    get() {
      let weekDay = this.get("date").day();
      return weekDay === 0 || weekDay === 1;
    }
  })
});
