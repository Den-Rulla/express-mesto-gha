const { INTERNAL_SERVER_ERROR } = require('../utils/constants');

class InternalServerErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = INTERNAL_SERVER_ERROR;
  }
}

module.exports = InternalServerErr;
