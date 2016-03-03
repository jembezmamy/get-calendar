# Get Calendar

Get Calendar is a simple browser app that generates a printable calendar in PDF format. You can use it (and get your calendar!) at http://jembezmamy.github.io/get-calendar/.

## Contributing

If you are planning to write a calendar generating script, this app should be a good start for you. It has a clear and scalable architecture, you can easily add your own calendar layouts and output formats.

### Technology

The project is written in [Ember CLI](http://www.ember-cli.com/). For PDF generation I use [PDFKit](http://pdfkit.org/).

### Architecture

Get Calendar implements two new types: `looks` and `renderers` on top of the basic Ember concepts like `models`, `routes`, `components`.

`Look` is responsible for translating data represented by `models` to a collections of texts and lines.

`Renderer` draws these objects in a given format (i.e. on HTML canvas or PDF).

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Get Calendar is hosted on GitHub Pages and uses [ember-cli-gh-pages](https://github.com/poetic/ember-cli-github-pages) for deployment. So all you need to do to deploy is to run:

```
ember github-pages:commit --message "[your commit message]"
```

Note that this will deploy to your gh-pages account.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* [PDFKit](http://pdfkit.org/)
* [SASS](http://sass-lang.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

## License

[Licensed under the MIT license](https://github.com/jembezmamy/get-calendar/blob/master/LICENSE)
