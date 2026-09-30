// server/src/dialogs/services/DialogActionService.ts

import { DialogRepository } from "../repositories/DialogRepository";
import { PermissionService } from "../../players/services/PermissionService";

export interface DialogActionPayload {
  editorId: string;
  sequence?: number;
  action: string;
}

export class DialogActionService {
  constructor(
    private readonly repo: DialogRepository,
    private readonly perms: PermissionService,
  ) {}

  async createAction(pageId: string, payload: DialogActionPayload) {
    const { editorId, sequence, action } = payload;

    const page = await this.repo.getPage(pageId);
    if (!page) throw new Error("PAGE_NOT_FOUND");

    const allowed = await this.perms.canEditDialog(editorId, page.dialogId);
    if (!allowed) throw new Error("FORBIDDEN_DIALOG_EDIT");

    const created = await this.repo.createAction(pageId, { sequence, action });
    return created;
  }

  async updateAction(actionId: string, payload: DialogActionPayload) {
    const { editorId, sequence, action } = payload;

    const act = await this.repo.getAction(actionId);
    if (!act) throw new Error("ACTION_NOT_FOUND");

    const page = await this.repo.getPage(act.pageId!);
    if (!page) throw new Error("PAGE_NOT_FOUND");
    const allowed = await this.perms.canEditDialog(editorId, page.dialogId);
    if (!allowed) throw new Error("FORBIDDEN_DIALOG_EDIT");

    const updated = await this.repo.updateAction(actionId, { sequence, action });
    return updated;
  }

  async deleteAction(actionId: string, editorId: string) {
    const act = await this.repo.getAction(actionId);
    if (!act) throw new Error("ACTION_NOT_FOUND");

    const page = await this.repo.getPage(act.pageId!);
    if (!page) throw new Error("PAGE_NOT_FOUND");
    const allowed = await this.perms.canEditDialog(editorId, page.dialogId);
    if (!allowed) throw new Error("FORBIDDEN_DIALOG_EDIT");

    await this.repo.deleteAction(actionId);
    return { success: true };
  }
}
