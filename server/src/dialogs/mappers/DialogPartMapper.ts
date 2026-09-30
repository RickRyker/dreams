// server/src/dialogs/mappers/DialogPartMapper.ts

import {DialogPartDto} from "shared";

export function toDialogPartDto(part: {
  id: string;
  pageId: string | null;
  sequence: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}): DialogPartDto {
  return {
    id: part.id,
    pageId: part.pageId,
    sequence: part.sequence,
    text: part.text,
    createdAt: part.createdAt.getTime(),
    updatedAt: part.updatedAt.getTime(),
  };
}
