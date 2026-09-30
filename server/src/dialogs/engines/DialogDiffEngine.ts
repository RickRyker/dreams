// server/src/dialogs/engines/DialogDiffEngine.ts

import { DialogEditorSchema } from "shared";
import { z } from "zod";

type DialogEditorPayload = z.infer<typeof DialogEditorSchema>;

export interface DialogPatch {
  addedPages: any[];
  removedPageIds: string[];
  updatedPages: any[];
}

export class DialogDiffEngine {
  static diff(oldGraph: DialogEditorPayload, newGraph: DialogEditorPayload): DialogPatch {
    const oldPagesById = new Map(
     (oldGraph.pages ?? [])
       .filter((p) => p.id)
       .map((p) => [p.id!, p] as const),
    );
    const newPagesById = new Map(
     (newGraph.pages ?? [])
       .filter((p) => p.id)
       .map((p) => [p.id!, p] as const),
    );

    const addedPages = newGraph.pages.filter((p) => !p.id);
    const removedPageIds: string[] = [];
    const updatedPages: any[] = [];

    for (const [id, oldPage] of oldPagesById.entries()) {
      if (!newPagesById.has(id)) {
        removedPageIds.push(id);
        continue;
      }

      const newPage = newPagesById.get(id)!;
      if (JSON.stringify(oldPage) !== JSON.stringify(newPage)) {
        updatedPages.push(newPage);
      }
    }

    return {
      addedPages,
      removedPageIds,
      updatedPages,
    };
  }
}
