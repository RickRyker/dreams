// server/src/dialogs/validators/DialogGraphValidator.ts


export class DialogGraphValidator {

  static validateSequence(pages: { sequence: number }[]) {
    const seqs = pages.map(p => p.sequence);
    const unique = new Set(seqs);

    if (unique.size !== seqs.length) {
      throw new Error("DUPLICATE_PAGE_SEQUENCE");
    }

    if (!seqs.includes(0)) {
      throw new Error("MISSING_PAGE_ZERO");
    }
  }

  static validateLinks(pages: any[]) {
    const pageIds = new Set(pages.map(p => p.id));

    for (const page of pages) {
      for (const link of page.links) {
        if (link.pageId && !pageIds.has(link.pageId)) {
          throw new Error(`BROKEN_LINK_TARGET: ${link.pageId}`);
        }
      }
    }
  }

  static detectCycles(pages: any[]) {
    const graph: Record<string, string[]> = {};

    for (const p of pages) {
      graph[p.id] = p.links
        .filter((l: any) => l.dialogId === null) // only intra-dialog links
        .map((l: any) => l.pageId)
        .filter(Boolean) as string[];
    }

    const visited = new Set<string>();
    const stack = new Set<string>();

    const dfs = (node: string) => {
      if (stack.has(node)) throw new Error("CYCLE_DETECTED");
      if (visited.has(node)) return;

      visited.add(node);
      stack.add(node);

      for (const next of graph[node] ?? []) {
        dfs(next);
      }

      stack.delete(node);
    };

    for (const id of Object.keys(graph)) {
      dfs(id);
    }
  }

  static validateDialogGraph(dialog: any) {
    this.validateSequence(dialog.pages);
    this.validateLinks(dialog.pages);
    this.detectCycles(dialog.pages);
  }

  static validateConditions(dialog: any) {
    const pageIds = new Set(dialog.pages.map((p: any) => p.id));
    const partIds = new Set(
      dialog.pages.flatMap((p: any) => p.parts.map((pt: any) => pt.id)),
    );
    const actionIds = new Set(
      dialog.pages.flatMap((p: any) => p.actions.map((a: any) => a.id)),
    );
    const linkIds = new Set(
      dialog.pages.flatMap((p: any) => p.links.map((l: any) => l.id)),
    );

    const allConditions = dialog.pages.flatMap((p: any) => [
      ...p.parts.flatMap((pt: any) => pt.conditions),
      ...p.actions.flatMap((a: any) => a.conditions),
      ...p.links.flatMap((l: any) => l.conditions),
    ]);

    for (const c of allConditions) {
      if (c.partId && !partIds.has(c.partId)) {
        throw new Error(`ORPHAN_CONDITION_PART: ${c.id}`);
      }
      if (c.actionId && !actionIds.has(c.actionId)) {
        throw new Error(`ORPHAN_CONDITION_ACTION: ${c.id}`);
      }
      if (c.linkId && !linkIds.has(c.linkId)) {
        throw new Error(`ORPHAN_CONDITION_LINK: ${c.id}`);
      }
    }
  }

  static validateDialogGraphV2(dialog: any) {
    this.validateDialogGraph(dialog); // v1: sequences, links, cycles
    this.validateConditions(dialog);
  }

}
