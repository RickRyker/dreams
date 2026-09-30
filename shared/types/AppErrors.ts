// shared/types/AppErrors.ts


export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 500,
    public readonly code: string = "INTERNAL_ERROR",
  ) {
    super(message);
  }
}

export class NotFoundError extends AppError {
  constructor(code: string = "NOT_FOUND", message = "Resource not found") {
    super(message, 404, code);
  }
}

export class ForbiddenError extends AppError {
  constructor(code: string = "FORBIDDEN", message = "Forbidden") {
    super(message, 403, code);
  }
}

export class ValidationError extends AppError {
  constructor(message = "Validation failed") {
    super(message, 400, "VALIDATION_ERROR");
  }
}
