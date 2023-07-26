const OK_CODE = 200;
const CREATED_CODE = 201;
const BAD_REQUEST_ERROR = 400;
const UNAUTHORIZED_ERROR = 401;
const FORBIDDEN_ERROR = 403;
const NOT_FOUND_ERROR = 404;
const CONFLICT_ERROR = 409;
const INTERNAL_SERVER_ERROR = 500;

// eslint-disable-next-line no-useless-escape
const regExpUrl = /^https?:\/\/[\w\-\.\/~:\?\#\[\]@!$&'\(\)\*\+,;=]+[\-\.\/~:\?\#\[\]@!$&'\(\)\*\+,;=]{1}[\w\-\.\/~:\?\#\[\]@!$&'\(\)\*\+,;=]+[#\/]?$/;
// const regExpEmail = /^\S+@\S+\.\S+$/;

module.exports = {
  OK_CODE,
  CREATED_CODE,
  BAD_REQUEST_ERROR,
  UNAUTHORIZED_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR,
  CONFLICT_ERROR,
  INTERNAL_SERVER_ERROR,
  regExpUrl,
  // regExpEmail,
};
