// server/src/dialog/dialogTypes.ts

import {
  ChatBot,
  Dialog,
  DialogAction,
  DialogCondition,
  DialogLink,
  DialogPage,
  DialogPart,
} from "@prisma/client";

export type RawDialogPage = DialogPage & {
  parts: (DialogPart & { conditions: DialogCondition[] })[];
  actions: (DialogAction & { conditions: DialogCondition[] })[];
  links: (DialogLink & { conditions: DialogCondition[] })[];
};

export interface EvaluatedDialogPart {
  id: string;
  text: string;
}

export interface EvaluatedDialogLink {
  id: string;
  dialogId: string | null;
  map: string | null;
  x: number | null;
  y: number | null;
  leave: boolean | null;
}

export interface EvaluatedDialogPage {
  dialog: Dialog & { chatBot: ChatBot | null };
  page: RawDialogPage;
  parts: EvaluatedDialogPart[];
  actions: any[]; // matches executeActions return shape
  links: EvaluatedDialogLink[];
}
