// server/src/accounts/controllers/VerificationController.ts

import { Request, Response, NextFunction } from "express";
import { VerificationService } from "../services/VerificationService";
import { VerifyEmailRequestSchema } from "../../../../shared/dto/VerifyEmailDto";
import {AccountAssembler} from "../assemblers/AccountAssembler";
import { z } from "zod";

const RequestVerificationSchema = z.object({
  email: z.email(),
});

export class VerificationController {
  constructor(private readonly verification: VerificationService) {}

  requestVerification = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountId = req.auth?.accountId;
      if (!accountId) return res.status(400).json({ error: "BAD_REQUEST" });
      const dto = RequestVerificationSchema.parse(req.body);

      await this.verification.createVerificationToken(AccountAssembler.toVerificationCommand(accountId, dto.email));
      res.status(200).json({ ok: true });
    } catch (err) {
      next(err);
    }
  };

  verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = VerifyEmailRequestSchema.parse(req.body);
      await this.verification.verifyEmail(dto.token);
      res.status(200).json({ ok: true });
    } catch (err) {
      next(err);
    }
  };
}
