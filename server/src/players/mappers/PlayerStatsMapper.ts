// server/src/players/mappers/PlayerStatsMapper.ts

import { PlayerStats } from "@prisma/client";
import { PlayerStatsDto } from "shared/dto/PlayerStatsDto";

export class PlayerStatsMapper {
  static toDto(stats: PlayerStats | null): PlayerStatsDto {
    return {
      gold: stats?.gold ?? 0,
      level: stats?.level ?? 1,
      experience: stats?.experience ?? 0,
      strength: stats?.strength ?? 0,
      dexterity: stats?.dexterity ?? 0,
      intelligence: stats?.intelligence ?? 0,
      charisma: stats?.charisma ?? 0,
      hp: stats?.hp ?? 0,
      maxHp: stats?.maxHp ?? 0,
      mp: stats?.mp ?? 0,
      maxMp: stats?.maxMp ?? 0,
      critChance: stats?.critChance ?? 0,
      critDamage: stats?.critDamage ?? 1.5,
      critResistance: stats?.critResistance ?? 0,
      damageReduction: stats?.damageReduction ?? 0,
      spellResistance: stats?.spellResistance ?? 0,
    };
  }
}
