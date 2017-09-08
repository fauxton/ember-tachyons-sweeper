/* eslint-env node */
'use strict';
const htmlTags = require('html-tags');
const diff = require('lodash/difference');
const merge = require('lodash/merge');
const compileCSS = require('broccoli-postcss');

const removeableElements = () => {
  const whitelistedTags = ['html', 'body'];
  const removeableTags = diff(htmlTags, whitelistedTags);

  const { getItemSync } = process.emberAddonStateBucket;

  const htmlElementsInApp = getItemSync('ember-dom-inventory:htmlElements') || [];

  return diff(
    removeableTags,
    htmlElementsInApp
  );
};

const removeableClasses = () => {
  const { getItemSync } = process.emberAddonStateBucket;
  const cssClassesInApp = getItemSync('ember-dom-inventory:htmlClasses') || [];

  if (cssClassesInApp.length) {
    const klasses = cssClassesInApp.join('|');
    const regex = new RegExp(`^\\.(?!(${klasses})$).*`)
    return regex;
  }

  const regexMatchingAllClasses = new RegExp(/^\..*$/);
  return regexMatchingAllClasses;
};

const removeableIds = () => {
  const { getItemSync } = process.emberAddonStateBucket;
  const idsInApp = getItemSync('ember-dom-inventory:htmlIds') || [];

  if (idsInApp.length) {
    const ids = idsInApp.join('|');
    const regex = new RegExp(`^#(?!(${ids})$).*`)
    return regex;
  }

  const regexMatchingAllIds = new RegExp(/^#.*$/);
  return regexMatchingAllIds;
};

module.exports = {
  name: 'ember-tachyons-sweeper',

  postprocessTree(type, tree) {
    if (type === 'css') {
      const selectorBlacklist = removeableElements();
      const regexenBlacklist = [removeableClasses(), removeableIds()];

      return compileCSS(tree, {
        plugins: [
          {
            module: require('postcss-discard-comments'),
            options: {
              removeAll: true
            },
          },
          {
            module: require('postcss-strip-selectors'),
            options: {
              selectors: selectorBlacklist,
              regexen: regexenBlacklist,
            },
          },
          {
            module: require('postcss-discard-empty'),
            options: {},
          }
        ]
      });
    }
    return tree;
  },
};
