// server/src/combat/abilities/AbilityHotPatchService.ts

import { prisma } from "@prisma";
import { Ability } from "@prisma/client";
import { AbilityDefinition } from "./types";
import { AbilityRegistry } from "./AbilityRegistry";
import { mapDbAbilityToDefinition } from "./AbilityRegistryLoader";
import * as Scripts from "./scripts";

export class AbilityHotPatchService {
  static async reloadAbility(slug: string): Promise<boolean> {
    const row: Ability | null = await prisma.ability.findUnique({
      where: { slug },
    });

    if (!row) return false;

    const def: AbilityDefinition = mapDbAbilityToDefinition(row);
    const script = (Scripts as Record<string, any>)[`${row.slug}Script`];
    if (!script) {
      console.warn(`No script found for ability: ${row.slug}`);
      return false;
    }
    AbilityRegistry.register(def.id, { def, script });
    console.log(`Hot‑patched ability: ${slug}`);
    return true;
  }

}
