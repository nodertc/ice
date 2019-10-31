'use strict';

const { createCandidate } = require('./candidate');
const constants = require('./constants');

module.exports = {
  createCandidate,
  ...constants,
};
