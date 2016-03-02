import Ember from "ember";

const { getOwner } = Ember;

export default Ember.Controller.extend({

  actions: {
    download() {
      this.set("isRendering", true);
      this.get("pdfRenderer.output").then((stream) => {
        this.set("isRendering", false);
        let url = stream.toBlobURL('application/pdf');
        let a = document.createElement("a");
        a.href = url;
        a.download = this.get("model.year") + " calendar";
        a.click();
      });
    }
  },

  look: Ember.computed("model", {
    get() {
      let look = getOwner(this).lookup("look:simple");
      look.set("calendar", this.get("model"));
      return look;
    }
  }),

  renderer: Ember.computed("look", {
    get() {
      let renderer = getOwner(this).lookup("renderer:canvas");
      renderer.setProperties({
        look: this.get("look"),
        scale: 0.5
      });
      return renderer;
    }
  }),

  pdfRenderer: Ember.computed("look", {
    get() {
      let renderer = getOwner(this).lookup("renderer:pdf");
      renderer.setProperties({
        look: this.get("look")
      });
      return renderer;
    }
  }),

  locales: [
    "az", "ca", "cs", "da", "de", "en", "es", "fi", "fr", "hr", "hu", "it",
    "nb", "nl", "pl", "pt", "ro", "sk", "sq", "sr", "sv", "tr"
  ],

  isRendering: false

});
