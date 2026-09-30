// server/src/accounts/routers/PasswordResetRouter.ts

import { Router } from "express";
import { PasswordResetService } from "../../players/services/PasswordResetService";
import { EmailService } from "@email/EmailService";
import { PasswordResetController } from "../controllers/PasswordResetController";

export function createPasswordResetRouter(): Router {
  const router = Router();

  const emailService = new EmailService();
  const resetService = new PasswordResetService(emailService);
  const controller = new PasswordResetController(resetService);

  router.post("/request", controller.requestReset);
  router.post("/perform", controller.performReset);

  return router;
}
