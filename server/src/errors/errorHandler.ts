// server/src/errors/errorHandler.ts

import type { ErrorRequestHandler } from "express";
import { logger } from "../logger";
import { AppError } from "./AppError";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  logger.error(err);
  return res.status(500).json({ error: "Internal Server Error" });
};
