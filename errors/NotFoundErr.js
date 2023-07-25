const { NOT_FOUND_ERROR } = require('../utils/constants');

class NotFoundErr extends Error {
  constructor(message) {
    super(message);
    this.type = NOT_FOUND_ERROR;
  }
}

module.exports = NotFoundErr;
