import Ember from "ember";
import BaseRenderer from "./base";
import ENV from 'get-calendar/config/environment';

function loadFont(doc, name, fileName) {
  var req = new XMLHttpRequest();
  req.open("GET", ENV.assetHost + "assets/fonts/" + fileName, true);
  req.responseType = "arraybuffer";
  req.send(null);

  return new Ember.RSVP.Promise((resolve, reject) => {
    req.onload = () => {
      doc.registerFont(name, req.response);
      resolve();
    };
    req.onerror = () => { reject(); };
    req.onabort = () => { reject(); };
  });
}

export default BaseRenderer.extend({

  output: Ember.computed("doc", {
    get() {
      console.log(ENV);
      return new Ember.RSVP.Promise((resolve, reject) => {
        this.set("resolve", resolve);
      });
    }
  }),

  clear() {
    let doc = new PDFDocument({
      size: [this.get("width"), this.get("height")]
    });
    let stream = doc.pipe(blobStream());

    this.setProperties({
      doc: doc,
      stream: stream
    });

    stream.on("finish", () => {
      this.get("resolve")(stream);
    });

    let promises = [];
    promises.push(loadFont(doc, 'Old Standard TT 400', 'OldStandard-Regular.ttf'));
    promises.push(loadFont(doc, 'Old Standard TT 700', 'OldStandard-Bold.ttf'));
    promises.push(loadFont(doc, 'Source Sans Pro 300', 'SourceSansPro-Light.ttf'));

    return Ember.RSVP.all(promises);
  },

  draw() {
    let data = {};
    let doc = this.get("doc");

    this.get("look.lines").forEach((line) => {
      doc.lineWidth(line.width)
         .dash(line.dash[0] || 1, {space: line.dash[1] || 0})
         .moveTo(this.scaleHorizontally(line.x0), this.scaleVertically(line.y0))
         .lineTo(this.scaleHorizontally(line.x1), this.scaleVertically(line.y1))
         .stroke();
    });

    this.get("look.texts").forEach((text) => {
      let x = this.scaleHorizontally(text.x);
      let y = this.scaleVertically(text.y) - text.fontSize;
      let font = text.fontFamily + " " + text.fontWeight;
      let params = {};

      if (text.align === "right") {
        params.width = 100;
        x -= 100;
        params.align = "right";
      }

      doc.font(font)
         .fontSize(text.fontSize)
         .text(text.value, x, y, params);
    });

    doc.end();
  }

});
