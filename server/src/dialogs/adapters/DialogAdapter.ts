// server/src/dialogs/adapters/DialogAdapter.ts

import { DialogMapper } from "../mappers/DialogMapper";

export class DialogAdapter {

  static toFullDialogDto(model: any) {
    const dialog = DialogMapper.toDialogDto(model);

    const pages = model.pages.map((p: any) => {
      const page = DialogMapper.toPageDto(p);

      const parts = p.parts.map((pt: any) => ({
        ...DialogMapper.toPartDto(pt),
        conditions: pt.conditions.map(DialogMapper.toConditionDto),
      }));

      const actions = p.actions.map((a: any) => ({
        ...DialogMapper.toActionDto(a),
        conditions: a.conditions.map(DialogMapper.toConditionDto),
      }));

      const links = p.links.map((l: any) => ({
        ...DialogMapper.toLinkDto(l),
        conditions: l.conditions.map(DialogMapper.toConditionDto),
      }));

      return {
        ...page,
        parts,
        actions,
        links,
      };
    });

    return {
      ...dialog,
      pages,
    };
  }

}
