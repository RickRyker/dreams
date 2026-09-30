// server/src/dialogs/services/DialogLinkService.ts

import { DialogRepository } from "../repositories/DialogRepository";
import { PermissionService } from "../../players/services/PermissionService";

export interface DialogLinkPayload {
  editorId: string;
  sequence?: number | null;
  dialogId?: string | null;
  mapId?: string | null;
  x?: number | null;
  y?: number | null;
  leave?: boolean | null;
}

export class DialogLinkService {
  constructor(
    private readonly repo: DialogRepository,
    private readonly perms: PermissionService,
  ) {}

  async createLink(pageId: string, payload: DialogLinkPayload) {
    const { editorId, sequence, dialogId, mapId, x, y, leave } = payload;

    const page = await this.repo.getPage(pageId);
    if (!page) throw new Error("PAGE_NOT_FOUND");

    const allowed = await this.perms.canEditDialog(editorId, page.dialogId);
    if (!allowed) throw new Error("FORBIDDEN_DIALOG_EDIT");

    const created = await this.repo.createLink(pageId, {
      sequence,
      dialogId,
      mapId,
      x,
      y,
      leave,
    });

    return created;
  }

  async updateLink(linkId: string, payload: DialogLinkPayload) {
    const { editorId, sequence, dialogId, mapId, x, y, leave } = payload;

    const link = await this.repo.getLink(linkId);
    if (!link) throw new Error("LINK_NOT_FOUND");

    const page = await this.repo.getPage(link.pageId!);
    if (!page) throw new Error("PAGE_NOT_FOUND");
    const allowed = await this.perms.canEditDialog(editorId, page.dialogId);
    if (!allowed) throw new Error("FORBIDDEN_DIALOG_EDIT");

    const updated = await this.repo.updateLink(linkId, {
      sequence,
      dialogId,
      mapId,
      x,
      y,
      leave,
    });
    return updated;
  }

  async deleteLink(linkId: string, editorId: string) {
    const link = await this.repo.getLink(linkId);
    if (!link) throw new Error("LINK_NOT_FOUND");

    const page = await this.repo.getPage(link.pageId!);
    if (!page) throw new Error("PAGE_NOT_FOUND");
    const allowed = await this.perms.canEditDialog(editorId, page.dialogId);
    if (!allowed) throw new Error("FORBIDDEN_DIALOG_EDIT");

    await this.repo.deleteLink(linkId);
    return { success: true };
  }
}
