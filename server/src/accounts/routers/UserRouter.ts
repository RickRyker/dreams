// server/src/accounts/routers/UserRouter.ts

import { Router } from "express";
import { createAccountRouter } from "./AccountRouter";
import { createPlayerRouter } from "../../players/routers/PlayerRouter";
import { createVerificationRouter } from "./VerificationRouter";
import { createPasswordResetRouter } from "./PasswordResetRouter";

export function createUserRouter(): Router {
  const router = Router();

  router.use("/account", createAccountRouter());
  router.use("/player", createPlayerRouter());
  router.use("/verify", createVerificationRouter());
  router.use("/password", createPasswordResetRouter());

  return router;
}
