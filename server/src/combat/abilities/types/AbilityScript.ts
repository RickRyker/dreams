// server/src/combat/abilities/types/AbilityScript.ts


import { AbilityContext } from "./AbilityContext";

export interface AbilityScript {
  onCastStart?(ctx: AbilityContext): void;
  onCastComplete?(ctx: AbilityContext): void;
  onHit?(ctx: AbilityContext, targetId: string): void;
  onTick?(ctx: AbilityContext, targetId: string): void;
  onExpire?(ctx: AbilityContext, targetId: string): void;
}
