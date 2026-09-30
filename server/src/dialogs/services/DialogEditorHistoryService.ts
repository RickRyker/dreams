// server/src/dialogs/services/DialogEditorHistoryService.ts

export class DialogEditorHistoryService {
  private undoStack: any[] = [];
  private redoStack: any[] = [];

  pushSnapshot(snapshot: any) {
    this.undoStack.push(snapshot);
    this.redoStack = []; // clear redo on new change
  }

  undo(): any | null {
    if (this.undoStack.length === 0) return null;
    const snap = this.undoStack.pop();
    this.redoStack.push(snap);
    return snap;
  }

  redo(): any | null {
    if (this.redoStack.length === 0) return null;
    const snap = this.redoStack.pop();
    this.undoStack.push(snap);
    return snap;
  }

  clear() {
    this.undoStack = [];
    this.redoStack = [];
  }
}
