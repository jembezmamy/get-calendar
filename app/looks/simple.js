import Ember from "ember";
import BaseLook from "./base";

export default BaseLook.extend({
  gutter: 1 / 100,
  rowHeight: 1 / 33,
  y0: 2 / 33,

  lines: Ember.computed("calendar.months.@each.days.@each", "gutter", {
    get() {
      let lines = [];
      let gutter = this.get("gutter");
      let columnWidth = (1 - 11 * gutter) / 12;
      let rowHeight = this.get("rowHeight");
      let y0 = this.get("y0");

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
      let y0 = this.get("y0");

      this.get("calendar.months").forEach((month, i) => {
        texts.push({
          x: i * (columnWidth + gutter),
          y: rowHeight / 2,
          value: month.get("name"),
          font: "700 14px 'Old Standard TT', serif",
          align: "left"
        });
        month.get("days").forEach((day, j) => {
          texts.push({
            x: i * (columnWidth + gutter),
            y: j * rowHeight - 0.2 * rowHeight + y0,
            value: day.get("number"),
            font: "14px 'Old Standard TT', serif",
            align: "left"
          });
          texts.push({
            x: i * (columnWidth + gutter) + columnWidth,
            y: j * rowHeight - 0.2 * rowHeight + y0,
            value: day.get("weekDay").toLocaleUpperCase(),
            font: "300 10px 'Source Sans Pro', sans-serif",
            align: "right"
          });
        });
      });
      return texts;
    }
  })
});
