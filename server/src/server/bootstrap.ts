// server/src/server/bootstrap.ts

import http from "http";
import express, {Express} from "express";
import {createAccountRouter} from "../accounts/routers/AccountRouter";
import {createPasswordResetRouter} from "../accounts/routers/PasswordResetRouter";
import {createVerificationRouter} from "../accounts/routers/VerificationRouter";
import {createPlayerRouter} from "../players/routers/PlayerRouter";
import {createClassesRouter} from "../modules/classes";
import {createCombatRouter} from "../combat/routers/CombatRouter";
import {createDialogRouter} from "../dialogs/routers/DialogRouter";
import {createQuestRouter} from "../quests/routers/QuestRouter";
import {BuffCleanupScheduler} from "../scheduler/BuffCleanupScheduler";
import {errorHandler} from "../middleware/errorHandler";

export function createServer() {
  const app: Express = express();
  const clientOrigin = process.env.CLIENT_ORIGIN ?? "http://localhost:5173";

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", clientOrigin);
    res.header("Vary", "Origin");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");

    if (req.method === "OPTIONS") {
      res.sendStatus(204);
      return;
    }

    next();
  });

  app.use(express.json());
  app.use("/account", createAccountRouter());
  app.use("/password", createPasswordResetRouter());
  app.use("/verify", createVerificationRouter());
  app.use("/player", createPlayerRouter());
  app.use("/combat", createCombatRouter());
  app.use("/dialog", createDialogRouter());
  app.use("/quest", createQuestRouter());
  app.use("/class", createClassesRouter());
  app.use(errorHandler);

  const server: http.Server = http.createServer(app);

  // Start buff cleanup scheduler
  const buffCleanup = new BuffCleanupScheduler();
  buffCleanup.start(30_000); // every 30 seconds

  return { app, server };
}
