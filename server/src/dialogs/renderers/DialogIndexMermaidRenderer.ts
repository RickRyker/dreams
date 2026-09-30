// server/src/dialogs/renderers/DialogIndexMermaidRenderer.ts


export class DialogIndexMermaidRenderer {
  static render(dialogs: any[]): string {
    const lines: string[] = [];
    lines.push("flowchart TD");

    for (const d of dialogs) {
      lines.push(`  D_${d.id}["${d.title}"]`);
    }

    for (const d of dialogs) {
      for (const page of d.pages) {
        for (const link of page.links) {
          if (link.dialogId) {
            lines.push(`  D_${d.id} --> D_${link.dialogId}`);
          }
        }
      }
    }

    return lines.join("\n");
  }
}
