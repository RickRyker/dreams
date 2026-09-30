// server/src/dialogs/services/DialogService.ts

import {DialogRepository} from "../repositories/DialogRepository";
import {DialogAdapter} from "../adapters/DialogAdapter";
import {PermissionService} from "../../players/services/PermissionService";
import {DialogCreatePayload, DialogUpdatePayload} from "../DialogTypes";

export class DialogService {
  constructor(
    private readonly repo: DialogRepository,
    private readonly perms: PermissionService,
  ) {}

  async getDialog(dialogId: string) {
    const model = await this.repo.getDialog(dialogId);
    if (!model) return null;
    return DialogAdapter.toFullDialogDto(model);
  }

  async listDialogs() {
    const models = await this.repo.listDialogs();
    return models.map(DialogAdapter.toFullDialogDto);
  }

  async createDialog(payload: DialogCreatePayload) {
    const { editorId, ...data } = payload;

    const allowed = await this.perms.canCreateDialog(editorId);
    if (!allowed) {
      throw new Error("FORBIDDEN_DIALOG_CREATE");
    }

    const model = await this.repo.createDialog(data);
    return DialogAdapter.toFullDialogDto(model);
  }

  async updateDialog(dialogId: string, payload: DialogUpdatePayload) {
    const { editorId, ...data } = payload;

    const allowed = await this.perms.canEditDialog(editorId, dialogId);
    if (!allowed) {
      throw new Error("FORBIDDEN_DIALOG_EDIT");
    }

    const model = await this.repo.updateDialog(dialogId, data);
    return DialogAdapter.toFullDialogDto(model);
  }

  async deleteDialog(dialogId: string, editorId: string) {
    const allowed = await this.perms.canEditDialog(editorId, dialogId);
    if (!allowed) {
      throw new Error("FORBIDDEN_DIALOG_DELETE");
    }

    await this.repo.deleteDialog(dialogId);
    return { success: true };
  }
}
