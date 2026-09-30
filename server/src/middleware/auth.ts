// server/src/middleware/auth.ts

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import { AppError } from "../errors/AppError";

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return next(new AppError("UNAUTHORIZED", 401));
  }

  try {
    const token: string = header.slice("Bearer ".length);
    const payload = jwt.verify(token, process.env.JWT_SECRET || "dev-secret") as { id?: string; };
    const accountId: string | undefined = payload.id;

    if (!accountId) {
      return next(new AppError("UNAUTHORIZED", 401));
    }

    req.auth = {
      accountId,
    };

    next();
  } catch {
    return next(new AppError("UNAUTHORIZED", 401));
  }
}
