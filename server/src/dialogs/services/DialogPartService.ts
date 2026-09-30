// server/src/dialogs/services/DialogPartService.ts

import { DialogRepository } from "../repositories/DialogRepository";
import { PermissionService } from "../../players/services/PermissionService";

export interface DialogPartPayload {
  editorId: string;
  sequence?: number;
  text: string;
}

export class DialogPartService {
  constructor(
    private readonly repo: DialogRepository,
    private readonly perms: PermissionService,
  ) {}

  async createPart(pageId: string, payload: DialogPartPayload) {
    const { editorId, sequence, text } = payload;

    const page = await this.repo.getPage(pageId);
    if (!page) throw new Error("PAGE_NOT_FOUND");

    const allowed = await this.perms.canEditDialog(editorId, page.dialogId);
    if (!allowed) throw new Error("FORBIDDEN_DIALOG_EDIT");

    const part = await this.repo.createPart(pageId, { sequence, text });
    return part;
  }

  async updatePart(partId: string, payload: DialogPartPayload) {
    const { editorId, sequence, text } = payload;

    const part = await this.repo.getPart(partId);
    if (!part) throw new Error("PART_NOT_FOUND");

    const page = await this.repo.getPage(part.pageId!);
    if (!page) throw new Error("PAGE_NOT_FOUND");
    const allowed = await this.perms.canEditDialog(editorId, page.dialogId);
    if (!allowed) throw new Error("FORBIDDEN_DIALOG_EDIT");

    const updated = await this.repo.updatePart(partId, { sequence, text });
    return updated;
  }

  async deletePart(partId: string, editorId: string) {
    const part = await this.repo.getPart(partId);
    if (!part) throw new Error("PART_NOT_FOUND");

    const page = await this.repo.getPage(part.pageId!);
    if (!page) throw new Error("PAGE_NOT_FOUND");
    const allowed = await this.perms.canEditDialog(editorId, page.dialogId);
    if (!allowed) throw new Error("FORBIDDEN_DIALOG_EDIT");

    await this.repo.deletePart(partId);
    return { success: true };
  }
}
