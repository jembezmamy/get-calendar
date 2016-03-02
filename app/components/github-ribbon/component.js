import Ember from "ember";

export default Ember.Component.extend({
  classNames: "github-ribbon",
  tagName: "a",
  attributeBindings: ["href", "target"],

  href: "https://github.com/jembezmamy/get-calendar",
  target: "_blank"
})
