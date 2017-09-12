module.exports = {
  description: 'The default blueprint for ember-tachyons-sweeper addon.',

  normalizeEntityName(entityName) {
    return entityName;
  },

  afterInstall() {
    return this.addAddonsToProject({
      packages: [
        { name: 'ember-dom-inventory' },
      ],
    }).then(() => {
      return this.addPackagesToProject([
        { name: 'postcss-discard-empty' },
        { name: 'postcss-strip-selectors' },
        { name: 'postcss-discard-comments' },
      ]);
    });
  },
};
