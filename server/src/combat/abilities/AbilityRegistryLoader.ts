// server/src/combat/abilities/AbilityRegistryLoader.ts


import { prisma } from "@prisma";
import { Ability } from "@prisma/client";
import { AbilityDefinition } from "./types";
import { AbilityRegistry } from "./AbilityRegistry";
import * as Scripts from "./scripts";

export function mapDbAbilityToDefinition(row: Ability): AbilityDefinition {
  return {
    id: row.slug,
    name: row.name,
    school: row.school as any,
    effectType: row.effectType as any,
    castTimeMs: row.castTimeMs,
    cooldownMs: row.cooldownMs,
    resourceCost: row.resourceCost ?? undefined,
    range: row.range ?? undefined,
    isInstant: row.isInstant,
    isChannel: row.isChannel,
    baseAmount: row.baseAmount ?? undefined,
    durationMs: row.durationMs ?? undefined,
    tickIntervalMs: row.tickIntervalMs ?? undefined,
    telegraph: row.telegraph as any,
    tags: row.tags as any,
  };
}

export class AbilityRegistryLoader {
  static async loadAll(): Promise<void> {
    const rows: Ability[] = await prisma.ability.findMany();

    for (const row of rows) {
      const def: AbilityDefinition = mapDbAbilityToDefinition(row);
      const script = (Scripts as Record<string, any>)[`${row.slug}Script`];
      if (!script) {
        console.warn(`No script found for ability: ${row.slug}`);
        continue;
      }
      AbilityRegistry.register(def.id, { def, script });
    }
  }
}
