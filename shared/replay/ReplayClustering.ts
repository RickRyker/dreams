// shared/replay/ReplayClustering.ts

import type {ReplayFeaturesDto} from "../dto/ReplayFeaturesDto";

function distance(a: ReplayFeaturesDto, b: ReplayFeaturesDto): number {
  let sum = 0;
  for (const key of Object.keys(a) as (keyof ReplayFeaturesDto)[]) {
    if (key === "id") continue;
    const diff = (a[key] as number) - (b[key] as number);
    sum += diff * diff;
  }
  return Math.sqrt(sum);
}

export function kMeansCluster(
  features: ReplayFeaturesDto[],
  k: number,
  iterations = 10
): ReplayFeaturesDto[][] {
  if (features.length === 0 || k <= 0) return [];

  let centroids = features.slice(0, k);

  for (let iter = 0; iter < iterations; iter++) {
    const clusters: ReplayFeaturesDto[][] = Array.from({ length: k }, () => []);

    for (const f of features) {
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < k; i++) {
        const d = distance(f, centroids[i]);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      clusters[best].push(f);
    }

    centroids = clusters.map((cluster) => {
      if (!cluster.length) return centroids[0];

      const sum = cluster.reduce(
        (acc, c) => {
          const out = { ...acc };
          for (const key of Object.keys(c) as (keyof ReplayFeaturesDto)[]) {
            if (key !== "id") {
              out[key] = (out[key] as number) + (c[key] as number);
            }
          }
          return out;
        },
        {
          id: "",
          totalDamage: 0,
          totalHealing: 0,
          durationSeconds: 0,
          rounds: 0,
          turns: 0,
          participantCount: 0,
          deathCount: 0,
          casts: 0,
          interrupts: 0,
          telegraphs: 0,
        } as ReplayFeaturesDto
      );

      const n = cluster.length;
      for (const key of Object.keys(sum) as (keyof ReplayFeaturesDto)[]) {
        if (key !== "id") {
          sum[key] = (sum[key] as number) / n;
        }
      }

      return sum;
    });
  }

  const finalClusters: ReplayFeaturesDto[][] = Array.from({ length: k }, () => []);

  for (const f of features) {
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < k; i++) {
      const d = distance(f, centroids[i]);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    finalClusters[best].push(f);
  }

  return finalClusters;
}
