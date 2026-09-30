// server/src/middleware/errorHandler.ts

import type { ErrorRequestHandler } from "express";
import { logger } from "../config/logger.js";
import { AppError } from "../errors/AppError";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "VALIDATION_ERROR",
      details: err.issues.map((issue) => issue.message),
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  logger.error({ err }, "Unhandled error");
  return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
};
