# ember-tachyons-sweeper

This addon aims to remove any unused css classes from both your application and
vendor stylesheets. It is not [tachyons](http://tachyons.io/)-specific per se,
but will only attempt to remove selectors where either:

1. the element has matching CSS styles but is not used in any of the template files or
2. a defined class is not used in any template files

## Limitations

This does not (yet) take into account classes that are added to the DOM via
Ember or other JavaScript code. This includes `classNames`, `classNameBindings`, etc.

## Installation

* `git clone <repository-url>` this repository
* `cd ember-tachyons-sweeper`
* `npm install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
