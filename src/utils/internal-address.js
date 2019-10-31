'use strict';

const { networkInterfaces } = require('os');
const flatten = require('array-flatten');

/**
 * Get the list of an internal IP addresses.
 * @returns {string[]}
 */
function internalAddress() {
  const interfaces = flatten(Object.values(networkInterfaces()));

  return interfaces
    .filter(iface => iface.family === 'IPv4' && iface.internal === false)
    .map(iface => iface.address);
}

module.exports = internalAddress;
