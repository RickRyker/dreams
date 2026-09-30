// shared/zod/CombatParticipantSchema.ts

import { z } from "zod";
import { ElementTypeEnum } from "../types/ElementTypeEnum";
import { ParticipantTypeEnum } from "../types/ParticipantTypeEnum";

// JSON helpers
const JsonRecord = z.record(z.string(), z.any());

export const CombatParticipantSchema = z.object({
  id: z.string(),
  combatId: z.string(),

  // Identity
  participantType: z.enum(ParticipantTypeEnum),
  playerId: z.string().nullable(),
  petId: z.string().nullable(),
  monsterId: z.string().nullable(),

  // Names
  name: z.string().nullable(),
  corpseName: z.string().nullable(),

  // Core stats
  tier: z.number(),
  hp: z.number(),
  maxHp: z.number(),
  mp: z.number(),
  maxMp: z.number(),

  strength: z.number(),
  dexterity: z.number(),
  intelligence: z.number(),
  charisma: z.number(),

  elementAffinity: z.enum(ElementTypeEnum),

  critChance: z.number(),
  critDamage: z.number(),
  critResistance: z.number(),

  damageReduction: z.number(),
  spellResistance: z.number(),

  // JSON fields
  elementResistances: JsonRecord.optional().default({}),
  abilityCooldowns: JsonRecord.optional().default({}),

  // Combat state
  shield: z.number(),
  initiative: z.number(),
  hasActed: z.boolean(),
  isAlive: z.boolean(),
  isInvisible: z.boolean(),
  isLooted: z.boolean(),

  // Position + facing
  x: z.number(),
  y: z.number(),
  facingDeg: z.number(),

  // Economy
  gold: z.number(),

  // GCD
  gcdSeconds: z.number(),
  globalCooldownUntil: z.number().nullable(),

  // Metadata
  createdAt: z.number(),
  updatedAt: z.number(),
});
