// shared/replay/ReplayAnomalyDetector.ts

import type { ReplayAnomalyDto } from "../dto/ReplayAnomalyDto";

interface InternalRow {
  id: string;
  metrics: Record<string, number>;
}

interface InternalAnomaly {
  id: string;
  score: number;
  reason: string;
}

export function detectAnomalies(
  rows: InternalRow[],
  threshold: number
): InternalAnomaly[] {
  if (rows.length === 0) return [];

  const metricKeys = Object.keys(rows[0].metrics);

  // Compute mean and stddev for each metric
  const stats = metricKeys.map((key) => {
    const values = rows.map((r) => r.metrics[key]);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance =
      values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length;
    const std = Math.sqrt(variance) || 1;
    return { key, mean, std };
  });

  const anomalies: InternalAnomaly[] = [];

  for (const row of rows) {
    let maxZ = 0;
    let maxKey = "";

    for (const { key, mean, std } of stats) {
      const z = Math.abs((row.metrics[key] - mean) / std);
      if (z > maxZ) {
        maxZ = z;
        maxKey = key;
      }
    }

    if (maxZ >= threshold) {
      anomalies.push({
        id: row.id,
        score: maxZ,
        reason: `Field '${maxKey}' deviates by ${maxZ.toFixed(2)}σ`,
      });
    }
  }

  return anomalies;
}

export function detectReplayAnomalies(
  features: {
    id: string;
    totalDamage: number;
    totalHealing: number;
    durationSeconds: number;
    turns: number;
  }[],
  threshold = 2.5
): ReplayAnomalyDto[] {
  const rows: InternalRow[] = features.map((f) => ({
    id: f.id,
    metrics: {
      totalDamage: f.totalDamage,
      totalHealing: f.totalHealing,
      durationSeconds: f.durationSeconds,
      turns: f.turns,
    },
  }));

  return detectAnomalies(rows, threshold).map((a) => ({
    id: a.id,
    score: a.score,
    reason: a.reason,
  }));
}
