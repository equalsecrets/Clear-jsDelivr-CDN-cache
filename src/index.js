'use strict';

const purge = require('./utils/purge'),
  { MAX_CLEAR_TIME } = require('./utils/constants');

/**
 * Subscribes the Cache Clear Plugin to the store
 * @param {Object} store
 * @returns {void}
 */
function CacheClearPlugin(store) {
  store.subscribe((mutation, state) => {
    const pubTime = mutation && mutation.payload && mutation.payload.publishTime;

    if (mutation.type === 'UPDATE_PAGE_STATE' && pubTime) {
      const shouldClearCache = new Date().getTime() - new Date(pubTime).getTime() < MAX_CLEAR_TIME;

      if (shouldClearCache) {
        const pageUrl = state.page.state.url || '';

        purge(pageUrl)
          .then(() => console.log(`Purged url: ${pageUrl}`));
      }
    }
  });
};

module.exports = {
  NavButton: require('./nav-button').default,
  NavContent: require('./main').default,
  CacheClearPlugin
};
