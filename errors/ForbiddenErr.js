const { FORBIDDEN_ERROR } = require('../utils/constants');

class ForbiddenErr extends Error {
  constructor(message) {
    super(message);
    this.type = FORBIDDEN_ERROR;
  }
}

module.exports = ForbiddenErr;
