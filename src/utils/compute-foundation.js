'use strict';

const crc32 = require('turbo-crc32/crc32');

const isString = s => typeof s === 'string';

const checkArgument = (s, name) => {
  if (!isString(s)) {
    throw new TypeError(`Argument ${name} should be a string`);
  }
};

/**
 * Function to compute foundation string -
 * an arbitrary string that is the same for two candidates
 * that have the same type, base IP address, protocol (UDP, TCP,
 * etc.), and STUN or TURN server.
 * @param {string} type Type of ICE candidate.
 * @param {string} protocol UDP or TCP.
 * @param {string} address Candidate IP address.
 * @param {string} [relay] Address of STUN or TURN servers for reflexive and relayed candidates.
 * @returns {string}
 */
function computeFoundation(type, protocol, address, relay = '') {
  checkArgument(type, 'type');
  checkArgument(protocol, 'protocol');
  checkArgument(address, 'address');
  checkArgument(relay, 'relay');

  return String(crc32(type + protocol + address + relay));
}

module.exports = computeFoundation;
