// server/src/dialogs/serializers/DialogGraphSerializer.ts

import { DialogAssembler } from "../assemblers/DialogAssembler";

export class DialogGraphSerializer {
  static toJson(model: any): string {
    const dto = DialogAssembler.toFullDialogDto(model);
    return JSON.stringify(dto);
  }

  static fromJson(json: string): any {
    return JSON.parse(json);
  }

  static toSnapshot(model: any) {
    const dto = DialogAssembler.toFullDialogDto(model);
    return {
      id: dto.id,
      title: dto.title,
      pages: dto.pages.map((p: any) => ({
        id: p.id,
        sequence: p.sequence,
        parts: p.parts.map((pt: any) => ({
          id: pt.id,
          text: pt.text,
        })),
        actions: p.actions.map((a: any) => ({
          id: a.id,
          action: a.action,
        })),
        links: p.links.map((l: any) => ({
          id: l.id,
          dialogId: l.dialogId,
          mapId: l.mapId,
        })),
      })),
    };
  }
}
