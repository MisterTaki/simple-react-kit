export default class APIError extends Error {
  constructor(errorText, status, response) {
    super(errorText);
    this.name = this.constructor.name;
    this.status = status;
    this.response = response;
    Error.captureStackTrace(this, this.constructor);
  }
}
