// server/src/dialogs/assemblers/DialogAssembler.ts

import { DialogAdapter } from "../adapters/DialogAdapter";

export class DialogAssembler {
  static toFullDialogDto(model: any) {
    return DialogAdapter.toFullDialogDto(model);
  }
}
