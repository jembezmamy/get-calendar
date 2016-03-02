import Ember from "ember";
import Calendar from "get-calendar/models/calendar";
import moment from "moment";

export default Ember.Route.extend({

  model() {
    return Calendar.create({
      year: moment().add(3, "months").year(),
      locale: navigator.userLanguage || navigator.language ||
        navigator.browserLanguage || navigator.systemLanguage
    });
  }

});
