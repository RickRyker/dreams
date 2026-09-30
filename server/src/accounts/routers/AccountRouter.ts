// server/src/accounts/routers/AccountRouter.ts

import { Router } from "express";
import { AccountRepository } from "../repositories/AccountRepository";
import { AccountService } from "../services/AccountService";
import { AuthController } from "../controllers/AuthController";

export function createAccountRouter(): Router {
  const router = Router();

  const repo = new AccountRepository();
  const service = new AccountService(repo);
  const controller = new AuthController(service);

  router.post("/register", controller.register);
  router.post("/login", controller.login);
  router.get("/me", controller.me);

  return router;
}
