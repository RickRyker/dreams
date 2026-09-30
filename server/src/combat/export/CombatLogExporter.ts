// server/src/combat/export/CombatLogExporter.ts


export interface CombatLogEntry {
  timestamp: number;
  type: string;
  actorName?: string;
  targetName?: string;
  message: string;
  data?: any;
}

export class CombatLogExporter {
  static toJson(logs: CombatLogEntry[]): string {
    return JSON.stringify(logs, null, 2);
  }

  static toHtml(logs: CombatLogEntry[]): string {
    const rows = logs
      .map(
        (l) =>
          `<tr>
             <td>${new Date(l.timestamp).toISOString()}</td>
             <td>${l.type}</td>
             <td>${l.actorName ?? ""}</td>
             <td>${l.targetName ?? ""}</td>
             <td>${l.message}</td>
           </tr>`,
      )
      .join("\n");

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Combat Log</title>
  <style>
    body { font-family: system-ui, sans-serif; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ccc; padding: 4px 8px; font-size: 12px; }
    th { background: #f5f5f5; }
  </style>
</head>
<body>
  <h1>Combat Log</h1>
  <table>
    <thead>
      <tr>
        <th>Time</th>
        <th>Type</th>
        <th>Actor</th>
        <th>Target</th>
        <th>Message</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
</body>
</html>`;
  }
}
