// server/src/combat/abilities/types/AbilityDefinition.ts


import {AbilitySchoolType} from "./AbilitySchoolType";
import {AbilityEffectType} from "./AbilityEffectType";
import {AbilityTelegraphDefinition} from "./AbilityTelegraphDefinition";

export interface AbilityDefinition {
  id: string;
  name: string;

  school: AbilitySchoolType;

  castTimeMs: number;
  cooldownMs: number;
  resourceCost?: number;
  range?: number;

  isInstant?: boolean;
  isChannel?: boolean;

  effectType: AbilityEffectType;

  baseAmount?: number;
  durationMs?: number;
  tickIntervalMs?: number;

  telegraph?: AbilityTelegraphDefinition;

  tags?: string[];
}
