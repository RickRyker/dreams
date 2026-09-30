// server/src/accounts/routers/VerificationRouter.ts

import { Router } from "express";
import { VerificationService } from "../services/VerificationService";
import { EmailService } from "@email/EmailService";
import { VerificationController } from "../controllers/VerificationController";
import { requireAuth } from "../../middleware/AuthMiddleware";

export function createVerificationRouter(): Router {
  const router = Router();

  const emailService = new EmailService();
  const verificationService = new VerificationService(emailService);
  const controller = new VerificationController(verificationService);

  router.post("/request", requireAuth, controller.requestVerification);
  router.post("/confirm", controller.verifyEmail);

  return router;
}
