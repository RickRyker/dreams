// server/src/dialogs/renderers/DialogGraphMermaidRenderer.ts


export class DialogGraphMermaidRenderer {
  static render(dialog: any): string {
    const lines: string[] = [];
    lines.push("flowchart TD");
    lines.push(`  D["Dialog: ${dialog.title}"]`);

    for (const page of dialog.pages) {
      lines.push(`  P_${page.id}["Page ${page.sequence}"]`);
      lines.push(`  D --> P_${page.id}`);

      for (const part of page.parts) {
        lines.push(`  PT_${part.id}["Part: ${part.text.replace(/"/g, "'")}"]`);
        lines.push(`  P_${page.id} --> PT_${part.id}`);
      }

      for (const link of page.links) {
        const target = link.pageId ? `P_${link.pageId}` : `L_${link.id}`;
        lines.push(`  L_${link.id}["Link"]`);
        lines.push(`  P_${page.id} --> L_${link.id}`);
        if (link.pageId) {
          lines.push(`  L_${link.id} --> ${target}`);
        }
      }
    }

    return lines.join("\n");
  }
}
