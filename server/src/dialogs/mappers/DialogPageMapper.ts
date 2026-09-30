// server/src/dialogs/mappers/DialogPageMapper.ts

import {DialogPageDto} from "shared";

export function toDialogPageDto(page: {
  id: string;
  dialogId: string;
  sequence: number;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}): DialogPageDto {
  return {
    id: page.id,
    dialogId: page.dialogId,
    sequence: page.sequence,
    imageUrl: page.imageUrl,
    createdAt: page.createdAt.getTime(),
    updatedAt: page.updatedAt.getTime(),
  };
}
