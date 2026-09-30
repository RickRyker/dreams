// server/src/middleware/validate.ts

import {ZodError, ZodType} from "zod";
import {NextFunction, Request, Response} from "express";

export interface ValidationErrorResponse {
  message: string;
  errors: unknown;
}

export function formatZodError(error: ZodError): ValidationErrorResponse {
  return {
    message: "Validation failed",
    errors: error.flatten(),
  };
}

function runValidation(
  schema: ZodType<any>,
  data: unknown,
  res: Response,
  next: NextFunction,
  assign: (value: any) => void,
) {
  const result = schema.safeParse(data);

  if (!result.success) {
    return res.status(400).json(formatZodError(result.error));
  }

  assign(result.data);
  next();
}

export function validateBody(schema: ZodType<any>) {
  return (req: Request, res: Response, next: NextFunction) =>
    runValidation(schema, req.body, res, next, (v) => (req.body = v));
}

export function validateParams(schema: ZodType<any>) {
  return (req: Request, res: Response, next: NextFunction) =>
    runValidation(schema, req.params, res, next, (v) => (req.params = v));
}

export function validateQuery(schema: ZodType<any>) {
  return (req: Request, res: Response, next: NextFunction) =>
    runValidation(schema, req.query, res, next, (v) => (req.query = v));
}
