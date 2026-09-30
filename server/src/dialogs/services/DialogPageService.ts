// server/src/dialogs/services/DialogPageService.ts

import {DialogRepository} from "../repositories/DialogRepository";
import {PermissionService} from "../../players/services/PermissionService";

export interface DialogPagePayload {
  editorId: string;
  sequence?: number;
  imageUrl?: string | null;
}

export class DialogPageService {
  constructor(
    private readonly repo: DialogRepository,
    private readonly perms: PermissionService,
  ) {}

  async updatePage(pageId: string, payload: DialogPagePayload) {
    const { editorId, sequence, imageUrl } = payload;

    const page = await this.repo.getPage(pageId);
    if (!page) throw new Error("PAGE_NOT_FOUND");

    const allowed = await this.perms.canEditDialog(editorId, page.dialogId);
    if (!allowed) throw new Error("FORBIDDEN_DIALOG_EDIT");

    const updated = await this.repo.updatePage(pageId, { sequence, imageUrl });
    return updated;
  }

  async deletePage(pageId: string, editorId: string) {
    const page = await this.repo.getPage(pageId);
    if (!page) throw new Error("PAGE_NOT_FOUND");

    const allowed = await this.perms.canEditDialog(editorId, page.dialogId);
    if (!allowed) throw new Error("FORBIDDEN_DIALOG_EDIT");

    await this.repo.deletePage(pageId);
    return { success: true };
  }

  async createPage(dialogId: string, payload: DialogPagePayload) {
    const { editorId, sequence, imageUrl } = payload;

    const allowed = await this.perms.canEditDialog(editorId, dialogId);
    if (!allowed) throw new Error("FORBIDDEN_DIALOG_EDIT");

    const created = await this.repo.createPage(dialogId, { sequence, imageUrl });
    return created;
  }
}
