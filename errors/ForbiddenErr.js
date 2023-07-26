const { FORBIDDEN_ERROR } = require('../utils/constants');

class ForbiddenErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_ERROR;
  }
}

module.exports = ForbiddenErr;
