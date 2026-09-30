// server/src/dialogs/routers/DialogRouter.ts

import {Router} from "express";
import {DialogRepository} from "../repositories/DialogRepository";
import {DialogController} from "../controllers/DialogController";
import {requireAuth} from "../../middleware/AuthMiddleware";
import {createDialogEditorRouter} from "./DialogEditorRouter";

export function createDialogRouter() {
  const repo = new DialogRepository();
  const controller = new DialogController(repo);

  const router = Router();

  router.get("/:dialogId", requireAuth, controller.getDialog);
  router.get("/", requireAuth, controller.listDialogs);
  router.post("/", requireAuth, controller.createDialog);
  router.put("/:dialogId", requireAuth, controller.updateDialog);
  router.delete("/:dialogId", requireAuth, controller.deleteDialog);

  router.use("/:dialogId/editor", requireAuth, createDialogEditorRouter());
  router.get("/:dialogId/graph.json", requireAuth, controller.getDialogGraphJson);
  router.get("/:dialogId/mermaid", requireAuth, controller.getDialogMermaid);
  router.get("/index/mermaid", requireAuth, controller.getDialogIndexMermaid);

  return router;
}
