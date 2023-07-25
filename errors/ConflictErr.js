const { CONFLICT_ERROR } = require('../utils/constants');

class ConflictErr extends Error {
  constructor(message) {
    super(message);
    this.type = CONFLICT_ERROR;
  }
}

module.exports = ConflictErr;
