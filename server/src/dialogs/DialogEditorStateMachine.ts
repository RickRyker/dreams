// server/src/dialogs/DialogEditorStateMachine.ts


export type DialogEditorState =
  | "idle"
  | "loading"
  | "editing"
  | "saving"
  | "locked"
  | "error";

export interface DialogEditorContext {
  dialogId: string | null;
  editorId: string;
  lockOwner: string | null;
  error: string | null;
}

export type DialogEditorEvent =
  | { type: "LOAD"; dialogId: string }
  | { type: "LOCK_ACQUIRED" }
  | { type: "LOCK_DENIED"; owner: string }
  | { type: "EDIT" }
  | { type: "SAVE" }
  | { type: "SAVE_SUCCESS" }
  | { type: "SAVE_ERROR"; error: string }
  | { type: "UNLOCK" };

export function transition(
  state: DialogEditorState,
  ctx: DialogEditorContext,
  event: DialogEditorEvent,
): { state: DialogEditorState; ctx: DialogEditorContext } {
  switch (state) {
    case "idle":
      if (event.type === "LOAD") {
        return { state: "loading", ctx: { ...ctx, dialogId: event.dialogId } };
      }
      return { state, ctx };

    case "loading":
      if (event.type === "LOCK_ACQUIRED") {
        return { state: "editing", ctx: { ...ctx, lockOwner: ctx.editorId } };
      }
      if (event.type === "LOCK_DENIED") {
        return { state: "locked", ctx: { ...ctx, lockOwner: event.owner } };
      }
      return { state, ctx };

    case "editing":
      if (event.type === "SAVE") {
        return { state: "saving", ctx };
      }
      if (event.type === "UNLOCK") {
        return { state: "idle", ctx: { ...ctx, lockOwner: null } };
      }
      return { state, ctx };

    case "saving":
      if (event.type === "SAVE_SUCCESS") {
        return { state: "editing", ctx };
      }
      if (event.type === "SAVE_ERROR") {
        return { state: "error", ctx: { ...ctx, error: event.error } };
      }
      return { state, ctx };

    case "locked":
      if (event.type === "UNLOCK") {
        return { state: "idle", ctx: { ...ctx, lockOwner: null } };
      }
      return { state, ctx };

    case "error":
      if (event.type === "EDIT") {
        return { state: "editing", ctx: { ...ctx, error: null } };
      }
      return { state, ctx };

    default:
      return { state, ctx };
  }
}
