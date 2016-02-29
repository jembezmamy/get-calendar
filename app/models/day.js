import Ember from "ember";
import moment from "moment";

export default Ember.Object.extend({
  month: null,
  number: 0,

  year: Ember.computed.reads("month.year"),
  locale: Ember.computed.reads("year.locale"),

  date: Ember.computed("year.number", "month.number", "number", "locale", {
    get() {
      return moment([
        this.get("year.number"),
        this.get("month.number") - 1,
        this.get("number")
      ]).locale(this.get("locale"));
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
