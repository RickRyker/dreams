// server/src/dialogs/controllers/DialogEditorController.ts


import { Request, Response } from "express";
import { DialogRepository } from "../repositories/DialogRepository";
import { DialogPageService } from "../services/DialogPageService";
import { DialogPartService } from "../services/DialogPartService";
import { DialogActionService } from "../services/DialogActionService";
import { DialogLinkService } from "../services/DialogLinkService";
import { PermissionService } from "../../players/services/PermissionService";
import { DialogEditorHistoryService } from "../services/DialogEditorHistoryService";
import { DialogSnapshotService } from "../services/DialogSnapshotService";
import { DialogCollaborativeLockService } from "../services/DialogCollaborativeLockService";
import { DialogDiffEngine } from "../engines/DialogDiffEngine";
import { DialogGraphValidator } from "../validators/DialogGraphValidator";
import { DialogEditorSchema } from "shared";
import { z } from "zod";

type DialogEditorPayload = z.infer<typeof DialogEditorSchema>;

export class DialogEditorController {
  constructor(
    private readonly repo: DialogRepository,
    private readonly perms: PermissionService,
    private readonly pageService: DialogPageService,
    private readonly partService: DialogPartService,
    private readonly actionService: DialogActionService,
    private readonly linkService: DialogLinkService,
    private readonly history: DialogEditorHistoryService,
    private readonly snapshots: DialogSnapshotService,
    private readonly locks: DialogCollaborativeLockService,
  ) {}

  acquireLock = async (req: Request, res: Response) => {
    const dialogId = req.params.dialogId as string;
    const { editorId } = req.body;
    const result = await this.locks.acquireLock(dialogId, editorId);
    if (result.locked) return res.status(423).json(result);
    res.json(result);
  };

  releaseLock = async (req: Request, res: Response) => {
    const dialogId = req.params.dialogId as string;
    const { editorId } = req.body;
    const result = await this.locks.releaseLock(dialogId, editorId);
    res.json(result);
  };

  getSnapshots = async (req: Request, res: Response) => {
    const dialogId = req.params.dialogId as string;
    const snaps = await this.snapshots.listSnapshots(dialogId);
    res.json(snaps);
  };

  restoreSnapshot = async (req: Request, res: Response) => {
    const dialogId = req.params.dialogId as string;
    const { snapshotId, editorId } = req.body;

    const allowed = await this.perms.canEditDialog(editorId, dialogId);
    if (!allowed) return res.status(403).json({ error: "FORBIDDEN_DIALOG_EDIT" });

    const snapshot = await this.snapshots.getSnapshot(snapshotId);
    if (!snapshot) return res.status(404).json({ error: "SNAPSHOT_NOT_FOUND" });

    // Apply snapshot as full graph update (reuse updateDialogGraph)
    req.body = snapshot;
    return this.updateDialogGraph(req, res);
  };

  undo = async (_req: Request, res: Response) => {
    const snap = this.history.undo();
    if (!snap) return res.status(204).end();
    res.json(snap);
  };

  redo = async (_req: Request, res: Response) => {
    const snap = this.history.redo();
    if (!snap) return res.status(204).end();
    res.json(snap);
  };

  updateDialogGraph = async (req: Request, res: Response) => {
    const payload = DialogEditorSchema.parse(req.body) as DialogEditorPayload;
    const { editorId, dialogId } = payload;

    const allowed = await this.perms.canEditDialog(editorId, dialogId!);
    if (!allowed) return res.status(403).json({ error: "FORBIDDEN_DIALOG_EDIT" });

    const lock = await this.locks.isLocked(dialogId!);
    if (lock.locked && lock.owner !== editorId) {
      return res.status(423).json({ error: "LOCKED_BY_OTHER", owner: lock.owner });
    }

    const existing = await this.repo.getDialog(dialogId!);
    if (!existing) return res.status(404).json({ error: "DIALOG_NOT_FOUND" });

    DialogGraphValidator.validateDialogGraphV2(payload);

    this.history.pushSnapshot(existing);
    await this.snapshots.saveSnapshot(dialogId!, editorId, existing);

    const diff = DialogDiffEngine.diff(existing as any, payload);

    await this.repo.prisma.$transaction(async () => {
      for (const pageId of diff.removedPageIds) {
        await this.pageService.deletePage(pageId, editorId);
      }

      for (const page of diff.addedPages) {
        const created = await this.pageService.createPage(dialogId!, {
          editorId,
          sequence: page.sequence,
          imageUrl: page.imageUrl ?? null,
        });

        for (const part of page.parts) {
          await this.partService.createPart(created.id, { editorId, sequence: part.sequence, text: part.text });
        }
        for (const action of page.actions) {
          await this.actionService.createAction(created.id, { editorId, sequence: action.sequence, action: action.action });
        }
        for (const link of page.links) {
          await this.linkService.createLink(created.id, {
            editorId,
            sequence: link.sequence,
            dialogId: link.dialogId,
            mapId: link.mapId,
            x: link.x,
            y: link.y,
            leave: link.leave,
          });
        }
      }

      for (const page of diff.updatedPages) {
        await this.pageService.updatePage(page.id, {
          editorId,
          sequence: page.sequence,
          imageUrl: page.imageUrl ?? null,
        });

        for (const part of page.parts) {
          if (part.id) {
            await this.partService.updatePart(part.id, { editorId, sequence: part.sequence, text: part.text });
          } else {
            await this.partService.createPart(page.id, { editorId, sequence: part.sequence, text: part.text });
          }
        }

        for (const action of page.actions) {
          if (action.id) {
            await this.actionService.updateAction(action.id, { editorId, sequence: action.sequence, action: action.action });
          } else {
            await this.actionService.createAction(page.id, { editorId, sequence: action.sequence, action: action.action });
          }
        }

        for (const link of page.links) {
          if (link.id) {
            await this.linkService.updateLink(link.id, {
              editorId,
              sequence: link.sequence,
              dialogId: link.dialogId,
              mapId: link.mapId,
              x: link.x,
              y: link.y,
              leave: link.leave,
            });
          } else {
            await this.linkService.createLink(page.id, {
              editorId,
              sequence: link.sequence,
              dialogId: link.dialogId,
              mapId: link.mapId,
              x: link.x,
              y: link.y,
              leave: link.leave,
            });
          }
        }
      }
    });

    const updated = await this.repo.getDialog(dialogId!);
    res.json(updated);
  };
}
