'use strict';

const { isIP } = require('net');
const {
  ICE_ROLE_CONTROLLED,
  ICE_ROLE_CONTROLLING,
  ICE_PROTO_UDP,
  ICE_PROTO_TCP,
  ICE_TYPE_HOST,
  ICE_TYPE_SERVER,
  ICE_TYPE_PEER,
  ICE_TYPE_RELAYED,
} = require('./constants');

const _address = Symbol('address');
const _port = Symbol('port');
const _protocol = Symbol('protocol');
const _type = Symbol('type');
const _foundation = Symbol('foundation');
const _role = Symbol('role');
const _priority = Symbol('priority');

/**
 * Base class to represent ICE candidate.
 */
class ICECandidate {
  /**
   * @class ICECandidate
   */
  constructor() {
    this[_address] = undefined;
    this[_port] = undefined;
    this[_role] = undefined;
    this[_protocol] = undefined;
    this[_type] = undefined;
    this[_foundation] = undefined;
    this[_priority] = undefined;
  }

  /**
   * Get role.
   * @returns {string}
   */
  get role() {
    return this[_role];
  }

  /**
   * @returns {string}
   */
  get address() {
    return this[_address];
  }

  /**
   * @returns {number}
   */
  get port() {
    return this[_port];
  }

  /**
   * @returns {string}
   */
  get protocol() {
    return this[_protocol];
  }

  /**
   * IP address type.
   * @returns {string}
   */
  get type() {
    return this[_type];
  }

  /**
   * @returns {string}
   */
  get foundation() {
    return this[_foundation];
  }

  /**
   * @returns {number}
   */
  get priority() {
    return this[_priority];
  }
}

/**
 * @typedef {Object} ICECandidateOptions
 * @property {string} address
 * @property {number} port
 * @property {string} role
 * @property {string} type The type of the candidate.
 * @property {string} protocol
 * @property {string} foundation A sequence of up to 32 characters.
 * @property {number} priority The 32-bit priority of the candidate.
 */

/**
 * Check if argument is valid port.
 * @param {number} port
 * @returns {boolean}
 */
const isLegalPort = port => Number.isInteger(port) && port > 0 && port <= 0xffff;

/**
 * Create ICE candidate.
 * @param {ICECandidateOptions} options
 * @returns {ICECandidate}
 */
function createCandidate(options) {
  const candidate = new ICECandidate();

  if (isIP(options.address)) {
    candidate[_address] = options.address;
  } else {
    throw new Error('Invalid ICE candidate address');
  }

  if (isLegalPort(options.port)) {
    candidate[_port] = options.port;
  } else {
    throw new Error('Invalid ICE candidate port');
  }

  switch (options.role) {
    case ICE_ROLE_CONTROLLED:
    case ICE_ROLE_CONTROLLING:
      candidate[_role] = options.role;
      break;
    default:
      throw new Error('Invalid ICE candidate role');
  }

  switch (options.protocol) {
    case ICE_PROTO_UDP:
    case ICE_PROTO_TCP:
      candidate[_protocol] = options.protocol;
      break;
    default:
      throw new Error('Invalid ICE candidate protocol');
  }

  switch (options.type) {
    case ICE_TYPE_HOST:
    case ICE_TYPE_SERVER:
    case ICE_TYPE_PEER:
    case ICE_TYPE_RELAYED:
      candidate[_type] = options.type;
      break;
    default:
      throw new Error('Invalid ICE candidate type');
  }

  if (
    typeof options.foundation === 'string' &&
    options.foundation.length > 0 &&
    options.foundation.length <= 32
  ) {
    candidate[_foundation] = options.foundation;
  } else {
    throw new Error('Invalid ICE candidate foundation');
  }

  if (Number.isInteger(options.priority)) {
    candidate[_priority] = options.priority;
  } else {
    throw new TypeError('Invalid ICE candidate priority');
  }

  return candidate;
}

module.exports = {
  ICECandidate,
  createCandidate,
};
