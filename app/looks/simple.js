import Ember from "ember";
import BaseLook from "./base";

export default BaseLook.extend({
  gutter: 1 / 100,
  rowHeight: 1 / 33,
  headersY: 1 / 33,
  bodyY: 3 / 33,

  lines: Ember.computed("calendar.months.@each.days.@each", "gutter", {
    get() {
      let lines = [];
      let gutter = this.get("gutter");
      let columnWidth = (1 - 11 * gutter) / 12;
      let rowHeight = this.get("rowHeight");
      let y0 = this.get("bodyY");

      this.get("calendar.months").forEach((month, i) => {
        month.get("days").forEach((day, j) => {
          lines.push({
            x0: i * (columnWidth + gutter),
            y0: j * rowHeight + y0,
            x1: i * (columnWidth + gutter) + columnWidth,
            y1: j * rowHeight + y0,
            width: day.get("isHoliday") ? 2 : 0.75,
            dash: day.get("isHoliday") ? [] : [0.75, 1],
          });
        });
      });
      return lines;
    }
  }),

  texts: Ember.computed("calendar.months.@each.days.@each", "gutter", {
    get() {
      let texts = [];
      let gutter = this.get("gutter");
      let columnWidth = (1 - 11 * gutter) / 12;
      let rowHeight = this.get("rowHeight");
      let headersY = this.get("headersY");
      let bodyY = this.get("bodyY");

      texts.push({
        x: 0,
        y: 0,
        value: this.get("calendar.year"),
        fontFamily: "Old Standard TT",
        fontSize: 42,
        fontWeight: 700,
        align: "left"
      });

      this.get("calendar.months").forEach((month, i) => {
        texts.push({
          x: i * (columnWidth + gutter),
          y: headersY + rowHeight / 2,
          value: month.get("name"),
          fontFamily: "Old Standard TT",
          fontSize: 14,
          fontWeight: 700,
          align: "left"
        });
        month.get("days").forEach((day, j) => {
          texts.push({
            x: i * (columnWidth + gutter),
            y: j * rowHeight - 0.2 * rowHeight + bodyY,
            value: day.get("number"),
            fontFamily: "Old Standard TT",
            fontSize: 14,
            fontWeight: 400,
            align: "left"
          });
          texts.push({
            x: i * (columnWidth + gutter) + columnWidth,
            y: j * rowHeight - 0.2 * rowHeight + bodyY,
            value: day.get("weekDay").toLocaleUpperCase(),
            fontFamily: "Source Sans Pro",
            fontSize: 10,
            fontWeight: 300,
            align: "right"
          });
        });
      });
      return texts;
    }
  })
});
