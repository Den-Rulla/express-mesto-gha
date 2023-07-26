const { NOT_FOUND_ERROR } = require('../utils/constants');

class NotFoundErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_ERROR;
  }
}

module.exports = NotFoundErr;
