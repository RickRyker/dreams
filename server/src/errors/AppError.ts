// server/src/errors/AppError.ts

export type HttpStatusCode =
  400 | 401 | 403 | 404 | 409 | 422 | 429 |
  500 | 501 | 503;

export class AppError extends Error {
  public readonly statusCode: HttpStatusCode;

  constructor(message: string, statusCode: HttpStatusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
