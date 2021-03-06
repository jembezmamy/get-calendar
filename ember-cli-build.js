/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var env = EmberApp.env()
var config = require("./config/environment")(env);
var isProductionLikeBuild = ['production', 'staging'].indexOf(env) > -1;

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sassOptions: {
      inputFile: "app.scss",
      includePaths: [
        'app/components', 'app'
      ]
    },
    fingerprint: {
      enabled: isProductionLikeBuild,
      extensions: ["js", "css", "png", "jpg", "gif", "map", "svg"],
      prepend: config.assetHost
    },
    minifyCSS: { enabled: isProductionLikeBuild },
    minifyJS: { enabled: isProductionLikeBuild }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import("bower_components/bower-pdfkit/pdfkit-0.7.1.js");
  app.import("bower_components/bower-pdfkit/blob-stream-v0.1.3.js");

  return app.toTree();
};
