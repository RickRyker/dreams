// server/src/quests/middleware/validateQuestEditorPayload.ts


import { NextFunction, Request, Response } from "express";
import { QuestEditorPayloadSchema } from "shared"; // your Zod schema

export function validateQuestEditorPayload(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = QuestEditorPayloadSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Invalid quest payload",
      issues: result.error.issues,
    });
  }

  req.body = result.data; // sanitized
  next();
}
