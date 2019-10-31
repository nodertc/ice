'use strict';

const X = 2 ** 24;
const Y = 2 ** 8;
const Z = 2 ** 0;

const checkNumber = (n, name) => {
  if (!Number.isInteger(n)) {
    throw new TypeError(`Invalid type of an argument ${name}`);
  }
};

/**
 * Function to compute candidate priority.
 * See https://tools.ietf.org/html/rfc8445#section-5.1.2.1.
 * @param {number} type Type preference.
 * @param {number} local Local preference.
 * @param {number} component Component ID.
 * @returns {number}
 */
function computePriority(type, local, component) {
  checkNumber(type, 'type');
  checkNumber(local, 'local');
  checkNumber(component, 'component');

  if (type < 0 || type > 126) {
    throw new Error('Invalid type preference');
  }

  if (local < 0 || local > 65535) {
    throw new Error('Invalid local preference');
  }

  if (component < 1 || component > 256) {
    throw new Error('Invalid component ID');
  }

  return X * type + Y * local + Z * (256 - component);
}

module.exports = computePriority;
