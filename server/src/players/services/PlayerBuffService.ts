// server/src/players/services/PlayerBuffService.ts

import { PlayerBuffRepository } from "../repositories/PlayerBuffRepository";
import { PlayerEffect, EffectType, ElementType } from "@prisma/client";

export class PlayerBuffService {
  constructor(private readonly repo: PlayerBuffRepository) {}

  async applyEffect(
    playerId: string,
    type: EffectType,
    magnitude: number,
    durationMs: number,
    element?: ElementType,
    tickIntervalMs?: number
  ): Promise<PlayerEffect> {
    const expiresAt = durationMs ? new Date(Date.now() + durationMs) : null;

    return this.repo.create({
      playerId,
      type,
      element,
      magnitude,
      expiresAt,
      tickIntervalMs,
      nextTickAt: tickIntervalMs ? new Date(Date.now() + tickIntervalMs) : null,
    });
  }

  async removeEffect(effectId: string): Promise<void> {
    await this.repo.delete(effectId);
  }

  async clearExpiredEffects(playerId: string): Promise<number> {
    return this.repo.clearExpired(playerId);
  }

  async list(playerId: string): Promise<PlayerEffect[]> {
    return this.repo.list(playerId);
  }
}
