// server/src/combat/abilities/AbilityCooldownTracker.ts


import {EngineEntityId} from "../types/EngineCombatTypes";

interface CooldownKey {
  casterId: EngineEntityId;
  abilityId: string;
}

export class AbilityCooldownTracker {
  private readonly cooldowns = new Map<string, number>();

  private key(casterId: EngineEntityId, abilityId: string): string {
    return `${casterId}::${abilityId}`;
  }

  setCooldown(casterId: EngineEntityId, abilityId: string, now: number, durationMs: number): void {
    this.cooldowns.set(this.key(casterId, abilityId), now + durationMs);
  }

  isOnCooldown(casterId: EngineEntityId, abilityId: string, now: number): boolean {
    const expiresAt = this.cooldowns.get(this.key(casterId, abilityId));
    return !!expiresAt && expiresAt > now;
  }

  getRemaining(casterId: EngineEntityId, abilityId: string, now: number): number {
    const expiresAt = this.cooldowns.get(this.key(casterId, abilityId));
    if (!expiresAt) return 0;
    return Math.max(0, expiresAt - now);
  }

  clearForCaster(casterId: EngineEntityId): void {
    for (const key of this.cooldowns.keys()) {
      if (key.startsWith(`${casterId}::`)) this.cooldowns.delete(key);
    }
  }
}
