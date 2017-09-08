/* eslint-env node */
'use strict';
const htmlTags = require('html-tags');
const diff = require('lodash/difference');
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

module.exports = {
  name: 'ember-tachyons-sweeper',

  postprocessTree(type, tree) {

    const selectorBlacklist = removeableElements();

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
          },
        },
        {
          module: require('postcss-discard-empty'),
          options: {},
        }
      ]
    });
  },
};
