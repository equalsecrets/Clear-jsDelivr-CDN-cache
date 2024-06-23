'use strict';

const { FASTLY_API_URL } = require('./constants');

/**
 * Make a purge request to Fastly via simple PURGE HTTP method.
 * @param {string} url
 * @returns {Promise<Object>} An object containing the request data
 * @throws {Error} Throws an error if the request was not successful
 */
const purgeUnauthenticated = function (url) {
  return fetch(url, { method: 'PURGE' })
    .then(res => res.json())
    .then(res => {
      res.url = url;
      return res;
    });
};

/**
 * Make a purge request to Fastly via authenticated API.
 * @param {string} url
 * @returns {Promise<Object>} An object containing the request data
 * @throws {Error} Throws an error if the request was not successful
 */
const purgeAuthenticated = function (url) {
  return fetch(`${FASTLY_API_URL}/${url}`, {
    method: 'POST',
    headers: {
      'Fastly-Key': window.process.env.FASTLY_API_KEY
    }
  })
    .then(res => res.json())
    .then(res => {
      res.url = url; // Attach the url to the response to use for messaging
      return res;
    });
};

/**
 * Generic entrypoint for authenticated/unauthenticated purge reuqests.
 * @param {string} url
 * @returns {Promise<Object>} An object containing the request data
 * @throws {Error} Throws an error if the request was not successful
 */
const purge = function (url) {
  return window.process.env.FASTLY_API_KEY
    ? purgeAuthenticated(url)
    : purgeUnauthenticated(url);
}

module.exports = purge;
