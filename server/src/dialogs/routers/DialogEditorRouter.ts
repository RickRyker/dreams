// server/src/dialogs/routers/DialogEditorRouter.ts


import { Router } from "express";
import { DialogRepository } from "../repositories/DialogRepository";
import { PermissionServiceImpl } from "../../players/services/PermissionService";
import { DialogPageService } from "../services/DialogPageService";
import { DialogPartService } from "../services/DialogPartService";
import { DialogActionService } from "../services/DialogActionService";
import { DialogLinkService } from "../services/DialogLinkService";
import { DialogEditorHistoryService } from "../services/DialogEditorHistoryService";
import { DialogSnapshotService } from "../services/DialogSnapshotService";
import { DialogCollaborativeLockService } from "../services/DialogCollaborativeLockService";
import { DialogEditorController } from "../controllers/DialogEditorController";
import {prisma} from "../../db/client";

export function createDialogEditorRouter() {
  const repo = new DialogRepository();
  const perms = new PermissionServiceImpl(prisma);

  const pageService = new DialogPageService(repo, perms);
  const partService = new DialogPartService(repo, perms);
  const actionService = new DialogActionService(repo, perms);
  const linkService = new DialogLinkService(repo, perms);

  const history = new DialogEditorHistoryService();
  const snapshots = new DialogSnapshotService(prisma);
  const locks = new DialogCollaborativeLockService(prisma);

  const editorController = new DialogEditorController(
    repo,
    perms,
    pageService,
    partService,
    actionService,
    linkService,
    history,
    snapshots,
    locks,
  );

  const r = Router({ mergeParams: true });

  // locking
  r.post("/lock", editorController.acquireLock);
  r.post("/unlock", editorController.releaseLock);

  // versioning
  r.get("/snapshots", editorController.getSnapshots);
  r.post("/snapshots/restore", editorController.restoreSnapshot);

  // undo/redo (local history)
  r.post("/undo", editorController.undo);
  r.post("/redo", editorController.redo);

  // full graph update
  r.put("/graph", editorController.updateDialogGraph);

  // (existing page/part/action/link endpoints can stay here too)

  return r;
}
