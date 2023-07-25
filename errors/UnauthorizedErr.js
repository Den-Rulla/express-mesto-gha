const { UNAUTHORIZED_ERROR } = require('../utils/constants');

class UnauthorizedErr extends Error {
  constructor(message) {
    super(message);
    this.type = UNAUTHORIZED_ERROR;
  }
}

module.exports = UnauthorizedErr;
