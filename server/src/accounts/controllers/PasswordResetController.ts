// server/src/accounts/controllers/PasswordResetController.ts

import {NextFunction, Request, Response} from "express";
import {PasswordResetService} from "../../players/services/PasswordResetService";
import {PerformPasswordResetSchema, RequestPasswordResetSchema} from "../../../../shared/dto/PasswordResetDto";
import {AccountAssembler} from "../assemblers/AccountAssembler";

export class PasswordResetController {
  constructor(private readonly reset: PasswordResetService) {}

  requestReset = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = RequestPasswordResetSchema.parse(req.body);
      await this.reset.requestReset(AccountAssembler.toPasswordResetRequest(dto));
      res.status(200).json({ ok: true });
    } catch (err) {
      next(err);
    }
  };

  performReset = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = PerformPasswordResetSchema.parse(req.body);
      await this.reset.performReset(AccountAssembler.toPasswordResetExecution(dto));
      res.status(200).json({ ok: true });
    } catch (err) {
      next(err);
    }
  };
}
