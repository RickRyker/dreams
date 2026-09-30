// server/src/server/ErrorMiddleware.ts

import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "VALIDATION_ERROR",
      details: err.flatten(),
    });
  }

  if (err instanceof Error) {
    switch (err.message) {
      case "EMAIL_ALREADY_IN_USE":
        return res.status(409).json({ error: err.message });
      case "INVALID_CREDENTIALS":
        return res.status(401).json({ error: err.message });
      case "INVALID_TOKEN":
        return res.status(400).json({ error: err.message });
      case "PLAYER_NOT_FOUND":
        return res.status(404).json({ error: err.message });
      default:
        break;
    }
  }

  console.error(err);
  return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
}
