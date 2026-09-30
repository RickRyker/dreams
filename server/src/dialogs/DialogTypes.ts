// server/src/dialogs/DialogTypes.ts

import type {
  DialogAction,
  DialogCondition,
  DialogLink,
  DialogPage,
  DialogPart,
  ChatBot,
  Dialog,
} from "@prisma/client";
import type {
  DialogDto,
  DialogPageDto,
  DialogPartDto,
  DialogActionDto,
  DialogConditionDto,
  DialogLinkDto,
} from "shared";

export interface DialogUpdatePayload {
  editorId: string; // playerId of editor
  title?: string;
  displayMode?: string;
  chatBotId?: string | null;
  // later: pages, parts, actions, links, etc.
}

export interface DialogCreatePayload {
  editorId: string;
  title: string;
  displayMode: string;
  chatBotId?: string | null;
}

export type RawDialogPart = DialogPart & { conditions: DialogCondition[] };
export type RawDialogAction = DialogAction & { conditions: DialogCondition[] };
export type RawDialogLink = DialogLink & { conditions: DialogCondition[] };

export type RawDialogPage = DialogPage & {
  parts: RawDialogPart[];
  actions: RawDialogAction[];
  links: RawDialogLink[];
};

export type RawDialogWithPage = Dialog & {
  chatBot: ChatBot | null;
  pages: RawDialogPage[];
};

export interface EvaluatedDialogPartDto {
  id: string;
  text: string;
}

export interface EvaluatedDialogActionDto {
  id: string;
  action: string;
  result: unknown;
}

export interface EvaluatedDialogLinkDto {
  id: string;
  dialogId: string | null;
  mapId: string | null;
  x: number | null;
  y: number | null;
  leave: boolean | null;
}

export interface EvaluatedDialogPageDto {
  dialog: DialogDto;
  page: DialogPageDto;
  parts: EvaluatedDialogPartDto[];
  actions: EvaluatedDialogActionDto[];
  links: EvaluatedDialogLinkDto[];
}
